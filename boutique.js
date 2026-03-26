document.addEventListener('DOMContentLoaded', () => {
    const conteneurVins = document.getElementById('vins-liste');

    // On vérifie qu'on est bien sur la page boutique avant de lancer le fetch
    if (conteneurVins) {
        fetch('vins.json')
            .then(response => {
                if (!response.ok) throw new Error("Fichier vins.json introuvable");
                return response.json();
            })
            .then(vins => {
                conteneurVins.innerHTML = ""; // On retire le message "Dégustation en cours"

                vins.forEach(vin => {
                    const article = document.createElement('article');
                    article.className = "produit-card"; // Utilise ton CSS existant
                    
                    // Choix de l'icône selon le type
                    const icone = vin.type.includes("Rouge") ? "🍷" : "🍾";

                    article.innerHTML = `
                        <div style="font-size: 4rem; margin-bottom: 20px;">${icone}</div>
                        <div style="font-size: 0.75rem; color: #c5a059; text-transform: uppercase;">${vin.region}</div>
                        <h3 style="font-family: 'Cinzel'; color: #4a0404; margin: 10px 0;">${vin.nom} ${vin.annee}</h3>
                        <p style="font-size: 0.8rem; color: #666; height: 45px; overflow: hidden; margin-bottom: 15px;">${vin.description}</p>
                        <p style="color: #c5a059; font-weight: bold; font-size: 1.4rem; margin-bottom: 15px;">${vin.prix_estime}€</p>
                        <button class="btn-ajout-panier" onclick="ajouterAuPanier('${vin.nom}', ${vin.prix_estime})">
                            Ajouter au panier
                        </button>
                    `;
                    conteneurVins.appendChild(article);
                });
            })
            .catch(error => {
                console.error("Erreur boutique:", error);
                conteneurVins.innerHTML = "<p>Désolé, impossible de charger les vins pour le moment.</p>";
            });
    }
});