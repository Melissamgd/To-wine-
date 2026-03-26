// Initialisation : on récupère le panier stocké ou on crée un vide
let panier = JSON.parse(localStorage.getItem('panier_towine')) || [];

// On rafraîchit l'affichage dès que la page est chargée
document.addEventListener('DOMContentLoaded', updateDisplay);

function ajouterAuPanier(nom, prix) {
    const articleExistant = panier.find(item => item.nom === nom);

    if (articleExistant) {
        articleExistant.quantite += 1;
    } else {
        panier.push({ nom: nom, prix: prix, quantite: 1 });
    }
    sauvegarderEtActualiser();
}

function supprimerDuPanier(index) {
    if (panier[index].quantite > 1) {
        panier[index].quantite -= 1;
    } else {
        panier.splice(index, 1);
    }
    sauvegarderEtActualiser();
}

function sauvegarderEtActualiser() {
    localStorage.setItem('panier_towine', JSON.stringify(panier));
    updateDisplay();
}

function updateDisplay() {
    const liste = document.getElementById('items-liste');
    const totalPrixEl = document.getElementById('total-prix');
    const panierVisuel = document.getElementById('panier-flottant');
    
    if (!liste || !totalPrixEl) return;

    liste.innerHTML = "";
    let totalProduits = 0;

    panier.forEach((article, index) => {
        const prixLigne = article.prix * article.quantite;
        totalProduits += prixLigne;

        const div = document.createElement('div');
        div.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;";
        
        div.innerHTML = `
            <div style="flex: 1;">
                <span style="font-weight: bold;">${article.quantite}x</span> ${article.nom}
                <div style="font-size: 0.8rem; color: #666;">${article.prix}€ l'unité</div>
            </div>
            <div style="font-weight: bold; margin-left: 10px;">${prixLigne}€</div>
            <button onclick="supprimerDuPanier(${index})" style="color:#4a0404; background:none; border:none; cursor:pointer; font-size: 1.2rem; margin-left: 10px;">&times;</button>
        `;
        liste.appendChild(div);
    });

    const optionLivraison = document.querySelector('input[name="livraison"]:checked');
    const fraisLivraison = optionLivraison ? parseInt(optionLivraison.value) : 0;

    totalPrixEl.innerText = totalProduits + fraisLivraison;

    if (panierVisuel) {
        panierVisuel.style.display = panier.length > 0 ? 'block' : 'none';
    }
}