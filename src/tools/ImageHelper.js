export default function pegarImagemPorNome(nome) {
    let img = "https://placehold.co/400/F5FBEF/22333B?text="
    return img + nome.substring(0, 1)
}