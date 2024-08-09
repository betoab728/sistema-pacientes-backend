"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.post('/', userController_1.createUser);
router.put('/:id', userController_1.updateUser);
router.post('/login', userController_1.loginUser);
// Se agrega la ruta para obtener un usuario por ID getUserById
router.get('/:id', userController_1.getUserById);
exports.default = router;
