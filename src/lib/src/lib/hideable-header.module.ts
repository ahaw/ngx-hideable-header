import { HideableHeaderDirective } from './hideable-header.directive';
import { NgModule } from '@angular/core';

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
  declarations: [HideableHeaderDirective],
  exports: [HideableHeaderDirective]
})
export class HideableHeaderModule {}
