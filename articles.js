/**
 * TO WINE - articles.js
 */

// 1. FONCTION D'AFFICHAGE (Génère le carrousel)
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // On vide

    if (data.length === 0) {
        grid.innerHTML = '<p style="padding: 20px;">Aucun article trouvé.</p>';
        return;
    }

    data.forEach(art => {
        grid.innerHTML += `
            <div class="article-card" onclick="goToArticle('${art.id}')">
                <img src="${art.image}" class="card-img" alt="${art.title}">
                <div class="card-content">
                    <span class="card-category">${art.category}</span>
                    <h3 class="card-title">${art.title}</h3>
                    <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
                </div>
            </div>
        `;
    });
}

// 2. FONCTION DE NAVIGATION (Vers la page détail avec l'ID)
function goToArticle(id) {
    console.log("Clic sur l'article ID :", id);
    window.location.href = "article-detail.html?id=" + id;
}

// 3. FONCTION DE RECHERCHE
function searchArticles() {
    const term = document.getElementById('articleSearch').value.toLowerCase();
    const filtered = knowledgeBase.filter(art => 
        art.title.toLowerCase().includes(term) || 
        art.category.toLowerCase().includes(term)
    );
    displayArticles(filtered);
}

// 4. AUTO-DÉFILEMENT (Carrousel)
function initCarousel() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    setInterval(() => {
        grid.scrollLeft += 1;
        if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth)) {
            grid.scrollLeft = 0;
        }
    }, 40);
}

// 5. CHARGEMENT INITIAL
window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        initCarousel();
    } else {
        console.error("knowledgeBase n'est pas défini ! Vérifie articles_data.js");
    }
};