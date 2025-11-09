import { useEffect, useState } from "react";
// Adăugăm updateDoc pentru a putea da Like
import { collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore"; 
import { db } from "../folos/firebase.js"; // Ajustează calea la fișierul tău Firebase

export default function TopQuestions() {
    const [topQuestions, setTopQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAnswersId, setShowAnswersId] = useState(null); 
    
    // Logica de Like (DUPLICATĂ din QuestionList.js)
    // Funcție ajutătoare pentru a verifica starea like-ului din localStorage
    const hasUserLiked = (questionId, answerId) => {
        const key = `${questionId}-answer-${answerId}`;
        return localStorage.getItem(key) === "liked";
    };

    // Logica de Like/Unlike (Adaptată pentru a actualiza starea locală din TopQuestions)
    const handleLike = async (questionId, answerId) => {
        const question = topQuestions.find((q) => q.id === questionId);
        if (!question || !question.answers) return;
        
        const answerIndex = question.answers.findIndex((a) => a.id === answerId);
        if (answerIndex === -1) return;

        const key = `${questionId}-answer-${answerId}`;
        const hasLiked = localStorage.getItem(key) === "liked"; 

        const updatedAnswers = [...question.answers];
        const currentLikes = updatedAnswers[answerIndex].likes || 0;
        let newLikes;

        if (hasLiked) {
            // Un-like
            newLikes = Math.max(0, currentLikes - 1); 
            localStorage.removeItem(key); 
        } else {
            // Like
            newLikes = currentLikes + 1;
            localStorage.setItem(key, "liked"); 
        }

        updatedAnswers[answerIndex].likes = newLikes;

        // 1. Actualizarea stării locale (pentru feedback rapid în TopQuestions)
        setTopQuestions((prev) =>
            prev.map((q) => (q.id === questionId ? { ...q, answers: updatedAnswers } : q))
        );
        
        // 2. Actualizarea bazei de date
        await updateDoc(doc(db, "questions", questionId), {
            answers: updatedAnswers,
        });
    };
    
    // --- Restul codului useEffect (Rămâne neschimbat) ---
    useEffect(() => {
        const questionsRef = collection(db, "questions");
        const q = query(questionsRef, where("isTop5", "==", true));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const sortedData = data.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });
            setTopQuestions(sortedData.slice(0, 5));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleToggleAnswers = (questionId) => {
        setShowAnswersId(prevId => (prevId === questionId ? null : questionId));
    };

    if (loading || topQuestions.length === 0) {
        return loading ? <div className="text-white text-center mb-6">Se încarcă Podiumul...</div> : null;
    }

    return (
        <div id="top-questions-wrapper" className="max-w-2xl mx-auto mt-6 p-4 rounded-xl bg-purple-900/30 border border-purple-500/50">
            <h2 className="text-3xl font-extrabold mb-4 text-purple-400 text-center">
                🏆 Top 5 Întrebări (Podium)
            </h2>
            
            <div className="space-y-4">
                {topQuestions.map((q, index) => {
                    const isAnswersVisible = showAnswersId === q.id;
                    const answerCount = q.answers?.length || 0;

                    return (
                        <div key={q.id} className="p-4 rounded-lg bg-purple-700/50 border border-purple-400/70 shadow-lg">
                            <p className="text-lg font-bold text-white mb-2">
                                #{index + 1}: {q.text}
                            </p>
                            <p className="text-sm text-purple-200">
                                — {q.author} ({q.class}) 
                            </p>
                            
                            {/* Buton pentru a afișa/ascunde răspunsurile */}
                            {answerCount > 0 && (
                                <button
                                    onClick={() => handleToggleAnswers(q.id)}
                                    className="mt-3 text-sm font-semibold px-3 py-1 rounded bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                                >
                                    {isAnswersVisible 
                                        ? `Ascunde Răspunsurile (${answerCount})`
                                        : `Vezi Răspunsurile (${answerCount})`}
                                </button>
                            )}
                            {answerCount === 0 && (
                                <p className="text-sm text-purple-300 mt-2">Niciun răspuns încă.</p>
                            )}

                            {/* Secțiunea Răspunsuri (Afișată condiționat) */}
                            {isAnswersVisible && answerCount > 0 && (
                                <div className="mt-4 pt-3 border-t border-purple-400/50 space-y-2">
                                    {q.answers
                                        .slice()
                                        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                                        .map(a => {
                                            const liked = hasUserLiked(q.id, a.id); // Verifică like-ul local
                                            return (
                                                <div key={a.id} className="p-2 rounded bg-purple-600/50 text-white text-sm flex justify-between items-center">
                                                    <p><strong>{a.author}:</strong> {a.text}</p>
                                                    {/* Butonul de Like AICI */}
                                                    <button
                                                        onClick={() => handleLike(q.id, a.id)}
                                                        className={`flex items-center gap-1 shrink-0 ${
                                                            liked ? "text-red-500 hover:text-red-400" : "text-gray-300 hover:text-red-400"
                                                        } transition-colors`}
                                                    >
                                                        {liked ? "❤️" : "🤍"} {a.likes || 0}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}