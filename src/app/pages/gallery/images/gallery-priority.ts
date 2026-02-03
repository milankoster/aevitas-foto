import type { GalleryImage } from './gallery-images';

// Readable key for an image based on its logical path, e.g. "dogs/DSC_0107".
export type GalleryImageKey = `${string}/${string}`;

// Priority list: images in this list will appear first in the gallery in this order.
// Keys are of the form "<category>/<baseName>", e.g. "dogs/DSC_0107".
export const PRIORITY_IMAGE_KEYS: readonly GalleryImageKey[] = ['dogs/DSC_0107'] as const;

// Utility to construct a key from an image object.
export const makeImageKey = (image: Pick<GalleryImage, 'path'>): GalleryImageKey => image.path as GalleryImageKey;
