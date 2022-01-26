const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]'); // wtf
const speakButton = document.querySelector("#speak"); // other way could be: document.getElementById
const stopButton = document.querySelector("#stop");

msg.text = document.querySelector('[name="text"]').value;

// populateVoice() is a function that retrieves all available voices for the device.
// Fill the dropdown with voices that includes voice spoken in 'en'
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    //.filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}
// Hello
function setVoice(e) {
  //  msg.voice = voices.find((voice) => voice.name === e.target.value);
  const foundVoice = voices.find((voice) => {
    console.log("🔥", voice);
    if (e.target.value === element.name) {
      return voice;
    }
  });

  console.log("foundVoice", foundVoice);
  msg.voice = foundVoice;
  // toggle();
  // for (let index = 0; index < voices.length; index++) {
  //   const element = voices[index];
  //   if (e.target.value === element.name) {
  //     msg.voice = element;
  //   }
  // }
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
// function setVoice(e) {
//   console.log(e.target.value);
//   msg.voice = voices.find((voice) => voice.name === e.target.value);
//   toggle();
// }
