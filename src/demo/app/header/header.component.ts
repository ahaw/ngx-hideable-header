import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HideableHeaderDirective } from '../../../lib/public_api';

@Component({
  selector: 'ngx-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  disable: boolean = false;
  reverse: boolean = false;

  @ViewChild(HideableHeaderDirective) hidableElement: HideableHeaderDirective;

  hide() {
    this.hidableElement.hide();
  }

  show() {
    this.hidableElement.show();
  }
}
