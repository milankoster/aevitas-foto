import { GENERATED_GALLERY_IMAGES } from './generated-images';

export const GALLERY_TAGS = ['all', 'dogs', 'cats', 'horses', 'outdoor', 'indoor'] as const;
export const GALLERY_WIDTHS = [600, 1100, 2200] as const;

export type GalleryTag = (typeof GALLERY_TAGS)[number];
export type GalleryWidth = (typeof GALLERY_WIDTHS)[number];

export type GalleryImage = {
  readonly id: number;
  readonly path: string;
  readonly altKey: string;
  readonly tags: readonly GalleryTag[];
  readonly width: number;
  readonly height: number;
  readonly order?: number;
};

/** Build the AVIF path for a given image and target width using its logical path. */
export const buildGallerySrc = (image: GalleryImage, width: GalleryWidth): string =>
  `assets/gallery/${image.path}-${width}.avif`;

/** Flat list of all images generated from input-images and CSV metadata. */
export const GALLERY_IMAGES: readonly GalleryImage[] = GENERATED_GALLERY_IMAGES;

/** Simple deterministic string hash used to pseudo-randomly order images (no bitwise ops for lint). */
const hashKey = (key: string): number => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 1_000_000_007;
  }
  return hash;
};

/**
 * Mixed ordering for the gallery:
 * - Images with an explicit numeric `order` appear first, sorted by that number (ascending).
 * - All remaining images are sorted by a deterministic hash of the `path` to get a
 *   stable but "random-ish" mix across categories.
 */
export const GALLERY_IMAGES_MIXED: readonly GalleryImage[] = ((): readonly GalleryImage[] => {
  const withOrder = GALLERY_IMAGES.filter((img) => typeof img.order === 'number')
    .slice()
    .sort((a, b) => (a.order as number) - (b.order as number));

  const orderedIds = new Set(withOrder.map((img) => img.id));

  const nonPriorityImages = GALLERY_IMAGES.filter((img) => !orderedIds.has(img.id));

  const shuffledNonPriority = [...nonPriorityImages].sort((a, b) => hashKey(a.path) - hashKey(b.path));

  return [...withOrder, ...shuffledNonPriority] as readonly GalleryImage[];
})();
