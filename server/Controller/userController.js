"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogout = exports.postLoginUser = exports.postRegisterUser = exports.requireAuth = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var userModel_1 = require("../Models/userModel");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var maxAge = 3 * 24 * 60 * 60;
var createToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, 'secret', {
        expiresIn: maxAge
    });
};
var requireAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        token = req.cookies;
        if (token) {
            jsonwebtoken_1.default.verify(token, 'secret', function (err, decodedToken) {
                if (err) {
                    console.log(err.message);
                    res.json({
                        statusMessage: "User not authenticated"
                    });
                }
                else {
                    next();
                }
            });
        }
        return [2 /*return*/];
    });
}); };
exports.requireAuth = requireAuth;
var postRegisterUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userDetails, salt, _a, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userDetails = req.body;
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 1:
                salt = _b.sent();
                _a = userDetails;
                return [4 /*yield*/, bcrypt_1.default.hash(userDetails.password, salt)];
            case 2:
                _a.password = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, userModel_1.User.create({
                        email: userDetails.email,
                        password: userDetails.password
                    })];
            case 4:
                user = _b.sent();
                token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.json({
                    statusCode: 200,
                    email: userDetails.email,
                    statusMessage: 'User registered'
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.json({
                    response: res.statusCode,
                    errorMessage: error_1
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postRegisterUser = postRegisterUser;
var postLoginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userDetails, user, auth, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userDetails = req.body;
                return [4 /*yield*/, userModel_1.User.findOne({ email: userDetails.email })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(userDetails.password, String(user.password))];
            case 2:
                auth = _a.sent();
                if (auth) {
                    token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.json({
                        statusCode: 200,
                        email: userDetails.email,
                        statusMessage: 'User logged in'
                    });
                }
                else {
                    res.json({
                        response: res.statusCode,
                        errorMessage: "Incorrect Password"
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                res.json({
                    response: res.statusCode,
                    errorMessage: "Incorrect Email"
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postLoginUser = postLoginUser;
var getLogout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.json({
            response: res.statusCode,
            statusMessage: "User logged out"
        });
        return [2 /*return*/];
    });
}); };
exports.getLogout = getLogout;
