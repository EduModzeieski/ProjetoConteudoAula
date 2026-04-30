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
    ativo: false  // Controle de estado
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
    ativo: false  // Controle de estado
  }
];

// Função para ativar/desativar uma peça (com alternância)
function ativarPeca(pecaConfig) {
  // Usar variável let ativo para controlar estado
  let ativo = pecaConfig.ativo;

  // Se não está ativo, ativar; se está ativo, desativar
  if (ativo === false) {
    const botao = document.getElementById(pecaConfig.btnId);
    const peca = document.getElementById(pecaConfig.pecaId);
    const status = document.getElementById(pecaConfig.statusId);
    const icone = document.getElementById(pecaConfig.iconeId);
    const titulo = document.getElementById(pecaConfig.tituloId);
    const texto = document.getElementById(pecaConfig.textoId);

    // Remover classe "bloqueada" e adicionar "ativa"
    peca.classList.remove('bloqueada');
    peca.classList.add('ativa');

    // Atualizar status
    status.innerText = 'Ativada';
    status.style.color = '#22c55e';

    // Atualizar visual da peça
    icone.innerText = '🧩';
    titulo.innerText = `Peça ${pecaConfig.numero} Ativada`;
    texto.innerHTML = `Parabéns! Você ativou a peça ${pecaConfig.numero}`;

    // Atualizar botão
    botao.innerText = 'Desativar Peça';

    // Alterar estado da peça
    pecaConfig.ativo = true;
    pecaConfig.ativada = true;

    // Salvar estado no sessionStorage
    sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'true');

    // Criar botão de redirecionamento (se não existir)
    if (!peca.querySelector('.btn-proximo')) {
      const btnProximo = document.createElement('button');
      btnProximo.innerText = 'Ir para Próxima Etapa';
      btnProximo.className = 'btn-principal btn-proximo';
      btnProximo.style.marginTop = '20px';
      btnProximo.onclick = function() {
        window.location.href = pecaConfig.proxima;
      };
      peca.querySelector('.peca-conteudo').appendChild(btnProximo);
    }

  } else {
    // Desativar a peça
    const botao = document.getElementById(pecaConfig.btnId);
    const peca = document.getElementById(pecaConfig.pecaId);
    const status = document.getElementById(pecaConfig.statusId);
    const icone = document.getElementById(pecaConfig.iconeId);
    const titulo = document.getElementById(pecaConfig.tituloId);
    const texto = document.getElementById(pecaConfig.textoId);

    // Remover classe "ativa" e adicionar "bloqueada"
    peca.classList.remove('ativa');
    peca.classList.add('bloqueada');

    // Atualizar status
    status.innerText = 'Bloqueada';
    status.style.color = '#facc15';

    // Atualizar visual da peça
    icone.innerText = '🔒';
    titulo.innerText = 'Peça Bloqueada';
    texto.innerHTML = 'Aguardando interação...';

    // Atualizar botão
    botao.innerText = 'Ativar Peça';

    // Alterar estado da peça
    pecaConfig.ativo = false;

    // Salvar estado no sessionStorage
    sessionStorage.setItem(`peca${pecaConfig.numero}Ativada`, 'false');

    // Remover botão de redirecionamento
    const btnProximo = peca.querySelector('.btn-proximo');
    if (btnProximo) {
      btnProximo.remove();
    }
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

      // Restaurar status
      status.innerText = 'Ativada';
      status.style.color = '#22c55e';

      // Restaurar visual da peça
      icone.innerText = '🧩';
      titulo.innerText = `Peça ${pecaConfig.numero} Ativada`;
      texto.innerHTML = `Parabéns! Você ativou a peça ${pecaConfig.numero}`;

      // Desabilitar botão
      botao.innerText = 'Desativar Peça';

      // Marcar como ativada
      pecaConfig.ativada = true;
      pecaConfig.ativo = true;

      // Adicionar botão de redirecionamento
      if (!peca.querySelector('.btn-proximo')) {
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
  
  // Contar quantas peças estão ativas
  let contador = 0;
  pecas.forEach(peca => {
    if (peca.ativo === true) {
      contador++;
    }
  });
  
  // ALTERAR VÁRIOS ELEMENTOS SIMULTANEAMENTE
  // 1. Atualizar o número de peças ativadas
  pecasAtivadas.innerText = contador;
  
  // 2. Calcular porcentagem e atualizar a barra
  const porcentagem = (contador / pecas.length) * 100;
  barraPreenchida.style.width = porcentagem + '%';
  
  // 3. Alterar cor da barra conforme progresso
  if (porcentagem === 0) {
    barraPreenchida.style.backgroundColor = '#facc15'; // Amarelo
  } else if (porcentagem === 50) {
    barraPreenchida.style.backgroundColor = '#16dd9a'; // Verde claro
  } else if (porcentagem === 100) {
    barraPreenchida.style.backgroundColor = '#22c55e'; // Verde completo
    // 4. Adicionar efeito visual quando todas estão ativas
    pecasAtivadas.style.color = '#22c55e';
    pecasAtivadas.style.fontWeight = 'bold';
    pecasAtivadas.style.fontSize = '18px';
  }
}

// Adicionar evento de clique em cada botão
pecas.forEach(pecaConfig => {
  const botao = document.getElementById(pecaConfig.btnId);
  botao.addEventListener('click', function() {
    ativarPeca(pecaConfig);
    // Chamar função que altera múltiplos elementos ao mesmo tempo
    atualizarProgresso();
  });
});

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
    emoji: '🔵'
  },
  {
    nome: 'Roxo',
    classe: 'cor-roxo',
    gradiente: 'linear-gradient(135deg, #9933ff, #6600cc)',
    emoji: '🟣'
  },
  {
    nome: 'Rosa',
    classe: 'cor-rosa',
    gradiente: 'linear-gradient(135deg, #ff0099, #cc0066)',
    emoji: '🩷'
  },
  {
    nome: 'Laranja',
    classe: 'cor-laranja',
    gradiente: 'linear-gradient(135deg, #ff6600, #cc5200)',
    emoji: '🟠'
  }
];

// Índice da cor atual
let indiceCorAtual = 0;

// Função que muda a cor da peça usando lógica com if
function mudarCorPeca() {
  const pecaCor = document.getElementById('pecaCor');
  const corAtual = document.getElementById('corAtual');
  const tituloCor = document.getElementById('tituloCor');
  const textoCor = document.getElementById('textoCor');
  const iconeCor = document.getElementById('iconeCor');
  
  // Usar if para verificar se chegou ao final do array
  if (indiceCorAtual >= cores.length) {
    // Se chegou ao final, volta ao início
    indiceCorAtual = 0;
  }
  
  // Pegar a cor atual do array
  const corSelecionada = cores[indiceCorAtual];
  
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
  
  // Incrementar índice para próxima cor
  indiceCorAtual++;
}

// Adicionar evento de clique ao botão de mudança de cor
const btnMudarCor = document.getElementById('btnMudarCor');
btnMudarCor.addEventListener('click', function() {
  mudarCorPeca();
});