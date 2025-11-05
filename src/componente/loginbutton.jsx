import { login } from "../folos/firebase2"; // folosește funcția login exportată
import { db } from "../folos/firebase2";
import { doc, setDoc, getDoc } from "firebase/firestore";

function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await login(); // popup Google
      const user = result.user;

      // Crează user în Firestore dacă nu există deja
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString() // stochează data
        });
      }

      alert(`Salut, ${user.displayName}! Ai fost logat cu succes.`);
    } catch (err) {
      console.error("Eroare login:", err);
      alert("Login-ul a eșuat. Verifică consola pentru detalii.");
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Login cu Google
    </button>
  );
}

export default LoginButton;
