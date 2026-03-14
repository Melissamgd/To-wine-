let catalogueVins = [];
let quizActive = false;
let quizStep = 0;
let userChoices = [];
let scores = { rouge: 0, blanc: 0, puissant: 0, leger: 0 };

// 1. Chargement du catalogue avec gestion d'erreur
fetch('vins.json')
    .then(r => {
        if (!r.ok) throw new Error("Erreur de chargement du JSON");
        return r.json();
    })
    .then(data => catalogueVins = data)
    .catch(err => console.error("Vina n'a pas pu charger sa cave :", err));

// 2. Fonction pour envoyer un message
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    input.value = "";

    // Vina "réfléchit"
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        if (quizActive) {
            handleQuizLogic(message.toLowerCase());
        } else {
            if (message.toLowerCase().includes("quiz") || message.toLowerCase().includes("commencer")) {
                startQuiz();
            } else {
                appendMessage(generateGeneralResponse(message.toLowerCase()), 'bot');
            }
        }
    }, 1000);
}

// 3. Lancer le Quiz
function startQuiz() {
    quizActive = true;
    quizStep = 1;
    userChoices = [];
    scores = { rouge: 0, blanc: 0, puissant: 0, leger: 0 };
    appendMessage("C'est parti ! 🥂 Pour commencer, parlez-moi de votre palais : préférez-vous l'intensité d'un café noir ou la douceur d'un chocolat ?", 'bot');
}

// 4. Logique du Quiz améliorée
function handleQuizLogic(text) {
    if (quizStep === 1) {
        if (text.match(/café|noir|fort|amer|puissant/)) {
            scores.puissant += 2;
            userChoices.push("amateur de sensations fortes");
        } else {
            scores.leger += 2;
            userChoices.push("adepte de finesse");
        }
        quizStep = 2;
        appendMessage("Je vois ! Et côté fruits : vous êtes plutôt agrumes acidulés ou fruits rouges bien juteux ?", 'bot');
    } 
    else if (quizStep === 2) {
        if (text.match(/agrume|citron|frais|acide/)) {
            scores.blanc += 2;
            userChoices.push("amateur de fraîcheur");
        } else {
            scores.rouge += 2;
            userChoices.push("gourmand de fruits mûrs");
        }
        quizStep = 3;
        appendMessage("Dernière question pour mon cerveau de bouteille : préférez-vous un apéritif décontracté ou un grand dîner aux chandelles ?", 'bot');
    }
    else if (quizStep === 3) {
        if (text.match(/dîner|repas|gastronomie|chandelle/)) scores.puissant += 1; 
        else scores.leger += 1;
        
        userChoices.push(text.match(/dîner|repas/) ? "gastronome" : "épicurien convivial");
        quizActive = false;
        showFinalRecommendation();
    }
}

// 5. Recommandation Finale avec "Explication Sommelier"
function showFinalRecommendation() {
    const typeIdeal = scores.rouge >= scores.blanc ? "Rouge" : "Blanc";
    const profilTexture = scores.puissant >= scores.leger ? "charpenté" : "soyeux";
    
    // On cherche le vin le plus proche du type
    const vin = catalogueVins.find(v => v.type === typeIdeal) || catalogueVins[0];
    
    appendMessage(`Analyse terminée ! Votre profil est celui d'un ${userChoices[2]} ${profilTexture}.`, 'bot');

    setTimeout(() => {
        const chatWindow = document.getElementById('chat-window');
        const card = document.createElement('div');
        card.className = 'wine-card-bot';
        card.style.cssText = "border: 2px solid #c5a059; padding: 20px; background: white; border-radius: 15px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);";

        card.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center; margin-bottom:15px;">
                <img src="${vin.image}" style="width:70px; border-radius:5px; object-fit:cover;">
                <div>
                    <h3 style="color:#4a0404; margin:0; font-family:'Cinzel'; font-size:1.1rem;">${vin.nom}</h3>
                    <p style="color:#c5a059; font-weight:bold; font-size:0.75rem; margin:2px 0; text-transform:uppercase;">${vin.region} • ${vin.type}</p>
                </div>
            </div>
            <p style="font-size:0.9rem; line-height:1.4; color:#333;">
                <strong>Pourquoi pour vous ?</strong> En tant que ${userChoices[0]}, vous apprécierez la structure de ce vin. Son côté ${profilTexture} s'accorde parfaitement avec votre préférence pour les ${userChoices[1]}.
            </p>
            <div style="background:#fdfaf5; padding:10px; border-left:3px solid #c5a059; font-style:italic; font-size:0.85rem; margin-top:10px;">
                "${vin.caracteristique}"
            </div>
            <button onclick="location.href='fiche.html'" style="width:100%; margin-top:15px; background:#4a0404; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer; font-weight:bold;">
                Voir dans le catalogue
            </button>
        `;
        chatWindow.appendChild(card);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Optionnel : Lancer des confettis ici si tu as une librairie
    }, 1200);
}

// --- Fonctions Utilitaires ---

function generateGeneralResponse(text) {
    if (text.includes("bonjour") || text.includes("coucou")) return "Bonjour ! Je suis Vina. Prêt(e) à découvrir votre vin idéal ? Tapez 'quiz' ou cliquez sur le bouton doré !";
    if (text.includes("merci")) return "Avec plaisir ! C'est mon rôle de bouteille savante. 🍷";
    return "Je ne suis pas sûre de comprendre, mais mon quiz est infaillible pour vous conseiller ! On tente ?";
}

function appendMessage(text, side) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${side}`;
    msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Support du gras **texte**
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    const chatWindow = document.getElementById('chat-window');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = "<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span>";
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Touche Entrée
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});