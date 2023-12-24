import React, { useState } from "react";
import LengthInput from "./LengthInput";
import InputChecker from "./InputChecker";
import "./Style/main.css";
import PasswordList from "./PasswordList";

export default function Main() {
  const [rangeValue, setRangeValue] = useState(+8);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [initialPassword, setNewPassword] = useState("Refresh to get password");

  const [passHistory, setPasswordHistory] = useState(
    JSON.parse(localStorage.getItem("PasswordHistory"))
  );

  function generatePassword() {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]<>?/";

    let availableChars = "";
    let password = "";

    if (upperCase) {
      availableChars += uppercaseChars;
    }
    if (lowerCase) {
      availableChars += lowercaseChars;
    }
    if (digits) {
      availableChars += digitChars;
    }
    if (symbols) {
      availableChars += symbolChars;
    }
    if (!availableChars) {
      alert("Select atlease 1 checkbox");
      return;
    }
    for (let i = 0; i < rangeValue; i++) {
      let randomIndex = Math.floor(Math.random() * availableChars.length);

      password += availableChars.charAt(randomIndex);
    }

    setNewPassword(password);
    saveHistory(password);
  }

  function saveHistory(password) {
    const history = [
      ...passHistory,
      {
        id: "his" + Date.now(),
        password: password,
      },
    ];

    localStorage.setItem("PasswordHistory", JSON.stringify(history));
    const newHistory = localStorage.getItem("PasswordHistory");
    console.log(newHistory);
    if (newHistory) {
      setPasswordHistory(JSON.parse(newHistory));
    }
  }

  function checkForUpper(e) {
    setUpperCase(e.target.checked);
  }
  function checkForLower(e) {
    setLowerCase(e.target.checked);
  }
  function checkForDigits(e) {
    setDigits(e.target.checked);
  }
  function checkForSymbols(e) {
    setSymbols(e.target.checked);
  }

  function handleRange(e) {
    setRangeValue(e.target.value);
  }

  function copyPassword(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (text === "Refresh to get password") {
          alert("Please generate the password first!");
        } else {
          alert("Text copied:" + text);
        }
      })
      .catch((error) => {
        alert("something went wrong");
      });
  }

  function deleteAllHistory() {
    setPasswordHistory([]);
    localStorage.setItem("PasswordHistory", JSON.stringify([]));
  }
  function deleteItem(id){
    const historyPass = [
      ...passHistory
    ];
    const newHistory = historyPass.filter((ele)=> ele.id != id);
    localStorage.setItem("PasswordHistory", JSON.stringify(newHistory));
    const updatedHistory = localStorage.getItem("PasswordHistory");
    if (updatedHistory) {
      setPasswordHistory(JSON.parse(updatedHistory));
    }
  }
  
  return (
    <>
      <main className="main">
        <section className="main-inner">
          <div className="left-main">
            <h2>
              <img
                src="https://previews.123rf.com/images/robertgoudappel/robertgoudappel1808/robertgoudappel180800063/105673417-hand-written-vector-logo-letter-a-a-letter-design-vector.jpg"
                alt=""
              />{" "}
              ARYA PASSWORD GENERATOR
            </h2>
            <div className="new-password-container">
              <p className="new-pass">{initialPassword}</p>
              <button className="refresh-btn" onClick={generatePassword}>
                <i class="fa-solid fa-key"></i>
              </button>
            </div>
            <div
              className="clipboard-container"
              onClick={() => copyPassword(initialPassword)}
            >
              <i class="fa-solid fa-copy"></i>COPY PASSWORD
            </div>
            <div className="scrollable-input-container">
              <LengthInput
                handleRange={(e) => handleRange(e)}
                initialRange={rangeValue}
              />
            </div>
            <div className="checker-container">
              <InputChecker
                content="Uppercase"
                func={(e) => checkForUpper(e)}
              />
              <InputChecker
                content="Lowercase"
                func={(e) => checkForLower(e)}
              />
              <InputChecker content="Digits" func={(e) => checkForDigits(e)} />
              <InputChecker
                content="Symbols"
                func={(e) => checkForSymbols(e)}
              />
            </div>
          </div>

          <div className="right-main">
            <h3>
              PASSWORD HISTORY{" "}
              
            </h3>
            <ul className="password-container">
              {passHistory != null
                ? passHistory.map((ele) => (
                    <PasswordList
                      key={ele.id}
                      {...ele}
                      copyFunc={() => copyPassword(ele.password)}
                      deleteItem={()=>deleteItem(ele.id)}
                    />
                  ))
                : setPasswordHistory([])}

                <li><div className="delete-history" onClick={deleteAllHistory}>
                <i class="fa-solid fa-trash"></i> Delete All
              </div></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
