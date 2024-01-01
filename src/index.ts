import express, { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';

const app = express();

// serve static files (images)
app.use('/images', express.static(path.join(__dirname, '..', 'assets')));

// endpoint for image resizing
app.get('/images', async (req: Request, res: Response): Promise<void> => {
  const { filename, width, height } = req.query as {
    filename: string;
    width: string;
    height: string;
  };

  if (!filename || !width || !height) {
    res.status(400).send('Missing parameters');
    return;
  }

  // paths for original & processed images
  const originalImagePath = path.join(__dirname, '..', 'assets', 'full', `${filename}.jpg`);
  const thumbImagePath = path.join(
    __dirname,
    '..',
    'assets',
    'thumb',
    `${filename}_${width}_${height}.jpg`
  );

  try {
    // process image using Sharp
    await sharp(originalImagePath).resize(Number(width), Number(height)).toFile(thumbImagePath);

    // return processed image
    res.sendFile(thumbImagePath, {}, (err) => {
      if (err) {
        console.error(err); // log the error to the console for debugging
        res.status(500).send('Internal Server Error');
      }
    });
  } catch (err) {
    console.error(err); // log the error to the console for debugging
    res.status(500).send('Internal Server Error');
  }
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
