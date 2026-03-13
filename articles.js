function displayArticles(data) {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    grid.innerHTML = data.map(art => `
        <div class="article-card" onclick="goToArticle('${art.id}')">
            <img src="${art.image}" class="card-img" alt="${art.title}">
            <div class="card-content">
                <span class="card-category">${art.category}</span>
                <h3 class="card-title">${art.title}</h3>
                <p style="font-size: 0.9rem; color: #666;">${art.description}</p>
            </div>
        </div>
    `).join('');
}

function goToArticle(id) {
    window.location.href = `article-detail.html?id=${id}`;
}

window.onload = () => {
    if (typeof knowledgeBase !== 'undefined') {
        displayArticles(knowledgeBase);
    }
};