import React from "react";

import Notes from "./NotesF";
// import noteContext from "../context/noteContext";



function Home(props) {

  return (

      <div className="container my-3">
      
      <Notes showAlert={props.showAlert}/>
     </div>
  );
}

export default Home;
