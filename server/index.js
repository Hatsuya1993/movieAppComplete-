"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = require("./Routes/routes");
dotenv_1.default.config({
    path: "./config.env"
});
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default({
    credentials: true,
    origin: process.env.SERVER || 'http://localhost:3000'
}));
exports.app.use(cookie_parser_1.default());
exports.app.use('/', routes_1.userRoutes);
var DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
try {
    mongoose_1.default.connect(DB);
}
catch (error) {
    console.log("[DB]: " + error);
}
finally {
    console.log("[DB]: MongoDB success connect");
}
var port = process.env.PORT || 8200;
exports.app.listen(port, function () {
    console.log("[Server]: Server is running");
});
