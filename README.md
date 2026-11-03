# ThomRepo

Loja e-commerce de dropshipping com design sofisticado, feita em HTML, CSS e JavaScript puro.

## Recursos

- Catálogo responsivo com busca e filtro por categoria
- Carrinho persistente no navegador
- Checkout que envia o pedido formatado para o WhatsApp
- Painel do lojista para cadastrar, editar preços e excluir produtos
- Controle de preço de venda e custo do fornecedor
- Sem instalação, banco de dados ou build

## Como usar

1. Abra `index.html` no navegador, ou publique o repositório no GitHub Pages.
2. Vá em **Painel** para cadastrar seus produtos.
3. Os dados ficam salvos no `localStorage` do navegador.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`. A loja ficará disponível no endereço gerado pelo GitHub.

## Personalizar WhatsApp

No arquivo `app.js`, localize a função de checkout e troque `https://wa.me/?text=` por `https://wa.me/55SEUNUMERO?text=` para enviar os pedidos ao seu WhatsApp.