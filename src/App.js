import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Livre from "./livre";
import Ajout from "./ajout";
import Login from "./login";
import Signup from "./signup";
import Details from "./details";
import Edit from "./edit";

function App() {
  return (
    <div className="App">
      <header>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/livre" element={<Livre/>}/>
          <Route path="/add" element={<Ajout/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
