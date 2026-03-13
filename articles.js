function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')" style="cursor:pointer;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p>${art.description}</p>
            </div>
        </div>
    `).join('');
}

// FONCTION POUR OUVRIR LA FENÊTRE
function openArticle(id) {
    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <img src="${article.image}">
        <h2 style="color:#4a0404">${article.title}</h2>
        <p style="color:#d4af37"><b>${article.category}</b></p>
        <hr>
        <div style="line-height:1.6; font-size:1.1rem; color:#333;">
            ${article.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Empêche le fond de bouger
}

// FONCTION POUR FERMER
function closeArticle() {
    document.getElementById('articleModal').style.display = "none";
    document.body.style.overflow = "auto"; // Réactive le scroll du fond
}

// Fermer si on clique à côté de la boîte
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeArticle();
    }
}

window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
    }
};