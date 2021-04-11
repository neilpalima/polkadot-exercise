"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const routes_1 = require("../routes");
const middlewares_1 = require("../middlewares");
const server = (port) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(routes_1.default);
    // serve static content
    app.get('/', (req, res) => {
        res.redirect('/login');
    });
    app.use(express.static(path.join(__dirname, '../../../frontend', 'build')));
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../frontend', 'build', 'index.html'));
    });
    app.use(middlewares_1.errorHandleMiddleware.notFound);
    if (app.get('env') !== 'production') {
        app.use(middlewares_1.errorHandleMiddleware.developmentErrors);
    }
    app.use(middlewares_1.errorHandleMiddleware.productionErrors);
    app.listen(port, () => console.log(`server is now running on port ${port}`));
    return app;
};
exports.default = server;
//# sourceMappingURL=server.js.map