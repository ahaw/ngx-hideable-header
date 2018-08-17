import { Directive, ElementRef, HostListener, Inject, Input, isDevMode, OnInit, PLATFORM_ID, Renderer2, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HIDEABLE_HEADER_CONFIG, HideableHeaderConfig } from './hideable-header.models';

const defaultTranslate = {
  translateValue1: -80,
  translateValue2: 0
};

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
    @Inject(HIDEABLE_HEADER_CONFIG)
    @Optional()
    private config: HideableHeaderConfig = defaultTranslate
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
      this.render.setStyle(this.headerElement.nativeElement, 'transform', `translateY(${this.config.translateValue1}px)`);
    } else if (this.lastScrollTop > this.currentScrollTop && !(scrollTop <= clientHeight)) {
      this.render.setStyle(this.headerElement.nativeElement, 'transform', `translateY(${this.config.translateValue2}px)`);
    }

    this.lastScrollTop = this.currentScrollTop;
  }
}
