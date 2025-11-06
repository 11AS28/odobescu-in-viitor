import { useEffect, useState } from "react";
import { db } from "../folos/firebase";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import AnswerForm from "./AnswerForm";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showModalId, setShowModalId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
    });
    return unsubscribe;
  }, []);

  const handleLike = async (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);
    const updatedAnswers = [...question.answers];

    // previne spam de like-uri (localStorage)
    const key = `${questionId}-answer-${answerIndex}`;
    if (localStorage.getItem(key)) {
      alert("Ai dat deja like la răspunsul ăsta 😅");
      return;
    }
    localStorage.setItem(key, "true");

    updatedAnswers[answerIndex].likes = (updatedAnswers[answerIndex].likes || 0) + 1;

    await updateDoc(doc(db, "questions", questionId), {
      answers: updatedAnswers,
    });

    // update local, instant
    setQuestions(prev =>
      prev.map(q => q.id === questionId ? { ...q, answers: updatedAnswers } : q)
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

      {questions.map((q) => (
        <div key={q.id} className="p-4 rounded-2xl mb-4 shadow-md bg-white/10 backdrop-blur-md">
          <p className="font-medium text-white">{q.text}</p>
          <p className="text-sm text-white/70 mt-1">
            — {q.author} ({q.class}) • {formatDate(q.createdAt)}
          </p>

          <div className="mt-3 pl-3 border-l-2 border-white/30">
            {q.answers && q.answers.length > 0 ? (
              <>
                {q.answers
                  .slice()
                  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
                  .slice(0, 3)
                  .map((a, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center mb-2 rounded-xl p-2 bg-white/10"
                    >
                      <div>
                        <p className="text-sm text-white">
                          <strong>{a.author}:</strong> {a.text}
                        </p>
                      </div>
                      <button
                        onClick={() => handleLike(q.id, idx)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-500"
                      >
                        ❤️ {a.likes || 0}
                      </button>
                    </div>
                  ))}

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

          <AnswerForm questionId={q.id} />
        </div>
      ))}

      {showModalId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-lg w-full text-white max-h-[400px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Toate răspunsurile</h3>
            {questions
              .find(q => q.id === showModalId)
              .answers
              .sort((a, b) => (b.likes || 0) - (a.likes || 0))
              .map((a, idx) => (
                <div key={idx} className="mb-2 p-2 rounded-lg bg-white/10">
                  <p><strong>{a.author}:</strong> {a.text}</p>
                  <p className="text-red-400">❤️ {a.likes || 0}</p>
                </div>
              ))}
            <button
              onClick={() => setShowModalId(null)}
              className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
