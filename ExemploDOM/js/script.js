const botaoAtivar = document.getElementById('btnAtivar');
const peca = document.getElementById('peca');
const statusTexto = document.getElementById('statusTexto');
const iconePeca = document.getElementById('iconePeca');
const tituloPeca = document.getElementById('tituloPeca');
const textoPeca = document.getElementById('textoPeca');

// Estado da Aplicação

let pecaAtivada = false;

// Evento de clique

botaoAtivar.addEventListener('click', function() {
    // verificar se a peça foi ativada
    if(pecaAtivada === false) {
        // remoção da classe "bloqueada"
        peca.classList.remove('bloqueada');

        //Adicionar classe ativa
        peca.classList.add('ativa');

        //mudança de texto
        statusTexto.innerText = 'Ativada';

        //Alterar cor do texto
        statusTexto.style.color = "#22c55e";

        //Alterar icone da peça
        iconePeca.innerText = "";

        //alterar titulo da peça
        tituloPeca.innerText = "Peça Ativada";

        //alterar descrição da peça
        textoPeca.innerHTML = "Parabéns! Você ativou a primeira peça";

        //alterar texto do botão
        botaoAtivar.innerText = "Peça Ativada";

        //desativar o botao apos clique
        botaoAtivar.disabled = true;

        //criar botão de redirecionamento
        const btnProximo = document.createElement('button');
        btnProximo.innerText = 'Ir para Próxima Etapa';
        btnProximo.className = 'btn-principal';
        btnProximo.style.marginTop = '20px';
        btnProximo.onclick = function() {
            window.location.href = 'pagina2.html';
        };

        //adicionar botão à peça
        peca.querySelector('.peca-conteudo').appendChild(btnProximo);

    }
});