import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { connect } from "react-redux";
function App() {
  return (
    <div className="App">
      <Home />
      {/* <Footer/> */}
    </div>
  );
}
export default App;
