import { HideableHeaderDirective } from './hideable-header.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [HideableHeaderDirective],
  exports: [HideableHeaderDirective]
})
export class HideableHeaderModule {}
