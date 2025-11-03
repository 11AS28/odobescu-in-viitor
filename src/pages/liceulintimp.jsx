import React from 'react';
import Nav from '../componente/nav';
import Footer from '../componente/footer';
import '../pages_css/liceulintimp.css';

import Timeline from '../componente/timeline';



function LiceulInTimp() {
  return (
    <div>
      <Nav />
      <br />
      <h1>Liceul în Timp</h1>
    <Timeline />
    
      <Footer />
    </div>
  );
}
export default LiceulInTimp;