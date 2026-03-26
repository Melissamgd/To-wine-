const panier = JSON.parse(localStorage.getItem('panier_towine')) || [];
const recapListe = document.getElementById('recap-liste');
const totalFinalEl = document.getElementById('total-final');
const zoneAdresse = document.getElementById('zone-adresse');
const zoneCaviste = document.getElementById('zone-caviste');

function calculerRecap() {
    let totalNet = 0;
    recapListe.innerHTML = "";

    panier.forEach(item => {
        const prixLigneBase = item.prix * item.quantite;
        
        // Détection des seuils de promo (12 demies, 3 magnums, 6 bouteilles)
        let seuilPromo = 6; 
        if (item.nom.includes("(Demie)")) seuilPromo = 12;
        if (item.nom.includes("(Magnum)")) seuilPromo = 3;

        const aDroitALaRemise = item.quantite >= seuilPromo;
        const remise = aDroitALaRemise ? prixLigneBase * 0.05 : 0;
        const prixLigneFinal = prixLigneBase - remise;
        totalNet += prixLigneFinal;

        recapListe.innerHTML += `
            <div style="display:flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #f2f2f2; padding-bottom: 8px;">
                <span>
                    <strong style="color: #4a0404;">${item.quantite}x</strong> ${item.nom}
                    ${aDroitALaRemise ? '<br><small style="color:#27ae60; font-weight:bold;">Réduction -5% appliquée</small>' : ''}
                </span>
                <span style="font-family: 'Cinzel'; font-weight: bold;">${prixLigneFinal.toFixed(2)}€</span>
            </div>`;
    });

    const radioSelectionne = document.querySelector('input[name="frais"]:checked');
    if (!radioSelectionne) return; // Sécurité si rien n'est coché

    const frais = parseFloat(radioSelectionne.value);

    // Toggle des zones de saisie
    if (frais === 15) { // Vélo Cargo sélectionné
        zoneAdresse.style.display = 'block';
        zoneCaviste.style.display = 'none';
    } else { // Retrait chez caviste sélectionné
        zoneAdresse.style.display = 'none';
        zoneCaviste.style.display = 'block';
    }

    totalFinalEl.innerText = (totalNet + frais).toFixed(2);
}

// On attend que le DOM soit chargé pour éviter les erreurs d'éléments introuvables
document.addEventListener('DOMContentLoaded', () => {
    const formLivraison = document.getElementById('form-livraison');
    if (formLivraison) {
        formLivraison.addEventListener('change', calculerRecap);
    }
    calculerRecap();
});