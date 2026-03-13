function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    // On crée les cartes avec un lien direct <a>
    grid.innerHTML = data.map(art => `
        <a href="article-detail.html?id=${art.id}" class="article-card" style="text-decoration: none; color: inherit;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">${art.description}</p>
            </div>
        </a>
    `).join('');
}

// Fonction de défilement automatique
function startCarousel() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    setInterval(() => {
        grid.scrollLeft += 1;
        if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth)) {
            grid.scrollLeft = 0;
        }
    }, 30);
}

window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        startCarousel();
    }
};