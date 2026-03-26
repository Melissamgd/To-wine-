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
    let totalBrut = 0;
    let totalRemise = 0;

    panier.forEach((article, index) => {
        const prixLigneBase = article.prix * article.quantite;
        let remiseLigne = 0;

        if (article.quantite >= 6) {
            remiseLigne = prixLigneBase * 0.05;
        }

        const prixLigneFinal = prixLigneBase - remiseLigne;
        totalBrut += prixLigneBase;
        totalRemise += remiseLigne;

        const div = document.createElement('div');
        div.style = "margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;";
        
        const badgePromo = article.quantite >= 6 
            ? `<span style="color: green; font-size: 0.75rem; font-weight: bold;">-5% (Caisse de 6)</span>` 
            : "";

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <span style="font-weight: bold;">${article.quantite}x</span> ${article.nom} ${badgePromo}
                    <div style="font-size: 0.8rem; color: #666;">${article.prix}€ l'unité</div>
                </div>
                <div style="text-align: right; margin-left: 10px;">
                    <div style="${article.quantite >= 6 ? 'text-decoration: line-through; color: #999; font-size: 0.8rem;' : 'font-weight: bold;'}">${prixLigneBase}€</div>
                    ${article.quantite >= 6 ? `<div style="font-weight: bold; color: green;">${prixLigneFinal.toFixed(2)}€</div>` : ""}
                </div>
                <button onclick="supprimerDuPanier(${index})" style="color:#4a0404; background:none; border:none; cursor:pointer; font-size: 1.2rem; margin-left: 10px;">&times;</button>
            </div>
        `;
        liste.appendChild(div);
    });

    const optionLivraison = document.querySelector('input[name="livraison"]:checked');
    const fraisLivraison = optionLivraison ? parseInt(optionLivraison.value) : 0;

    const totalFinal = totalBrut - totalRemise + fraisLivraison;

    if (totalRemise > 0) {
        const divRemise = document.createElement('div');
        divRemise.style = "color: green; font-size: 0.9rem; margin-top: 10px; text-align: right;";
        divRemise.innerHTML = `Économie : -${totalRemise.toFixed(2)}€`;
        liste.appendChild(divRemise);
    }

    totalPrixEl.innerText = totalFinal.toFixed(2);

    if (panierVisuel) {
        panierVisuel.style.display = panier.length > 0 ? 'block' : 'none';
    }
}