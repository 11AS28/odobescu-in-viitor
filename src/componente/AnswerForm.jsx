import { useState } from "react";
import { db } from "../folos/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function AnswerForm({ questionId, onClose }) {
  const [answer, setAnswer] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim()) {
      setError("❌ Trebuie să introduci un nume.");
      return;
    }

    if (!answer.trim()) {
      setError("❌ Trebuie să scrii un răspuns.");
      return;
    }
    
    // 💡 CORECȚIA CRITICĂ: Creăm un ID unic pentru răspuns.
    const newAnswer = {
        id: Date.now().toString(), // ID UNIC
        author: author.trim(), 
        text: answer.trim(), 
        likes: 0 
    };

    const questionRef = doc(db, "questions", questionId);
    
    // Folosim noul obiect newAnswer cu ID unic
    try {
        await updateDoc(questionRef, {
            answers: arrayUnion(newAnswer),
        });

        setAnswer("");
        setAuthor("");
        setError("");
        if (onClose) onClose(); // Închide formularul după trimitere
        
    } catch (e) {
        console.error("Eroare la adăugarea răspunsului:", e);
        setError("❌ Eroare la salvarea răspunsului.");
    }
  };

  return (
    <form className="mt-3 relative border p-3 rounded bg-white/10" onSubmit={handleSubmit}>
      
      {/* Buton X în colț */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold"
        >
          ×
        </button>
      )}

      {error && <p className="text-red-400 mb-1">{error}</p>}

      <input
        type="text"
        placeholder="Nume (obligatoriu)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-1 rounded w-full mb-1"
      />

      <textarea
        placeholder="Răspunde la întrebare..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-1 rounded w-full mb-1"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full mt-1"
      >
        Trimite răspuns
      </button>
    </form>
  );
}