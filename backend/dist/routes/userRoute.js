"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, userController_1.default.getUser);
router.post("/", auth_1.jwtCheck, userController_1.default.createUser);
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateUserRequest, userController_1.default.updateUser);
exports.default = router;
