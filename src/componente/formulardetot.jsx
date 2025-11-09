import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc, query, where } from "firebase/firestore"; 
import { db } from "../folos/firebase";
import AnswerForm from "./AnswerForm";
import "../components_css/formularpareri.css"

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showModalId, setShowModalId] = useState(null);
  const [openAnswerFormId, setOpenAnswerFormId] = useState(null);
  
  const [startTime, setStartTime] = useState(null);
  const [showOnlyNew, setShowOnlyNew] = useState(false); 

  // QuestionList.js - NOUA VERSIUNE A useEffect

useEffect(() => {
    if (!startTime) {
      setStartTime(new Date()); 
    }

    let questionsRef = collection(db, "questions");
    let q = questionsRef;
    
    // Simplificăm interogarea la Firestore: facem doar filtrarea pe timp (dacă e activă)
    // NU mai folosim where("isPinned", "!=", true)
    if (showOnlyNew && startTime) {
        q = query(
            questionsRef,
            where("createdAt", ">=", startTime)
            // NOTĂ: Pentru a folosi where pe createdAt, probabil vei avea nevoie și de orderBy("createdAt", "desc")
        );
    } 
    // Dacă showOnlyNew este fals, luăm toate întrebările (fără filtre complexe)
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // --- SEPARAREA ȘI SORTAREA DATELOR SE FACE ACUM LOCAL ÎN REACT ---
        
        const pinned = allData.filter(q => q.isPinned);
        const nonPinned = allData.filter(q => !q.isPinned);

        // Sortăm datele normale după dată
        const sortedNonPinned = nonPinned.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        });
        
        // Setează starea: Pinned la început, urmat de cele normale sortate.
        setQuestions([...pinned, ...sortedNonPinned]);
    });

    // Păstrăm o singură funcție de unsubscribe
    return unsubscribe;
  }, [startTime, showOnlyNew]);

  // Funcție ajutătoare pentru a verifica starea like-ului din localStorage
  const hasUserLiked = (questionId, answerId) => {
    const key = `${questionId}-answer-${answerId}`;
    return localStorage.getItem(key) === "liked";
  };
  
  // Logica de Like/Unlike (Rămâne neschimbată și este corectă)
  const handleLike = async (questionId, answerId) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;
    
    const answerIndex = question.answers.findIndex((a) => a.id === answerId);
    
    if (answerIndex === -1) {
        console.error(`Answer ID ${answerId} not found.`);
        return;
    }

    const key = `${questionId}-answer-${answerId}`;
    const hasLiked = localStorage.getItem(key) === "liked"; 

    const updatedAnswers = [...question.answers];
    const currentLikes = updatedAnswers[answerIndex].likes || 0;
    let newLikes;

    if (hasLiked) {
      newLikes = Math.max(0, currentLikes - 1); 
      localStorage.removeItem(key); 
    } else {
      newLikes = currentLikes + 1;
      localStorage.setItem(key, "liked"); 
    }

    updatedAnswers[answerIndex].likes = newLikes;

    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, answers: updatedAnswers } : q))
    );
    
    await updateDoc(doc(db, "questions", questionId), {
      answers: updatedAnswers,
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString("ro-RO");
  };

  return (
    <div id="main-wrapper">
    <div className="max-w-2xl mx-auto mt-6" id="formInt">
      <h2 className="text-2xl font-bold mb-4 text-white">💬 Întrebările elevilor</h2>

      <div className="mb-4" id="formInt">
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
          // Aplicăm stilul de evidențiere bazat pe noul câmp isPinned
          className={`p-4 rounded-2xl mb-4 shadow-md backdrop-blur-md 
                   ${q.isPinned ? 'bg-yellow-700/70 border-2 border-yellow-400' : 'bg-white/10'}`} 
        >
            {/* Afișăm eticheta Pinned */}
            {q.isPinned && <p className="text-sm font-bold text-yellow-200 mb-2">📌 Mesaj Fixat (Important)</p>}
            
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
              className="mt-2 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-white"
            >
              Răspunde
            </button>
          )}

          {/* Formularul apare doar când este deschis */}
          {openAnswerFormId === q.id && (
            <AnswerForm questionId={q.id} onClose={() => setOpenAnswerFormId(null)} />
          )}

          {/* Modal pentru toate răspunsurile (Logica modalului rămâne la fel) */}
          {showModalId === q.id && (
            <div className="modal-overlay" onClick={() => setShowModalId(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Toate răspunsurile</h3>
                    {q.answers
                        .slice()
                        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                        .map((a) => {
                        const liked = hasUserLiked(q.id, a.id);
                        return (
                            <div key={a.id} style={{
                            marginBottom: '10px', padding: '10px', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.1)', display: 'flex',
                            justifyContent: 'space-between', alignItems: 'center', color: 'white'
                            }}>
                            <p><strong>{a.author}:</strong> {a.text}</p>
                            <button 
                                onClick={() => handleLike(q.id, a.id)}
                                style={{ color: liked ? "red" : "gray", background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {liked ? "❤️" : "🤍"} {a.likes || 0}
                            </button>
                            </div>
                        );
                        })}
                    <button
                        onClick={() => setShowModalId(null)}
                        style={{ marginTop: '10px', padding: '10px 15px', borderRadius: '8px', background: '#4f8cff', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        Închide
                    </button>
                </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}