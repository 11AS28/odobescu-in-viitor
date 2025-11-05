import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../folos/firebase2";
import { doc, setDoc, getDoc } from "firebase/firestore";

function LoginButton() {
  const login = async () => {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: Date.now()
      });
    }
  };

  return (
    <button onClick={login}>
      Login cu Google
    </button>
  );
}

export default LoginButton;
