import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>React + Spring Boot Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;