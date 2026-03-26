// Initialisation : on récupère le panier stocké ou on crée un vide
let panier = JSON.parse(localStorage.getItem('panier_towine')) || [];

// On rafraîchit l'affichage dès que la page est chargée
document.addEventListener('DOMContentLoaded', updateDisplay);

function ajouterAuPanier(nom, prix) {
    panier.push({ nom: nom, prix: prix });
    sauvegarderEtActualiser();
}

function supprimerDuPanier(index) {
    panier.splice(index, 1);
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
    
    // Si on est sur une page sans panier (ex: index), on ne fait rien
    if (!liste || !totalPrixEl) return;

    liste.innerHTML = "";
    let total = 0;

    panier.forEach((article, index) => {
        total += article.prix;
        const div = document.createElement('div');
        div.style = "display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;";
        div.innerHTML = `
            <span>${article.nom}</span>
            <span>${article.prix}€ <button onclick="supprimerDuPanier(${index})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold;">&times;</button></span>
        `;
        liste.appendChild(div);
    });

    totalPrixEl.innerText = total;

    // Affiche le panier seulement s'il y a des articles
    if (panierVisuel) {
        panierVisuel.style.display = panier.length > 0 ? 'block' : 'none';
    }
}