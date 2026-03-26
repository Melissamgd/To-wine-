document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('vins-container');

    fetch('vins.json')
        .then(response => {
            if (!response.ok) throw new Error("Erreur de chargement du JSON");
            return response.json();
        })
        .then(vins => {
            vins.forEach(vin => {
                // On crée la carte HTML pour chaque vin
                const card = document.createElement('div');
                card.className = `vin-card ${vin.type.toLowerCase().replace('é', 'e')}`;
                card.style.cursor = "pointer";
                
                // Ajouter l'événement onclick pour rediriger vers la page de détails
                card.onclick = () => {
                    window.location.href = `details.html?id=${vin.id}`;
                };
                
                card.innerHTML = `
                    <div class="badge">${vin.type}</div>
                    <h3>${vin.nom}</h3>
                    <p class="region">📍 ${vin.region} — ${vin.annee}</p>
                    <p class="desc">${vin.description}</p>
                `;
                
                container.appendChild(card);
            });
        })
        .catch(error => {
            container.innerHTML = `<p style="color:red;">Erreur : ${error.message}</p>`;
        });
});
