import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, runTransaction } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// =================================================================
// ===== IMPORTANTE: COLOQUE SEU LINK DO WHATSAPP AQUI DENTRO =====
// =================================================================
const SEU_LINK_DO_WHATSAPP = "https://chat.whatsapp.com/G0mO8bBMFbfCV9zt9i7omA?mode=wwt";
// =================================================================

// 2. Cole seu firebaseConfig aqui (o mesmo de antes)
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
const analytics = getAnalytics(app);

// 4. Função para ATUALIZAR o contador (Transação Segura)
function incrementClick(ref) {
    runTransaction(ref, (currentValue) => {
        return (currentValue || 0) + 1;
    });
}

// 5. Lógica de Execução Imediata
function redirecionar() {
    try {
        // Define as referências do banco de dados
        const pageViewRef = ref(database, 'views/homepage');
        const waCountRef = ref(database, 'clicks/whatsapp');

        // Dispara os eventos de contagem e análise
        
        // Conta +1 na visita
        incrementClick(pageViewRef); 
        
        // Conta +1 no clique do WhatsApp (pois o acesso é o clique)
        incrementClick(waCountRef);
        
        // Registra o evento no Analytics (para localização)
        logEvent(analytics, 'click_whatsapp', { button_label: 'whatsapp_redirect' });

    } catch (error) {
        console.error("Erro ao registrar no Firebase:", error);
        // Continua para o redirecionamento mesmo se o firebase falhar
    } finally {
        // Redireciona o usuário para o WhatsApp
        // Usamos replace() para que o usuário não possa "voltar" para a página de redirecionamento
        console.log("Redirecionando para:", SEU_LINK_DO_WHATSAPP);
        window.location.replace(SEU_LINK_DO_WHATSAPP);
    }
}

// Executa a função assim que o script carregar
redirecionar();