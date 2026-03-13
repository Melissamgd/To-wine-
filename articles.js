// 1. Affichage des cartes d'articles
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')" style="cursor:pointer; flex: 0 0 auto;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category" style="color:#c5a059; font-size:0.8rem; font-weight:bold;">${art.category}</span>
                <h3 class="card-title" style="color:#4a0404; margin:10px 0;">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// 2. Fonction de défilement automatique avec arrêt propre
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    // On réinitialise le scroll à gauche au démarrage
    grid.scrollLeft = 0;

    const scrollInterval = setInterval(() => {
        const startPos = grid.scrollLeft;
        
        // On avance d'un pixel
        grid.scrollLeft += 1;

        // VERIFICATION : Si la position ne change plus, on arrête le script
        // Cela arrive quand on a atteint le bout du carrousel
        if (grid.scrollLeft === startPos && startPos > 0) {
            clearInterval(scrollInterval);
            console.log("Fin du carrousel atteinte.");
        }
    }, 30); // 30ms pour une fluidité optimale
}

// 3. Ouverture de la fenêtre d'infos (Modal)
function openArticle(id) {
    if (typeof knowledgeBase === 'undefined') return;

    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <img src="${article.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel', serif; color:#4a0404; margin-bottom:10px;">${article.title}</h2>
        <p style="color:#c5a059; text-transform:uppercase; font-size:0.8rem; font-weight:bold; letter-spacing:1px; margin-bottom:20px;">
            ${article.category}
        </p>
        <hr style="border:0; border-top:1px solid #eee; margin-bottom:20px;">
        <div class="article-full-text" style="font-family: 'Playfair Display', serif; line-height:1.8; font-size:1.1rem; color:#333;">
            ${article.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// 4. Fermeture de la fenêtre
function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 5. Fermer si on clique sur le fond sombre
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeArticle();
    }
};

// 6. Lancement au chargement de la page
// ATTENTION : On utilise "addEventListener" pour être sûr de ne pas écraser d'autres scripts
window.addEventListener('load', () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        // On laisse un petit délai de 500ms pour être sûr que les images sont chargées
        setTimeout(startAutoScroll, 500);
    }
});