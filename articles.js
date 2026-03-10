// Affiche les articles dans la grille HTML
function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="openArticle('${art.id}')">
            <img src="${art.image}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;">
            <p style="color:#d4af37; font-weight:bold; font-size:0.8rem; margin-top:10px;">${art.category}</p>
            <h3>${art.title}</h3>
            <p style="color:#666; font-size:0.9rem;">${art.description}</p>
        </div>
    `).join('');
}

// Ouvre l'article complet dans la Modal
function openArticle(id) {
    const art = knowledgeBase.find(a => a.id === id);
    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <h2>${art.title}</h2>
        <p style="color:#d4af37;">${art.category} | ${art.tags.join(', ')}</p>
        <hr>
        <p style="font-size:1.1rem; line-height:1.6;">${art.content}</p>
    `;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('articleModal').style.display = "none";
}

// Recherche temps réel
function searchArticles() {
    const term = document.getElementById('articleSearch').value.toLowerCase();
    const filtered = knowledgeBase.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.description.toLowerCase().includes(term) ||
        a.tags.some(t => t.toLowerCase().includes(term))
    );
    displayArticles(filtered);
}

// Filtres boutons
function filterByTag(tag) {
    // Style boutons
    document.querySelectorAll('.tag-pill').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = (tag === 'all') ? knowledgeBase : knowledgeBase.filter(a => a.tags.includes(tag) || a.category === tag);
    displayArticles(filtered);
}

// CHARGEMENT INITIAL
window.onload = () => {
    displayArticles(knowledgeBase);
};