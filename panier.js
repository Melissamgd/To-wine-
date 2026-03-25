// panier.js

let panier = []; // On utilise un tableau pour stocker les objets {nom, prix}
let total = 0;

/**
 * Ajoute un article au panier
 */
function ajouterAuPanier(nom, prix) {
    // 1. On ajoute l'objet au tableau
    panier.push({ nom: nom, prix: prix });
    
    // 2. On affiche le panier s'il était caché
    const panierVisuel = document.getElementById('panier-flottant');
    if (panierVisuel) panierVisuel.style.display = 'block';

    // 3. On rafraîchit l'affichage
    updateDisplay();
}

/**
 * Supprime un article spécifique via son index dans le tableau
 */
function supprimerDuPanier(index) {
    // On retire l'élément du tableau grâce à son index
    panier.splice(index, 1);
    
    // Si le panier est vide, on peut choisir de le cacher
    if (panier.length === 0) {
        document.getElementById('panier-flottant').style.display = 'none';
    }

    // On rafraîchit l'affichage
    updateDisplay();
}

/**
 * Met à jour le HTML du panier et le total
 */
function updateDisplay() {
    const liste = document.getElementById('items-liste');
    const totalPrixEl = document.getElementById('total-prix');
    
    // On vide la liste actuelle avant de la reconstruire
    liste.innerHTML = "";
    total = 0;

    // On parcourt le tableau pour recréer les lignes
    panier.forEach((article, index) => {
        total += article.prix;
        
        const divArticle = document.createElement('div');
        divArticle.className = 'panier-item';
        divArticle.style.display = 'flex';
        divArticle.style.justifyContent = 'space-between';
        divArticle.style.alignItems = 'center';
        divArticle.style.marginBottom = '10px';

        divArticle.innerHTML = `
            <span>${article.nom} (${article.prix}€)</span>
            <button onclick="supprimerDuPanier(${index})" style="background:none; border:none; color:#4a0404; cursor:pointer; font-weight:bold; font-size:1.2rem; margin-left:10px;">&times;</button>
        `;
        liste.appendChild(divArticle);
    });

    // Mise à jour du total
    if (totalPrixEl) totalPrixEl.innerText = total;
}

/**
 * Validation finale
 */
function validerCommande() {
    if (panier.length === 0) {
        alert("Votre cave est vide !");
    } else {
        alert(`Commande validée pour ${total}€. Vos bouteilles arrivent !`);
    }
}