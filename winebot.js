let catalogueVins = [];
let quizActive = false;
let quizStep = 0;
let scores = { rouge: 0, blanc: 0, puissant: 0, leger: 0 };

// 1. Chargement du catalogue
fetch('vins.json')
    .then(r => r.json())
    .then(data => catalogueVins = data)
    .catch(err => console.error("Erreur chargement vins:", err));

// 2. Gestion de l'envoi de message
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message === "") return;

    // Afficher le message de l'utilisateur
    appendMessage(message, 'user');
    input.value = "";

    // Simuler un temps de réflexion (800ms)
    setTimeout(() => {
        let response;
        const msg = message.toLowerCase();

        // SI le quiz est actif, on traite la réponse
        if (quizActive) {
            handleQuizLogic(msg);
        }
        // SINON on cherche des mots clés ou on lance le quiz
        else {
            if (msg.includes("quiz") || msg.includes("vin idéal") || msg.includes("proposer")) {
                startQuiz();
            } else if (msg.includes("bonjour") || msg.includes("salut")) {
                response = "Bonjour à vous ! Je suis Vina. Je peux vous conseiller sur un accord mets-vins ou vous proposer mon quiz pour trouver le vin de vos rêves. Voulez-vous tenter ?";
                appendMessage(response, 'bot');
            } else if (msg.includes("bordeaux") || msg.includes("petrus")) {
                response = "Le Pétrus est un Pomerol (Bordeaux) mythique. Dans notre catalogue, nous avons plusieurs Bordeaux d'exception. Voulez-vous que je cherche un profil précis pour vous ?";
                appendMessage(response, 'bot');
            } else {
                response = "C'est une excellente question ! Mon cerveau de bouteille n'a pas encore la réponse exacte, mais je peux vous proposer mon quiz pour définir votre profil ?";
                appendMessage(response, 'bot');
            }
        }
    }, 800);
}

// 3. Logique du Quiz
function startQuiz() {
    quizActive = true;
    quizStep = 1;
    appendMessage("C'est parti ! 🍷 Question 1 : Le matin, vous êtes plutôt café noir corsé ou thé vert délicat ?", 'bot');
}

function handleQuizLogic(text) {
    if (quizStep === 1) {
        if (text.includes("café") || text.includes("corsé")) scores.puissant += 2; else scores.leger += 2;
        quizStep = 2;
        appendMessage("Noté ! Question 2 : Pour le dessert, vous préférez un fondant au chocolat amer ou une tarte au citron acide ?", 'bot');
    } 
    else if (quizStep === 2) {
        if (text.includes("chocolat") || text.includes("amer")) scores.rouge += 2; else scores.blanc += 2;
        quizStep = 3;
        appendMessage("Dernière question : Quel est votre ambiance préférée : un feu de cheminée cosy ou une terrasse au soleil ?", 'bot');
    }
    else if (quizStep === 3) {
        if (text.includes("feu") || text.includes("cosy")) scores.puissant += 1; else scores.leger += 1;
        quizActive = false;
        showFinalRecommendation();
    }
}

// 4. Recommandation Visuelle (Card avec Photo)
function showFinalRecommendation() {
    const chatWindow = document.getElementById('chat-window');
    const typeIdéal = scores.rouge >= scores.blanc ? "Rouge" : "Blanc";
    
    // On cherche un vin qui correspond au type choisi
    const vinTrouve = catalogueVins.find(v => v.type === typeIdéal) || catalogueVins[0];
    
    appendMessage("Merci ! Mon analyse est terminée. Voici le vin qui est fait pour votre palais :", 'bot');
    
    // Création de la card HTML pour le vin
    const card = document.createElement('div');
    card.classList.add('wine-card-bot');
    
    // On pioche dans vins.json (on vérifie les noms des clés : nom, region, image)
    card.innerHTML = `
        <img src="${vinTrouve.image}" style="width: 80px; border-radius: 10px;">
        <div>
            <strong style="color: #4a0404; font-family: 'Cinzel';">${vinTrouve.nom}</strong><br>
            <span style="font-size: 0.85rem; color: #c5a059;">${vinTrouve.region} - ${vinTrouve.type}</span><br>
            <p style="font-size: 0.8rem; margin-top: 5px; font-family: 'Playfair Display'; font-style: italic;">
                "${vinTrouve.caracteristique || 'Une expérience inoubliable pour votre palais.'}"
            </p>
        </div>
    `;
    
    chatWindow.appendChild(card);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll vers le bas
}

// 5. Affichage des messages
function appendMessage(text, side) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', side);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 6. Touche "Entrée"
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});