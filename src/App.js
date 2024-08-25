import { useState } from "react";
import FrontPage from "./Components/FrontPage";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login";
import { ThemeContext } from "./Context/ThemeContext";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./Components/Register";
import TaskManager from "./Components/TaskManager";

function App() {

  const [fontcolor, setFontcolor] = useState("black")
    const [bodycolor, setBodycolor] = useState("white")
    const [headercolor, setHeadercolor] = useState("red")
    const [buttoncolor, setButtoncolor] = useState("red")
    const [border, setBorder] = useState("rgb(0, 249, 166)")
    const [thead, setThead] = useState("aquamarine")

    function changetheme(){
    if(bodycolor === "white"){
        setBodycolor("#55679C")
        setButtoncolor("white")
        setFontcolor("white")
        setHeadercolor("#55679C")
        setBorder("white")
        setThead("white")
    }
    else{
        setBodycolor("white")
        setButtoncolor("red")
        setFontcolor("black")
        setHeadercolor("red")
        setBorder("rgb(0, 249, 166)")
        setThead("aquamarine")
    }
    }
  return (
    <div className="App">
      <ThemeContext.Provider value={{changetheme, fontcolor, bodycolor, headercolor, buttoncolor}}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/taskmanager" element={<TaskManager/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
