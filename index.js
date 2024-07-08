import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let game of games) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
      <img src="${game.img}" class="game-img" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p>Backers: ${game.backers}</p>
    `;

    gamesContainer.appendChild(gameCard);
  }
}

function showFundedGames() {
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  deleteChildElements(gamesContainer);
  addGamesToPage(fundedGames);
}

// Initial call to display funded games
showFundedGames();

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce(
  (acc, game) => acc + game.backers,
  0
);
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`;

const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`;

function filterUnfundedOnly() {
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  deleteChildElements(gamesContainer);
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  showFundedGames();
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

const descriptionContainer = document.getElementById("description-container");
const numUnfunded = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;
const unfundedStr = `A total of ${numUnfunded} game${
  numUnfunded === 1 ? " remains" : "s remain"
} unfunded. We need your help to fund these amazing games!`;

const unfundedDesc = document.createElement("p");
unfundedDesc.innerHTML = unfundedStr;
descriptionContainer.appendChild(unfundedDesc);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort(
  (item1, item2) => item2.pledged - item1.pledged
);

const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `Top Pledged Game: ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `Runner-Up Game: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

AOS.init();

// Search functionality
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredGames = GAMES_JSON.filter((game) =>
    game.name.toLowerCase().includes(searchTerm)
  );
  deleteChildElements(gamesContainer);
  addGamesToPage(filteredGames);
});
