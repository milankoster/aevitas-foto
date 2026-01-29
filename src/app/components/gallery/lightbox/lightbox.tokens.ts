import { InjectionToken } from '@angular/core';
import { GalleryImage } from '../../../pages/gallery/gallery-images';

export type LightboxData = {
  readonly images: readonly GalleryImage[];
  readonly initialActiveId: GalleryImage['id'];
};

export const LIGHTBOX_DATA = new InjectionToken<LightboxData>('LIGHTBOX_DATA');
