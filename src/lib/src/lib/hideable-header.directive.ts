import { Directive, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, HostBinding } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

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

/**
 * The HideableHeaderDirective provides functionality to hide and show a header element based on
 * the properties specified such as `scrollAt` height. There is also an API to control the `transition`
 * speed and function
 *
 * @example
<nav class="header" hideableHeader [scrollAt]=200 [transition]="1s ease"></nav>
 */
@Directive({
  selector: '[hideableHeader]'
})
export class HideableHeaderDirective {
  private lastScrollTop = 0;

  /**
   * Height to transition the element by. Default is the `clientHeight` of the element.
   */
  @Input()
  public height = this.headerElement.nativeElement.clientHeight;

  /**
   * The type of CSS unit to transition with, default is 'px' (pixels)
   */
  @Input()
  public units = 'px';

  /**
   * Disable the functionality of the directive.
   */
  @Input()
  public disable = false;

  /**
   * Instead of hiding the header on scroll, this will make the header appear on scroll from a hidden position.
   * Useful for utility bars.
   */
  @Input()
  public reverse = false;

  /**
   * Controls the height at which the element will start hiding. By default the value is twice the height of
   * the header
   */
  @Input()
  public scrollAt = this.height + this.height;

  /**
   * The transition time and function to use for the animation
   */
  @Input()
  public transition = '1s linear';

  private elementIsHidden: Subject<boolean> = new ReplaySubject<boolean>(1);

  private currentViewProperties = new BehaviorSubject<HideableHeaderProperties>(this.getViewProperties());

  constructor(
    private headerElement: ElementRef,
    private render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
    private sanitizer: DomSanitizer
  ) {}

  @HostBinding('style.position')
  position = 'fixed';
  @HostBinding('style.top')
  top = '0';
  @HostBinding('style.left')
  left = '0';
  @HostBinding('style.transition')
  get hostElementTransform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.transition);
  }

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
  public get viewProperties(): Observable<HideableHeaderProperties> {
    return this.currentViewProperties.asObservable();
  }

  /**
   * Observable value of the current hidden state.
   */
  public get isHidden(): Observable<boolean> {
    return this.elementIsHidden.asObservable();
  }

  /**
   * Shows the host element
   */
  public show() {
    this.setStyle('transform', `translateY(0${this.units})`);
    this.elementIsHidden.next(false);
  }

  /**
   * Hides the host element
   */
  public hide() {
    this.setStyle('transform', `translateY(-${this.getViewProperties().transitionHeight}${this.units})`);
    this.elementIsHidden.next(true);
  }

  /**
   * Gets a map of the current view properties
   */
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
    viewProps.lastScrollTop > 0 && viewProps.lastScrollTop < viewProps.scrollTop && viewProps.scrollTop > this.scrollAt;

  /**
   * Calculates if an element should be shown
   */
  private showElement = (viewProps: HideableHeaderProperties): boolean =>
    viewProps.lastScrollTop > viewProps.scrollTop && !(viewProps.scrollTop <= viewProps.transitionHeight);

  /**
   * Method called on scroll event
   */
  private onScroll(viewProps: HideableHeaderProperties) {
    this.currentViewProperties.next(viewProps);
    if ((!this.reverse && this.hideElement(viewProps)) || (this.reverse && this.showElement(viewProps))) {
      this.hide();
    } else if ((!this.reverse && this.showElement(viewProps)) || (this.reverse && this.hideElement(viewProps))) {
      this.show();
    }
    this.lastScrollTop = viewProps.scrollTop;
  }

  /**
   * Wrapper to set the style
   */
  private setStyle(operation: string, value: string) {
    this.render.setStyle(this.headerElement.nativeElement, operation, value);
  }
}
