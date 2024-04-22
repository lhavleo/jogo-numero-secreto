let listaSorteados = [];
let limiteNumeros = 10;
let numeroSec = gerarNumAleat();
let tentativas = 1;

function textoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
    textoNaTela('h1', 'Jogo do número secreto');
    textoNaTela('p', 'Escolha entre 1 e 10');
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSec){
        textoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Acertou com ${tentativas} ${palavraTentativa}!`;
        textoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else{
        if (chute > numeroSec){
            textoNaTela('p', 'O número secreto é menor');
        } else{
            textoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo(chute);
    }
}

function gerarNumAleat(){
    let escolhido = parseInt(Math.random() * limiteNumeros + 1);
    let qtdElementoLista = listaSorteados.length;

    if (qtdElementoLista == limiteNumeros){
        listaSorteados = [];
    }

    if (listaSorteados.includes(escolhido)){
        return gerarNumAleat();
    } else{
        listaSorteados.push(escolhido);
        console.log(listaSorteados);
        return escolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSec = gerarNumAleat();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}