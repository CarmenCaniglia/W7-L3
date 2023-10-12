const renderBooks = function (books) {
  // genero i books --> il parametro della funzione sono i data del json
  // ciclo books perchè devo fare la card e appenderla alla row per ogni libro
  books.forEach((book) => {
    const newCol = document.createElement("div"); //div vuoto
    newCol.classList.add("col", "col-4", "mb-4"); //lo rendo una colonna
    // creo la card con una scorciatoia
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
        
    <img src="${book.img}" class="card-img-top" alt="${book.title}">
    <div class="card-body d-flex flex-column justify-content-between ">
        <h5 class="card-title">${book.title} </h5>
        <p class="card-text">${book.price} €</p>
        
        <button class="btn btn-primary" onclick="deleteMe(event)" >Scarta</button>
        <button class="btn btn-success" onclick="addToCart(event)" >Add to Cart</button>
        
    </div>

        `;
    // appendo la card alla col
    newCol.appendChild(newCard);
    // ora prendo un riferimento della row per appenderci la mia card
    const row = document.getElementById("books-wall");
    row.appendChild(newCol);
  });
};

const addToCart = function (e) {
  // risalgo al titolo del libro della card e lo aggiungo al carrello
  console.log(e.target.parentElement.querySelector("h5").innerText);
  //   creo una variabile per salvarmi il titolo
  const bookTitle = e.target.parentElement.querySelector("h5").innerText;
  // riferimento alla ul per creare la lista
  const cartUl = document.getElementById("cart");
  const newLi = document.createElement("li");
  newLi.innerText = bookTitle;
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.innerText = "Rimuovi";
  deleteButton.addEventListener("click", function (e) {
    const liToRemove = e.target.parentElement;
    liToRemove.remove();
  });
  newLi.appendChild(deleteButton);
  cartUl.appendChild(newLi);
};

const deleteMe = function (e) {
  console.log("elimino", e.target.closest(".col"));
  //   closest trova il match più vicino tra l'elemento su cui lo chiamo e il selettore css inserito tra parentesi risalendo il DOM
  e.target.closest(".col").remove();
};

// faccio il fetch per i libri
fetch("https://striveschool-api.herokuapp.com/books")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Problema con il server :");
    }
  })
  .then((data) => {
    console.log(data);
    // la funzione che andrebbe qui posso farla a parte
    renderBooks(data);
  })
  .catch((err) => {
    console.log("ERRORE", err);
  });
