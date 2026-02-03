export const GALLERY_WIDTHS = [600, 1100, 2200] as const;
export const LARGEST_GALLERY_WIDTH: GalleryWidth = GALLERY_WIDTHS[GALLERY_WIDTHS.length - 1];
export type GalleryWidth = (typeof GALLERY_WIDTHS)[number];

export const IMAGE_INPUT_ROOT = 'src/tools/gallery-image-parser/input/images';
// TODO: Change output root to 'src/app/assets/gallery' after verifying the conversion process works.
export const IMAGE_OUTPUT_ROOT = 'src/tools/gallery-image-parser/output/images';

export const METADATA_INPUT_FILE = 'src/tools/gallery-image-parser/input/Image Tracker - Images.csv';
export const METADATA_OUTPUT_FILE = 'src/app/pages/gallery/images/generated-images.ts';

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'] as const;
