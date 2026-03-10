let wines = [];

function displayWines(filter = 'all') {
    const grid = document.getElementById('wine-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' ? wines : wines.filter(w => w.region === filter);

    filtered.forEach(wine => {
        grid.innerHTML += `
            <div class="wine-card">
                <span class="gold-text">${wine.region}</span>
                <h3>${wine.nom || wine.name}</h3>
                <p>${wine.annee || wine.year} - ${wine.type}</p>
                <p class="carac"><strong>Caractéristique :</strong> ${wine.caracteristique || ''}</p>
                <button class="details-btn" data-id="${wine.id}" style="margin-top:10px; background:none; border:none; color:#630d16; cursor:pointer; text-decoration:underline;">Détails</button>
            </div>
        `;
    });

    // attach listeners after DOM update
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.currentTarget.dataset.id;
            const w = wines.find(x => x.id == id);
            if (w) {
                // prefer using caracteristique to show full region (with parenthesis) if available
                let displayRegion = w.region;
                if (w.caracteristique) {
                    // remove type portion of caracteristique if present
                    displayRegion = w.caracteristique.replace(/\s*-\s*"?"?/, '').replace(w.type, '').trim();
                    // sometimes caracteristique is like "Bordeaux (Médoc) - Rouge"
                    displayRegion = w.caracteristique.split('-')[0].trim();
                }
                alert(`${w.nom} \t${displayRegion} \t${w.type} \t${w.detail || w.description}`);
            }
        });
    });
}

window.onload = () => {
    fetch('vins.json')
        .then(r => {
            if (!r.ok) throw new Error('Impossible de charger vins.json');
            return r.json();
        })
        .then(data => {
            wines = data;
            displayWines('all');
        })
        .catch(err => console.error(err));
};