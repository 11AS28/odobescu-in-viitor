import Welcome from '../componente/welcome';
import Nav from '../componente/nav';
import Footer from '../componente/footer';




function WelcomePage() {

  return (
    <div>
      <Nav />
             
      <Welcome />
       <div style={{ textAlign: "center", margin: "30px 0" }}>
   

    </div>
      <Footer/>
    </div>
  );
}

export default WelcomePage;
