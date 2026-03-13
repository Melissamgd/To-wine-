// 1. Fonction pour afficher les articles
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

// 2. La fonction de clic (C'est elle qui crée l'URL avec l'ID)
function goToArticle(id) {
    console.log("Navigation vers :", id);
    window.location.href = "article-detail.html?id=" + id;
}

// 3. Fonction auto-défilement
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

// 4. Lancement au chargement de la page
window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        startCarousel();
    } else {
        console.error("La base de données knowledgeBase est introuvable.");
    }
};