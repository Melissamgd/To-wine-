let panier = JSON.parse(localStorage.getItem('panier_towine')) || [];

document.addEventListener('DOMContentLoaded', updateDisplay);

function ajouterAuPanier(nom, prix) {
    const articleExistant = panier.find(item => item.nom === nom);
    if (articleExistant) {
        // On utilise la même logique que modifierQuantite pour l'ajout initial
        let seuil = itemSeuil(nom);
        if (articleExistant.quantite < seuil) {
            articleExistant.quantite += 1;
        } else {
            articleExistant.quantite += itemPas(nom);
        }
    } else {
        panier.push({ nom: nom, prix: prix, quantite: 1 });
    }
    sauvegarderEtActualiser();
}

// Petites fonctions utilitaires pour éviter de répéter le code
function itemPas(nom) {
    if (nom.includes("(Demie)")) return 12;
    if (nom.includes("(Magnum)")) return 3;
    return 6; // Bouteille standard
}

function itemSeuil(nom) {
    if (nom.includes("(Demie)")) return 12;
    if (nom.includes("(Magnum)")) return 3;
    return 6; // Bouteille standard
}

function modifierQuantite(index, changement) {
    let item = panier[index];
    if (!item) return;

    let pas = itemPas(item.nom);
    let seuil = itemSeuil(item.nom);

    if (changement > 0) {
        if (item.quantite < seuil) {
            item.quantite += 1;
        } else {
            item.quantite += pas;
        }
    } else {
        if (item.quantite <= seuil) {
            item.quantite -= 1;
        } else {
            item.quantite -= pas;
        }
    }

    if (item.quantite <= 0) {
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
    let totalNet = 0;
    let totalRemiseGlobale = 0;

    panier.forEach((article, index) => {
        const prixLigneBase = article.prix * article.quantite;
        
        // DÉTECTION DU SEUIL DE PROMO SELON LE FORMAT
        let seuilPromo = itemSeuil(article.nom);
        let aDroitALaRemise = article.quantite >= seuilPromo;
        
        let remiseLigne = aDroitALaRemise ? (prixLigneBase * 0.05) : 0;
        let prixLigneFinal = prixLigneBase - remiseLigne;

        totalNet += prixLigneFinal;
        totalRemiseGlobale += remiseLigne;

        const div = document.createElement('div');
        div.style = "margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;";
        
        const badgePromo = aDroitALaRemise 
            ? `<br><span style="color: green; font-size: 0.7rem; font-weight: bold;">PROMO -5% APPLIQUÉE</span>` 
            : "";

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <span style="font-weight: bold; color: #4a0404;">${article.nom}</span>
                    <div style="font-size: 0.8rem; color: #666;">${article.prix.toFixed(2)}€ l'unité</div>
                    ${badgePromo}
                </div>

                <div style="display: flex; align-items: center; gap: 8px; margin: 0 10px;">
                    <button onclick="modifierQuantite(${index}, -1)" style="width:22px; height:22px; border-radius:50%; border:1px solid #4a0404; background:white; color:#4a0404; cursor:pointer;">-</button>
                    <span style="font-weight: bold; min-width: 15px; text-align: center;">${article.quantite}</span>
                    <button onclick="modifierQuantite(${index}, 1)" style="width:22px; height:22px; border-radius:50%; border:none; background:#4a0404; color:white; cursor:pointer;">+</button>
                </div>

                <div style="text-align: right; min-width: 70px;">
                    <div style="${aDroitALaRemise ? 'text-decoration: line-through; color: #999; font-size: 0.8rem;' : 'font-weight: bold;'}">${prixLigneBase.toFixed(2)}€</div>
                    ${aDroitALaRemise ? `<div style="font-weight: bold; color: green;">${prixLigneFinal.toFixed(2)}€</div>` : ""}
                </div>
            </div>
        `;
        liste.appendChild(div);
    });

    // Gestion des frais de port (si présents sur la page)
    const optionLivraison = document.querySelector('input[name="livraison"]:checked');
    const fraisLivraison = optionLivraison ? parseInt(optionLivraison.value) : 0;

    const totalAffichage = totalNet + fraisLivraison;

    if (totalRemiseGlobale > 0) {
        const divRemise = document.createElement('div');
        divRemise.style = "color: green; font-size: 0.9rem; margin-top: 10px; text-align: right; font-weight: bold;";
        divRemise.innerHTML = `Économie totale : -${totalRemiseGlobale.toFixed(2)}€`;
        liste.appendChild(divRemise);
    }

    totalPrixEl.innerText = totalAffichage.toFixed(2);

    if (panierVisuel) {
        panierVisuel.style.display = panier.length > 0 ? 'block' : 'none';
    }
}

function validerCommande() {
    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }
    window.open('recapitulatif.html', '_blank');
}