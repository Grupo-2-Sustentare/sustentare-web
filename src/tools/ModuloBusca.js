const EnumObjetosBusca = {
    PRODUTO: "Produto", LOG: "Log", CATEGORIA: "Categoria"
}

const OPCOES_ORDENACAO = {
    "Produto": [
        "Alfabética - Crescente", "Alfabética - Decrescente", "Quantidade - Crescente", "Quantidade - Decrescente"
    ],
    "Log": ["Ação - Crescente", "Ação - Decrescente", "Usuário - Crescente", "Usuário - Decrescente"],
    "Categoria": ["Alfabética - Crescente", "Alfabética - Decrescente"]
}

function filtrar(itens, query, tipoObjeto){
    if (query === null || query.trim() === "") return itens

    switch (tipoObjeto){
        case EnumObjetosBusca.PRODUTO:
            return itens.filter(item => item.item.nome.toUpperCase().indexOf(query.toUpperCase()) !== -1)
        case EnumObjetosBusca.LOG:
            return itens.filter(item => item.nomeUsuario.toUpperCase().indexOf(query.toUpperCase()) !== -1)
        case EnumObjetosBusca.CATEGORIA:
            return itens.filter(item => item.nome.toUpperCase().indexOf(query.toUpperCase()) !== -1)
        default: throw new Error(`Nenhum método de pesquisa para objetos da classe "${tipoObjeto}"`)
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

        case "Log: Ação - Crescente":
            return [...itens].sort((a,b)=> a.descricao.localeCompare(b.descricao))
        case "Log: Ação - Decrescente":
            return [...itens].sort((a,b)=> b.descricao.localeCompare(a.descricao))
        case "Log: Usuário - Crescente":
            return [...itens].sort((a,b)=> a.nomeUsuario.localeCompare(b.nomeUsuario))
        case "Log: Usuário - Decrescente":
            return [...itens].sort((a,b)=> b.nomeUsuario.localeCompare(a.nomeUsuario))

        case "Categoria: Alfabética - Crescente":
            return [...itens].sort((a, b) => a.nome.localeCompare(b.nome))
        case "Categoria: Alfabética - Decrescente":
            return [...itens].sort((a, b) => b.nome.localeCompare(a.nome))

        default: throw new Error(`Nenhum método de ordenação "${ordenacao}" para objetos da classe "${tipoObjeto}"`)
    }
}

function ordenacaoComPesquisa(itens, queryPesquisa, ordenacao, tipoObjeto){
    const filtrados = filtrar(itens, queryPesquisa, tipoObjeto)
    return ordenar(filtrados, ordenacao, tipoObjeto)
}

export {ordenacaoComPesquisa, OPCOES_ORDENACAO, EnumObjetosBusca}