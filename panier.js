let panier = JSON.parse(localStorage.getItem('panier_towine')) || [];

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

function modifierQuantite(index, changement) {
    let item = panier[index];
    if (!item) return;

    if (changement > 0) {
        // --- BOUTON + ---
        if (item.quantite < 6) {
            item.quantite += 1;
        } else {
            item.quantite += 6;
        }
    } else {
        // --- BOUTON - ---
        if (item.quantite <= 6) {
            item.quantite -= 1;
        } else {
            item.quantite -= 6;
        }
    }

    // Suppression si on tombe à 0
    if (item.quantite <= 0) {
        panier.splice(index, 1);
    }

    sauvegarderEtActualiser(); // Ta fonction qui fait le localStorage et l'updateDisplay
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
        let remiseLigne = (article.quantite >= 6) ? (prixLigneBase * 0.05) : 0;

        const prixLigneFinal = prixLigneBase - remiseLigne;
        totalBrut += prixLigneBase;
        totalRemise += remiseLigne;

        const div = document.createElement('div');
        div.style = "margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;";
        
        const badgePromo = article.quantite >= 6 
            ? `<br><span style="color: green; font-size: 0.7rem; font-weight: bold;">PROMO -5% APPLIQUÉE</span>` 
            : "";

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <span style="font-weight: bold; color: #4a0404;">${article.nom}</span>
                    <div style="font-size: 0.8rem; color: #666;">${article.prix}€ l'unité</div>
                    ${badgePromo}
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin: 0 10px;">
                    <button onclick="modifierQuantite(${index}, -1)" style="width:22px; height:22px; border-radius:50%; border:1px solid #4a0404; background:white; color:#4a0404; cursor:pointer;">-</button>
                    <span style="font-weight: bold; min-width: 15px; text-align: center;">${article.quantite}</span>
                    <button onclick="modifierQuantite(${index}, 1)" style="width:22px; height:22px; border-radius:50%; border:none; background:#4a0404; color:white; cursor:pointer;">+</button>
                </div>

                <div style="text-align: right; min-width: 70px;">
                    <div style="${article.quantite >= 6 ? 'text-decoration: line-through; color: #999; font-size: 0.8rem;' : 'font-weight: bold;'}">${prixLigneBase}€</div>
                    ${article.quantite >= 6 ? `<div style="font-weight: bold; color: green;">${prixLigneFinal.toFixed(2)}€</div>` : ""}
                </div>
            </div>
        `;
        liste.appendChild(div);
    });

    const optionLivraison = document.querySelector('input[name="livraison"]:checked');
    const fraisLivraison = optionLivraison ? parseInt(optionLivraison.value) : 0;

    const totalFinal = totalBrut - totalRemise + fraisLivraison;

    if (totalRemise > 0) {
        const divRemise = document.createElement('div');
        divRemise.style = "color: green; font-size: 0.9rem; margin-top: 10px; text-align: right; font-weight: bold;";
        divRemise.innerHTML = `Économie : -${totalRemise.toFixed(2)}€`;
        liste.appendChild(divRemise);
    }

    totalPrixEl.innerText = totalFinal.toFixed(2);

    if (panierVisuel) {
        panierVisuel.style.display = panier.length > 0 ? 'block' : 'none';
    }
}

function validerCommande() {
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    // Ouvre la page récapitulatif dans un nouvel onglet
    window.open('recapitulatif.html', '_blank');
}