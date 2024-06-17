import { useState } from "react";
import "./App.css";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";
import { TokenContext } from "./TokenContext";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <TokenContext.Provider value={{ token, setToken }}>
        <SignUpForm />
        <Authenticate />
      </TokenContext.Provider>
    </>
  );
}

export default App;
