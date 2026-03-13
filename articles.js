// 1. Fonction pour afficher les cartes dans le carrousel
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// 2. Fonction de défilement automatique avec boucle infinie sans bug
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    setInterval(() => {
        // On avance de 1 pixel
        grid.scrollLeft += 1;

        // Condition de retour au début : 
        // Si la position actuelle + la largeur visible dépasse la largeur totale
        if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth - 2)) {
            grid.scrollLeft = 0; // On réinitialise au début
        }
    }, 30); // 30ms pour une fluidité optimale
}

// 3. Fonction pour ouvrir la fenêtre d'info (Modal)
function openArticle(id) {
    // On vérifie que la base de données existe
    if (typeof knowledgeBase === 'undefined') return;

    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    // On remplit la fenêtre avec les textes complets
    body.innerHTML = `
        <img src="${article.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel'; color:#4a0404; margin-bottom:10px;">${article.title}</h2>
        <div style="color:#c5a059; text-transform:uppercase; font-size:0.8rem; letter-spacing:2px; margin-bottom:20px; font-weight:bold;">
            ${article.category}
        </div>
        <div class="article-full-text" style="font-family: 'Playfair Display'; line-height:1.8; font-size:1.1rem; color:#333;">
            ${article.content}
        </div>
    `;

    // On affiche la modal et on bloque le scroll de l'arrière-plan
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// 4. Fonction pour fermer la fenêtre
function closeArticle() {
    document.getElementById('articleModal').style.display = "none";
    document.body.style.overflow = "auto"; // On réactive le scroll de la page
}

// 5. Fermer la fenêtre si on clique sur le fond noir
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeArticle();
    }
}

// 6. Lancement au chargement de la page
window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        startAutoScroll();
    }
};