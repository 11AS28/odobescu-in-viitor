import '../components_css/welcomeComp.css';

function Welcome() {
  return (
    <div className="hero">
      <h1>Odobescu in era digitala 🚀</h1>
      <p>Unde inovația și tradiția se întâlnesc 💡</p>
      <a href="https://cnodobescu.ro/"><button>Descoperă mai mult despre liceu</button></a>
      <br />
      <h2>Unde ne găsești?</h2>
      <br />
    

       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1189.4501559647858!2d24.879408632864404!3d44.841827927458525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2bceaa51e9759%3A0x8e58569589382e7a!2sColegiul%20Na%C8%9Bional%20Alexandru%20Odobescu!5e0!3m2!1sen!2sro!4v1762035506398!5m2!1sen!2sro" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default Welcome;
