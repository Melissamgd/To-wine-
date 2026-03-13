function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="goToArticle('${art.id}')" style="cursor:pointer;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// CETTE FONCTION EST LA CLÉ
function goToArticle(id) {
    // On ajoute bien .html et l'ID
    window.location.href = "article-detail.html?id=" + id;
}

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