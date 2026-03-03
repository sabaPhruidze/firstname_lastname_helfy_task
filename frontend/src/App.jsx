import "./App.css";
import { useEffect } from "react";
import { getTasks } from "./services/api";
function App() {
  useEffect(() => {
    getTasks()
      .then((data) => console.log("Tasks", data))
      .catch((error) => console.error("error", error.message));
  }, []);
  return <div>checking if getTasks work</div>;
}

export default App;
