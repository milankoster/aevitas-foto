export const GALLERY_TAGS = ['dogs', 'cats', 'horses', 'indoor', 'outdoor', 'portrait', 'other'] as const;

export type GalleryTag = (typeof GALLERY_TAGS)[number];

export type GalleryImage = {
  readonly id: number;
  readonly src: string;
  readonly alt: string;
  readonly tags: readonly GalleryTag[];
  readonly width: number;
  readonly height: number;
};

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    id: 1,
    src: 'assets/animals/mini-gallery-5.jpg',
    alt: 'Animal photo 1',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1080,
  },
  {
    id: 2,
    src: 'assets/animals/mini-gallery-71.jpg',
    alt: 'Animal photo 2',
    tags: ['dogs', 'portrait'],
    width: 1080,
    height: 1350,
  },
  {
    id: 3,
    src: 'assets/animals/SaveClip.App_538778038_17936275377065050_5063425839452568790_n.jpg',
    alt: 'Animal photo 3',
    tags: ['dogs', 'other'],
    width: 1080,
    height: 1439,
  },
  {
    id: 4,
    src: 'assets/animals/SaveClip.App_538857834_17936275392065050_7939067143436610127_n.jpg',
    alt: 'Animal photo 4',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1439,
  },
  {
    id: 5,
    src: 'assets/animals/SaveClip.App_540998416_17936685168065050_7948051025592041323_n.jpg',
    alt: 'Animal photo 5',
    tags: ['dogs', 'outdoor'],
    width: 1080,
    height: 1440,
  },
  {
    id: 6,
    src: 'assets/animals/SaveClip.App_541015969_17936685156065050_3084831558247583813_n.jpg',
    alt: 'Animal photo 6',
    tags: ['dogs', 'portrait'],
    width: 1080,
    height: 1440,
  },
  {
    id: 7,
    src: 'assets/animals/SaveClip.App_541176629_17936685138065050_8660245098547135924_n.jpg',
    alt: 'Animal photo 7',
    tags: ['dogs', 'other'],
    width: 1080,
    height: 1440,
  },
  {
    id: 8,
    src: 'assets/animals/SaveClip.App_541209087_17936685234065050_7760499471505544681_n.jpg',
    alt: 'Animal photo 8',
    tags: ['dogs', 'other'],
    width: 1080,
    height: 1440,
  },
] as const;
