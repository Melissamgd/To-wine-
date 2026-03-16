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
            // open a new tab displaying a dedicated HTML page with wine details
            window.open(`details.html?id=${id}`, '_blank');
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

// Initialisation de la carte sur Paris
const map = L.map('map').setView([48.8566, 2.3522], 13);

// Chargement du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Liste des cavistes (données factices ou réelles)
const cavistes = [
    { nom: "Les Caves de Taillevent", lat: 48.8745, lng: 2.3051, adresse: "228 Faubourg Saint-Honoré" },
    { nom: "Legrand Filles et Fils", lat: 48.8665, lng: 2.3395, adresse: "1 Rue de la Banque" },
    { nom: "La Cave de Joël Robuchon", lat: 48.8570, lng: 2.3275, adresse: "3 Rue du Bac" },
    { nom: "Lavinia Paris", lat: 48.8705, lng: 2.3285, adresse: "3 Boulevard de la Madeleine" }
];

// Ajout des marqueurs sur la carte
cavistes.forEach(shop => {
    L.marker([shop.lat, shop.lng])
        .addTo(map)
        .bindPopup(`<b>${shop.nom}</b><br>${shop.adresse}`);
});
