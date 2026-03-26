// --- 1. CHARGEMENT DU CATALOGUE (12 VINS) ---
fetch('vins.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('wine-grid');
        if (!grid) return; 

        grid.innerHTML = ''; 

        data.forEach(vin => {
            const card = document.createElement('div');
            card.className = 'wine-card';
            
            // On détermine une couleur selon le type pour le petit badge
            let color = "#800020"; // Rouge par défaut
            if(vin.type.includes("Blanc")) color = "#d4af37";
            if(vin.type.includes("Rosé")) color = "#ffb6c1";

            card.innerHTML = `
                <div style="border-bottom: 2px solid ${color}; margin-bottom: 10px; padding-bottom: 5px;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; color: #666;">${vin.type} • ${vin.pays}</span>
                    <h3 style="margin: 5px 0; color: #333;">${vin.nom}</h3>
                </div>
                
                <p style="margin: 5px 0;"><strong>📍 Région :</strong> ${vin.region} (${vin.annee})</p>
                <p style="margin: 5px 0;"><strong>🍇 Cépage :</strong> ${vin.cepage}</p>
                <p style="margin: 5px 0;"><strong>🍽️ Accords :</strong> ${vin.accords_mets}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                    <span style="font-size: 1.2rem; font-weight: bold; color: #27ae60;">${vin.prix_estime}€</span>
                    <button onclick="window.location.href='details.html?id=${vin.id}'" 
                            style="background:${color}; border:none; color:white; padding:8px 12px; border-radius:5px; cursor:pointer; font-weight:bold;">
                        Voir Détails →
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    })
    .catch(error => console.error("Erreur catalogue :", error));

// --- 2. CONFIGURATION DE LA CARTE (MAP) ---
const mapElement = document.getElementById('map');
if (mapElement) {
    const map = L.map('map').setView([48.8566, 2.3522], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const cavistes = [
        { nom: "Les Caves de Taillevent", lat: 48.8745, lng: 2.3051, adresse: "228 Faubourg Saint-Honoré" },
        { nom: "Legrand Filles et Fils", lat: 48.8665, lng: 2.3395, adresse: "1 Rue de la Banque" },
        { nom: "La Cave de Joël Robuchon", lat: 48.8570, lng: 2.3275, adresse: "3 Rue du Bac" },
        { nom: "Lavinia Paris", lat: 48.8705, lng: 2.3285, adresse: "3 Boulevard de la Madeleine" }
    ];

    cavistes.forEach(shop => {
        L.marker([shop.lat, shop.lng]).addTo(map)
         .bindPopup(`<b>${shop.nom}</b><br>${shop.adresse}`);
    });
}