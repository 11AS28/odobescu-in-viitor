import React from "react";
import '../components_css/timeline.css';
import Slideshow from "./slideshow";


function Timeline() {

    const imagesTrecut = [
        "liceu/fatzada.jpg",
        "liceu/hol.jpg",
        "liceu/images.jpg"
    ];

    const images100Ani = [
        "liceu/100ani.jpeg",
        "liceu/100_2.jpeg",
        "liceu/100_3.jpg"
    ];

    const imagesPrezent = [
        "liceu/fatada_prezent.webp",
        "liceu/prez2.jpg",
        "liceu/prez3.jpg"
    ];

    const imagesViitor = [
        "liceu/viitor1.jpg",
        "liceu/viitor2.jpg",
        "liceu/viitor3.jpg",
        "liceu/viitor4.jpg"
    ];



    return (
        <section className="timeline">
  <h2>Evoluția Colegiului</h2>

  <div className="timeline-container">
    <div className="timeline-item">
      <div className="timeline-content">
        <h3>Trecut</h3>
        <p>Fondarea colegiului și primele generații de elevi pasionați de știință și cultură.</p>
        <span className="timeline-date">10 nov 1919  - 2012</span>
        <br />
        <br />
        <Slideshow images={imagesTrecut} interval={5000}/>
      </div>
    </div>


 <div className="timeline-item">
      <div className="timeline-content">
        <h3>100 de ani de excelență</h3>
        <p>Celebrăm un secol de educație de calitate, formând liderii de mâine.</p>
        <span className="timeline-date">7 nov 2019</span>
        <br />
        <br />
        <Slideshow images={images100Ani} interval={5000}/>
      </div>
    </div>




    <div className="timeline-item">
      <div className="timeline-content">
        <h3>Prezent</h3>
        <p>Odobescu digital — elevi conectați, proiecte moderne, educație în pas cu tehnologia.</p>
        <span className="timeline-date">2012  - {new Date().getFullYear()}</span>
        <br />
        <br />
        <Slideshow images={imagesPrezent} interval={5000}/>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-content">
        <h3>Viitor</h3>
        <p>Laboratoare inteligente, realitate augmentată, AI în învățare și inovație continuă.</p>
        <span className="timeline-date">{new Date().getFullYear()} - </span>
        <br />
        <br />
        <Slideshow images={imagesViitor} interval={5000}/>
      </div>
    </div>

  
   
   




  </div>
</section>

    );
}

export default Timeline;