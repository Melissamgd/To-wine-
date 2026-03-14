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
            if (msg.toLowerCase().includes("quiz")) startQuiz();
            else appendMessage(generateResponse(msg.toLowerCase()), 'bot');
        }
    }, 1000);
}

function startQuiz() {
    quizActive = true;
    quizStep = 1;
    userChoices = [];
    appendMessage("C'est parti ! 🥂 Question 1 : Préférez-vous l'intensité d'un café noir ou la douceur d'un thé aux fruits ?", 'bot');
}

function handleQuiz(text) {
    if (quizStep === 1) {
        if (text.includes("café")) { scores.puissant += 2; userChoices.push("amateur d'intensité"); }
        else { scores.leger += 2; userChoices.push("adepte de finesse"); }
        quizStep = 2;
        appendMessage("Noté. Question 2 : Êtes-vous plutôt agrumes frais ou fruits rouges bien juteux ?", 'bot');
    } 
    else if (quizStep === 2) {
        if (text.includes("agrume")) { scores.blanc += 2; userChoices.push("fan de fraîcheur"); }
        else { scores.rouge += 2; userChoices.push("gourmand de fruits mûrs"); }
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
        
        card.innerHTML = `
            <strong style="color:#4a0404; font-size:1.1rem;">${vin.nom}</strong><br>
            <span style="color:#c5a059; font-weight:bold; font-size:0.8rem;">${vin.region} • ${vin.type}</span><br>
            <p style="font-size:0.9rem; margin-top:8px;">
                <strong>Pourquoi ce choix ?</strong> Ce vin s'accorde avec votre profil ${scores.puissant > scores.leger ? 'puissant' : 'délicat'}. ${vin.caracteristique}
            </p>
            <button onclick="location.href='fiche.html'" style="width:100%; background:#4a0404; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; margin-top:10px;">Voir au catalogue</button>
        `;
        chatWindow.appendChild(card);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}

function generateResponse(text) {
    if (text.includes("bonjour")) return "Bonjour ! Je suis Vina. Cliquez sur le bouton doré pour lancer mon quiz !";
    return "Je ne suis pas sûre de comprendre, mais mon quiz est là pour vous aider !";
}

function appendMessage(text, side) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${side}`;
    msgDiv.innerText = text;
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