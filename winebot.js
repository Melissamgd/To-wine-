let catalogueVins = [];
let quizActive = false;
let quizStep = 0;
let userChoices = [];
let scores = { rouge: 0, blanc: 0, puissant: 0, leger: 0 };

fetch('vins.json').then(r => r.json()).then(data => catalogueVins = data);

function sendMessage() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage(msg, 'user');
    input.value = "";

    showTyping();
    setTimeout(() => {
        hideTyping();
        if (quizActive) {
            handleQuiz(msg.toLowerCase());
        } else {
            // Ici, on redirige tout vers l'incitation au quiz
            if (msg.toLowerCase().includes("quiz") || msg.toLowerCase().includes("lancer") || msg.toLowerCase().includes("commencer")) {
                startQuiz();
            } else {
                appendMessage(generateResponse(msg.toLowerCase()), 'bot');
            }
        }
    }, 1000);
}

function startQuiz() {
    quizActive = true;
    quizStep = 1;
    // On remet les scores à zéro si on recommence
    scores = { rouge: 0, blanc: 0, puissant: 0, leger: 0 };
    userChoices = [];
    appendMessage("C'est parti ! 🥂 Question 1 : Préférez-vous l'intensité d'un café noir ou la douceur d'un thé aux fruits ?", 'bot');
}

function handleQuiz(text) {
    if (quizStep === 1) {
        if (text.includes("café") || text.includes("noir") || text.includes("intensité")) { 
            scores.puissant += 2; userChoices.push("amateur d'intensité"); 
        } else { 
            scores.leger += 2; userChoices.push("adepte de finesse"); 
        }
        quizStep = 2;
        appendMessage("Noté. Question 2 : Êtes-vous plutôt agrumes frais ou fruits rouges bien juteux ?", 'bot');
    } 
    else if (quizStep === 2) {
        if (text.includes("agrume") || text.includes("frais")) { 
            scores.blanc += 2; userChoices.push("fan de fraîcheur"); 
        } else { 
            scores.rouge += 2; userChoices.push("gourmand de fruits mûrs"); 
        }
        quizStep = 3;
        appendMessage("Dernière question : Préférez-vous un apéritif convivial ou un dîner gastronomique ?", 'bot');
    }
    else if (quizStep === 3) {
        quizActive = false;
        showResult(text);
    }
}

function showResult(lastText) {
    const type = scores.rouge >= scores.blanc ? "Rouge" : "Blanc";
    const vin = catalogueVins.find(v => v.type === type) || catalogueVins[0];
    
    appendMessage(`Analyse terminée ! Comme vous êtes ${userChoices[0]} et ${userChoices[1]}, j'ai trouvé la perle rare.`, 'bot');

    setTimeout(() => {
        const chatWindow = document.getElementById('chat-window');
        const card = document.createElement('div');
        card.className = 'message bot';
        card.style.border = "1px solid #c5a059";
        card.style.background = "#fff";
        card.style.color = "#333";
        card.style.padding = "15px";
        card.style.borderRadius = "10px";
        
        card.innerHTML = `
            <strong style="color:#4a0404; font-size:1.1rem;">${vin.nom}</strong><br>
            <span style="color:#c5a059; font-weight:bold; font-size:0.8rem;">${vin.region} • ${vin.type}</span><br>
            <p style="font-size:0.9rem; margin-top:8px;">
                <strong>Pourquoi ce choix ?</strong> Ce vin s'accorde avec votre profil ${scores.puissant > scores.leger ? 'puissant' : 'délicat'}. ${vin.caracteristique}
            </p>
            <button onclick="location.href='fiche.html'" style="width:100%; background:#4a0404; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer; margin-top:10px; font-family:'Cinzel';">Voir au catalogue</button>
        `;
        chatWindow.appendChild(card);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}

// MODIFICATION ICI : On change les textes pour inciter uniquement au Quiz
function generateResponse(text) {
    if (text.includes("bonjour") || text.includes("salut")) {
        return "Bonjour ! Je suis Vina. Pour que je puisse vous conseiller, laissez-vous guider par mon Quiz Profil en cliquant sur le bouton doré ci-dessus ! ✨";
    }
    return "Je préfère ne pas faire de devinettes ! Pour découvrir votre vin idéal, cliquez sur le bouton 'Lancer le Quiz Profil' ou écrivez 'Quiz'. 🍷";
}

function appendMessage(text, side) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${side}`;
    // Support du gras (**) dans les messages
    msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping() {
    const chatWindow = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'message bot';
    div.innerHTML = "<span class='dot'>.</span><span class='dot'>.</span><span class='dot'>.</span>";
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
}

document.getElementById('user-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });