import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot, deleteDoc, updateDoc, query } from "firebase/firestore";
// ❗ ATENȚIE: Asigură-te că importezi ambele baze de date (db pentru întrebări, db2 pentru capsulă)
import { db, db2 } from "../folos/firebase.js"; 

// --- Componenta pentru administrarea Mesajelor din Capsulă ---
function CapsulaAdminSection() {
    const [capsulaMessages, setCapsulaMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Interogare pentru colecția "mesaje" folosind db2
        const capsulaRef = collection(db2, "mesaje");
        
        const unsubscribe = onSnapshot(capsulaRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            
            // Sortăm mesajele cele mai noi la început
            const sortedData = data.sort((a, b) => {
                if (a.timestamp > b.timestamp) return -1;
                if (a.timestamp < b.timestamp) return 1;
                return 0;
            });

            setCapsulaMessages(sortedData);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleDeleteCapsula = async (messageId) => {
        if (window.confirm("Ești SIGUR că vrei să ștergi acest mesaj din capsula timpului?")) {
            try {
                // Ștergem din colecția "mesaje" (folosind db2)
                await deleteDoc(doc(db2, "mesaje", messageId));
                console.log("Mesaj capsulă șters:", messageId);
            } catch (error) {
                console.error("Eroare la ștergerea mesajului din capsulă:", error);
                alert("Eroare la ștergere! Verificați permisiunile.");
            }
        }
    };

    if (loading) return <div className="p-4 text-gray-400">Se încarcă mesajele din capsulă...</div>;

    return (
        <div className="mt-8 pt-6 border-t border-gray-600">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">⏳ Mesaje Capsula Timpului ({capsulaMessages.length})</h2>
            
            {capsulaMessages.length === 0 ? (
                <p className="text-gray-400">Nu există mesaje în capsula timpului.</p>
            ) : (
                <div className="space-y-4">
                    {capsulaMessages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-lg bg-gray-800 shadow-md border-l-4 border-cyan-500">
                            <p className="text-sm text-gray-400 mb-2">ID: {msg.id}</p>
                            
                            {msg.msj && (
                                <p className="text-lg font-medium text-white break-words">Mesaj: {msg.msj}</p>
                            )}
                            
                            {msg.poze && (
                                <div className="mt-3">
                                    <p className="text-sm text-cyan-300 mb-1">Poză:</p>
                                    <a href={msg.poze} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                                        Vezi Imaginea
                                    </a>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-3">Trimis la: {new Date(msg.timestamp).toLocaleString('ro-RO')}</p>

                            <button
                                onClick={() => handleDeleteCapsula(msg.id)}
                                className="mt-3 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                            >
                                Șterge Mesajul 🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
// --- SFÂRȘIT CapsulaAdminSection ---


// --- COMPONENTA PRINCIPALĂ ADMINPAGE.JS ---
export default function AdminPage() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Încărcarea tuturor Întrebărilor în timp real (Codul tău existent)
    useEffect(() => {
        const questionsRef = collection(db, "questions");
        const unsubscribe = onSnapshot(questionsRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            
            const sortedData = data.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });

            setQuestions(sortedData);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // 1. Funcționalitatea de Ștergere (Codul tău existent)
    const handleDelete = async (questionId) => {
        if (window.confirm("Ești SIGUR că vrei să ștergi această întrebare și toate răspunsurile sale? Această acțiune este permanentă.")) {
            try {
                await deleteDoc(doc(db, "questions", questionId));
                console.log("Întrebare ștearsă:", questionId);
            } catch (error) {
                console.error("Eroare la ștergere:", error);
                alert("Eroare la ștergere! Verificați permisiunile.");
            }
        }
    };

    // 2. Funcționalitatea de Fixare (Pin/Unpin) (Codul tău existent)
    const handlePin = async (questionId, currentPinStatus) => {
        try {
            await updateDoc(doc(db, "questions", questionId), {
                isPinned: !currentPinStatus, 
            });
        } catch (error) {
            console.error("Eroare la fixare:", error);
            alert("Eroare la fixare! Verificați permisiunile.");
        }
    };

    // 3. Funcționalitatea de Top 5 (Podium) (Codul tău existent)
    const handleTop5 = async (questionId, currentTop5Status) => {
        try {
            await updateDoc(doc(db, "questions", questionId), {
                isTop5: !currentTop5Status,
            });
        } catch (error) {
            console.error("Eroare la setarea Top 5:", error);
            alert("Eroare la setarea Top 5! Verificați permisiunile.");
        }
    };


    if (loading) return (
        <div className="p-8 text-white text-center bg-gray-900 min-h-screen">Se încarcă Panoul de Administrare...</div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto text-white min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-yellow-400">👑 Admin Dashboard</h1>
            <p className="mb-6 text-sm text-gray-400">
                Atenție: Această pagină permite ștergerea definitivă a datelor. Utilizați cu precauție!
            </p>
            
            {/* 1. Secțiunea pentru Mesajele din Capsulă (Componenta NOUĂ) */}
            <CapsulaAdminSection />
            
            <div className="mt-8 pt-6 border-t border-gray-600">
                <h2 className="text-2xl font-bold mb-4 text-yellow-400">❓ Întrebările elevilor ({questions.length})</h2>
                <p className="mb-6 text-sm text-gray-400">Administrare Pin / Top 5 / Ștergere întrebări publice.</p>
            </div>
            
            {/* 2. Secțiunea pentru Întrebările Publice (Codul tău de mapare) */}
            {questions.map((q) => (
                <div key={q.id} 
                     className={`p-4 rounded-xl mb-4 shadow-xl transition-all duration-300
                                 ${q.isTop5 
                                    ? 'bg-purple-900/70 border-2 border-purple-400' 
                                    : q.isPinned 
                                        ? 'bg-yellow-900/50 border-2 border-yellow-500' 
                                        : 'bg-gray-700/50'}`}>
                    
                    <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-lg leading-snug">{q.text}</p>
                        {q.isTop5 && <span className="text-purple-400 text-xl ml-4">🏆</span>}
                        {q.isPinned && !q.isTop5 && <span className="text-yellow-400 text-xl ml-4">📌</span>}
                    </div>
                    
                    <p className="text-xs text-gray-300">
                        Autor: {q.author} ({q.class}) • ID Intrebare: {q.id}
                    </p>
                    <p className="text-xs mt-1 text-gray-400">Răspunsuri: {q.answers?.length || 0}</p>
                    
                    <div className="mt-3 space-x-3 border-t border-gray-600 pt-3 flex flex-wrap gap-2">
                        
                        {/* Buton Top 5 (Podium) */}
                        <button
                            onClick={() => handleTop5(q.id, q.isTop5)}
                            className={`px-3 py-1 rounded text-sm font-semibold transition-colors 
                                        ${q.isTop5 ? 'bg-gray-500 hover:bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            {q.isTop5 ? "Desfa Top 5 ⬇️" : "Setează Top 5 🏆"}
                        </button>

                        {/* Buton Fixare/Pin */}
                        <button
                            onClick={() => handlePin(q.id, q.isPinned)}
                            className={`px-3 py-1 rounded text-sm font-semibold transition-colors 
                                        ${q.isPinned ? 'bg-gray-500 hover:bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                            {q.isPinned ? "Despin ⬇️" : "Pin Sus 📌"}
                        </button>

                        {/* Buton Ștergere */}
                        <button
                            onClick={() => handleDelete(q.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                            Șterge 🗑️
                        </button>
                    </div>
                    {/* Afișare rapidă răspunsuri */}
                    {q.answers && q.answers.length > 0 && (
                        <div className="mt-4 p-2 bg-gray-800 rounded-lg max-h-40 overflow-y-auto">
                            <h4 className="text-sm font-semibold text-gray-400 mb-1">Răspunsuri ({q.answers.length}):</h4>
                            {q.answers.map(a => (
                                <p key={a.id} className="text-xs text-gray-200 truncate">
                                    {a.author}: {a.text} ({a.likes || 0} ❤️)
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}