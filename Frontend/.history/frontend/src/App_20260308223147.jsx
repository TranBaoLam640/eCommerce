import { useState } from "react";

function App() {

  const login = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "admin3",
        password: "12345678"
      })
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);
    console.log("login success");
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  );
}

export default App;