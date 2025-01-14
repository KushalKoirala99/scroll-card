const cardContainer = document.querySelector(".container");
let currentIndex = 0;
let isDragging = false;
let startY = 0; // vertical position of  the mouse when drag starts
let dragDistance = 0; // vertical distance the mouse has moved

const cardData = [
  { id: "card1" },
  { id: "card2" },
  { id: "card3" },
  { id: "card4" },
];

function createCard(id) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = id;
  card.innerHTML = `

     <div class='box'></div>
     <div class='sub-container'>
    <div class="circle"></div>
    <div >
    <div class="line"></div>
    <div class="line"></div>
    </div>
    </div>
    `;

  return card;
}

function displayCard() {
  const cardWrapper = document.querySelector(".card-wrapper");
  cardWrapper.innerHTML = "";
  cardData.forEach((data, index) => {
    const card = createCard(data.id);
    if (index === currentIndex) card.classList.add("active");
    card.style.transform = `translateY(${(index - currentIndex) * 200}px)`;
    cardWrapper.appendChild(card);
  });
}

function updateCard() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.classList.remove("active");
    card.style.transform = `translateY(${
      ((index - currentIndex + cards.length) % cards.length) * 200
    }px)`;
    if ((index - currentIndex + cards.length) % cards.length === 1) {
      //checks the card position . If it is  the one just after the current active one
      card.classList.add("active");
    }
  });
}

function onScroll(e) {
  if (e.deltaY > 0) {
    currentIndex = (currentIndex + 1) % cardData.length;
  } else {
    currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
  }
  updateCard();
}

//dragging funtions
function onMouseDown(e) {
  const activeCard = document.querySelector(".card.active");
  if (e.target === activeCard) {
    isDragging = true;
    startY = e.clientY;
    cardContainer.style.cursor = "";
  }
}

function onMouseMove(e) {
  if (isDragging) {
    dragDistance = e.clientY - startY;
    updateCard();
  }
}

function onMouseUp() {
  if (isDragging) {
    isDragging = false;
    cardContainer.style.cursor = "";
    if (Math.abs(dragDistance) > 100) {
      if (dragDistance > 0) {
        currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
      } else {
        currentIndex = (currentIndex + 1) % cardData.length;
      }
    }
    dragDistance = 0;
    updateCard();
  }
}

displayCard();
updateCard();
cardContainer.addEventListener("wheel", onScroll);
cardContainer.addEventListener("wheel", onScroll);
cardContainer.addEventListener("mousedown", onMouseDown);
cardContainer.addEventListener("mousemove", onMouseMove);
cardContainer.addEventListener("mouseup", onMouseUp);
cardContainer.addEventListener("mouseleave", onMouseUp);
