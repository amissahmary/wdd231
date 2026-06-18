import testimonies from '../data/testimonies.mjs';

function getRandomTestimonies(list, count = 6) {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function displayTestimonies() {
    const selected = getRandomTestimonies(testimonies);
    const container = document.querySelector('#testimonies-container');
    container.innerHTML = '';

    selected.forEach(person => {
        const card = document.createElement('div');
        card.classList.add('testimony-card');

        card.innerHTML = `
            <img src="${person.image}" alt="Photo of ${person.name}">
            <p class="text">"${person.testimony}"</p>
            <strong class="name">${person.name}</strong>
            <span class="role"><i>${person.role}</i></span>
            <span class="date"><i>${person.date}</i></span>
        `;

        container.appendChild(card);
    });
}

displayTestimonies();

window.displayTestimonies = displayTestimonies;