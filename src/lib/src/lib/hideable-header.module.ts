import { NgModule } from '@angular/core';
import { HideableHeaderDirective } from './hideable-header.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * The HideableHeaderModule provides the [hideableHeader] directive/
 *
 * @example
 * ```ts
import { HideableHeaderModule } from 'ngx-hideable-header';
@NgModule({
...
imports: [
 BrowserModule,
 HideableHeaderModule,
]
...
})
 export class AppModule {}
```
 */
@NgModule({
  imports: [BrowserAnimationsModule],
  declarations: [HideableHeaderDirective],
  exports: [HideableHeaderDirective]
})
export class HideableHeaderModule {}
