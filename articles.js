// 1. Affichage des articles dans le carrousel (Données doublées pour l'effet infini)
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    // On double les données pour un défilement infini sans coupure
    const doubledData = [...data, ...data];
    
    grid.innerHTML = doubledData.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')" style="cursor:pointer; flex: 0 0 auto; width: 300px; margin-right: 20px;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category" style="color:#c5a059; font-size:0.8rem; font-weight:bold;">${art.category}</span>
                <h3 class="card-title" style="color:#4a0404; margin:10px 0;">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// 2. Défilement automatique infini
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    setInterval(() => {
        grid.scrollLeft += 1;

        // Reset invisible à la moitié pour l'effet boucle
        if (grid.scrollLeft >= grid.scrollWidth / 2) {
            grid.scrollLeft = 0;
        }
    }, 30); 
}

// 3. Ouverture de la fenêtre d'infos (Modal) avec TAILLE D'IMAGE RÉDUITE
function openArticle(id) {
    if (typeof knowledgeBase === 'undefined') return;

    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    // On applique ici les nouvelles conditions de taille (max-height: 300px)
    body.innerHTML = `
        <div style="text-align: center; background: #fff;">
            <img src="${article.image}" 
                 style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;" 
                 alt="${article.title}">
        </div>
        <p style="color:#c5a059; text-transform:uppercase; font-size:0.8rem; font-weight:bold; letter-spacing:1px; margin-bottom:10px;">
            ${article.category}
        </p>
        <h2 style="font-family: 'Cinzel', serif; color:#4a0404; margin-bottom:15px; font-size: 1.8rem;">
            ${article.title}
        </h2>
        <hr style="border:0; border-top:1px solid #eee; margin-bottom:20px;">
        <div class="article-full-text" style="font-family: 'Playfair Display', serif; line-height:1.8; font-size:1.1rem; color:#333; text-align: justify;">
            ${article.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Bloque le scroll de la page de fond
}

// 4. Fermeture de la fenêtre
function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Réactive le scroll de la page
    }
}

// 5. Fermer si on clique sur le fond sombre
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeArticle();
    }
};

// 6. Lancement au chargement
window.addEventListener('load', () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        setTimeout(startAutoScroll, 500);
    }
});