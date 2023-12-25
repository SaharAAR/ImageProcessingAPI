import sharp from 'sharp';

export async function resizeImage(inputPath: string, outputPath: string, width: number, height: number): Promise<void> {
    await sharp(inputPath).resize({ width, height }).toFile(outputPath);
}

export async function checkCachedImage(outputPath: string): Promise<boolean> {
    try {
        await sharp(outputPath).metadata();
        return true;
    } catch (error) {
        return false;
    }
}
