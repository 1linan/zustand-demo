import React from "react";
import "./App.css";
import { Books } from "./components/books";
import { Colors, Person } from "./components/color/index";

function App() {
  return (
    <div className="App">
      <Colors />
      <Person />
      <Books />
    </div>
  );
}

export default App;
