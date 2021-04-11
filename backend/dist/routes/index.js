"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const router = express.Router();
router.post('/authentication', controllers_1.authenticationController.authenticate);
exports.default = router;
//# sourceMappingURL=index.js.map