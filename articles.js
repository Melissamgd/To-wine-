// 1. Affichage des cartes d'articles dans le carrousel
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')" style="cursor:pointer;">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category" style="color:#c5a059; font-size:0.8rem; font-weight:bold;">${art.category}</span>
                <h3 class="card-title" style="color:#4a0404; margin:10px 0;">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666; white-space: normal;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

// 2. Défilement automatique fluide (Correction du tremblement)
function startAutoScroll() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    setInterval(() => {
        // On avance d'un pixel
        grid.scrollLeft += 1;

        // Calcul de la fin du scroll avec une marge de sécurité de 5px pour éviter le tremblement
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        
        if (grid.scrollLeft >= maxScroll - 5) {
            grid.scrollLeft = 0; // On revient au début proprement
        }
    }, 30); // Vitesse de 30ms pour un mouvement fluide
}

// 3. Ouverture de la fenêtre d'infos (Modal)
function openArticle(id) {
    if (typeof knowledgeBase === 'undefined') return;

    const article = knowledgeBase.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modal-body');

    // Contenu de la fenêtre avec support du scroll (swipe) vers le bas
    body.innerHTML = `
        <img src="${article.image}" style="width:100%; border-radius:10px; margin-bottom:20px;">
        <h2 style="font-family: 'Cinzel', serif; color:#4a0404; margin-bottom:10px;">${article.title}</h2>
        <p style="color:#c5a059; text-transform:uppercase; font-size:0.8rem; font-weight:bold; letter-spacing:1px; margin-bottom:20px;">
            ${article.category}
        </p>
        <hr style="border:0; border-top:1px solid #eee; margin-bottom:20px;">
        <div class="article-full-text" style="font-family: 'Playfair Display', serif; line-height:1.8; font-size:1.1rem; color:#333;">
            ${article.content}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Empêche le scroll de la page principale
}

// 4. Fermeture de la fenêtre
function closeArticle() {
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Réactive le scroll de la page principale
    }
}

// 5. Fermer si on clique sur le fond sombre
window.onclick = function(event) {
    const modal = document.getElementById('articleModal');
    if (event.target == modal) {
        closeArticle();
    }
};

// 6. Lancement au chargement de la page
window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
        startAutoScroll();
    }
};