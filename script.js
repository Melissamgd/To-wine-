const wines = [
    { name: "Château Margaux", region: "Bordelais", year: "2015", type: "Rouge", price: "650€" },
    { name: "Meursault 1er Cru", region: "Bourgogne", year: "2018", type: "Blanc", price: "120€" },
    { name: "Romanée-Conti", region: "Bourgogne", year: "2012", type: "Rouge", price: "Sur devis" },
    { name: "Saint-Émilion", region: "Bordelais", year: "2017", type: "Rouge", price: "85€" },
    { name: "Chablis Grand Cru", region: "Bourgogne", year: "2020", type: "Blanc", price: "95€" },
    { name: "Pomerol", region: "Bordelais", year: "2016", type: "Rouge", price: "140€" }
];

function displayWines(filter = 'all') {
    const grid = document.getElementById('wine-grid');
    if(!grid) return;
    
    grid.innerHTML = '';

    const filtered = filter === 'all' ? wines : wines.filter(w => w.region === filter);

    filtered.forEach(wine => {
        grid.innerHTML += `
            <div class="wine-card">
                <span class="gold-text">${wine.region}</span>
                <h3>${wine.name}</h3>
                <p>${wine.year} — ${wine.type}</p>
                <p style="color: #4a0404; font-weight: bold; margin-top: 10px;">${wine.price}</p>
                <button class="btn-filter" style="margin-top: 15px; font-size: 0.7rem;">Voir la fiche</button>
            </div>
        `;
    });
}

window.onload = () => displayWines('all');