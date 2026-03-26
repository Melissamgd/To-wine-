fetch('vins.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('vins-container');
        
        data.forEach(vin => {
            const card = document.createElement('div');
            const typeClass = "type-" + vin.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            card.className = `card ${typeClass}`;
            card.style.cursor = "pointer";

            // C'est ici que la magie opère pour la redirection individuelle
            card.onclick = () => {
                window.location.href = `details.html?id=${vin.id}`;
            };

            card.innerHTML = `
                <h3>${vin.nom}</h3>
                <p class="region">📍 ${vin.region} (${vin.annee})</p>
                <p><strong>Cépage:</strong> ${vin.cepage}</p>
                <p><strong>Prix:</strong> ${vin.prix_estime}€</p>
                <span class="view-details">Voir la fiche →</span>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Erreur de chargement :", error));
