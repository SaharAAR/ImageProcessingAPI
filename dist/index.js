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
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// serve static files (images)
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '..', 'assets')));
// endpoint for image resizing
app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        res.status(400).send('Missing parameters');
        return;
    }
    // paths for original & processed images
    const originalImagePath = path_1.default.join(__dirname, '..', 'assets', 'full', `${filename}.jpg`);
    const thumbImagePath = path_1.default.join(__dirname, '..', 'assets', 'thumb', `${filename}_${width}_${height}.jpg`);
    try {
        // process image using Sharp
        yield (0, sharp_1.default)(originalImagePath).resize(Number(width), Number(height)).toFile(thumbImagePath);
        // return processed image
        res.sendFile(thumbImagePath, {}, (err) => {
            if (err) {
                console.error(err); // log the error to the console for debugging
                res.status(500).send('Internal Server Error');
            }
        });
    }
    catch (err) {
        console.error(err); // log the error to the console for debugging
        res.status(500).send('Internal Server Error');
    }
}));
// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
