const EnumObjetosBusca = {
    PRODUTO: "Produto",
    LOG: "Log"
}

const OPCOES_ORDENACAO = [
    "Alfabética - Crescente", "Alfabética - Decrescente", "Quantidade - Crescente", "Quantidade - Decrescente"
]

function filtrar(produtos, query, tipoObjeto){
    if (query === null || query.trim() === "") return produtos

    switch (tipoObjeto){
        case EnumObjetosBusca.PRODUTO:
            return produtos.filter(produto => produto.item.nome.toUpperCase().indexOf(query.toUpperCase()) !== -1)
    }
}

function ordenar(itens, ordenacao, tipoObjeto){
    if (ordenacao === null) return itens

    switch (`${tipoObjeto}: ${ordenacao}`) {
        case "Produto: Alfabética - Crescente":
            return [...itens].sort((a, b) => a.item.nome.localeCompare(b.item.nome))
        case "Produto: Alfabética - Decrescente":
            return [...itens].sort((a, b) => b.item.nome.localeCompare(a.item.nome))
        case "Produto: Quantidade - Crescente":
            return [...itens].sort((a, b) => b.qtdProdutoTotal - a.qtdProdutoTotal)
        case "Produto: Quantidade - Decrescente":
            return [...itens].sort((a, b) => a.qtdProdutoTotal - b.qtdProdutoTotal)
        default: throw new Error(`Ordenação "${ordenacao}" inválida.`)
    }
}

function ordenacaoComPesquisa(itens, queryPesquisa, ordenacao, tipoObjeto){
    const filtrados = filtrar(itens, queryPesquisa, tipoObjeto)
    return ordenar(filtrados, ordenacao, tipoObjeto)
}

export {ordenacaoComPesquisa, OPCOES_ORDENACAO, EnumObjetosBusca}