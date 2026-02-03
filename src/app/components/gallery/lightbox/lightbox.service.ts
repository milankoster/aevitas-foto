import { inject, Injectable, Injector, signal } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { GalleryImage } from '../../../pages/gallery/images/gallery-images';
import { LightboxComponent } from './lightbox.component';
import { LIGHTBOX_DATA } from './lightbox.tokens';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  private overlayRef?: OverlayRef;

  readonly isOpen = signal(false);

  open(images: readonly GalleryImage[], activeId: GalleryImage['id']): void {
    if (images.length === 0) {
      return;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-black/80',
      panelClass: 'w-screen h-screen',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });

    this.overlayRef = overlayRef;
    this.isOpen.set(true);

    const childInjector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: LIGHTBOX_DATA,
          useValue: {
            images,
            initialActiveId: activeId,
          },
        },
      ],
    });

    overlayRef.attach(new ComponentPortal(LightboxComponent, undefined, childInjector));

    this.overlayRef.outsidePointerEvents().subscribe(() => {
      //maybe some actions that you could take
      this.overlayRef?.dispose();
    });

    overlayRef.detachments().subscribe(() => {
      this.overlayRef = undefined;
      this.isOpen.set(false);
    });
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.isOpen.set(false);
  }
}
