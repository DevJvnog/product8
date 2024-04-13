function atualizarCarrinho() {
    console.log('Atualizando carrinho...');

    // Obtém o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Obtém a referência ao elemento HTML onde as linhas da tabela serão adicionadas
    let carrinhoElement = document.getElementById('carrinhoElement');

    // Limpa o conteúdo atual do elemento
    carrinhoElement.innerHTML = '';

    // Itera sobre os produtos no carrinho e cria as linhas da tabela dinamicamente
    carrinho.forEach(produto => {
        // Cria um novo elemento de linha (tr)
        let linha = document.createElement('tr');

        // Adiciona as células (td) para cada propriedade do produto
        linha.innerHTML = `
            <td>
                <div class="product">
                    <img src="${produto.imagem}" alt="${produto.nome}" />
                    <div class="info">
                        <div class="name">${produto.nome}</div>
                    </div>
                </div>
            </td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <div class="qty">
                    <button><i class="bx bx-minus"></i></button>
                    <span>${produto.quantidade}</span>
                    <button><i class="bx bx-plus"></i></button>
                </div>
            </td>
            <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
            <td>
                <button class="remove" onclick="removerDoCarrinho('${produto.id}')"><i class="bx bx-x"></i></button>
            </td>
        `;

        // Adiciona a linha à tabela
        carrinhoElement.appendChild(linha);
    });
}