import { auth, login, logout } from "../folos/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginButton() {
  const [user] = useAuthState(auth);

  return user ? (
    <div>
      <span>Salut, {user.displayName} 👋</span>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <button onClick={login}>Login cu Google</button>
  );
}
