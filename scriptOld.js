// ===============================
// CONFIGURAÇÃO BASE
// ===============================

const API_URL = "http://localhost:8080"; // depois pode trocar

// ===============================
// UTILIDADES
// ===============================

function mostrarMensagem(modulo) {
  const aviso = document.getElementById("avisoModulo");

  aviso.innerHTML = `
    Módulo <strong>${modulo}</strong> selecionado.<br>
    Você pode conectar esse botão depois com a página ${modulo.toLowerCase()}.html
    ou com o backend do Spring Boot.
  `;

  animarAviso(aviso);
}

function animarAviso(elemento) {
  elemento.style.transform = "scale(1.05)";
  elemento.style.transition = "0.2s";

  setTimeout(() => {
    elemento.style.transform = "scale(1)";
  }, 200);
}

// ===============================
// NAVEGAÇÃO SIMPLES
// ===============================

function irPara(pagina) {
  window.location.href = pagina;
}

// ===============================
// FUNÇÕES FUTURAS (CRUD BASE)
// ===============================

// -------- CLIENTES --------

async function listarClientes() {
  try {
    const response = await fetch(`${API_URL}/clientes`);
    const data = await response.json();

    console.log("Clientes:", data);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
  }
}

async function cadastrarCliente(cliente) {
  try {
    const response = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });

    const data = await response.json();
    console.log("Cliente cadastrado:", data);
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
}

// -------- MESAS --------

async function listarMesas() {
  try {
    const response = await fetch(`${API_URL}/mesas`);
    const data = await response.json();

    console.log("Mesas:", data);
  } catch (error) {
    console.error("Erro ao listar mesas:", error);
  }
}

// -------- GARÇONS --------

async function listarGarcons() {
  try {
    const response = await fetch(`${API_URL}/garcons`);
    const data = await response.json();

    console.log("Garçons:", data);
  } catch (error) {
    console.error("Erro ao listar garçons:", error);
  }
}

// -------- PEDIDOS --------

async function listarPedidos() {
  try {
    const response = await fetch(`${API_URL}/pedidos`);
    const data = await response.json();

    console.log("Pedidos:", data);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
  }
}

// ===============================
// FEEDBACK VISUAL (ALERT MELHORADO)
// ===============================

function mostrarAlerta(mensagem, tipo = "sucesso") {
  const alerta = document.createElement("div");

  alerta.classList.add("alerta");
  alerta.classList.add(tipo);

  alerta.innerText = mensagem;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

// ===============================
// VALIDAÇÕES
// ===============================

function validarCampoVazio(valor) {
  return valor.trim() !== "";
}

function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

// ===============================
// EVENTOS GLOBAIS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Sistema Restaurante carregado!");

  // Exemplo: carregar dados iniciais futuramente
  // listarClientes();
  // listarMesas();
  // listarGarcons();
  // listarPedidos();
});

// ===============================
// EXEMPLOS DE USO (TESTE RÁPIDO)
// ===============================

// Exemplo para testar no console:
// cadastrarCliente({
//   nome: "Teste",
//   telefone: "21999999999",
//   email: "teste@gmail.com"
// });