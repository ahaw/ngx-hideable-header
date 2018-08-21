import { Directive, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, HostBinding } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * View Properties of the directive
 */
export interface HideableHeaderProperties {
  /**
   * Current scroll top value
   */
  scrollTop: number;
  /**
   * Last scroll top value
   */
  lastScrollTop: number;
  /**
   * The height to transition the header animation by
   */
  transitionHeight: number;
}

@Directive({
  selector: '[hideableHeader]'
})
export class HideableHeaderDirective {
  private lastScrollTop = 0;

  /**
   * Height to transition the element by. Default is the `clientHeight` of the element.
   */
  @Input()
  height = this.headerElement.nativeElement.clientHeight;

  /**
   * The type of CSS unit to transition with, default is 'px' (pixels)
   */
  @Input()
  units = 'px';

  /**
   * Disable the functionality of the directive.
   */
  @Input()
  disable = false;

  /**
   * Instead of hiding the header on scroll, this will make the header appear on scroll from a hidden position.
   * Useful for utility bars.
   */
  @Input()
  reverse = false;

  private elementIsHidden = new BehaviorSubject<boolean>(false);

  private currentViewProperties = new BehaviorSubject<HideableHeaderProperties>(this.getViewProperties());

  constructor(
    private headerElement: ElementRef,
    private render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {}

  @HostBinding('style.position')
  position = 'fixed';
  @HostBinding('style.top')
  top = '0';
  @HostBinding('style.left')
  left = '0';
  @HostBinding('style.transition')
  transition = 'all 0.5s';

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId) || this.disable) {
      return;
    }
    this.onScroll(this.getViewProperties());
  }

  /**
   * Observable value of the current {@link HideableHeaderProperties}
   */
  get viewProperties(): Observable<HideableHeaderProperties> {
    return this.currentViewProperties.asObservable();
  }

  /**
   * Observable value of the current hidden state.
   */
  get isHidden(): Observable<boolean> {
    return this.elementIsHidden.asObservable();
  }

  /**
   * Shows the element
   */
  public show() {
    this.setStyle('transform', `translateY(0${this.units})`);
    this.elementIsHidden.next(false);
  }

  /**
   * Hides the element
   */
  public hide() {
    this.setStyle('transform', `translateY(-${this.getViewProperties().transitionHeight}${this.units})`);
    this.elementIsHidden.next(true);
  }

  private getViewProperties(): HideableHeaderProperties {
    return {
      scrollTop: window.document.scrollingElement.scrollTop,
      lastScrollTop: this.lastScrollTop,
      transitionHeight: this.height ? this.height : this.headerElement.nativeElement.clientHeight
    };
  }

  /**
   * Calculates if an element should be hidden
   */
  private hideElement = (viewProps: HideableHeaderProperties): boolean =>
    viewProps.lastScrollTop > 0 &&
    viewProps.lastScrollTop < viewProps.scrollTop &&
    viewProps.scrollTop > viewProps.transitionHeight + viewProps.transitionHeight;

  /**
   * Calculates if an element should be shown
   */
  private showElement = (viewProps: HideableHeaderProperties): boolean =>
    viewProps.lastScrollTop > viewProps.scrollTop && !(viewProps.scrollTop <= viewProps.transitionHeight);

  private onScroll(viewProps: HideableHeaderProperties) {
    this.currentViewProperties.next(viewProps);
    if ((!this.reverse && this.hideElement(viewProps)) || (this.reverse && this.showElement(viewProps))) {
      this.hide();
    } else if ((!this.reverse && this.showElement(viewProps)) || (this.reverse && this.hideElement(viewProps))) {
      this.show();
    }
    this.lastScrollTop = viewProps.scrollTop;
  }

  private setStyle(operation: string, value: string) {
    this.render.setStyle(this.headerElement.nativeElement, operation, value);
  }
}
