// Fonction pour créer la carte HTML d'un article
function createArticleCard(art) {
    return `
        <div class="wine-card" style="background: white; border: 1px solid #eee; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <img src="${art.image}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 5px;">
            <p style="color: #d4af37; font-size: 0.8rem; margin-top: 10px; font-weight: bold;">${art.category.toUpperCase()}</p>
            <h3 style="color: #4a0404; margin: 10px 0;">${art.title}</h3>
            <p style="font-size: 0.9rem; color: #555;">${art.description}</p>
            <div style="margin-top: 15px;">
                ${art.tags.map(t => `<span style="background: #f4f4f4; padding: 3px 8px; border-radius: 10px; font-size: 0.7rem; margin-right: 5px;">#${t}</span>`).join('')}
            </div>
        </div>
    `;
}

// Affichage initial
function displayArticles(list) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    grid.innerHTML = list.map(art => createArticleCard(art)).join('');
}

// Logique de la recherche
function searchArticles() {
    const value = document.getElementById('articleSearch').value.toLowerCase();
    const result = knowledgeBase.filter(art => 
        art.title.toLowerCase().includes(value) || 
        art.description.toLowerCase().includes(value) ||
        art.tags.some(t => t.toLowerCase().includes(value))
    );
    displayArticles(result);
}

// Logique des filtres par boutons
function filterByTag(tagName) {
    // Style visuel des boutons
    const btns = document.querySelectorAll('.tag-pill');
    btns.forEach(b => b.classList.remove('active'));
    if(event) event.target.classList.add('active');

    if(tagName === 'all') {
        displayArticles(knowledgeBase);
    } else {
        const result = knowledgeBase.filter(art => art.tags.includes(tagName) || art.category === tagName);
        displayArticles(result);
    }
}

// Lancer l'affichage dès que la page est chargée
window.onload = () => displayArticles(knowledgeBase);