import { useEffect, useState } from "react";
import { db, auth } from "../folos/firebase";
import { collection, doc, onSnapshot, updateDoc, setDoc, getDoc } from "firebase/firestore";
import AnswerForm from "./AnswerForm";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
    });
    return unsubscribe;
  }, []);

  const handleLike = async (questionId, answerIndex) => {
    const user = auth.currentUser;
    if (!user) return alert("Trebuie să fii logat!");

    const likeRef = doc(db, "questions", questionId, "answers", `answer${answerIndex}`, "likes", user.uid);
    const snap = await getDoc(likeRef);

    if (snap.exists()) {
      alert("Ai dat deja like!");
      return;
    }

    await setDoc(likeRef, { likedAt: Date.now() });

    const question = questions.find((q) => q.id === questionId);
    const updatedAnswers = [...question.answers];
    updatedAnswers[answerIndex].likes = (updatedAnswers[answerIndex].likes || 0) + 1;

    await updateDoc(doc(db, "questions", questionId), {
      answers: updatedAnswers,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">💬 Întrebările bobocilor</h2>

      {questions.map((q) => (
        <div key={q.id} className="p-4 rounded-2xl mb-4 shadow-md bg-white/10 backdrop-blur-md">
          <p className="font-medium text-white">{q.text}</p>
          <p className="text-sm text-white/70 mt-1">
            — {q.author} ({q.class})
          </p>

          <div className="mt-3 pl-3 border-l-2 border-white/30">
            {q.answers && q.answers.length > 0 ? (
              q.answers.map((a, idx) => (
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
              ))
            ) : (
              <p className="text-sm text-white/50">
                Nimeni nu a răspuns încă 😅
              </p>
            )}
          </div>

          <AnswerForm questionId={q.id} />
        </div>
      ))}
    </div>
  );
}
