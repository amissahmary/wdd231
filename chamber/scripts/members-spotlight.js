const MEMBERS = "data/members.json";

async function fetchMembers() {
  const response = await fetch(MEMBERS);
  if (!response.ok) throw new Error(`Failed to fetch members: ${response.status}`);
  return await response.json();
}

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function getName(name) {
  return name;
}

function buildCard(member) {
  const isGold = member.membership_level === 3;
  const badgeStyle = isGold
    ? "background:#FAEEDA; color:#633806;"
    : "background:#D3D1C7; color:#2C2C2A;";
  const badgeIcon = isGold ? "🥇" : "🥈";
  const shortUrl = member.website_url.replace(/^https?:\/\//, "");
  const name = getName(member.company_name);

  return `
    <div class="spotlight-card">
      <div class="spotlight-card__header">
          <h3><span style="${badgeStyle}">${badgeIcon}</span> ${name}</h3>
          <p class="spotlight-tagline">${member.tagline}</p>    
      </div>
      <div class="spotlight-details">
        <img src="${member.logo}" alt="${name} logo">
        <ul>
          <li><b>Address:</b> ${member.address}</li>
          <li><b>Phone:</b><a href="tel:${member.phone}"> ${member.phone}</a></li>
          <li><b>Website:</b><a href="${member.website_url}" target="_blank" rel="noopener noreferrer"> ${shortUrl}</a></li>
        </ul>
      </div>
    </div>
  `;
}

async function loadSpotlights() {
  const container = document.getElementById("com-spotlight");
  if (!container) return;

  container.innerHTML = "<p>Loading spotlights…</p>";

  try {
    const members = await fetchMembers();

    const eligible = members.filter((m) => m.membership_level >= 2);

    const count = Math.random() < 0.5 ? 2 : 3;
    const selected = pickRandom(eligible, Math.min(count, eligible.length));

    container.innerHTML = `
      <div class="spotlight">
        ${selected.map(buildCard).join("")}
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Unable to load spotlights. Please try again later.</p>";
  }
}

// Run on page load
loadSpotlights();