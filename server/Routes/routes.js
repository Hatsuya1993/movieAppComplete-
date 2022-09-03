"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../Controller/userController");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.route("/registerUser").post(userController_1.postRegisterUser);
exports.userRoutes.route("/loginUser").post(userController_1.postLoginUser);
exports.userRoutes.route("/logoutUser").get(userController_1.getLogout);
