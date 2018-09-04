import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  public demoControls = this.fb.group({
    disable: [false],
    reverse: [false],
    hideTransitionTime: [2],
    hideTransition: ['cubic-bezier(.29,1.93,.85,-0.98)'],
    showTransitionTime: [1],
    showTransition: ['ease-in'],
    scrollAt: [200]
  });

  public transitions = [
    ['linear', 'Linear'],
    ['ease', 'Ease'],
    ['ease-in', 'Ease In'],
    ['ease-out', 'Ease Out'],
    ['ease-in-out', 'Ease-in-out'],
    ['cubic-bezier(0.5, 0.31, 0.84, 0.05)', 'Cubic Bezier 1'],
    ['cubic-bezier(.29,1.93,.85,-0.98)', 'Cubic Bezier 2']
  ];

  public transition = '';

  constructor(private fb: FormBuilder) {}

  public hide() {
    this.hidableElement.hide();
  }

  show() {
    this.hidableElement.show();
  }

  ngAfterViewInit() {
    combineLatest(this.hidableElement.isHidden, this.disable)
      .pipe(takeUntil(this.gc$))
      .subscribe(([isHidden, isDisabled]) => {
        if (isHidden) {
          this.transition = `${this.demoControls.value.hideTransitionTime}s ${this.demoControls.value.hideTransition}`;
        } else {
          this.transition = `${this.demoControls.value.showTransitionTime}s ${this.demoControls.value.showTransition}`;
        }

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
