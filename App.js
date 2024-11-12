import React, { useState } from 'react';
import './App.css';

const morseCodeDictionary = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
  K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/'
};

const textFromMorse = Object.fromEntries(
  Object.entries(morseCodeDictionary).map(([key, value]) => [value, key])
);

function App() {
  const [text, setText] = useState('');
  const [morseCode, setMorseCode] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleTextChange = (e) => {
    const input = e.target.value.toUpperCase();
    setText(input);

    const convertedToMorse = input
      .split('')
      .map((char) => morseCodeDictionary[char] || '')
      .join(' ');

    setMorseCode(convertedToMorse);
  };

  const handleMorseChange = (e) => {
    const input = e.target.value.trim();
    setMorseCode(input);

    const convertedBackText = input
      .split(' / ')
      .map(word =>
        word.split(' ').map(code => textFromMorse[code] || '').join('')
      )
      .join(' '); 
    
    setDecodedText(convertedBackText);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text and Morse Code Converter</h1>
        
        <div>
          <h2>Text to Morse Code</h2>
          <input
            type="text"
            placeholder="Enter text to convert to Morse code"
            value={text}
            onChange={handleTextChange}
            className="text-input"
          />
          <p>Morse Code Output:</p>
          <div className="morse-output">{morseCode}</div>
        </div>

        <div>
          <h2>Morse Code to Text</h2>
          <textarea
            placeholder="Enter Morse code to convert to text (use '/' between words)"
            value={morseCode}
            onChange={handleMorseChange}
            className="text-input"
            rows="4"
          />
          <p>Decoded Text Output:</p>
          <div className="decoded-output">{decodedText}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
