// panier.js

let total = 0;

/**
 * Ajoute un article au panier et met à jour l'affichage
 */
function ajouterAuPanier(nom, prix) {
    // 1. Afficher le panier flottant
    const panier = document.getElementById('panier-flottant');
    if (panier) panier.style.display = 'block';

    // 2. Mettre à jour le montant total
    total += prix;
    const totalPrixEl = document.getElementById('total-prix');
    if (totalPrixEl) totalPrixEl.innerText = total;

    // 3. Ajouter l'élément visuel à la liste
    const liste = document.getElementById('items-liste');
    if (liste) {
        const divArticle = document.createElement('div');
        divArticle.className = 'panier-item';
        divArticle.innerHTML = `
            <span>${nom}</span>
            <span>${prix}€</span>
        `;
        liste.appendChild(divArticle);
    }
}

/**
 * Simule la validation de la commande
 */
function validerCommande() {
    if (total === 0) {
        alert("Votre cave est vide ! Sélectionnez quelques crus avant de valider.");
    } else {
        alert(`Commande validée pour un montant de ${total}€. Merci de votre confiance chez To Wine.`);
        // Optionnel : vider la page après validation
        // window.location.reload();
    }
}

// On attache l'événement au bouton de validation une fois le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
    const btnValider = document.getElementById('btn-valider');
    if (btnValider) {
        btnValider.onclick = validerCommande;
    }
});