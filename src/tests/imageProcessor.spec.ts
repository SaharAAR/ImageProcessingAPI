import sharp from 'sharp';
//import { resizeImage, checkCachedImage } from './../../src/utils/imageProcessor';
import { resizeImage, checkCachedImage } from '../utils/imageProcessor';

describe('Image Processor', () => {
  describe('resizeImage', () => {
    it('should resize an image to specified dimensions', async () => {
      const inputPath = './assets/full/artwork.jpg';
      const outputPath = './assets/thumb/artwork_300_300.jpg';
      const width = 300;
      const height = 300;

      await resizeImage(inputPath, outputPath, width, height);

      const resizedImage = await sharp(outputPath).metadata();
      expect(resizedImage.width).toBe(width);
      expect(resizedImage.height).toBe(height);
    });
  });

  describe('checkCachedImage', () => {
    it('should return true if the cached image exists', async () => {
      const outputPath = './assets/thumb/artwork_300_300.jpg'; //  existing image
      const isCached = await checkCachedImage(outputPath);
      expect(isCached).toBe(true);
    });

    it('should return false if the cached image does not exist', async () => {
      const outputPath = './assets/thumb/nonexistent.jpg'; //  nonexistent image
      const isCached = await checkCachedImage(outputPath);
      expect(isCached).toBe(false);
    });
  });
});
