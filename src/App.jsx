import { useCallback, useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState("8");
  const [charAllowed, setcharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [copied, Setcopied] = useState(false);

  const passwordref = useRef(null);

  const generatepassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*";
    for (let index = 1; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatepassword();
  }, [length, numberAllowed, charAllowed]);

  const Copypassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      Setcopied(true);
      setTimeout(() => {
        Setcopied(false)}, 2000);
      });
    };
    //  passwordref.current.select()

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-red-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="mb-4">
          <div className="flex shadow rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 bg-amber-200"
              placeholder="Password"
              readOnly
              ref={passwordref}
            />
            <button
              onClick={Copypassword}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              copy
            </button>
          </div>
          {copied && (
            <p className="text-orange-600 text-sm mt-2">
              ✅Password copied from clipboard!
            </p>
          )}
        </div>
        <div className="flex text-5m gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
