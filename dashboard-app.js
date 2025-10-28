// 1. Importe as funções que precisamos (só precisamos ler)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// 2. Cole seu firebaseConfig aqui (O MESMO do outro arquivo)
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

// 4. Referências aos contadores no banco de dados
const waCountRef = ref(database, 'clicks/whatsapp');
const tgCountRef = ref(database, 'clicks/telegram');

// 5. Referências aos elementos na tela do dashboard
const waDashElement = document.getElementById('dash-count-whatsapp');
const tgDashElement = document.getElementById('dash-count-telegram');

// 6. Funções para LER os valores e ATUALIZAR O DASHBOARD
onValue(waCountRef, (snapshot) => {
    const count = snapshot.val() || 0; // Se for null, mostra 0
    waDashElement.innerText = count;
});

onValue(tgCountRef, (snapshot) => {
    const count = snapshot.val() || 0; // Se for null, mostra 0
    tgDashElement.innerText = count;
});
