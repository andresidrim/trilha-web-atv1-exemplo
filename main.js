/*
    Primeiro, buscamos no HTML os elementos que iremos
    manipular através do JavaScript.

    document.querySelector() recebe um seletor CSS e
    retorna o primeiro elemento que corresponde a ele.
*/


// Container que contém todos os itens da lista.
const items = document.querySelector("#items");


// Formulário utilizado para adicionar novos itens.
const form = document.querySelector("#item-form");


// Campo onde o usuário informa o nome do produto.
const nameInput = document.querySelector("#item-name");


// Campo onde o usuário informa a quantidade.
const quantityInput = document.querySelector("#item-quantity");



/*
    addEventListener()

    Permite executar uma função quando determinado evento
    acontece.

    Como estamos trabalhando com um <form>, utilizamos
    o evento "submit" em vez de "click".

    Isso significa que a função será executada tanto quando
    o usuário clicar no botão "+" quanto quando enviar o
    formulário através do teclado (por exemplo, pressionando Enter).
*/

form.addEventListener("submit", (event) => {

    /*
        Quando um formulário é enviado, o navegador normalmente
        tenta recarregar a página.

        preventDefault() impede esse comportamento padrão.

        Queremos controlar o envio do formulário através
        do JavaScript.
    */
    event.preventDefault();


    /*
        .value

        Retorna o valor atualmente digitado dentro de um input.

        Por exemplo, se o usuário escrever:

        Nome: Banana
        Quantidade: 3

        teremos:

        name === "Banana"
        quantity === "3"
    */

    const name = nameInput.value.trim();
    const quantity = quantityInput.value.trim();


    /*
        Validação dos campos.

        Uma string vazia é considerada "falsy" em JavaScript.

        Portanto, verificamos se algum dos campos está vazio.

        O método trim() remove espaços desnecessários no
        começo e no final do texto.
    */

    if (!name || !quantity) {
        alert("Campos não preenchidos");

        /*
            return interrompe a execução da função.

            Assim, o item não será criado enquanto os dados
            estiverem incompletos.
        */
        return;
    }


    /*
        Verificamos se a quantidade é um número válido.

        Number() transforma o valor do input, que originalmente
        é uma string, em um número.

        Por exemplo:

        Number("5") -> 5
    */

    const numericQuantity = Number(quantity);


    /*
        Number.isNaN() verifica se o resultado da conversão
        não é um número válido.

        Caso a quantidade seja inválida, mostramos uma mensagem
        e interrompemos a função.
    */

    if (Number.isNaN(numericQuantity)) {
        alert("Quantidade deve ser um número");
        return;
    }


    /*
        ---------------------------------------------------------
        CRIAÇÃO DO ITEM
        ---------------------------------------------------------

        Agora que os dados foram validados, podemos criar
        o novo elemento da lista.

        document.createElement()

        cria um elemento HTML através do JavaScript.

        Neste caso:

        const item = document.createElement("li");

        cria inicialmente:

        <li></li>

        O elemento ainda não está na página.
    */

    const item = document.createElement("li");


    /*
        Adicionamos a classe "item".

        O CSS poderá então aplicar os mesmos estilos utilizados
        pelos outros itens da lista.

        Resultado:

        <li class="item"></li>
    */

    item.classList.add("item");


    /*
        Criamos o elemento que irá armazenar o nome do produto.

        Resultado inicial:

        <h2></h2>
    */

    const itemName = document.createElement("h2");

    itemName.classList.add("item-name");


    /*
        textContent define o texto que ficará dentro do elemento.

        Se o usuário digitou "Banana", teremos:

        <h2 class="item-name">Banana</h2>
    */

    itemName.textContent = name;


    /*
        Criamos o elemento responsável por exibir
        a quantidade.
    */

    const itemQuantity = document.createElement("span");

    itemQuantity.textContent = numericQuantity;


    /*
        Criamos o botão de deletar.

        Neste momento temos apenas:

        <button></button>
    */

    const deleteButton = document.createElement("button");


    /*
        Adicionamos a classe utilizada pelo CSS.
    */

    deleteButton.classList.add("delete-button");


    /*
        Como esse botão não deve enviar o formulário,
        definimos explicitamente seu tipo como "button".
    */

    deleteButton.type = "button";


    /*
        Define o texto que aparecerá dentro do botão.
    */

    deleteButton.textContent = "X";


    /*
        append()

        Adiciona os elementos criados dentro do item.

        Estamos construindo algo equivalente a:

        <li class="item">
            <h2 class="item-name">Banana</h2>
            <span>3</span>
            <button class="delete-button">X</button>
        </li>
    */

    item.append(
        itemName,
        itemQuantity,
        deleteButton
    );


    /*
        Agora adicionamos o <li> criado dentro do <ul>.

        Antes:

        <ul id="items">
            <li>Pão francês</li>
        </ul>

        Depois:

        <ul id="items">
            <li>Pão francês</li>
            <li>Banana</li>
        </ul>
    */

    items.appendChild(item);


    /*
        Depois de adicionar o item, limpamos os campos
        para que o usuário possa adicionar outro produto.
    */

    nameInput.value = "";
    quantityInput.value = "";

});



/*
    ---------------------------------------------------------
    EXCLUSÃO DE ITENS
    ---------------------------------------------------------

    Agora precisamos detectar quando o usuário clica
    em um botão de deletar.

    Os botões de deletar não existem apenas no HTML inicial.

    Novos botões são criados dinamicamente pelo JavaScript
    sempre que um novo item é adicionado.

    Por isso, em vez de adicionar um evento individual
    a cada botão, podemos observar os cliques no documento.
*/

document.addEventListener("click", (event) => {

    /*
        event.target representa o elemento que recebeu
        o clique.

        Se o usuário clicar no X:

        event.target

        será o botão:

        <button class="delete-button">X</button>
    */


    /*
        classList.contains()

        Verifica se o elemento possui determinada classe.

        Aqui estamos perguntando:

        "O elemento clicado possui a classe
        delete-button?"
    */

    if (event.target.classList.contains("delete-button")) {


        /*
            confirm()

            Exibe uma caixa de confirmação para o usuário.

            O resultado será:

            true  -> usuário clicou em OK
            false -> usuário clicou em Cancelar
        */

        const confirmed = confirm(
            "Deseja mesmo excluir este item?"
        );


        /*
            Só removemos o item se o usuário confirmar.
        */

        if (confirmed) {

            /*
                closest()

                Procura o elemento ancestral mais próximo
                que corresponde ao seletor fornecido.

                O botão está dentro de um <li class="item">.

                Portanto:

                event.target.closest(".item")

                encontra o <li> correspondente àquele botão.

                Depois usamos remove() para removê-lo do DOM.
            */

            event.target.closest(".item").remove();
        }
    }
});
