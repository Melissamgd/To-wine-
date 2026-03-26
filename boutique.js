document.addEventListener('DOMContentLoaded', () => {
    const conteneurVins = document.getElementById('vins-liste');

    if (conteneurVins) {
        fetch('vins.json')
            .then(response => {
                if (!response.ok) throw new Error("Fichier vins.json introuvable");
                return response.json();
            })
            .then(vins => {
                conteneurVins.innerHTML = ""; 

                vins.forEach(vin => {
    const article = document.createElement('article');
    article.className = "produit-card";
    
    article.innerHTML = `
        <div style="height: 250px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; overflow: hidden;">
            <img src="${vin.image}" alt="${vin.nom}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
        </div>
        
        <div style="font-size: 0.75rem; color: #c5a059; text-transform: uppercase;">${vin.region}</div>
        <h3 style="font-family: 'Cinzel'; color: #4a0404; margin: 10px 0; font-size: 1.2rem; height: 45px; overflow: hidden;">
            ${vin.nom} ${vin.annee}
        </h3>
        
        <div style="margin-bottom: 15px;">
            <label style="font-size: 0.7rem; color: #999; display: block; margin-bottom: 5px;">Format :</label>
            <select id="format-${vin.id}" class="select-format" style="width: 100%; padding: 8px; border: 1px solid #c5a059; background: white; font-family: 'Cinzel'; cursor: pointer;">
                <option value="demie">Demie (37,5cl)</option>
                <option value="bouteille" selected>Bouteille (75cl)</option>
                <option value="magnum">Magnum (1,5L)</option>
            </select>
        </div>

        <p id="prix-display-${vin.id}" style="color: #c5a059; font-weight: bold; font-size: 1.6rem; margin-bottom: 15px;">
            ${vin.prix_estime}€
        </p>
    `;

    // --- LOGIQUE DE MISE À JOUR DU PRIX EN DIRECT ---
    const selectFormat = article.querySelector(`#format-${vin.id}`);
    const prixDisplay = article.querySelector(`#prix-display-${vin.id}`);

    selectFormat.addEventListener('change', () => {
        const formatChoisi = selectFormat.value;
        const coef = vin.formats[formatChoisi];
        const nouveauPrix = (vin.prix_estime * coef).toFixed(2);
        prixDisplay.innerText = `${nouveauPrix}€`;
    });

    // --- BOUTON AJOUTER ---
    const bouton = document.createElement('button');
    bouton.className = "btn-ajout-panier";
    bouton.innerText = "Ajouter au panier";
    
    bouton.onclick = () => {
        const formatChoisi = selectFormat.value;
        const coef = vin.formats[formatChoisi];
        const prixFinal = vin.prix_estime * coef;
        const nomComplet = `${vin.nom} (${formatChoisi.charAt(0).toUpperCase() + formatChoisi.slice(1)})`;
        
        ajouterAuPanier(nomComplet, prixFinal);
    };

    article.appendChild(bouton);
    conteneurVins.appendChild(article);
});
            })
            .catch(error => {
                console.error("Erreur boutique:", error);
                conteneurVins.innerHTML = "<p>Désolé, impossible de charger les vins pour le moment.</p>";
            });
    }
});