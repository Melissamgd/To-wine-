let catalogueVins = [];
let quizActive = false;
let quizStep = 0;
let userPreferences = { type: "", intensite: "" };

// 1. Chargement du catalogue
fetch('vins.json')
    .then(r => r.json())
    .then(data => catalogueVins = data);

// 2. Lancer le Quiz
function startQuiz() {
    quizActive = true;
    quizStep = 1;
    appendMessage("C'est parti ! 🍷 Question 1 : Préférez-vous les saveurs sucrées (chocolat, fruits mûrs) ou fraîches (agrumes, pomme verte) ?", 'bot');
}

// 3. Envoyer un message
function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage(msg, 'user');
    input.value = "";

    setTimeout(() => {
        // Si le message contient des mots clés de vin mais qu'on n'est pas en quiz
        if (!quizActive) {
            const response = generateGeneralResponse(msg.toLowerCase());
            appendMessage(response, 'bot');
        } else {
            handleQuizLogic(msg.toLowerCase());
        }
    }, 800);
}

// 4. Logique du Quiz
function handleQuizLogic(text) {
    if (quizStep === 1) {
        userPreferences.type = (text.includes("sucré") || text.includes("chocolat")) ? "Rouge" : "Blanc";
        quizStep = 2;
        appendMessage("Noté ! Question 2 : Aimez-vous les saveurs fortes (café noir) ou légères (thé vert) ?", 'bot');
    } 
    else if (quizStep === 2) {
        userPreferences.intensite = (text.includes("fort") || text.includes("caractère")) ? "puissant" : "léger";
        quizStep = 3;
        appendMessage("Dernière question : C'est pour un apéritif entre amis ou un grand dîner ?", 'bot');
    }
    else if (quizStep === 3) {
        quizActive = false;
        showFinalRecommendation();
    }
}

// 5. Recommandation avec IMAGE
function showFinalRecommendation() {
    // On cherche un vin qui correspond au type choisi
    const vinTrouve = catalogueVins.find(v => v.type === userPreferences.type) || catalogueVins[0];
    
    appendMessage(`D'après votre profil, il vous faut un vin ${userPreferences.intensite}. Voici ma sélection :`, 'bot');
    
    // On injecte du HTML pour la photo
    const chatWindow = document.getElementById('chat-window');
    const card = document.createElement('div');
    card.classList.add('message', 'bot');
    card.style.background = "#fff";
    card.style.color = "#333";
    card.style.border = "1px solid #c5a059";

    card.innerHTML = `
        <img src="${vinTrouve.image || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:10px; margin-bottom:10px;">
        <strong style="color:#4a0404; font-size:1.1rem;">${vinTrouve.nom || vinTrouve.name}</strong><br>
        <span style="font-size:0.9rem;">${vinTrouve.region} - ${vinTrouve.annee || ''}</span><br>
        <p style="font-size:0.85rem; margin-top:5px; font-style:italic;">"${vinTrouve.caracteristique || 'Un choix parfait pour vous.'}"</p>
    `;
    chatWindow.appendChild(card);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 6. Réponses aux questions hors quiz
function generateGeneralResponse(text) {
    if (text.includes("pétrus") || text.includes("petrus")) return "Le Pétrus est l'un des plus grands vins de Bordeaux (Pomerol). C'est un 100% Merlot, connu pour sa complexité incroyable.";
    if (text.includes("bordeaux")) return "Bordeaux est célèbre pour ses rouges puissants (Cabernet-Sauvignon/Merlot). Voulez-vous que je cherche un Bordeaux précis dans notre catalogue ?";
    if (text.includes("température")) return "En général : 16-18°C pour les rouges, et 10-12°C pour les blancs.";
    return "C'est une question intéressante ! Je ne la connais pas encore par cœur, mais je peux vous proposer le quiz pour trouver le vin qui vous correspond ?";
}

function appendMessage(text, side) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', side);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}