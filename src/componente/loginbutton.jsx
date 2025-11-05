import { loginWithGoogle } from "../folos/firebase2";

function LoginButton() {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("User logat:", user);
      // poți salva user-ul în Firestore dacă vrei
    } catch (error) {
      alert("Eroare la login, verifică console-ul");
    }
  };

  return <button onClick={handleLogin}>Login cu Google</button>;
}

export default LoginButton;
