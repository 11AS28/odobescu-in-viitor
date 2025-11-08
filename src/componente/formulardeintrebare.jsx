import { useState } from "react";
import { db } from "../folos/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function QuestionForm() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validare nume
    if (!name.trim()) {
      setError("❌ Trebuie să introduci un nume.");
      return;
    }

    // Validare format clasa (ex: 9A, 10b, 12H)
    const classRegex = /^(9|10|11|12)[A-Ha-h]$/;
    if (!classRegex.test(className.trim())) {
      setError("❌ Clasa trebuie să fie între 9A și 12H (ex: 10b).");
      return;
    }

    // Validare text întrebare
    if (!text.trim()) {
      setError("❌ Trebuie să scrii o întrebare.");
      return;
    }

    setError(""); // resetăm eroarea dacă totul e ok

    try {
      await addDoc(collection(db, "questions"), {
        author: name.trim(),
        class: className.trim().toUpperCase(),
        text: text.trim(),
        wordCount,
        charCount,
        answers: [],
        createdAt: serverTimestamp(),
      });

      // Resetare formular după trimitere
      setName("");
      setClassName("");
      setText("");
      alert("✅ Întrebarea ta a fost trimisă!");
    } catch (error) {
      console.error("Eroare la trimiterea întrebării:", error);
      alert("❌ A apărut o eroare. Încearcă din nou!");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 rounded-2xl shadow-md max-w-lg mx-auto bg-transparent"
    >
      <h2 className="text-xl font-semibold mb-4 text-white">🧑‍🎓 Pune o întrebare!</h2>

      {error && (
        <div className="mb-3 text-red-400 font-medium">{error}</div>
      )}

      <input
        type="text"
        placeholder="Nume (obligatoriu)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-white/50 p-3 mb-3 rounded-lg bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        placeholder="Clasa (ex: 9A)"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="w-full border border-white/50 p-3 mb-3 rounded-lg bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        placeholder="Scrie întrebarea ta..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full border border-white/50 p-3 mb-3 rounded-lg bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
      />

      <div className="text-sm text-white/70 mb-3">
        {wordCount} cuvinte • {charCount} caractere
      </div>

      <button 
        type="submit"
        disabled={!text.trim()}
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trimite
      </button>
    </form>
  );
}
