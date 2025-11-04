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
<br />
<br />

    <h2>Istoria</h2>
    <br />

    <p id='istorie'>Acum mai bine de un secol, prin 1919, la Pitești se deschidea o școală care avea să schimbe generații întregi — Școala Normală de Băieți, locul unde s-au format primii dascăli ai României Mari. Erau doar 134 de elevi la început, dar vibe-ul era clar: pasiune, educație și dorință de a construi ceva mare.

La doar un an după, în 1920, Regele Ferdinand I semna decretul care îi dădea școlii numele „Alexandru Odobescu”, în cinstea scriitorului și academicianului cu același nume. Asta n-a fost doar o formalitate — era începutul unei tradiții care avea să țină peste 100 de ani.

În 1922 a început construcția propriei clădiri, aproape de gară, pe strada Gheorghe Doja. Și acolo, printre bănci de lemn, manuale groase și profesori cu prestanță, s-a născut spiritul Odobescu. Până și fiica scriitorului, Ioana Dumitrescu, a venit în 1928 să doneze 800 de volume din biblioteca familiei — un gest care arată cât de mult conta educația și moștenirea culturală.

Timpul a trecut, și școala s-a transformat odată cu epocile: din Școală Normală de Băieți, a devenit Școală de Învățătoare, apoi Școală Pedagogică de Fete, iar în anii ’50, când totul se schimba în România, a prins o nouă identitate — Școală Medie Mixtă „Alexandru Odobescu”, adică un început pentru liceul de azi.

Anii ’60 au fost plini de mișcări — școala a tot fost mutată prin Pitești, până când, în 1973, s-a stabilit în locul actual, pe strada Pescarilor nr. 20, în cartierul Războieni. De atunci, aici a crescut o comunitate de elevi, profesori și absolvenți care au dus mai departe tradiția.

Prin anii ’70-’80, Odobescu s-a specializat în electrotehnică, fizică și matematică, fiind una dintre cele mai tari instituții tehnice din zonă. După Revoluție, în 1990, și-a recăpătat rădăcinile umaniste și a devenit Liceul Real-Umanist „Alexandru Odobescu”, apoi, în 1993, Liceul Teoretic.

Pe 10 noiembrie 1994, la aniversarea de 75 de ani, s-a decis ca acea dată să rămână „Ziua liceului” — moment în care s-a dezvelit bustul scriitorului Alexandru Odobescu, semn că tradiția și cultura rămân în centrul identității școlii.

După 2000, liceul a primit și titlul de Colegiu Național Liceal „Alexandru Odobescu”, iar din 2012 poartă numele actual: Colegiul Național „Alexandru Odobescu” Pitești.

Astăzi, locul ăsta nu e doar o clădire sau o istorie pe hârtie — e o familie de profesori și elevi care duc mai departe un secol de educație, ambiție și tradiție. Fiecare generație scrie o pagină nouă în povestea liceului, dar toate au același spirit: curiozitate, respect și dorință de a fi mai buni.</p>
       <Timeline />



      <Footer />
    </div>
  );
}
export default LiceulInTimp;