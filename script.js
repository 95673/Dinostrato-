/* ===================================================
   1. CONTROLO DO SLIDESHOW AUTOMÁTICO & MANUAL
=================================================== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
let slideInterval;

function mostrarSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");
}

function mudarSlide(n) {
    clearInterval(slideInterval); // Pausa o automático ao clicar
    slideIndex += n;
    mostrarSlide(slideIndex);
    iniciarSlideAuto(); // Reinicia
}

function iniciarSlideAuto() {
    slideInterval = setInterval(() => {
        slideIndex++;
        mostrarSlide(slideIndex);
    }, 5000);
}

// Inicia o slideshow automático ao carregar
iniciarSlideAuto();


/* ===================================================
   2. VALIDAÇÃO DO FORMULÁRIO DE CONTACTO (JS)
=================================================== */
function validarFormulario(event) {
    event.preventDefault(); // Impede recarregamento da página

    let formValido = true;
    limparErros();

    // Elementos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Validação do Nome
    if (nome === "") {
        exibirErro("erro-nome", "O campo Nome é obrigatório.");
        formValido = false;
    } else if (nome.length < 3) {
        exibirErro("erro-nome", "O nome deve conter pelo menos 3 caracteres.");
        formValido = false;
    }

    // Validação do E-mail (Regex de e-mail válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        exibirErro("erro-email", "O campo E-mail é obrigatório.");
        formValido = false;
    } else if (!emailRegex.test(email)) {
        exibirErro("erro-email", "Insira um endereço de e-mail válido.");
        formValido = false;
    }

    // Validação do Assunto
    if (assunto === "") {
        exibirErro("erro-assunto", "O campo Assunto é obrigatório.");
        formValido = false;
    }

    // Validação da Mensagem
    if (mensagem === "") {
        exibirErro("erro-mensagem", "A Mensagem não pode estar vazia.");
        formValido = false;
    } else if (mensagem.length < 10) {
        exibirErro("erro-mensagem", "A mensagem deve ter pelo menos 10 caracteres.");
        formValido = false;
    }

    // Sucesso
    if (formValido) {
        alert("Obrigado! A sua mensagem foi enviada com sucesso.");
        document.getElementById("contactForm").reset();
        limparErros();
    }

    return formValido;
}

function exibirErro(elementoId, mensagem) {
    document.getElementById(elementoId).innerText = mensagem;
}

function limparErros() {
    const erros = document.querySelectorAll(".error-msg");
    erros.forEach(e => e.innerText = "");
}


/* ===================================================
   3. AGENTE IA / CHATBOT DE TURISMO
=================================================== */
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatCloseBtn = document.getElementById("chatCloseBtn");
const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// Abrir e fechar o chat
chatToggleBtn.addEventListener("click", () => chatWindow.classList.toggle("open"));
chatCloseBtn.addEventListener("click", () => chatWindow.classList.remove("open"));

function handleChatEnter(event) {
    if (event.key === "Enter") {
        enviarMensagemChat();
    }
}

function enviarMensagemChat() {
    const texto = chatInput.value.trim();
    if (!texto) return;

    // 1. Adicionar mensagem do utilizador
    adicionarMensagem(texto, "user");
    chatInput.value = "";

    // 2. Resposta da IA com delay simulado
    setTimeout(() => {
        const resposta = processarRespostaIA(texto.toLowerCase());
        adicionarMensagem(resposta, "bot");
    }, 600);
}

function adicionarMensagem(texto, tipo) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${tipo}`;
    msgDiv.innerHTML = texto;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Base de Conhecimento e Lógica do Agente IA
function processarRespostaIA(pergunta) {
    if (pergunta.includes("bazaruto") || pergunta.includes("vilankulo")) {
        return "O <strong>Arquipélago de Bazaruto</strong> em Inhambane é ideal para praias paradisíacas, mergulho e observação de flamingos e dugongos!";
    } else if (pergunta.includes("gorongosa") || pergunta.includes("safari") || pergunta.includes("animal")) {
        return "O <strong>Parque Nacional da Gorongosa</strong> em Sofala é o principal destino de safari em Moçambique, com leões, elefantes e uma biodiversidade ímpar.";
    } else if (pergunta.includes("ilha de moçambique") || pergunta.includes("historia") || pergunta.includes("nampula")) {
        return "A <strong>Ilha de Moçambique</strong> é Património Mundial da Humanidade pela UNESCO, rica em edifícios históricos como a Fortaleza de São Sebastião.";
    } else if (pergunta.includes("tofo") || pergunta.includes("mergulho") || pergunta.includes("praia")) {
        return "A <strong>Praia do Tofo</strong> é mundialmente famosa pelas suas águas propícias ao surf e mergulho com tubarões-baleia e raias-manta.";
    } else if (pergunta.includes("quando") || pergunta.includes("epoca") || pergunta.includes("clima") || pergunta.includes("mes")) {
        return "A melhor época para visitar Moçambique é na estação seca (entre <strong>Maio e Outubro</strong>), ideal para praias e safaris!";
    } else if (pergunta.includes("ola") || pergunta.includes("olá") || pergunta.includes("bom dia") || pergunta.includes("boa tarde")) {
        return "Olá! Como posso ajudar na sua viagem ou pesquisa sobre os pontos turísticos de Moçambique?";
    } else {
        return "Interessante pergunta! Moçambique oferece praias paradisíacas (Bazaruto, Tofo), safaris na Gorongosa e riqueza histórica na Ilha de Moçambique. Deseja detalhes sobre algum destes?";
    }
}
function enviarParaWhatsApp(event) {
  event.preventDefault();

  // Substitua pelo seu número com o código do país (258 para Moçambique)
  const numeroTelefone = "258844883985";

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !mensagem) {
    alert("Por favor, preencha pelo menos o Nome e a Mensagem.");
    return false;
  }

  const texto = `*Mensagem do Site - Turismo Moçambique*\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n` +
                `*Assunto:* ${assunto}\n` +
                `*Mensagem:* ${mensagem}`;

  const url = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  return false;
}
