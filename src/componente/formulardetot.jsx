import { useEffect, useState } from "react";
// Importăm funcțiile 'query' și 'where' necesare
import { collection, doc, onSnapshot, updateDoc, query, where } from "firebase/firestore"; 
import { db } from "../folos/firebase";
import AnswerForm from "./AnswerForm";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showModalId, setShowModalId] = useState(null);
  const [openAnswerFormId, setOpenAnswerFormId] = useState(null);
  
  const [startTime, setStartTime] = useState(null);
  const [showOnlyNew, setShowOnlyNew] = useState(false); 

  useEffect(() => {
    // Setează timpul de start la prima montare a componentei
    if (!startTime) {
      setStartTime(new Date()); 
    }

    let questionsRef = collection(db, "questions");
    let q = questionsRef;

    // Aplică filtrarea pentru mesaje noi dacă filtrul este activ
    if (showOnlyNew && startTime) {
      q = query(
        questionsRef,
        where("createdAt", ">=", startTime),
        // Adăugarea unui orderBy pe createdAt este adesea necesară
      );
    } 

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      const sorted = data.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      });
      
      // Afișează toate întrebările (fără limită)
      setQuestions(sorted); 
    });
    
    return unsubscribe;
  }, [startTime, showOnlyNew]);

  // Funcție ajutătoare pentru a verifica starea like-ului din localStorage
  const hasUserLiked = (questionId, answerId) => {
    const key = `${questionId}-answer-${answerId}`;
    return localStorage.getItem(key) === "liked";
  };
  
  // Logica de Like/Unlike
  const handleLike = async (questionId, answerId) => {
    const question = questions.find((q) => q.id === questionId);
    const answerIndex = question.answers.findIndex((a) => a.id === answerId);
    if (answerIndex === -1) return;

    const key = `${questionId}-answer-${answerId}`;
    const hasLiked = localStorage.getItem(key) === "liked"; 

    const updatedAnswers = [...question.answers];
    const currentLikes = updatedAnswers[answerIndex].likes || 0;
    let newLikes;

    if (hasLiked) {
      // Un-like: Decrementăm
      newLikes = Math.max(0, currentLikes - 1); 
      localStorage.removeItem(key); 
    } else {
      // Like: Incrementăm
      newLikes = currentLikes + 1;
      localStorage.setItem(key, "liked"); 
    }

    updatedAnswers[answerIndex].likes = newLikes;

    await updateDoc(doc(db, "questions", questionId), {
      answers: updatedAnswers,
    });

    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answers: updatedAnswers } : q))
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString("ro-RO");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">💬 Întrebările bobocilor</h2>

      {/* Buton pentru comutarea filtrului NOU/TOATE (SECȚIUNE REPARATĂ) */}
      <div className="mb-4">
        <button
          onClick={() => setShowOnlyNew(!showOnlyNew)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            showOnlyNew
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          }`}
        >
          {showOnlyNew ? "🔴 Arată Toate Mesajele" : "🟢 Arată Doar Mesajele Noi (Începând de Acum)"}
        </button>
      </div>
      
      {questions.map((q) => (
        <div
          key={q.id}
          className="p-4 rounded-2xl mb-4 shadow-md bg-white/10 backdrop-blur-md"
        >
          <p className="font-medium text-white">{q.text}</p>
          <p className="text-sm text-white/70 mt-1">
            — {q.author} ({q.class}) • {formatDate(q.createdAt)}
          </p>

          <div className="mt-3 pl-3 border-l-2 border-white/30">
            {q.answers && q.answers.length > 0 ? (
              <>
                {/* Arătăm doar primele 3 răspunsuri sortate după like-uri */}
                {q.answers
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .slice(0, 3) 
                  .map((a) => {
                    const liked = hasUserLiked(q.id, a.id); 
                    return (
                      <div
                        key={a.id}
                        className="flex justify-between items-center mb-2 rounded-xl p-2 bg-white/10"
                      >
                        <div>
                          <p className="text-sm text-white">
                            <strong>{a.author}:</strong> {a.text}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLike(q.id, a.id)}
                          className={`flex items-center gap-1 shrink-0 ${
                            liked ? "text-red-500 hover:text-red-400" : "text-gray-400 hover:text-red-400"
                          }`}
                        >
                          {liked ? "❤️" : "🤍"} {a.likes || 0}
                        </button>
                      </div>
                    );
                  })}

                {q.answers.length > 3 && (
                  <button
                    onClick={() => setShowModalId(q.id)}
                    className="text-sm text-blue-400 hover:underline mt-2"
                  >
                    Vezi toate răspunsurile ({q.answers.length})
                  </button>
                )}
              </>
            ) : (
              <p className="text-sm text-white/50">Nimeni nu a răspuns încă 😅</p>
            )}
          </div>

          {/* Buton pentru a deschide formularul */}
          {openAnswerFormId !== q.id && (
            <button
              onClick={() => setOpenAnswerFormId(q.id)}
              className="mt-2 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Răspunde
            </button>
          )}

          {/* Formularul apare doar când este deschis */}
          {openAnswerFormId === q.id && (
            <AnswerForm questionId={q.id} onClose={() => setOpenAnswerFormId(null)} />
          )}

          {/* Modal pentru toate răspunsurile */}
          {showModalId === q.id && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowModalId(null)}
            >
              <div
                className="bg-gray-900 p-6 rounded-xl max-w-lg w-full text-white max-h-[400px] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold mb-4">Toate răspunsurile</h3>
                {q.answers
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .map((a) => {
                    const liked = hasUserLiked(q.id, a.id); 
                    return (
                      <div
                        key={a.id}
                        className="mb-2 p-2 rounded-lg bg-white/10 flex justify-between items-center gap-2"
                      >
                        <div className="flex-1">
                          <p>
                            <strong>{a.author}:</strong> {a.text}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLike(q.id, a.id)}
                          className={`flex items-center gap-1 shrink-0 ${
                            liked ? "text-red-500 hover:text-red-400" : "text-gray-400 hover:text-red-400"
                          }`}
                        >
                          {liked ? "❤️" : "🤍"} {a.likes || 0}
                        </button>
                      </div>
                    );
                  })}
                <button
                  onClick={() => setShowModalId(null)}
                  className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 w-full"
                >
                  Închide
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}