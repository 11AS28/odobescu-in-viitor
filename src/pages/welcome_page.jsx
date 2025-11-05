import Welcome from '../componente/welcome';
import Nav from '../componente/nav';
import Footer from '../componente/footer';
import LoginButton from '../componente/loginbutton';


function WelcomePage() {

  return (
    <div>
      <Nav />
      <Welcome />
      <LoginButton/>
      <Footer/>
    </div>
  );
}

export default WelcomePage;
