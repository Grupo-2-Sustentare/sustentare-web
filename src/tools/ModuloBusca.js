function filtrar(produtos, query){
    if (query === null || query.trim() === "") return produtos

    return produtos.filter(produto => produto.item.nome.toUpperCase().indexOf(query.toUpperCase()) !== -1)
}

function ordenar(produtos, ordenacao){
    switch (ordenacao) {
        case "Alfabética - Crescente":
            return [...produtos].sort((a, b) => a.item.nome.localeCompare(b.item.nome))
        case "Alfabética - Decrescente":
            return [...produtos].sort((a, b) => b.item.nome.localeCompare(a.item.nome))
        case "Quantidade - Crescente":
            return [...produtos].sort((a, b) => b.qtdProdutoTotal - a.qtdProdutoTotal)
        case "Quantidade - Decrescente":
            return [...produtos].sort((a, b) => a.qtdProdutoTotal - b.qtdProdutoTotal)
        case null: return produtos
        default: throw new Error("Ordenação inválida.")
    }
}

export default function ordenacaoComPesquisa(produtos, queryPesquisa, ordenacao){
    const filtrados = filtrar(produtos, queryPesquisa)
    return ordenar(filtrados, ordenacao)
}

