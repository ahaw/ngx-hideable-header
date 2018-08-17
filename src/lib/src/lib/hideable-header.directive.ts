import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  isDevMode,
  OnInit,
  PLATFORM_ID,
  Renderer2
} from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";


@Directive({
  selector: "[hideableHeader]",
  host: {
    '[style.position]': '"fixed"',
    '[style.top]': '"0"',
    '[style.left]': '"0"',
    '[style.transition]': '"all 0.5s"'
  }
})
export class HideableHeaderDirective implements OnInit {

  private c = 0;
  private currentScrollTop = 0;
  @Input("hideOnScrollDown")
  private hideOnScrollDown: boolean = true;
  constructor(private headerElement: ElementRef, private render: Renderer2, @Inject(PLATFORM_ID) private platformId: string) {
  }

  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.hideOnScrollDown) {
      return;
    }

    const a = window.document.scrollingElement.scrollTop;
    const b = this.headerElement.nativeElement.clientHeight;

    this.currentScrollTop = a;
    if (this.c > 0 && this.c < this.currentScrollTop && a > b + b) {
      this.render.setStyle(this.headerElement.nativeElement, "transform", "translateY(-80px)")
    } else if (this.c > this.currentScrollTop && !(a <= b)) {
      this.render.setStyle(this.headerElement.nativeElement, "transform", "translateY(0px)")
    }

    this.c = this.currentScrollTop;
  }

  ngOnInit(): void {
  }
}
