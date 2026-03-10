// Affiche les articles dans la grille
function displayArticles(list) {
    const grid = document.getElementById('articles-grid');
    grid.innerHTML = list.map(art => `
        <div class="wine-card" onclick="openArticle('${art.id}')">
            <img src="${art.image}" class="card-img">
            <div class="card-info">
                <span class="cat">${art.category}</span>
                <h3>${art.title}</h3>
                <p>${art.description}</p>
            </div>
        </div>
    `).join('');
}

// Ouvre la fenêtre de l'article
function openArticle(id) {
    const art = knowledgeBase.find(item => item.id === id);
    const modal = document.getElementById('articleModal');
    const body = document.getElementById('modalBody');
    
    body.innerHTML = `
        <img src="${art.image}" style="width:100%; border-radius:10px;">
        <h2 style="color:#4a0404; margin-top:20px;">${art.title}</h2>
        <p style="font-style:italic; color:#d4af37;">${art.category}</p>
        <div style="line-height:1.6; margin-top:20px;">${art.content}</div>
    `;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('articleModal').style.display = "none";
}

function sendFeedback(type) {
    alert(type === 'yes' ? "Merci pour votre retour positif !" : "Merci, nous allons améliorer cet article.");
}

// Lancement
window.onload = () => displayArticles(knowledgeBase);