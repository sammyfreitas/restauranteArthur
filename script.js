// =======================================
// DADOS DEMO
// =======================================

let clientes = [
  { id: 1, nome: "Mariana Souza", telefone: "21999990001", email: "mariana@gmail.com" },
  { id: 2, nome: "Carlos Henrique", telefone: "21999990002", email: "carlos@gmail.com" },
  { id: 3, nome: "Fernanda Lima", telefone: "21999990003", email: "fernanda@gmail.com" },
  { id: 4, nome: "João Pedro", telefone: "21999990004", email: "joao@gmail.com" }
];

let mesas = [
  { id: 1, numeroMesa: 1, capacidade: 2, statusMesa: "LIVRE" },
  { id: 2, numeroMesa: 2, capacidade: 4, statusMesa: "OCUPADA" },
  { id: 3, numeroMesa: 3, capacidade: 4, statusMesa: "RESERVADA" },
  { id: 4, numeroMesa: 4, capacidade: 6, statusMesa: "LIVRE" }
];

let garcons = [
  { id: 1, nome: "André Silva", telefone: "21988880001", turno: "MANHA" },
  { id: 2, nome: "Bianca Rocha", telefone: "21988880002", turno: "TARDE" },
  { id: 3, nome: "Diego Santos", telefone: "21988880003", turno: "NOITE" }
];

let pedidos = [
  { id: 1, dataPedido: "2026-04-01", valorTotal: 89.90, statusPedido: "ABERTO", clienteId: 1, mesaId: 2, garcomId: 1 },
  { id: 2, dataPedido: "2026-04-02", valorTotal: 145.50, statusPedido: "FINALIZADO", clienteId: 2, mesaId: 3, garcomId: 2 },
  { id: 3, dataPedido: "2026-04-03", valorTotal: 67.00, statusPedido: "EM_PREPARO", clienteId: 3, mesaId: 1, garcomId: 3 }
];

// =======================================
// LOCAL STORAGE
// =======================================

function salvarDados() {
  localStorage.setItem("restaurante_clientes", JSON.stringify(clientes));
  localStorage.setItem("restaurante_mesas", JSON.stringify(mesas));
  localStorage.setItem("restaurante_garcons", JSON.stringify(garcons));
  localStorage.setItem("restaurante_pedidos", JSON.stringify(pedidos));
}

function carregarDados() {
  const clientesSalvos = localStorage.getItem("restaurante_clientes");
  const mesasSalvas = localStorage.getItem("restaurante_mesas");
  const garconsSalvos = localStorage.getItem("restaurante_garcons");
  const pedidosSalvos = localStorage.getItem("restaurante_pedidos");

  if (clientesSalvos) clientes = JSON.parse(clientesSalvos);
  if (mesasSalvas) mesas = JSON.parse(mesasSalvos);
  if (garconsSalvos) garcons = JSON.parse(garconsSalvos);
  if (pedidosSalvos) pedidos = JSON.parse(pedidosSalvos);
}

// =======================================
// UTILITÁRIOS
// =======================================

function gerarNovoId(lista) {
  if (lista.length === 0) return 1;
  return Math.max(...lista.map(item => item.id)) + 1;
}

function mostrarAlerta(mensagem, tipo = "sucesso") {
  const container = document.getElementById("alertaContainer");
  if (!container) return;

  const alerta = document.createElement("div");
  alerta.className = `alerta ${tipo}`;
  alerta.textContent = mensagem;

  container.innerHTML = "";
  container.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

function mostrarMensagem(modulo) {
  const aviso = document.getElementById("avisoModulo");
  if (!aviso) return;

  aviso.innerHTML = `Módulo <strong>${modulo}</strong> selecionado.`;
  aviso.style.transform = "scale(1.02)";
  setTimeout(() => {
    aviso.style.transform = "scale(1)";
  }, 200);
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function getClienteNome(id) {
  const cliente = clientes.find(c => c.id === Number(id));
  return cliente ? cliente.nome : "-";
}

function getMesaNumero(id) {
  const mesa = mesas.find(m => m.id === Number(id));
  return mesa ? mesa.numeroMesa : "-";
}

function getGarcomNome(id) {
  const garcom = garcons.find(g => g.id === Number(id));
  return garcom ? garcom.nome : "-";
}

// =======================================
// INICIALIZAÇÃO
// =======================================

function inicializarPagina(modulo) {
  carregarDados();

  if (modulo === "clientes") {
    configurarFormularioCliente();
    renderizarClientes();
  }

  if (modulo === "mesas") {
    configurarFormularioMesa();
    renderizarMesas();
  }

  if (modulo === "garcons") {
    configurarFormularioGarcom();
    renderizarGarcons();
  }

  if (modulo === "pedidos") {
    preencherSelectsPedido();
    configurarFormularioPedido();
    renderizarPedidos();
  }
}

// =======================================
// CLIENTES
// =======================================

function configurarFormularioCliente() {
  const form = document.getElementById("formCliente");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("clienteId").value;
    const nome = document.getElementById("clienteNome").value.trim();
    const telefone = document.getElementById("clienteTelefone").value.trim();
    const email = document.getElementById("clienteEmail").value.trim();

    if (!nome || !telefone || !email) {
      mostrarAlerta("Preencha todos os campos do cliente.", "erro");
      return;
    }

    if (id) {
      const cliente = clientes.find(c => c.id === Number(id));
      cliente.nome = nome;
      cliente.telefone = telefone;
      cliente.email = email;
      mostrarAlerta("Cliente atualizado com sucesso.");
    } else {
      clientes.push({
        id: gerarNovoId(clientes),
        nome,
        telefone,
        email
      });
      mostrarAlerta("Cliente cadastrado com sucesso.");
    }

    salvarDados();
    renderizarClientes();
    limparFormularioCliente();
  });
}

function renderizarClientes(lista = clientes) {
  const tbody = document.getElementById("tabelaClientes");
  if (!tbody) return;

  tbody.innerHTML = "";

  lista.forEach(cliente => {
    tbody.innerHTML += `
      <tr>
        <td>${cliente.id}</td>
        <td>${cliente.nome}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>
        <td class="acoes-tabela">
          <button class="btn-acao editar" onclick="editarCliente(${cliente.id})">Editar</button>
          <button class="btn-acao excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarCliente(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  document.getElementById("clienteId").value = cliente.id;
  document.getElementById("clienteNome").value = cliente.nome;
  document.getElementById("clienteTelefone").value = cliente.telefone;
  document.getElementById("clienteEmail").value = cliente.email;
}

function excluirCliente(id) {
  if (!confirm("Deseja excluir este cliente?")) return;

  clientes = clientes.filter(c => c.id !== id);
  pedidos = pedidos.filter(p => p.clienteId !== id);

  salvarDados();
  renderizarClientes();
  mostrarAlerta("Cliente excluído com sucesso.");
}

function limparFormularioCliente() {
  const form = document.getElementById("formCliente");
  if (form) form.reset();
  const id = document.getElementById("clienteId");
  if (id) id.value = "";
}

function filtrarClientes() {
  const termo = document.getElementById("buscaCliente").value.toLowerCase();
  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));
  renderizarClientes(filtrados);
}

// =======================================
// MESAS
// =======================================

function configurarFormularioMesa() {
  const form = document.getElementById("formMesa");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("mesaId").value;
    const numeroMesa = Number(document.getElementById("mesaNumero").value);
    const capacidade = Number(document.getElementById("mesaCapacidade").value);
    const statusMesa = document.getElementById("mesaStatus").value;

    if (!numeroMesa || !capacidade || !statusMesa) {
      mostrarAlerta("Preencha todos os campos da mesa.", "erro");
      return;
    }

    if (id) {
      const mesa = mesas.find(m => m.id === Number(id));
      mesa.numeroMesa = numeroMesa;
      mesa.capacidade = capacidade;
      mesa.statusMesa = statusMesa;
      mostrarAlerta("Mesa atualizada com sucesso.");
    } else {
      mesas.push({
        id: gerarNovoId(mesas),
        numeroMesa,
        capacidade,
        statusMesa
      });
      mostrarAlerta("Mesa cadastrada com sucesso.");
    }

    salvarDados();
    renderizarMesas();
    limparFormularioMesa();
  });
}

function renderizarMesas(lista = mesas) {
  const tbody = document.getElementById("tabelaMesas");
  if (!tbody) return;

  tbody.innerHTML = "";

  lista.forEach(mesa => {
    tbody.innerHTML += `
      <tr>
        <td>${mesa.id}</td>
        <td>${mesa.numeroMesa}</td>
        <td>${mesa.capacidade}</td>
        <td>${mesa.statusMesa}</td>
        <td class="acoes-tabela">
          <button class="btn-acao editar" onclick="editarMesa(${mesa.id})">Editar</button>
          <button class="btn-acao excluir" onclick="excluirMesa(${mesa.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarMesa(id) {
  const mesa = mesas.find(m => m.id === id);
  if (!mesa) return;

  document.getElementById("mesaId").value = mesa.id;
  document.getElementById("mesaNumero").value = mesa.numeroMesa;
  document.getElementById("mesaCapacidade").value = mesa.capacidade;
  document.getElementById("mesaStatus").value = mesa.statusMesa;
}

function excluirMesa(id) {
  if (!confirm("Deseja excluir esta mesa?")) return;

  mesas = mesas.filter(m => m.id !== id);
  pedidos = pedidos.filter(p => p.mesaId !== id);

  salvarDados();
  renderizarMesas();
  mostrarAlerta("Mesa excluída com sucesso.");
}

function limparFormularioMesa() {
  const form = document.getElementById("formMesa");
  if (form) form.reset();
  const id = document.getElementById("mesaId");
  if (id) id.value = "";
}

function filtrarMesas() {
  const termo = document.getElementById("buscaMesa").value.toLowerCase();
  const filtradas = mesas.filter(m => m.statusMesa.toLowerCase().includes(termo));
  renderizarMesas(filtradas);
}

// =======================================
// GARÇONS
// =======================================

function configurarFormularioGarcom() {
  const form = document.getElementById("formGarcom");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("garcomId").value;
    const nome = document.getElementById("garcomNome").value.trim();
    const telefone = document.getElementById("garcomTelefone").value.trim();
    const turno = document.getElementById("garcomTurno").value;

    if (!nome || !telefone || !turno) {
      mostrarAlerta("Preencha todos os campos do garçom.", "erro");
      return;
    }

    if (id) {
      const garcom = garcons.find(g => g.id === Number(id));
      garcom.nome = nome;
      garcom.telefone = telefone;
      garcom.turno = turno;
      mostrarAlerta("Garçom atualizado com sucesso.");
    } else {
      garcons.push({
        id: gerarNovoId(garcons),
        nome,
        telefone,
        turno
      });
      mostrarAlerta("Garçom cadastrado com sucesso.");
    }

    salvarDados();
    renderizarGarcons();
    limparFormularioGarcom();
  });
}

function renderizarGarcons(lista = garcons) {
  const tbody = document.getElementById("tabelaGarcons");
  if (!tbody) return;

  tbody.innerHTML = "";

  lista.forEach(garcom => {
    tbody.innerHTML += `
      <tr>
        <td>${garcom.id}</td>
        <td>${garcom.nome}</td>
        <td>${garcom.telefone}</td>
        <td>${garcom.turno}</td>
        <td class="acoes-tabela">
          <button class="btn-acao editar" onclick="editarGarcom(${garcom.id})">Editar</button>
          <button class="btn-acao excluir" onclick="excluirGarcom(${garcom.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarGarcom(id) {
  const garcom = garcons.find(g => g.id === id);
  if (!garcom) return;

  document.getElementById("garcomId").value = garcom.id;
  document.getElementById("garcomNome").value = garcom.nome;
  document.getElementById("garcomTelefone").value = garcom.telefone;
  document.getElementById("garcomTurno").value = garcom.turno;
}

function excluirGarcom(id) {
  if (!confirm("Deseja excluir este garçom?")) return;

  garcons = garcons.filter(g => g.id !== id);
  pedidos = pedidos.filter(p => p.garcomId !== id);

  salvarDados();
  renderizarGarcons();
  mostrarAlerta("Garçom excluído com sucesso.");
}

function limparFormularioGarcom() {
  const form = document.getElementById("formGarcom");
  if (form) form.reset();
  const id = document.getElementById("garcomId");
  if (id) id.value = "";
}

function filtrarGarcons() {
  const termo = document.getElementById("buscaGarcom").value.toLowerCase();
  const filtrados = garcons.filter(g => g.nome.toLowerCase().includes(termo));
  renderizarGarcons(filtrados);
}

// =======================================
// PEDIDOS
// =======================================

function preencherSelectsPedido() {
  const selectCliente = document.getElementById("pedidoCliente");
  const selectMesa = document.getElementById("pedidoMesa");
  const selectGarcom = document.getElementById("pedidoGarcom");

  if (!selectCliente || !selectMesa || !selectGarcom) return;

  selectCliente.innerHTML = `<option value="">Selecione o cliente</option>`;
  selectMesa.innerHTML = `<option value="">Selecione a mesa</option>`;
  selectGarcom.innerHTML = `<option value="">Selecione o garçom</option>`;

  clientes.forEach(cliente => {
    selectCliente.innerHTML += `<option value="${cliente.id}">${cliente.nome}</option>`;
  });

  mesas.forEach(mesa => {
    selectMesa.innerHTML += `<option value="${mesa.id}">Mesa ${mesa.numeroMesa} - ${mesa.statusMesa}</option>`;
  });

  garcons.forEach(garcom => {
    selectGarcom.innerHTML += `<option value="${garcom.id}">${garcom.nome}</option>`;
  });
}

function configurarFormularioPedido() {
  const form = document.getElementById("formPedido");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("pedidoId").value;
    const dataPedido = document.getElementById("pedidoData").value;
    const valorTotal = Number(document.getElementById("pedidoValor").value);
    const statusPedido = document.getElementById("pedidoStatus").value;
    const clienteId = Number(document.getElementById("pedidoCliente").value);
    const mesaId = Number(document.getElementById("pedidoMesa").value);
    const garcomId = Number(document.getElementById("pedidoGarcom").value);

    if (!dataPedido || !valorTotal || !statusPedido || !clienteId || !mesaId || !garcomId) {
      mostrarAlerta("Preencha todos os campos do pedido.", "erro");
      return;
    }

    if (id) {
      const pedido = pedidos.find(p => p.id === Number(id));
      pedido.dataPedido = dataPedido;
      pedido.valorTotal = valorTotal;
      pedido.statusPedido = statusPedido;
      pedido.clienteId = clienteId;
      pedido.mesaId = mesaId;
      pedido.garcomId = garcomId;
      mostrarAlerta("Pedido atualizado com sucesso.");
    } else {
      pedidos.push({
        id: gerarNovoId(pedidos),
        dataPedido,
        valorTotal,
        statusPedido,
        clienteId,
        mesaId,
        garcomId
      });
      mostrarAlerta("Pedido cadastrado com sucesso.");
    }

    salvarDados();
    renderizarPedidos();
    limparFormularioPedido();
  });
}

function renderizarPedidos(lista = pedidos) {
  const tbody = document.getElementById("tabelaPedidos");
  if (!tbody) return;

  tbody.innerHTML = "";

  lista.forEach(pedido => {
    tbody.innerHTML += `
      <tr>
        <td>${pedido.id}</td>
        <td>${pedido.dataPedido}</td>
        <td>${formatarMoeda(pedido.valorTotal)}</td>
        <td>${pedido.statusPedido}</td>
        <td>${getClienteNome(pedido.clienteId)}</td>
        <td>${getMesaNumero(pedido.mesaId)}</td>
        <td>${getGarcomNome(pedido.garcomId)}</td>
        <td class="acoes-tabela">
          <button class="btn-acao editar" onclick="editarPedido(${pedido.id})">Editar</button>
          <button class="btn-acao excluir" onclick="excluirPedido(${pedido.id})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarPedido(id) {
  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return;

  preencherSelectsPedido();

  document.getElementById("pedidoId").value = pedido.id;
  document.getElementById("pedidoData").value = pedido.dataPedido;
  document.getElementById("pedidoValor").value = pedido.valorTotal;
  document.getElementById("pedidoStatus").value = pedido.statusPedido;
  document.getElementById("pedidoCliente").value = pedido.clienteId;
  document.getElementById("pedidoMesa").value = pedido.mesaId;
  document.getElementById("pedidoGarcom").value = pedido.garcomId;
}

function excluirPedido(id) {
  if (!confirm("Deseja excluir este pedido?")) return;

  pedidos = pedidos.filter(p => p.id !== id);

  salvarDados();
  renderizarPedidos();
  mostrarAlerta("Pedido excluído com sucesso.");
}

function limparFormularioPedido() {
  const form = document.getElementById("formPedido");
  if (form) form.reset();
  const id = document.getElementById("pedidoId");
  if (id) id.value = "";
}

function filtrarPedidos() {
  const termo = document.getElementById("buscaPedido").value.toLowerCase();
  const filtrados = pedidos.filter(p => p.statusPedido.toLowerCase().includes(termo));
  renderizarPedidos(filtrados);
}

// =======================================
// INDEX
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
});