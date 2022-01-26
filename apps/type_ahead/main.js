const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const searchinput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));
//console.log(cities);

// ? How do I create a dumbed down version of the spread method, so I can break it down into steps?

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi"); // g stand for global, i stands voor insensitive.
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  console.log(this.value);
}

searchinput.addEventListener("change", displayMatches);
