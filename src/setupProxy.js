const { createProxyMiddleware } = require('http-proxy-middleware');

const DEBUG = false

module.exports = function(app) {
    app.use(
        '/proxy-java-api',
        createProxyMiddleware({
            //10.0.0.164
            //'http://10.0.0.164:8080'
            target: DEBUG ? 'http://localhost:9000' : 'http://10.0.0.164:9000/',
            changeOrigin: true,
            pathRewrite: { '^/proxy-java-api': '' },
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