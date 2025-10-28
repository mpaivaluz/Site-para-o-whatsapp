// 1. Importe as funções que precisamos
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// NOVIDADE: Importar o Analytics e a função de logar eventos
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// 2. Cole seu firebaseConfig aqui
const firebaseConfig = {
    apiKey: "AIzaSyCd66EXo37ZfwEslCbIeakwJPlEZfwO_CQ",
    authDomain: "contador-grupos.firebaseapp.com",
    databaseURL: "https://contador-grupos-default-rtdb.firebaseio.com", 
    projectId: "contador-grupos",
    storageBucket: "contador-grupos.firebasestorage.app",
    messagingSenderId: "669833617777",
    appId: "1:669833617777:web:894cfa699ed4d8eb92d6d0",
    measurementId: "G-QNNC8HSHW0"
};

// 3. Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// NOVIDADE: Inicializar o Analytics
const analytics = getAnalytics(app);

// 4. Referências aos contadores de CLIQUE no banco de dados e na tela
const waCountRef = ref(database, 'clicks/whatsapp');
const tgCountRef = ref(database, 'clicks/telegram');
const waCountElement = document.getElementById('count-whatsapp');
const tgCountElement = document.getElementById('count-telegram');

// 5. Referências aos botões
const waButton = document.getElementById('btn-whatsapp');
const tgButton = document.getElementById('btn-telegram');

// 6. Função para ATUALIZAR o contador (Transação Segura)
function incrementClick(ref) {
    runTransaction(ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
}

// 7. Adiciona os "escutadores" de clique nos botões
waButton.addEventListener('click', () => {
    // 1. Incrementa o contador no Realtime Database
    incrementClick(waCountRef);
    // NOVIDADE: 2. Registra o evento no Analytics
    logEvent(analytics, 'click_whatsapp', { button_label: 'whatsapp_group' });
});
tgButton.addEventListener('click', () => {
    // 1. Incrementa o contador no Realtime Database
    incrementClick(tgCountRef);
    // NOVIDADE: 2. Registra o evento no Analytics
    logEvent(analytics, 'click_telegram', { button_label: 'telegram_group' });
});

// 8. Funções para LER os valores de CLIQUE e ATUALIZAR A TELA
onValue(waCountRef, (snapshot) => {
    const count = snapshot.val() || 0;
    waCountElement.innerText = count;
});
onValue(tgCountRef, (snapshot) => {
    const count = snapshot.val() || 0;
    tgCountElement.innerText = count;
});

const pageViewRef = ref(database, 'views/homepage');
incrementClick(pageViewRef);

