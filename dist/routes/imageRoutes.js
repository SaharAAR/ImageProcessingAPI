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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageName, width, height } = req.query;
    const inputPath = `assets/full/${imageName}.jpg`;
    const outputPath = `assets/thumb/${imageName}_${width}x${height}.jpg`;
    try {
        const isCached = yield checkCachedImage(outputPath);
        if (!isCached) {
            yield resizeImage(inputPath, outputPath, Number(width), Number(height));
        }
        res.sendFile(outputPath);
    }
    catch (error) {
        console.error('Image processing error:', error);
        res.status(500).send('Error processing image');
    }
}));
function resizeImage(inputPath, outputPath, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(inputPath).resize({ width, height }).toFile(outputPath);
    });
}
function checkCachedImage(outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(outputPath);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.default = router;
