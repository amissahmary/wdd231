let currentView = 'grid';
let cachedCompanies = [];

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const companies = await response.json();
    cachedCompanies = companies;
    displayMembers(companies);
  } catch (error) {
    console.error('Could not load members:', error);
    document.getElementById('cards').innerHTML = '<p>Failed to load member data.</p>';
  }
}

function setView(view) {
  currentView = view;
  document.getElementById('btn-grid').classList.toggle('active', view === 'grid');
  document.getElementById('btn-list').classList.toggle('active', view === 'list');
  displayMembers(cachedCompanies);
}

function displayMembers(companies) {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  cards.className = currentView;  

  companies.forEach(company => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (currentView === 'grid') {
      card.innerHTML = `
        <img src="${company.image}" alt="${company.company_name}" />
        <div class="card-info">
          <h3>${company.company_name}</h3>
          <p class="tagline">${company.tagline}</p>
          <p>${company.address}</p>
          <p>${company.phone}</p>
          <p>${company.email}</p>
          <span class="badge">${company.membership_label}</span>
          <a href="${company.website_url}" target="_blank">Visit Website</a>
        </div>
         `;
    } else {
      card.innerHTML = `
        <img src="${company.image}" alt="${company.company_name}" />
        <div class="card-info">
          <h3>${company.company_name}</h3>
          <details>
            <summary>Details</summary>
            <p class="tagline">${company.tagline}</p>
            <p>${company.address}</p>
            <p>${company.phone}</p>
            <p>${company.email}</p>
            <span class="badge">${company.membership_label}</span>
            <a href="${company.website_url}" target="_blank">Visit Website</a>
          </details>
        </div>
      `;
    }

    cards.appendChild(card);
  });
}

loadMembers();

document.getElementById('btn-grid').addEventListener('click', () => setView('grid'));
document.getElementById('btn-list').addEventListener('click', () => setView('list'));