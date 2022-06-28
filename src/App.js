import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NotesState";
import Alert from "./components/Alert";
import SignUp from "./components/signup";
import Login from "./components/login";
import { useState } from "react";

function App(props) {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <div className="container my-3"> <Alert alert = {alert}/></div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="signup" element={<SignUp showAlert={showAlert}/>} />
              <Route path="login" element={<Login showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

//context API
// react app is made with the combination of 1. States and 2. Components.
//Use context is used to make a state which can be used in any component of the app. vid 57/78
