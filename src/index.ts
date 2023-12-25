import express from 'express';
/*import imageRoutes from './routes/imageRoutes';*/
import sharp from 'sharp';
import path from 'path';

const app = express();

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, '..', 'assets')));

// Endpoint for image resizing
app.get('/images', async (req, res) => {
    const { filename, width, height } = req.query;

    if (!filename || !width || !height) {
        return res.status(400).send('Missing parameters');
    }

    // Define paths for original and processed images
    const originalImagePath = path.join(__dirname, '..', 'assets', 'full', `${filename}.jpg`);
    const thumbImagePath = path.join(__dirname, '..', 'assets', 'thumb', `${filename}_${width}_${height}.jpg`);

    try {
        // Process the image using Sharp
        await sharp(originalImagePath)
            .resize(Number(width), Number(height))
            .toFile(thumbImagePath);

        // Serve the processed image
        res.sendFile(thumbImagePath);
    } catch (err) {
        console.error(err); // Log the error to the console for debugging
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
