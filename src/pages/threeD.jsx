import React from "react";
import Nav from "../componente/nav";
import Footer from "../componente/footer";
import '../pages_css/threeD.css';

function ThreeD() {
  return (
    <div>
      <Nav />
      <br />
      <h1>Odobescu 3D Experience</h1>
      <h2>Explorează liceul nostru într-un mediu 3D captivant!</h2>
        <br />
      <h3>Sala de clasa</h3>
      <br />
      <iframe id="randare"
  title="VR ClassRoom April 2021"
  src="https://sketchfab.com/models/6256d3314d5a4bd081b35d1ddc86fcd6/embed"
  width="768px"
  height="600"


  allowFullScreen
  style={{ border: "none", borderRadius: "12px" }}
></iframe>
        <br />
  
        <br />
        <h3>Laboratorul de informatica</h3>
        <br />

<iframe id="randare"
  title="Computer (IT) Classroom 404 [Baked]"
  src="https://sketchfab.com/models/ea2a9c84515a449582c9501fce76daba/embed"
  width="768px"
  height="600"
  allow="autoplay; fullscreen; xr-spatial-tracking"
  allowFullScreen
  style={{
    border: "none",
    borderRadius: "12px"
  }}
></iframe>

<br />
        <br />
<h3>Laboratorul de biologie</h3>


 <iframe id="randare"
    title="School Lab"
    src="https://sketchfab.com/models/a97f74bfd83644858af7216f794504b6/embed"
    width="768px"
    height="600"
    allow="autoplay; fullscreen"
    allowFullScreen
    style={{
      border: "none",
      borderRadius: "12px",
      maxWidth: "1000px",
    }}
  ></iframe>


<br />
        <Footer />
    </div>
  );
}

export default ThreeD;
