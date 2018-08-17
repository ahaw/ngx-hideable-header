import { Directive, ElementRef, HostListener, Inject, Input, isDevMode, OnInit, PLATFORM_ID, Renderer2, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HIDEABLE_HEADER_CONFIG, HideableHeaderConfig } from './hideable-header.models';

@Directive({
  selector: '[hideableHeader]',
  host: {
    '[style.position]': '"fixed"',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transition]': '"all 0.5s"'
  }
})
export class HideableHeaderDirective {
  private lastScrollTop = 0;
  private currentScrollTop = 0;
  @Input() private hideOnScrollDown = true;
  constructor(
    private headerElement: ElementRef,
    private render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(HIDEABLE_HEADER_CONFIG) private config: HideableHeaderConfig
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.hideOnScrollDown) {
      return;
    }

    const scrollTop = window.document.scrollingElement.scrollTop;
    const clientHeight = this.headerElement.nativeElement.clientHeight;

    this.currentScrollTop = scrollTop;
    if (this.lastScrollTop > 0 && this.lastScrollTop < this.currentScrollTop && scrollTop > clientHeight + clientHeight) {
      this.setStyle('transform', `translateY(${this.config.heightTransform}${this.config.units || 'px'})`);
    } else if (this.lastScrollTop > this.currentScrollTop && !(scrollTop <= clientHeight)) {
      this.setStyle('transform', `translateY(0${this.config.units || 'px'})`);
    }

    this.lastScrollTop = this.currentScrollTop;
  }

  private setStyle(operation: string, value: string) {
    this.render.setStyle(this.headerElement.nativeElement, operation, value);
  }
}
