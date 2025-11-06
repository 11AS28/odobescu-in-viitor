import Welcome from '../componente/welcome';
import Nav from '../componente/nav';
import Footer from '../componente/footer';



function WelcomePage() {

  return (
    <div>
      <Nav />
      <Welcome />
       <div style={{ textAlign: "center", margin: "30px 0" }}>
      <iframe
        title="Anime Classroom"
        src="https://sketchfab.com/models/b2098b3be51a49a38d785bca047277ac/embed"
        width="100%"
        height="600"
        allowFullScreen
        style={{ border: "none", borderRadius: "12px" }}
      ></iframe>
    </div>
      <Footer/>
    </div>
  );
}

export default WelcomePage;
