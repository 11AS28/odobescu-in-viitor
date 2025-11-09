import "../components_css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()}  Alexandru Odobescu — Toate drepturile rezervate.</p>
      <p>Creat cu 💙 de<a href="https://www.instagram.com/emiiii.iiiii/">@Emi</a>si<a href="https://www.instagram.com/fane28.09/">@Fane</a></p>
    </footer>
  );
}


