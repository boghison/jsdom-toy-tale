let addToy = false;
toyList = [];

function processLike(event) {
  const toyDiv = event.target.parentNode;
 const toyId = toyDiv.dataset.id;
 const toy = toyList.find(toy => toy.id == toyId);
 // submit a patch request
 fetch(`http://localhost:3000/toys/${toyId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({likes: ++toy.likes})
 }).then(res => res.json()).then(newToy => {
    // increase the like count
    toyDiv.querySelector("p").textContent = `${newToy.likes} Likes `;
 });
}

function addNewToy(toy) {
  const toyCollection = document.querySelector("#toy-collection");
  let toyDiv = document.createElement("div");
  toyDiv.className = "card";
  toyDiv.dataset.id = toy.id;
  toyDiv.innerHTML = `<h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes </p>`;

  let likeBtn = document.createElement("button");
  likeBtn.className = "like-btn";
  likeBtn.textContent = "Like <3";

  likeBtn.addEventListener("click", processLike);

  toyDiv.appendChild(likeBtn);
  toyCollection.appendChild(toyDiv);
}

function addToySubmit(event) {
  event.preventDefault();
  const toy = {name: event.target.name.value, image: event.target.image.value, likes: 0};
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }).then(res => res.json()).then(addNewToy);
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys").then(res => res.json()).then(res => {
    toyList = res;
    toyList.forEach(addNewToy);
  });

  document.querySelector(".add-toy-form").addEventListener("submit", addToySubmit);
});
