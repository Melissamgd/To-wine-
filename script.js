const wines = [
    { name: "Château Margaux", region: "Bordelais", year: "2015", type: "Rouge" },
    { name: "Meursault", region: "Bourgogne", year: "2018", type: "Blanc" },
    { name: "Romanée-Conti", region: "Bourgogne", year: "2012", type: "Rouge" },
    { name: "Saint-Émilion Grand Cru", region: "Bordelais", year: "2017", type: "Rouge" }
];

function displayWines(filter = 'all') {
    const grid = document.getElementById('wine-grid');
    grid.innerHTML = ''; // Vide la grille

    const filteredWines = filter === 'all' 
        ? wines 
        : wines.filter(w => w.region === filter);

    filteredWines.forEach(wine => {
        const card = `
            <div class="wine-card">
                <p class="region">${wine.region}</p>
                <h3>${wine.name}</h3>
                <p>${wine.year} - ${wine.type}</p>
                <button style="margin-top:10px; background:none; border:none; color:#630d16; cursor:pointer; text-decoration:underline;">Détails</button>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function filterWine(region) {
    displayWines(region);
}

// Chargement initial
window.onload = () => displayWines('all');