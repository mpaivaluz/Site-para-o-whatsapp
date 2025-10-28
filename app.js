// 1. Importe as funções que precisamos do Firebase v9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// 2. Seu firebaseConfig que você pegou (copiado exatamente)
const firebaseConfig = {
    apiKey: "AIzaSyCd66EXo37ZfwEslCbIeakwJPlEZfwO_CQ",
    authDomain: "contador-grupos.firebaseapp.com",
    // O Realtime Database precisa do databaseURL, que não veio no seu config.
    // Você pode pegar no console do Firebase, na seção Realtime Database.
    // Geralmente é assim:
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

// 4. Referências aos contadores no banco de dados e na tela
const waCountRef = ref(database, 'clicks/whatsapp');
const tgCountRef = ref(database, 'clicks/telegram');

const waCountElement = document.getElementById('count-whatsapp');
const tgCountElement = document.getElementById('count-telegram');

// 5. Referências aos botões
const waButton = document.getElementById('btn-whatsapp');
const tgButton = document.getElementById('btn-telegram');

// 6. Função para ATUALIZAR o contador quando alguém clica
function incrementClick(countRef) {
    // Usa "runTransaction" (a versão v9 de "transaction")
    runTransaction(countRef, (currentValue) => {
        // Se o valor nunca foi setado (null), começa em 1.
        // Se já existe, apenas soma 1.
        return (currentValue || 0) + 1;
    });
}

// 7. Adiciona os "escutadores" de clique nos botões
waButton.addEventListener('click', (e) => {
    incrementClick(waCountRef);
});

tgButton.addEventListener('click', (e) => {
    incrementClick(tgCountRef);
});

// 8. Funções para LER os valores do banco de dados (usando onValue)
onValue(waCountRef, (snapshot) => {
    const count = snapshot.val() || 0; // Se for null, mostra 0
    waCountElement.innerText = count;
});

onValue(tgCountRef, (snapshot) => {
    const count = snapshot.val() || 0; // Se for null, mostra 0
    tgCountElement.innerText = count;
});

const pageViewRef = ref(database, 'views/homepage');
incrementClick(pageViewRef);