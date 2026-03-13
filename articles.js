// 1. Fonction pour afficher les articles sous forme de cartes cliquables
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="goToArticle('${art.id}')">
            <img src="${art.image}" style="width:100%; height:180px; object-fit:cover;">
            <div style="padding:15px;">
                <span style="color:#d4af37; font-size:0.8rem;">${art.category}</span>
                <h3 style="margin:10px 0; font-size:1.1rem;">${art.title}</h3>
            </div>
        </div>
    `).join('');
}

// 2. FONCTION DE NAVIGATION (La nouvelle page)
function goToArticle(id) {
    // On change de page en envoyant l'ID
    window.location.href = `article-detail.html?id=${id}`;
}

// 3. LOGIQUE DU CARROUSEL
let scrollAmount = 0;
function startCarousel() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

    setInterval(() => {
        grid.scrollLeft += 1; // Défilement lent vers la droite
        scrollAmount += 1;
        
        // Si on arrive au bout, on revient au début
        if (scrollAmount >= grid.scrollWidth - grid.clientWidth) {
            grid.scrollLeft = 0;
            scrollAmount = 0;
        }
    }, 300); // Vitesse du défilé (plus le chiffre est petit, plus c'est rapide)
}

// 4. CHARGEMENT
window.onload = () => {
    displayArticles(knowledgeBase);
    // On active le carrousel si on est sur la page principale des articles
    if(document.getElementById('articles-grid')) {
        startCarousel();
    }
};