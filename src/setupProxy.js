const { createProxyMiddleware } = require('http-proxy-middleware');

// Defina como true para ambiente local, ou false para ambiente em nuvem
const DEBUG = false;

// Função que configura o proxy
module.exports = function (app) {
    // Verifica se a variável DEBUG está definida corretamente
    const targetUrl = DEBUG ? 'http://localhost:9000' : 'http://10.0.3.131:9000/';

    console.log(`Configuração de proxy ativa. Target: ${targetUrl}`);

    app.use(
        '/proxy-java-api',
        createProxyMiddleware({
            target: targetUrl,
            changeOrigin: true,
            pathRewrite: { '^/proxy-java-api': '' },
            onError: (err, req, res) => {
                console.error('Erro no Proxy:', err.message);
                res.writeHead(500, {
                    'Content-Type': 'text/plain',
                });
                res.end('Algo deu errado no proxy.');
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`Proxying request - Path: ${req.path}, Method: ${req.method}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`Response recebido do proxy - Status: ${proxyRes.statusCode}`);
            },
        })
    );

        // app.use(
    //     '/lambda-services',
    //     createProxyMiddleware({
    //         target: 'https://pk0cpzwo89.execute-api.us-east-1.amazonaws.com',
    //         changeOrigin: true,
    //     })
    // );
};
