// =============================
// CONFIGURAÇÃO
// =============================
let LIMITE_ATIVAS = 2; // 3 no exercício 2

// =============================
// ARRAY DE PEÇAS
// =============================
const pecas = [
  {
    btnId: 'btnAtivar1',
    pecaId: 'peca1',
    statusId: 'statusTexto1',
    iconeId: 'iconePeca1',
    tituloId: 'tituloPeca1',
    textoId: 'textoPeca1',
    numero: 1,
    proxima: 'pagina2.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #16a34a, #22c55e)',
    emojiAtivo: '🧩',
    textoAtivo: 'Parabéns! Você ativou a peça 1'
  },
  {
    btnId: 'btnAtivar2',
    pecaId: 'peca2',
    statusId: 'statusTexto2',
    iconeId: 'iconePeca2',
    tituloId: 'tituloPeca2',
    textoId: 'textoPeca2',
    numero: 2,
    proxima: 'pagina3.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #dc2626, #ef4444)',
    emojiAtivo: '🔥',
    textoAtivo: 'Parabéns! Você ativou a peça 2'
  },
  {
    btnId: 'btnAtivar3',
    pecaId: 'peca3',
    statusId: 'statusTexto3',
    iconeId: 'iconePeca3',
    tituloId: 'tituloPeca3',
    textoId: 'textoPeca3',
    numero: 3,
    proxima: 'pagina4.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    emojiAtivo: '💜',
    textoAtivo: 'Parabéns! Você ativou a peça 3'
  },
  {
    btnId: 'btnAtivar4',
    pecaId: 'peca4',
    statusId: 'statusTexto4',
    iconeId: 'iconePeca4',
    tituloId: 'tituloPeca4',
    textoId: 'textoPeca4',
    numero: 4,
    proxima: 'pagina5.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #ea580c, #f97316)',
    emojiAtivo: '🧡',
    textoAtivo: 'Parabéns! Você ativou a peça 4'
  },
  {
    btnId: 'btnAtivar5',
    pecaId: 'peca5',
    statusId: 'statusTexto5',
    iconeId: 'iconePeca5',
    tituloId: 'tituloPeca5',
    textoId: 'textoPeca5',
    numero: 5,
    proxima: 'pagina6.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    emojiAtivo: '💙',
    textoAtivo: 'Parabéns! Você ativou a peça 5'
  },
  {
    btnId: 'btnAtivar6',
    pecaId: 'peca6',
    statusId: 'statusTexto6',
    iconeId: 'iconePeca6',
    tituloId: 'tituloPeca6',
    textoId: 'textoPeca6',
    numero: 6,
    proxima: 'pagina7.html',
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #be185d, #ec4899)',
    emojiAtivo: '💖',
    textoAtivo: 'Parabéns! Você ativou a peça 6'
  }
];

// =============================
// FUNÇÕES AUXILIARES
// =============================
function contarAtivas() {
  return pecas.filter(p => p.ativo === true).length;
}

function mostrarMensagemLimite() {
  let msg = document.querySelector('.mensagem-limite');

  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'mensagem-limite';
    msg.innerText = 'Limite atingido!';

    document.body.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, 2000);
  }
}

// =============================
// DESATIVAR TODAS
// =============================
function desativarTodasPecas() {
  pecas.forEach(config => {
    if (config.ativo === true) {

      const peca = document.getElementById(config.pecaId);
      const status = document.getElementById(config.statusId);
      const icone = document.getElementById(config.iconeId);
      const titulo = document.getElementById(config.tituloId);
      const texto = document.getElementById(config.textoId);

      peca.classList.remove('ativa');
      peca.classList.add('bloqueada');
      peca.style.background = '';

      status.innerText = 'Bloqueada';
      status.style.color = '#facc15';

      icone.innerText = '🔒';
      titulo.innerText = 'Peça Bloqueada';
      texto.innerHTML = 'Clique para ativar';

      config.ativo = false;

      sessionStorage.setItem(`peca${config.numero}Ativada`, 'false');

      const btnProximo = peca.querySelector('.btn-proximo');
      if (btnProximo) btnProximo.remove();
    }
  });
}

// =============================
// ATIVAR PEÇA (ATUALIZADO)
// =============================
function ativarPeca(pecaConfig) {

  let ativo = pecaConfig.ativo;

  if (ativo === false) {

    // 🔥 BLOQUEIO POR LIMITE
    if (contarAtivas() >= LIMITE_ATIVAS) {
      alert("Limite atingido!");
      mostrarMensagemLimite();
      return;
    }

    const peca = document.getElementById(pecaConfig.pecaId);
    const status = document.getElementById(pecaConfig.statusId);
    const icone = document.getElementById(pecaConfig.iconeId);
    const titulo = document.getElementById(pecaConfig.tituloId);
    const texto = document.getElementById(pecaConfig.textoId);

    peca.classList.add('clicando');
    setTimeout(() => peca.classList.remove('clicando'), 200);

    peca.classList.remove('bloqueada');
    peca.classList.add('ativa');

    peca.style.background = pecaConfig.corAtiva;

    status.innerText = 'Ativada';
    status.style.color = '#22c55e';

    icone.innerText = pecaConfig.emojiAtivo;
    titulo.innerText = `Peça ${pecaConfig.numero} Ativada`;
    texto.innerHTML = pecaConfig.textoAtivo;

    pecaConfig.ativo = true;
    pecaConfig.ativada = true;

    sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'true');

  } else {
    desativarPeca(pecaConfig);
  }

  atualizarProgresso();
}

// =============================
// DESATIVAR UMA
// =============================
function desativarPeca(pecaConfig) {

  const peca = document.getElementById(pecaConfig.pecaId);
  const status = document.getElementById(pecaConfig.statusId);
  const icone = document.getElementById(pecaConfig.iconeId);
  const titulo = document.getElementById(pecaConfig.tituloId);
  const texto = document.getElementById(pecaConfig.textoId);

  peca.classList.remove('ativa');
  peca.classList.add('bloqueada');
  peca.style.background = '';

  status.innerText = 'Bloqueada';
  status.style.color = '#facc15';

  icone.innerText = '🔒';
  titulo.innerText = 'Peça Bloqueada';
  texto.innerHTML = 'Clique para ativar';

  pecaConfig.ativo = false;

  sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'false');
}

// =============================
// PROGRESSO (CORRIGIDO)
// =============================
function atualizarProgresso() {

  const pecasAtivadas = document.getElementById('pecasAtivadas');
  const barraPreenchida = document.getElementById('barraPreenchida');

  const contador = contarAtivas();

  pecasAtivadas.innerText = contador;

  const porcentagem = (contador / pecas.length) * 100;
  barraPreenchida.style.width = porcentagem + '%';

  // 🏆 CONDIÇÃO DE VITÓRIA
  if (contador === pecas.length) {
    alert("Você venceu!");
  }
}

// =============================
// RESET
// =============================
function resetarPecas() {
  desativarTodasPecas();
  atualizarProgresso();
}

// =============================
// INIT
// =============================
document.addEventListener('DOMContentLoaded', function() {
  const pecasTotal = document.getElementById('pecasTotal');
  if (pecasTotal) {
    pecasTotal.innerText = pecas.length;
  }
  atualizarProgresso();
});