function carregarPaginaCarrinho() {
    document.getElementById('content').innerHTML = `
        <!-- Insira aqui o código HTML da página do carrinho -->
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Carrinho Blue Store</title>
            <link rel="stylesheet" href="../styles/stylecarrinho.css">
            <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
        </head>
        <body>
        <header>
            <div class="navbar show-menu">
                <div class="header-inner-content">
                    <a href="../index.html" ><h1 class="logo">Blue <span>STORE</span></h1></a>
                </div>    
            </div>  
        </header> 
        <main>
            <div class="page-title">Seu Carrinho</div>
            <div class="content">
                <section>
                    <table>
                        <tbody id="carrinhoElement"></tbody>
                    </table>
                </section>
                <aside>
                    <div class="box">
                        <header>Resumo da compra</header>
                        <div class="info">
                            <div><span>Sub-total</span><span></span></div>
                            <div><span>Frete</span><span>Gratuito</span></div>
                            <div>
                                <button>
                                    Adicionar cupom de desconto
                                    <i class="bx bx-right-arrow-alt"></i>
                                </button>
                            </div>
                        </div>
                        <footer>
                            <span>Total</span>
                            <span></span>
                        </footer>
                    </div>
                    <a href="../checkout/index.html" class="finalizar-compra-button">Finalizar Compra</a>
                </aside>
            </div>
        </main>
        <script src="../scripts/scriptcarrinho.js"></script>
        </body>
        </html>
    `;
}


// Função para atualizar o carrinho quando a página é carregada
window.onload = function() {
    atualizarCarrinho();
};

// Função para remover um produto do carrinho
function removerDoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Encontrar o índice do produto no carrinho com base no ID
    let index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        // Remover o produto do carrinho
        carrinho.splice(index, 1);

        // Atualizar o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualizar a exibição do carrinho na página
        atualizarCarrinho();
    }
}

// Função para atualizar a exibição do carrinho na página
function atualizarCarrinho() {
    let carrinhoElement = document.getElementById('carrinhoElement');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0; // Variável para armazenar o total da compra

    carrinhoElement.innerHTML = '';

    carrinho.forEach(function (produto) {
        let produtoHTML = `
            <tr>
                <td>
                    <div class="product">
                        <img src="${produto.imagem}" alt="${produto.nome}" />
                        <div class="info">
                            <div class="name">${produto.nome}</div>
                        </div>
                    </div>
                </td>
                <td>R$ ${produto.preco}</td>
                <td>
                    <div class="qty">
                        <button onclick="diminuirQuantidade('${produto.id}')"><i class="bx bx-minus"></i></button>
                        <span>${produto.quantidade}</span>
                        <button onclick="aumentarQuantidade('${produto.id}')"><i class="bx bx-plus"></i></button>
                    </div>
                </td>
                <td>R$ ${produto.preco * produto.quantidade}</td>
                <td>
                    <button class="remove" onclick="removerDoCarrinho('${produto.id}')"><i class="bx bx-x"></i></button>
                </td>
            </tr>
        `;

        carrinhoElement.innerHTML += produtoHTML;

        // Adicionar o valor do produto ao total
        total += produto.preco * produto.quantidade;
    });

    // Selecionar o elemento dentro da classe 'box' para exibir o total
    let totalElement = document.querySelector('.box footer span:last-child');
    
    // Atualizar o conteúdo do elemento com o valor total formatado
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para diminuir a quantidade de um produto
function diminuirQuantidade(id) {
    alterarQuantidade(id, -1);
}

// Função para aumentar a quantidade de um produto
function aumentarQuantidade(id) {
    alterarQuantidade(id, 1);
}

// Função para alterar a quantidade de um produto
function alterarQuantidade(id, quantidadeAlteracao) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Encontrar o índice do produto no carrinho com base no ID
    let index = carrinho.findIndex(item => item.id === id);

    if (index !== -1) {
        // Alterar a quantidade do produto
        carrinho[index].quantidade += quantidadeAlteracao;

        // Garantir que a quantidade não seja menor que 1
        if (carrinho[index].quantidade < 1) {
            carrinho[index].quantidade = 1;
        }

        // Atualizar o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualizar a exibição do carrinho na página
        atualizarCarrinho();
    }
}

