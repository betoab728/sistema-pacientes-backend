"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.post('/login', userController_1.loginUser);
router.post('/', userController_1.createUser);
// Las rutas protegidas que requieren token:
router.put('/:id', validarJWT_1.validarJWT, userController_1.updateUser);
router.get('/:id', validarJWT_1.validarJWT, userController_1.getUserById);
router.get('/', validarJWT_1.validarJWT, userController_1.getUsers);
exports.default = router;
