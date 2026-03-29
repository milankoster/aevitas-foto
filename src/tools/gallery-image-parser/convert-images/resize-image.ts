import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

type Options = {
  input: string;
  output?: string;
  width: number;
  format?: 'png' | 'jpeg' | 'webp' | 'avif';
  quality?: number;
  dryRun?: boolean;
  backup?: boolean;
  force?: boolean;
};

/* eslint-disable complexity */
function parseArgs(): Options | null {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    const usage =
      'Usage: tsx resize-image.ts --input <path> --width <px> [--output <path>] ' +
      '[--format png|jpeg|webp|avif] [--quality 80] [--dry-run] [--no-backup] [--force]';
    console.error(usage);
    return null;
  }

  const opts: Partial<Options> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--input':
      case '-i':
        opts.input = argv[++i];
        break;
      case '--output':
      case '-o':
        opts.output = argv[++i];
        break;
      case '--width':
      case '-w':
        opts.width = Number(argv[++i]);
        break;
      case '--format':
        opts.format = argv[++i] as Options['format'];
        break;
      case '--quality':
        opts.quality = Number(argv[++i]);
        break;
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--no-backup':
        opts.backup = false;
        break;
      case '--backup':
        opts.backup = true;
        break;
      case '--force':
        opts.force = true;
        break;
      default:
        console.warn(`Unknown arg: ${a}`);
    }
  }

  if (!opts.input || !opts.width) {
    console.error('--input and --width are required');
    return null;
  }

  return {
    input: opts.input,
    output: opts.output,
    width: opts.width,
    format: opts.format,
    quality: opts.quality ?? 80,
    dryRun: opts.dryRun ?? false,
    backup: opts.backup ?? true,
    force: opts.force ?? false,
  } as Options;
}
/* eslint-enable complexity */

/* eslint-disable complexity */
async function run(opts: Options): Promise<void> {
  const inputPath = path.resolve(opts.input);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    process.exitCode = 1;
    return;
  }

  const outputPath = opts.output ? path.resolve(opts.output) : inputPath;

  try {
    const meta = await sharp(inputPath).metadata();

    console.log(`Input image: ${inputPath}`);
    console.log(`Current size: ${meta.width ?? 'unknown'}x${meta.height ?? 'unknown'}`);
    console.log(`Target width: ${opts.width}px`);

    if (!opts.force && meta.width && meta.width <= opts.width) {
      console.log('Image is already at or smaller than target width. Use --force to override.');
      return;
    }

    if (opts.dryRun) {
      console.log('[dry-run] Would resize and write to:', outputPath);
      return;
    }

    if (outputPath === inputPath && opts.backup) {
      const backupPath = `${inputPath}.bak`;
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
        console.log(`Backup created: ${backupPath}`);
      } else {
        console.log(`Backup already exists: ${backupPath}`);
      }
    }

    let pipeline = sharp(inputPath).resize({ width: opts.width, withoutEnlargement: true });

    const fmt = opts.format ?? path.extname(outputPath).slice(1).toLowerCase();

    switch (fmt) {
      case 'png':
        pipeline = pipeline.png({ quality: opts.quality });
        break;
      case 'jpeg':
      case 'jpg':
        pipeline = pipeline.jpeg({ quality: opts.quality });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality: opts.quality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: opts.quality });
        break;
      default:
        // If unknown, try to preserve original format
        console.log(`Unknown/unspecified format, attempting to preserve original (${meta.format ?? 'unknown'})`);
    }

    // Sharp cannot write to the same file that's currently open for reading,
    // so when overwriting the input we write to a temporary file first and
    // then replace the original.
    if (outputPath === inputPath) {
      const tmpPath = `${outputPath}.tmp-resize-${Date.now()}`;
      try {
        await pipeline.toFile(tmpPath);
        // Ensure we have a backup (already created above if requested)
        fs.renameSync(tmpPath, outputPath);
        const newMeta = await sharp(outputPath).metadata();
        console.log(`Wrote resized image to ${outputPath} — new size: ${newMeta.width}x${newMeta.height}`);
      } catch (err) {
        // Cleanup tmp file on failure
        try {
          if (fs.existsSync(tmpPath)) {
            fs.unlinkSync(tmpPath);
          }
        } catch (cleanupErr) {
          console.error('Failed to cleanup tmp file:', cleanupErr);
        }
        console.error('Resize pipeline failed:', err);
        process.exitCode = 1;
        return;
      }
    } else {
      await pipeline.toFile(outputPath);
      const newMeta = await sharp(outputPath).metadata();
      console.log(`Wrote resized image to ${outputPath} — new size: ${newMeta.width}x${newMeta.height}`);
    }
  } catch (err) {
    console.error('Resize failed:', err);
    process.exitCode = 1;
  }
}
/* eslint-enable complexity */

const opts = parseArgs();
if (opts) {
  void run(opts);
}
