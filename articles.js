/**
 * TO WINE - LOGIQUE DES ARTICLES
 * Gère l'affichage en carrousel, la recherche et la navigation
 */

// 1. AFFICHAGE INITIAL
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    // On vide la grille avant de la remplir
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p style="padding: 20px;">Aucun article ne correspond à votre recherche.</p>';
        return;
    }

    data.forEach(art => {
        grid.innerHTML += `
            <div class="article-card" onclick="goToArticle('${art.id}')">
                <img src="${art.image}" class="card-img" alt="${art.title}">
                <div class="card-content">
                    <span class="card-category">${art.category}</span>
                    <h3 class="card-title">${art.title}</h3>
                    <p style="font-size: 0.9rem; color: #666;">${art.description}</p>
                </div>
            </div>
        `;
    });
}

// 2. NAVIGATION VERS LA PAGE DÉTAIL
function goToArticle(id) {
    // Redirige vers la nouvelle page en passant l'ID dans l'URL
    window.location.href = `article-detail.html?id=${id}`;
}

// 3. RECHERCHE TEMPS RÉEL
function searchArticles() {
    const term = document.getElementById('articleSearch').value.toLowerCase();
    
    // On filtre dans la base de données (chargée via articles_data.js)
    const filtered = knowledgeBase.filter(art => 
        art.title.toLowerCase().includes(term) || 
        art.description.toLowerCase().includes(term) ||
        art.tags.some(t => t.toLowerCase().includes(term))
    );
    
    displayArticles(filtered);
}

// 4. AUTO-DÉFILEMENT DU CARROUSEL
let isPaused = false;
function initCarouselScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    // Arrête le défilement si l'utilisateur survole avec la souris
    grid.addEventListener('mouseenter', () => isPaused = true);
    grid.addEventListener('mouseleave', () => isPaused = false);

    setInterval(() => {
        if (!isPaused) {
            grid.scrollLeft += 1; // Vitesse de défilement (1px)
            
            // Si on arrive au bout, on repart doucement du début
            if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth)) {
                grid.scrollLeft = 0;
            }
        }
    }, 30); // Fluidité (30ms)
}

// 5. LANCEMENT AU CHARGEMENT
window.onload = () => {
    displayArticles(knowledgeBase);
    initCarouselScroll();
};