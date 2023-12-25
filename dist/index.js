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
/*import imageRoutes from './routes/imageRoutes';*/
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Serve static files (images)
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '..', 'assets')));
// Endpoint for image resizing
app.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (!filename || !width || !height) {
        return res.status(400).send('Missing parameters');
    }
    // Define paths for original and processed images
    const originalImagePath = path_1.default.join(__dirname, '..', 'assets', 'full', `${filename}.jpg`);
    const thumbImagePath = path_1.default.join(__dirname, '..', 'assets', 'thumb', `${filename}_${width}_${height}.jpg`);
    try {
        // Process the image using Sharp
        yield (0, sharp_1.default)(originalImagePath)
            .resize(Number(width), Number(height))
            .toFile(thumbImagePath);
        // Serve the processed image
        res.sendFile(thumbImagePath);
    }
    catch (err) {
        console.error(err); // Log the error to the console for debugging
        res.status(500).send('Internal Server Error');
    }
}));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
