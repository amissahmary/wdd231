import attractions from '../data/attractions.mjs';

function displayVisitMessage() {
    const messageBox = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const diff = now - lastVisit;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days < 1) {
            message = 'Back so soon! Awesome!';
        } else if (days === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);
    messageBox.textContent = message;
}

function displayAttractions(attractions) {
  const container = document.getElementById('attractions');
  container.innerHTML = '';

  attractions.forEach(attraction => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <figure>
        <img src="${attraction.image}" alt="${attraction.name}" />
      </figure>
        <h2>${attraction.name}</h2>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button>Learn More</button>
    `;

    container.appendChild(card);
  });
}

displayVisitMessage();
displayAttractions(attractions);