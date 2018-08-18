import { HideableHeaderDirective } from './hideable-header.directive';
import { HideableHeaderConfig, HIDEABLE_HEADER_CONFIG } from './hideable-header.models';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  declarations: [HideableHeaderDirective],
  exports: [HideableHeaderDirective]
})
export class HideableHeaderModule {
  static withConfig(config: HideableHeaderConfig): ModuleWithProviders {
    return {
      ngModule: HideableHeaderModule,
      providers: [
        {
          provide: HIDEABLE_HEADER_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
