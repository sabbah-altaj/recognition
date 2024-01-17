// Initializing Variables
let textarea = document.querySelector("#text");
let preparedText = document.querySelector(".textarea");

let toTextBtn = document.querySelector(".toSpeech button");
let toSpeechBtn = document.querySelector(".speak #speak");
let stop = document.querySelector(".speak #stop");

// Language
let readingLang = document.querySelector(".readingLang");

let language = document.querySelector(".language");
let languageValue = "";

language.addEventListener("change", (eve) => {
  languageValue = language.value;

  // ================================================
  // ================ SPEECH TO TEXT ================
  // ================================================
  toTextBtn.addEventListener("click", function () {
    let recognition = new webkitSpeechRecognition();

    // Language
    // English - Uncomment this to transcript to En
    // recognition.lang = "en-GB";

    // Arabic - Uncomment this to transcript to Ar
    // recognition.lang = "ar-SA";
    recognition.lang = languageValue;

    // Results
    recognition.onresult = (eve) => {
      // Write recognitioned text to (textarea)
      textarea.value = eve.results[0][0].transcript;
    };

    // Start recognition
    recognition.start();
  });
});

// ================================================
// ================ TEXT TO SPEECH ================
// ================================================

let val = "";
readingLang.addEventListener("change", (eve) => {
  val = readingLang.value;
  // console.log(val);
});

// Reading text
toSpeechBtn.addEventListener("click", (eve) => {
  // Remove whitespaces from the text
  let theText = preparedText.value;

  let utter = new SpeechSynthesisUtterance();
  utter.text = theText;

  if (readingLang.value == "ar") {
    utter.lang = "ar";
  } else {
    utter.lang = "en";
  }

  // The voice - change it by changing [0] to any number
  utter.voice = window.speechSynthesis.getVoices()[0];

  // Speak / Read
  window.speechSynthesis.speak(utter);
});

// Stop reading text
stop.addEventListener("click", (eve) => {
  let utter = new SpeechSynthesisUtterance();
  window.speechSynthesis.cancel();
});
