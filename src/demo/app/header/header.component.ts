import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HideableHeaderDirective } from '../../../lib/public_api';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  disable = new BehaviorSubject<boolean>(false);
  reverse = new BehaviorSubject<boolean>(false);

  private gc$ = new Subject<boolean>();

  @ViewChild(HideableHeaderDirective)
  hidableElement: HideableHeaderDirective;

  hide() {
    this.hidableElement.hide();
  }

  show() {
    this.hidableElement.show();
  }

  switchTransition(transition: string) {
    this.hidableElement.transition = transition;
  }

  ngAfterViewInit() {
    combineLatest(this.hidableElement.isHidden, this.disable)
      .pipe(takeUntil(this.gc$))
      .subscribe(([isHidden, isDisabled]) => {
        if (isHidden && isDisabled) {
          this.hidableElement.show();
        }
      });
  }

  ngOnDestroy() {
    this.gc$.next(true);
    this.gc$.complete();
  }
}
