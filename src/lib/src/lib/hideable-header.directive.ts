import { Directive, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, HostBinding } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HIDEABLE_HEADER_CONFIG, HideableHeaderConfig, ViewProperties } from './hideable-header.models';

@Directive({
  selector: '[hideableHeader]'
})
export class HideableHeaderDirective {
  private lastScrollTop = 0;

  /**
   * Boolean value to disable the hidable header,
   */
  @Input()
  disable = false;

  constructor(
    private headerElement: ElementRef,
    private render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(HIDEABLE_HEADER_CONFIG) private config: HideableHeaderConfig
  ) {}

  @HostBinding('style.position')
  position: string = this.config.position || 'fixed';
  @HostBinding('style.top')
  top: string = this.config.top || '0';
  @HostBinding('style.left')
  left: string = this.config.left || '0';
  @HostBinding('style.transition')
  transition: string = this.config.transition || 'all 0.5s';

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId) || this.disable) {
      return;
    }
    this.onScroll(this.getViewProperties());
  }

  /**
   * Returns the view properties required to calculate if the elements shows or hides
   */
  private getViewProperties = (): ViewProperties => ({
    scrollTop: window.document.scrollingElement.scrollTop,
    clientHeight: this.headerElement.nativeElement.clientHeight
  });

  /**
   * Calculates if the header
   */
  private hideElement = (currentScrollTop: number, lastScrollTop: number, clientHeight: number): boolean =>
    lastScrollTop > 0 && lastScrollTop < currentScrollTop && currentScrollTop > clientHeight + clientHeight;

  private showElement = (currentScrollTop: number, lastScrollTop: number, clientHeight: number): boolean =>
    lastScrollTop > currentScrollTop && !(currentScrollTop <= clientHeight);

  private onScroll(viewProps: ViewProperties) {
    if (this.hideElement(viewProps.scrollTop, this.lastScrollTop, viewProps.clientHeight)) {
      this.setStyle('transform', `translateY(-${this.config.height}${this.config.units || 'px'})`);
    } else if (this.showElement(viewProps.scrollTop, this.lastScrollTop, viewProps.clientHeight)) {
      this.setStyle('transform', `translateY(0${this.config.units || 'px'})`);
    }
    this.lastScrollTop = viewProps.scrollTop;
  }

  private setStyle(operation: string, value: string) {
    this.render.setStyle(this.headerElement.nativeElement, operation, value);
  }
}
