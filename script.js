const APIkey = "7ab3e7e69be14d97a0a59e4a6af0b980";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(querry) {
  const res = await fetch(`${url}${querry}&apikey=${APIkey}`);
  const data = await res.json();
  // console.log(data)
  allData(data.articles);
}

function allData(articles) {
  const cardsContainer = document.getElementById("card-container");
  const newsCradTempltes = document.querySelector("#template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = newsCradTempltes.content.cloneNode(true);

    fillDataIntoCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataIntoCard(cardClone, article) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector(".news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedClass = null;

function onNavitemClck(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);

  curSelectedClass?.classList.remove("active");
  curSelectedClass = navItem;
  curSelectedClass.classList.add("active");
}

const serchButton = document.getElementById("search-button");
const serchText = document.getElementById("search-text");

serchButton.addEventListener("click", () => {
  const querry = serchText.value;

  if (!querry) return;

  fetchNews(querry);
});
