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
const sharp_1 = __importDefault(require("sharp"));
const imageProcessor_1 = require("./../../src/utils/imageProcessor");
describe('Image Processor', () => {
    describe('resizeImage', () => {
        it('should resize an image to specified dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
            const inputPath = './assets/full/artwork.jpg';
            const outputPath = './assets/thumb/artwork_300_300.jpg';
            const width = 300;
            const height = 300;
            yield (0, imageProcessor_1.resizeImage)(inputPath, outputPath, width, height);
            const resizedImage = yield (0, sharp_1.default)(outputPath).metadata();
            expect(resizedImage.width).toBe(width);
            expect(resizedImage.height).toBe(height);
        }));
    });
    describe('checkCachedImage', () => {
        it('should return true if the cached image exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const outputPath = './assets/thumb/artwork_300_300.jpg'; //  existing image
            const isCached = yield (0, imageProcessor_1.checkCachedImage)(outputPath);
            expect(isCached).toBe(true);
        }));
        it('should return false if the cached image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const outputPath = './assets/thumb/nonexistent.jpg'; //  nonexistent image
            const isCached = yield (0, imageProcessor_1.checkCachedImage)(outputPath);
            expect(isCached).toBe(false);
        }));
    });
});
