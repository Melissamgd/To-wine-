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
                conteneurVins.innerHTML = ""; 

                vins.forEach(vin => {
    const article = document.createElement('article');
    article.className = "produit-card";
    
    // 1. On crée le contenu textuel et l'IMAGE
    article.innerHTML = `
        <div style="height: 250px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; overflow: hidden;">
            <img src="${vin.image}" alt="${vin.nom}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
        </div>
        
        <div style="font-size: 0.75rem; color: #c5a059; text-transform: uppercase;">${vin.region}</div>
        <h3 style="font-family: 'Cinzel'; color: #4a0404; margin: 10px 0; font-size: 1.2rem; height: 45px; overflow: hidden;">
            ${vin.nom} ${vin.annee}
        </h3>
        <p style="font-size: 0.8rem; color: #666; height: 45px; overflow: hidden; margin-bottom: 15px;">${vin.description}</p>
        <p style="color: #c5a059; font-weight: bold; font-size: 1.6rem; margin-bottom: 15px;">${vin.prix_estime}€</p>
    `;

    // 2. On crée le bouton séparément (ton code robuste actuel)
    const bouton = document.createElement('button');
    bouton.className = "btn-ajout-panier";
    bouton.innerText = "Ajouter au panier";
    
    // Utilisation de la fonction fléchée pour le contexte
    bouton.onclick = () => {
        // Cette fonction vient de panier.js
        ajouterAuPanier(vin.nom, vin.prix_estime);
    };

    // 3. On assemble
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