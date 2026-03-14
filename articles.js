// 1. Affichage des articles avec DUPLICATION pour l'effet infini
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    // On double les données pour que la fin du carrousel ressemble au début
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

// 2. Défilement automatique infini et fluide
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    const scrollSpeed = 1; // 1 pixel par pas
    
    setInterval(() => {
        grid.scrollLeft += scrollSpeed;

        // Si on a dépassé la moitié du contenu (la fin du premier groupe d'articles)
        // on se téléporte au début sans que l'utilisateur ne s'en aperçoive
        if (grid.scrollLeft >= grid.scrollWidth / 2) {
            grid.scrollLeft = 0;
        }
    }, 30); 
}

// 3. Ouverture de la Modal
function openArticle(id) {
    if (typeof knowledgeBase === 'undefined') return;
    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <img src="${article.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel', serif; color:#4a0404;">${article.title}</h2>
        <p style="color:#c5a059; font-weight:bold;">${article.category}</p>
        <hr style="border:0; border-top:1px solid #eee; margin: 20px 0;">
        <div style="font-family: 'Playfair Display', serif; line-height:1.8;">${article.content}</div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// 4. Fermeture de la Modal
function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 5. Fermer au clic extérieur
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) closeArticle();
};

// 6. Lancement
window.addEventListener('load', () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        // On attend un peu que le rendu soit fait
        setTimeout(startAutoScroll, 500);
    }
});