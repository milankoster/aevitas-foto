export const GALLERY_TAGS = ['all', 'dogs', 'cats', 'horses', 'outdoor', 'indoor'] as const;

export type GalleryTag = (typeof GALLERY_TAGS)[number];

export type GalleryImage = {
  readonly id: number;
  readonly src: string;
  readonly altKey: string;
  readonly tags: readonly GalleryTag[];
  readonly width: number;
  readonly height: number;
};

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    id: 1,
    src: 'assets/animals/mini-gallery-5.jpg',
    altKey: 'gallery.images.1.alt',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1080,
  },
  {
    id: 2,
    src: 'assets/animals/mini-gallery-71.jpg',
    altKey: 'gallery.images.2.alt',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: 'assets/animals/SaveClip.App_538778038_17936275377065050_5063425839452568790_n.jpg',
    altKey: 'gallery.images.3.alt',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1439,
  },
  {
    id: 4,
    src: 'assets/animals/SaveClip.App_538857834_17936275392065050_7939067143436610127_n.jpg',
    altKey: 'gallery.images.4.alt',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1439,
  },
  {
    id: 5,
    src: 'assets/animals/SaveClip.App_540998416_17936685168065050_7948051025592041323_n.jpg',
    altKey: 'gallery.images.5.alt',
    tags: ['dogs', 'indoor'],
    width: 1080,
    height: 1440,
  },
  {
    id: 6,
    src: 'assets/animals/SaveClip.App_541015969_17936685156065050_3084831558247583813_n.jpg',
    altKey: 'gallery.images.6.alt',
    tags: ['dogs', 'indoor'],
    width: 1080,
    height: 1440,
  },
  {
    id: 7,
    src: 'assets/animals/SaveClip.App_541176629_17936685138065050_8660245098547135924_n.jpg',
    altKey: 'gallery.images.7.alt',
    tags: ['dogs', 'indoor'],
    width: 1080,
    height: 1440,
  },
  {
    id: 8,
    src: 'assets/animals/SaveClip.App_541209087_17936685234065050_7760499471505544681_n.jpg',
    altKey: 'gallery.images.8.alt',
    tags: ['dogs', 'indoor'],
    width: 1080,
    height: 1440,
  },
  {
    id: 9,
    src: 'assets/animals/Puppies-4-b.jpg',
    altKey: 'gallery.images.9.alt',
    tags: ['cats', 'indoor'],
    width: 1920,
    height: 1080,
  },
] as const;
