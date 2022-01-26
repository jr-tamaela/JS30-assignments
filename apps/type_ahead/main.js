const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];

const searchinput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    //cities.push(...data);
    cities = data;
  });

//console.log(cities);

// ? How do I create a dumbed down version of the spread method, so I can break it down into steps?

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi"); // g stand for global, i stands voor insensitive.
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `
        <span class="hl">${this.value}</span>
      `
      );
      const stateName = place.state.replace(
        regex,
        `
        <span class="hl">${this.value}</span>
      `
      );

      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>
  `;
    })
    .join("");
  suggestions.innerHTML = html;
  // a way to write it without using .map(). Notice the difference in length.
  //
  // const newArray = [];

  // for (let index = 0; index < matchArray.length; index++) {
  //   const place = matchArray[index];
  //   const listItem = `
  //      <li>
  //        <span class="name">${place.city}, ${place.state}</span>
  //       <span class="population">${place.population}</span>
  //      </li>
  //   `;
  //   newArray.push(listItem);
  // }
  // const foundCities = newArray.join("");
  // suggestions.innerHTML = foundCities;

  if (matchArray.length === 0) {
    suggestions.innerHTML = `
      <li>
        <span>Sorry, could not find anything.</span>
      </li>
    `;
  }
}

searchinput.addEventListener("change", displayMatches);
searchinput.addEventListener("keyup", displayMatches);
