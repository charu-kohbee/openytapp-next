const { https } = require('firebase-functions')
const { default: next } = require('next')

const isDev = process.env.NODE_ENV !== 'production';

const server = next({
    dev: isDev,
    conf: { distDir: '.next' }
})

const nextjsHandler = server.getRequestHandler();
//we will create out firebase functions

exports.nextServer = https.onRequest((req, res) => {
    return server.prepare().then(() => {
        return nextjsHandler(req, res);
    })
})