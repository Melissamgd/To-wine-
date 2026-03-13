// 1. Fonction pour afficher les articles dans le carrousel
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="goToArticle('${art.id}')">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// 2. La fonction qui s'occupe de changer de page (Le Coeur du Problème)
function goToArticle(id) {
    console.log("Navigation vers l'article :", id); // Pour vérifier dans la console
    window.location.href = `article-detail.html?id=${id}`;
}

// 3. Recherche
function searchArticles() {
    const term = document.getElementById('articleSearch').value.toLowerCase();
    const filtered = knowledgeBase.filter(art => 
        art.title.toLowerCase().includes(term) || 
        art.category.toLowerCase().includes(term)
    );
    displayArticles(filtered);
}

// 4. Lancement
window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
    } else {
        console.error("Erreur : knowledgeBase n'est pas chargé. Vérifie articles_data.js");
    }
};