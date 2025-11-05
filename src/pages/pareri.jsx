import React from "react";
import Nav from "../componente/nav";

import Footer from "../componente/footer";
import FormularPareri from "../componente/formularpareri";
import QuestionForm from "../componente/formulardeintrebare";
import QuestionList from "../componente/formulardetot";
import AnswerForm from "../componente/AnswerForm";
  
function Pareri() {
  return (
    <div>
      <Nav />

    

       
      
      <QuestionForm/>
      <QuestionList/>
      <br />
      <br />
      {/*<FormularPareri/> 
      */}
      <Footer/>
    </div>
  );
};

export default Pareri;