// Affichage des cartes
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

// Défilement automatique
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    setInterval(() => {
        grid.scrollLeft += 1; // Vitesse lente pour lecture
        if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth)) {
            grid.scrollLeft = 0;
        }
    }, 30);
}

// Ouverture de la modal
function openArticle(id) {
    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <img src="${article.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel'; color:#4a0404; margin-bottom:10px;">${article.title}</h2>
        <div class="gold-text" style="font-size:0.8rem; margin-bottom:20px;">${article.category}</div>
        <div class="article-full-text" style="font-family: 'Playfair Display'; line-height:1.8; font-size:1.1rem;">
            ${article.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Fermeture
function closeArticle() {
    document.getElementById('articleModal').style.display = "none";
    document.body.style.overflow = "auto";
}

// Fermer en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) closeArticle();
}

window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        startAutoScroll();
    }
};