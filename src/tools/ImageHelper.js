export default function pegarImagemPorNome(nome) {
    let img = "https://placehold.co/400/F5FBEF/22333B?text="
    return img + nome.substring(0, 1)
}

export const URL_S3 = "https://sustentare-bucket-teste.s3.us-east-1.amazonaws.com//itens/imagens/"