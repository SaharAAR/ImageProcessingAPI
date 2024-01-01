import express from 'express';
import sharp from 'sharp';
import fs from 'fs/promises';

const router = express.Router();

router.get('/', async (req, res) => {
  const { imageName, width, height } = req.query;
  const inputPath = `assets/full/${imageName}.jpg`;
  const outputPath = `assets/thumb/${imageName}_${width}x${height}.jpg`;

  try {
    const isCached = await checkCachedImage(outputPath);

    if (!isCached) {
      await resizeImage(inputPath, outputPath, Number(width), Number(height));
    }

    res.sendFile(outputPath);
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).send('Error processing image');
  }
});

async function resizeImage(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(inputPath).resize({ width, height }).toFile(outputPath);
}

async function checkCachedImage(outputPath: string): Promise<boolean> {
  try {
    await fs.access(outputPath);
    return true;
  } catch (error) {
    return false;
  }
}

export default router;
