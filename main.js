const apps = [
  { name: "Drum kit", link: "./apps/drum_kit/index.html" },
  { name: "Js Clock", link: "./apps/js_clock/index.html" },
  { name: "CSS variables", link: "./apps/css_variables/index.html" },
];

const mainApp = document.getElementById("appContainer");

function loopOverApps() {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];

    mainApp.innerHTML += `
            <section>
                <h2>${app.name}</h2>
                <a href=${app.link}>View</a>
            </section>
        `;
  }
}

loopOverApps();
