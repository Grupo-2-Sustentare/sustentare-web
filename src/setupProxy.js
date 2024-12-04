const { createProxyMiddleware } = require('http-proxy-middleware');

// Define como true para ambiente local ou false para ambiente em nuvem
const DEBUG = false;

// Função para configurar os proxies
module.exports = function (app) {
    // Configuração para a Java API
    const javaApiTarget = DEBUG ? 'http://localhost:9000' : 'http://10.0.3.149:9000/';
    console.log(`Configuração de proxy para Java API ativa. Target: ${javaApiTarget}`);

    app.use(
        '/java-api',
        createProxyMiddleware({
            target: javaApiTarget,
            changeOrigin: true,
            pathRewrite: { '^/java-api': '' }, // Remove o prefixo da URL ao repassar para o backend
            onError: (err, req, res) => {
                console.error('Erro no Proxy (Java API):', err.message);
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Erro ao processar a solicitação no proxy Java API.');
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`[Java API] Requisição: ${req.method} ${req.path}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`[Java API] Resposta do Proxy: ${proxyRes.statusCode}`);
            },
        })
    );

    /*
    // app.use(
    //     '/lambda-services',
    //     createProxyMiddleware({
    //         target: 'https://pk0cpzwo89.execute-api.us-east-1.amazonaws.com',
    //         changeOrigin: true,
    //     })
    // )
    */
};
