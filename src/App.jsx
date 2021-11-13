import { useState, useRef, useEffect } from "react";

// Styles
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";

const theme = {
  colors: {
    lightBlack: "#414344",
    mediumBlack: "#363636",
    black: "#26272C",
    white: "#A8A7A9",
    lightWhite: "#e0e0e0",
    borderColor: "rgba(168,167,169, 0.3)",
    focusColor: "#A8A7A9",
  },
  fonts: {
    main: "Lato, sans-serif",
    detail: "Times New Roman, Times, serif",
  },
};

const Main = styled.div`
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    padding: 30px;
    height: 100%;

    h1,
    h3 {
      text-transform: uppercase;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.lightBlack};
      width: 150px;
      padding: 16px;
      cursor: pointer;
      transition: background-color 300ms, opacity 700ms;
      border-radius: 5px;

      svg {
        path,
        rect {
          stroke: ${({ theme }) => theme.colors.white};
        }
      }
      p {
        margin-left: 6px;
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.mediumBlack};
      }
    }

    h1 {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.white};
      text-align: left;
    }

    // Letters
    .letters-container {
      margin-top: 80px;

      .letters {
        margin-top: 20px;

        display: flex;
        flex-wrap: wrap;

        .letter {
          .initial,
          .custom {
            border: 1px solid ${({ theme }) => theme.colors.borderColor};
            border-radius: 3px;
            padding: 16px;
            margin: 8px;
            text-transform: lowercase;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .initial {
          }
          .custom {
            text-align: center;
            background-color: ${({ theme }) => theme.colors.mediumBlack};
            color: ${({ theme }) => theme.colors.white};
            transition: background-color 300ms, border-color 300ms;

            &:focus {
              outline: none !important;
              border-color: ${({ theme }) => theme.colors.focusColor};
              background-color: ${({ theme }) => theme.colors.lightBlack};
            }
          }
        }
      }
      .controls {
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-left: 8px;
        .save {
          margin-right: 16px;
        }
        .reset {
          svg {
            height: 24px;
            path {
              fill: ${({ theme }) => theme.colors.white};
            }
          }
          &:active {
            opacity: 0.2;
          }
        }
      }
    }

    // Texts
    .texts {
      display: flex;

      margin-top: 100px;

      textarea {
        height: 500px;

        margin-top: 20px;
        padding: 8px;
        border: 1px solid ${({ theme }) => theme.colors.borderColor};
        background-color: ${({ theme }) => theme.colors.lightBlack};
        width: 100%;
        font-family: "Roboto", sans-serif;
        color: ${({ theme }) => theme.colors.white};
        resize: none;
        &:focus {
          outline: none !important;
          border-color: ${({ theme }) => theme.colors.focusColor};
        }
      }
      .input {
        flex: 1;
        flex-shrink: 1;
        margin: 0 8px;

        textarea {
          background-color: ${({ theme }) => theme.colors.mediumBlack};
          transition: background-color 300ms, border-color 500ms;

          &:focus {
            background-color: ${({ theme }) => theme.colors.lightBlack};
          }
        }
      }
      .output {
        flex: 1;
        flex-shrink: 0;

        margin: 0 8px;
        .output-el {
          color: lightgray;
          background-color: ${({ theme }) => theme.colors.black};
        }
      }
    }
    .controls {
      .copy {
        margin-top: 20px;
        margin-left: auto;
      }
    }
  }

  footer {
    margin-top: 15px;
    margin-left: 8px;
    font-size: 12px;
    opacity: 0.6;
    a {
      transition: color 400ms;
      &:hover {
        color: white;
      }
    }
  }
`;

function App() {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const textInput = useRef();
  const newLetters = useRef([]);

  const [newAlphabet, setNewAlphabet] = useState(alphabet);
  const [textTraduit, setTextTraduit] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Load items
  useEffect(() => {
    let newAlphabetStore = localStorage.getItem("newAlphabet", newAlphabet);
    if (!newAlphabetStore) return;

    newAlphabetStore = newAlphabetStore.split(",");

    setNewAlphabet(newAlphabetStore);
  }, []);

  useEffect(() => {
    handleChangeText();
  }, [newAlphabet]);

  const handleChangeAlphabet = (e) => {
    setIsSaved(false);

    const index = parseInt(e.target.dataset.index);
    const value = e.target.value.toLowerCase();
    setNewAlphabet((letters) => letters.map((letter, i) => (i === index ? value : letter)));
  };

  const handleChangeText = (e) => {
    setIsCopied(false);

    const text = textInput.current.value;
    // Reset
    if (!text) {
      setTextTraduit("");
      return;
    }

    const arrText = text.match(/\n|\s|\S/gm);
    let result = [];

    arrText.forEach((letter) => {
      let newLetter = null;
      const letterWithBreakLine = letter.charCodeAt() === 10 ? "BREAKLINE" : letter;

      const indexOriginLetter = alphabet.indexOf(letterWithBreakLine);
      const indexOriginLetterMaj = alphabet.indexOf(letterWithBreakLine.toLowerCase());

      if (newAlphabet[indexOriginLetter]) {
        newLetter = newAlphabet[indexOriginLetter];
      } else if (newAlphabet[indexOriginLetterMaj]) {
        newLetter = newAlphabet[indexOriginLetterMaj].toUpperCase();
      } else if (letterWithBreakLine === "BREAKLINE") {
        newLetter = "\r\n";
      } else {
        newLetter = letterWithBreakLine;
      }
      result.push(newLetter);
    });
    result = result.join("");
    setTextTraduit(result);
  };

  // Save
  const handleSave = () => {
    localStorage.setItem("newAlphabet", newAlphabet);
    setIsSaved(true);
  };

  // Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(textTraduit);
    setIsCopied(true);
  };

  // Reset
  const handleReset = () => {
    textInput.current.value = "";
    setTextTraduit("");
    setNewAlphabet(alphabet);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Main>
        <div className="container">
          <h1>Code • Langue Inventée</h1>

          <div className="letters-container">
            <h3>Lettres d'entrée</h3>
            <div className="letters">
              {alphabet.map((letter, index) => (
                <div className="letter" key={index}>
                  <div className="initial">{letter}</div>
                  <input
                    className="custom"
                    data-index={index}
                    onChange={handleChangeAlphabet}
                    size="5"
                    minLength="1"
                    maxLength="5"
                    placeholder={letter}
                    ref={(el) => (newLetters.current[index] = el)}
                    value={newAlphabet[index]}
                  />
                </div>
              ))}
            </div>
            <div className="controls">
              <button className="save" onClick={handleSave} style={{ opacity: isSaved ? 0.5 : 1 }}>
                <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    fill="none"
                    stroke="#e0e0e0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 21v-8H7v8M7 3v5h8"
                  />
                </svg>
                {isSaved ? <p>sauvegardé</p> : <p>sauvegarder</p>}
              </button>
              <button className="reset" onClick={handleReset}>
                <svg data-name="Layer 1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64 256H34a222 222 0 0 1 396-137.85V85h30v105H355v-30h67.27A192.21 192.21 0 0 0 256 64C150.13 64 64 150.13 64 256Zm384 0c0 105.87-86.13 192-192 192a192.21 192.21 0 0 1-166.27-96H157v-30H52v105h30v-33.15A222 222 0 0 0 478 256Z" />
                </svg>
                <p>Reset</p>
              </button>
            </div>
          </div>

          <div className="texts">
            <div className="input">
              <h3>Texte à traduire</h3>
              <textarea ref={textInput} onChange={handleChangeText} placeholder="Entrer son texte..."></textarea>
            </div>
            <div className="output">
              <h3>Texte traduit</h3>
              <textarea className="output-el" value={textTraduit} disabled />

              <div className="controls">
                <button className="copy" onClick={handleCopy} style={{ opacity: isCopied ? 0.5 : 1 }}>
                  <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      fill="none"
                      height="13"
                      rx="2"
                      ry="2"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="13"
                      x="9"
                      y="9"
                    />
                    <path
                      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  {isCopied ? <p>copié</p> : <p>copier</p>}
                </button>
              </div>
            </div>
          </div>
          <footer>
            - développé par{" "}
            <a href="https://romanjeanelie.com/" target="_blank">
              Roman Jean-Elie
            </a>
          </footer>
        </div>
      </Main>
    </ThemeProvider>
  );
}

export default App;
