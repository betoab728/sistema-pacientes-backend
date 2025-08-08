"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
const validarJWT_1 = require("../middlewares/validarJWT");
router.get('/', validarJWT_1.validarJWT, dashboardController_1.getDashboard);
exports.default = router;
