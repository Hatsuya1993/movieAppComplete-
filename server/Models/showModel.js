"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
var mongoose_1 = require("mongoose");
var ShowSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    original_title: {
        type: String,
        required: true,
        unique: true,
    },
    original_language: {
        type: String,
        required: true,
        unique: true,
    },
    overview: {
        type: String,
        required: true,
        unique: true,
    },
    poster_path: {
        type: String,
        required: true,
        unique: true,
    },
    release_date: {
        type: String,
        required: true,
        unique: true,
    },
    backdrop_path: {
        type: String,
        required: true,
        unique: true,
    }
});
exports.Show = mongoose_1.model('Show', ShowSchema);
