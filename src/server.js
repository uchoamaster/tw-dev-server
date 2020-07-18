const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static-server');
const cors = require('@koa/cors');
const ApiMiddleware = require('./api').ApiMiddleware;
const terminal = require('./terminal');
const versionManager = require('./version-manager');

module.exports = {
    start(options){
        if(options.showVersion){
            terminal.printCurrentVersion();
        }else{
            const app = new Koa();
            app.use(cors());
            app.use(bodyParser());
            app.use(ApiMiddleware());
            app.use(serve({
                rootDir: terminal.cliDirectory,
            }));
            app.listen(options.port, () => {
                terminal.printSignature();
                terminal.printServerRunningInfo();
                versionManager.checkUpdates();
            })
        }
    }
}