// Array com as configurações de cada peça
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
    ativo: false,  // Controle de estado
    corAtiva: 'linear-gradient(135deg, #16a34a, #22c55e)', // Verde
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
    ativo: false,  // Controle de estado
    corAtiva: 'linear-gradient(135deg, #dc2626, #ef4444)', // Vermelho
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
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', // Roxo
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
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #ea580c, #f97316)', // Laranja
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
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #0891b2, #06b6d4)', // Azul
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
    ativada: false,
    ativo: false,
    corAtiva: 'linear-gradient(135deg, #be185d, #ec4899)', // Rosa
    emojiAtivo: '💖',
    textoAtivo: 'Parabéns! Você ativou a peça 6'
  }
];

// Contador global de peças já ativadas (histórico)
let pecasJaAtivadas = 0;

// Função para desativar todas as peças
function desativarTodasPecas() {
  pecas.forEach(config => {
    if (config.ativo === true) {
      // Resetar visual da peça
      const peca = document.getElementById(config.pecaId);
      const status = document.getElementById(config.statusId);
      const icone = document.getElementById(config.iconeId);
      const titulo = document.getElementById(config.tituloId);
      const texto = document.getElementById(config.textoId);

      // Remover classe "ativa" e adicionar "bloqueada"
      peca.classList.remove('ativa');
      peca.classList.add('bloqueada');

      // Remover cor específica (volta ao padrão)
      peca.style.background = '';

      // Atualizar status
      status.innerText = 'Bloqueada';
      status.style.color = '#facc15';

      // Atualizar visual da peça
      icone.innerText = '🔒';
      titulo.innerText = 'Peça Bloqueada';
      texto.innerHTML = 'Clique para ativar';

      // Alterar estado da peça
      config.ativo = false;

      // Salvar estado no sessionStorage
      sessionStorage.setItem(`peca${config.numero}Ativada`, 'false');

      // Remover botão de redirecionamento
      const btnProximo = peca.querySelector('.btn-proximo');
      if (btnProximo) {
        btnProximo.remove();
      }
    }
  });
}

// Função para ativar/desativar uma peça (com alternância)
function ativarPeca(pecaConfig) {
  // Usar variável let ativo para controlar estado
  let ativo = pecaConfig.ativo;

  // Se não está ativo, ativar; se está ativo, desativar
  if (ativo === false) {
    // DESAFIO: Apenas UMA peça pode ficar ativa por vez
    // Antes de ativar, desativar todas as outras peças
    desativarTodasPecas();

    const peca = document.getElementById(pecaConfig.pecaId);
    const status = document.getElementById(pecaConfig.statusId);
    const icone = document.getElementById(pecaConfig.iconeId);
    const titulo = document.getElementById(pecaConfig.tituloId);
    const texto = document.getElementById(pecaConfig.textoId);

    // Adicionar animação de clique
    peca.classList.add('clicando');
    setTimeout(() => {
      peca.classList.remove('clicando');
    }, 200);

    // Remover classe "bloqueada" e adicionar "ativa"
    peca.classList.remove('bloqueada');
    peca.classList.add('ativa');

    // Aplicar cor específica da peça
    peca.style.background = pecaConfig.corAtiva;

    // Atualizar status
    status.innerText = 'Ativada';
    status.style.color = '#22c55e';

    // Atualizar visual da peça com emoji específico
    icone.innerText = pecaConfig.emojiAtivo;
    titulo.innerText = `Peça ${pecaConfig.numero} Ativada`;
    texto.innerHTML = pecaConfig.textoAtivo;

    // Alterar estado da peça
    pecaConfig.ativo = true;
    pecaConfig.ativada = true;

    // Incrementar contador apenas se for a primeira ativação desta peça
    if (!pecaConfig.jaFoiContada) {
      pecasJaAtivadas++;
      pecaConfig.jaFoiContada = true;
    }

    // Salvar estado no sessionStorage
    sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'true');

    // Criar botão de redirecionamento (se não existir)
    if (pecaConfig.proxima && !peca.querySelector('.btn-proximo')) {
      const btnProximo = document.createElement('button');
      btnProximo.innerText = 'Ir para Próxima Etapa';
      btnProximo.className = 'btn-principal btn-proximo';
      btnProximo.style.marginTop = '20px';
      btnProximo.onclick = function() {
        window.location.href = pecaConfig.proxima;
      };
      peca.querySelector('.peca-conteudo').appendChild(btnProximo);
    }

    // Atualizar progresso
    atualizarProgresso();

  } else {
    // Desativar a peça
    const peca = document.getElementById(pecaConfig.pecaId);
    const status = document.getElementById(pecaConfig.statusId);
    const icone = document.getElementById(pecaConfig.iconeId);
    const titulo = document.getElementById(pecaConfig.tituloId);
    const texto = document.getElementById(pecaConfig.textoId);

    // Adicionar animação de clique
    peca.classList.add('clicando');
    setTimeout(() => {
      peca.classList.remove('clicando');
    }, 200);

    // Remover classe "ativa" e adicionar "bloqueada"
    peca.classList.remove('ativa');
    peca.classList.add('bloqueada');

    // Remover cor específica (volta ao padrão)
    peca.style.background = '';

    // Atualizar status
    status.innerText = 'Bloqueada';
    status.style.color = '#facc15';

    // Atualizar visual da peça
    icone.innerText = '🔒';
    titulo.innerText = 'Peça Bloqueada';
    texto.innerHTML = 'Clique para ativar';

    // Alterar estado da peça
    pecaConfig.ativo = false;

    // Salvar estado no sessionStorage
    sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'false');

    // Remover botão de redirecionamento
    const btnProximo = peca.querySelector('.btn-proximo');
    if (btnProximo) {
      btnProximo.remove();
    }

    // Atualizar progresso
    atualizarProgresso();
  }
}

// Função para restaurar estado das peças quando a página carrega
function restaurarEstadoPecas() {
  pecas.forEach(pecaConfig => {
    const pecaAtivada = sessionStorage.getItem(`peca${pecaConfig.numero}Ativada`);
    
    if (pecaAtivada === 'true') {
      const botao = document.getElementById(pecaConfig.btnId);
      const peca = document.getElementById(pecaConfig.pecaId);
      const status = document.getElementById(pecaConfig.statusId);
      const icone = document.getElementById(pecaConfig.iconeId);
      const titulo = document.getElementById(pecaConfig.tituloId);
      const texto = document.getElementById(pecaConfig.textoId);

      // Aplicar estilos de ativa
      peca.classList.remove('bloqueada');
      peca.classList.add('ativa');

      // Aplicar cor específica da peça
      peca.style.background = pecaConfig.corAtiva;

      // Restaurar status
      status.innerText = 'Ativada';
      status.style.color = '#22c55e';

      // Restaurar visual da peça com emoji específico
      icone.innerText = pecaConfig.emojiAtivo;
      titulo.innerText = `Peça ${pecaConfig.numero} Ativada`;
      texto.innerHTML = pecaConfig.textoAtivo;

      // Desabilitar botão
      botao.innerText = 'Desativar Peça';

      // Marcar como ativada
      pecaConfig.ativada = true;
      pecaConfig.ativo = true;

        // Adicionar botão de redirecionamento
      if (pecaConfig.proxima && !peca.querySelector('.btn-proximo')) {
        const btnProximo = document.createElement('button');
        btnProximo.innerText = 'Ir para Próxima Etapa';
        btnProximo.className = 'btn-principal btn-proximo';
        btnProximo.style.marginTop = '20px';
        btnProximo.onclick = function() {
          window.location.href = pecaConfig.proxima;
        };
        peca.querySelector('.peca-conteudo').appendChild(btnProximo);
      }
    }
  });
}

// Restaurar estado quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  const pecasTotal = document.getElementById('pecasTotal');
  if (pecasTotal) {
    pecasTotal.innerText = pecas.length;
  }
  restaurarEstadoPecas();
  // Atualizar progresso ao carregar a página
  atualizarProgresso();
});

// ========================================
// DESAFIO — DOM AVANÇADO
// ========================================
// Função que altera múltiplos elementos ao mesmo tempo
// Usa getElementById em múltiplos elementos
function atualizarProgresso() {
  // Usando getElementById para selecionar múltiplos elementos
  const pecasAtivadas = document.getElementById('pecasAtivadas');
  const barraPreenchida = document.getElementById('barraPreenchida');
  
  // Usar contador histórico de peças já ativadas (não quantas estão ativas agora)
  const contador = pecasJaAtivadas;
  
  // ALTERAR VÁRIOS ELEMENTOS SIMULTANEAMENTE
  // 1. Atualizar o número de peças ativadas
  pecasAtivadas.innerText = contador;
  
  // 2. Calcular porcentagem baseada em peças já ativadas (máximo 6)
  const porcentagem = Math.min((contador / pecas.length) * 100, 100);
  barraPreenchida.style.width = porcentagem + '%';
  
  // 3. Alterar cor da barra conforme progresso
  if (contador === 0) {
    barraPreenchida.style.backgroundColor = '#facc15'; // Amarelo
  } else if (contador >= 1 && contador <= 3) {
    barraPreenchida.style.backgroundColor = '#16dd9a'; // Verde claro
  } else if (contador >= 4 && contador <= 5) {
    barraPreenchida.style.backgroundColor = '#22c55e'; // Verde
  } else if (contador >= 6) {
    barraPreenchida.style.backgroundColor = '#22c55e'; // Verde completo
    // 4. Adicionar efeito visual quando todas foram ativadas pelo menos uma vez
    pecasAtivadas.style.color = '#22c55e';
    pecasAtivadas.style.fontWeight = 'bold';
    pecasAtivadas.style.fontSize = '18px';

    // DESAFIO: Mensagem final quando todas estiverem ativas
    mostrarMensagemFinal();
  } else {
    // Resetar estilos quando não está completo
    pecasAtivadas.style.color = '';
    pecasAtivadas.style.fontWeight = '';
    pecasAtivadas.style.fontSize = '';
  }
}

// Função para mostrar mensagem final
function mostrarMensagemFinal() {
  // Verificar se já existe uma mensagem final
  let mensagemFinal = document.querySelector('.mensagem-final');
  if (!mensagemFinal) {
    // Criar container da mensagem final
    mensagemFinal = document.createElement('div');
    mensagemFinal.className = 'mensagem-final';

    // Criar conteúdo da mensagem
    mensagemFinal.innerHTML = `
      <div class="mensagem-conteudo">
        <span class="icone-celebracao">🎉</span>
        <h2>Parabéns, você completou a fase 1!</h2>
        <p>Você ativou todas as 6 peças do quebra-cabeça.</p>
        <button class="btn-celebracao" onclick="reiniciarJogo()">Jogar Novamente</button>
      </div>
    `;

    // Adicionar ao final do container
    document.querySelector('.container').appendChild(mensagemFinal);

    // Adicionar animação de entrada
    setTimeout(() => {
      mensagemFinal.classList.add('ativo');
    }, 100);
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Resetar contador de peças já ativadas
  pecasJaAtivadas = 0;

  // Resetar flag de contagem de cada peça
  pecas.forEach(config => {
    config.jaFoiContada = false;
  });

  // Desativar todas as peças
  desativarTodasPecas();

  // Atualizar progresso
  atualizarProgresso();

  // Remover mensagem final
  const mensagemFinal = document.querySelector('.mensagem-final');
  if (mensagemFinal) {
    mensagemFinal.remove();
  }

  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// DESAFIO — INTERAÇÃO
// ========================================
// Peça que muda de cor a cada clique usando lógica com if

// Array com as cores disponíveis
const cores = [
  {
    nome: 'Azul',
    classe: 'cor-azul',
    gradiente: 'linear-gradient(135deg, #0066ff, #0033cc)',
    emoji: '🔵',
    url: 'azul.html'
  },
  {
    nome: 'Roxo',
    classe: 'cor-roxo',
    gradiente: 'linear-gradient(135deg, #9933ff, #6600cc)',
    emoji: '🟣',
    url: 'roxo.html'
  },
  {
    nome: 'Rosa',
    classe: 'cor-rosa',
    gradiente: 'linear-gradient(135deg, #ff0099, #cc0066)',
    emoji: '🩷',
    url: 'rosa.html'
  },
  {
    nome: 'Laranja',
    classe: 'cor-laranja',
    gradiente: 'linear-gradient(135deg, #ff6600, #cc5200)',
    emoji: '🟠',
    url: 'laranja.html'
  }
];

// Índice da cor atual
let indiceCorAtual = 0;

// Botões da área de cor
const btnMudarCor = document.getElementById('btnMudarCor');
const btnIrCor = document.getElementById('btnIrCor');

function atualizarBotaoIrParaCor(indice) {
  const corSelecionada = cores[indice];
  if (!corSelecionada || !btnIrCor) return;
  btnIrCor.innerText = `Ir para página ${corSelecionada.nome}`;
  btnIrCor.dataset.url = corSelecionada.url;
}

// Função que muda a cor da peça usando lógica com if
function mudarCorPeca() {
  const pecaCor = document.getElementById('pecaCor');
  const corAtual = document.getElementById('corAtual');
  const tituloCor = document.getElementById('tituloCor');
  const textoCor = document.getElementById('textoCor');
  const iconeCor = document.getElementById('iconeCor');
  
  // Calcular qual será a próxima cor
  const novoIndice = (indiceCorAtual + 1) % cores.length;
  
  // Pegar a cor atual do array
  const corSelecionada = cores[novoIndice];
  
  // Remover todas as classes de cor anterior
  cores.forEach(cor => {
    pecaCor.classList.remove(cor.classe);
  });
  
  // Adicionar a nova classe de cor
  pecaCor.classList.add(corSelecionada.classe);
  
  // Atualizar o conteúdo da peça
  corAtual.innerText = corSelecionada.nome;
  tituloCor.innerText = corSelecionada.nome;
  iconeCor.innerText = corSelecionada.emoji;
  textoCor.innerText = `Cor atual: ${corSelecionada.nome}. Clique novamente para mudar!`;
  
  // Aplicar gradiente diretamente
  pecaCor.style.background = corSelecionada.gradiente;
  
  // Atualizar botão de redirecionamento
  atualizarBotaoIrParaCor(novoIndice);
  
  // Salvar índice da cor atual
  indiceCorAtual = novoIndice;
}

// Adicionar evento de clique ao botão de mudança de cor
btnMudarCor.addEventListener('click', function() {
  mudarCorPeca();
});

// Evento para navegar à página de cor atual
if (btnIrCor) {
  btnIrCor.addEventListener('click', function() {
    if (btnIrCor.dataset.url) {
      window.location.href = btnIrCor.dataset.url;
    }
  });
}

// Atualizar o botão de redirecionamento quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  atualizarBotaoIrParaCor(indiceCorAtual);
});