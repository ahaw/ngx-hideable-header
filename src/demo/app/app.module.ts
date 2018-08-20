import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// tslint:disable-next-line:no-implicit-dependencies
// import { HideableHeaderModule } from "@ngx-hideable-header";
// import { HideableHeaderModule } from "@ngx-hideable-header-builded";
// import { HideableHeaderModule } from 'ngx-hideable-header';
import { HideableHeaderModule } from '../../lib/public_api';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    HideableHeaderModule.forRoot({
      height: 80,
      transition: 'all 1s ease-out'
    })
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class AppModule {
  constructor() {}
}
