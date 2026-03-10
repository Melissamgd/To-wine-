function searchArticles() {
    // 1. On récupère ce que l'utilisateur a tapé
    const term = document.getElementById('articleSearch').value.toLowerCase();
    
    // 2. On filtre la base de données (knowledgeBase est dans articles_data.js)
    const filtered = knowledgeBase.filter(art => {
        return art.title.toLowerCase().includes(term) || 
               art.description.toLowerCase().includes(term) ||
               art.content.toLowerCase().includes(term) ||
               art.tags.some(tag => tag.toLowerCase().includes(term));
    });

    // 3. On ré-affiche la grille avec les résultats filtrés
    displayArticles(filtered);
}

function filterByTag(tag) {
    // Mise à jour visuelle des boutons
    const buttons = document.querySelectorAll('.tag-pill');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Ajoute la classe active au bouton cliqué
    event.target.classList.add('active');

    // Filtrage
    const filtered = (tag === 'all') 
        ? knowledgeBase 
        : knowledgeBase.filter(art => art.tags.includes(tag));
    
    displayArticles(filtered);
}