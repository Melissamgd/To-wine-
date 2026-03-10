const wines = [
    { name: "Château Margaux", region: "Bordelais", year: "2015", type: "Rouge" },
    { name: "Meursault", region: "Bourgogne", year: "2018", type: "Blanc" },
    { name: "Romanée-Conti", region: "Bourgogne", year: "2012", type: "Rouge" },
    { name: "Saint-Émilion Grand Cru", region: "Bordelais", year: "2017", type: "Rouge" }
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
                <p>${wine.year} - ${wine.type}</p>
                <button style="margin-top:10px; background:none; border:none; color:#630d16; cursor:pointer; text-decoration:underline;">Détails</button>
            </div>
        `;
    });
}

window.onload = () => displayWines('all');