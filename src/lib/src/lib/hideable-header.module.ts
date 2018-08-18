import { HideableHeaderDirective } from './hideable-header.directive';
import { HideableHeaderConfig, HIDEABLE_HEADER_CONFIG } from './hideable-header.models';
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';

@NgModule({
  declarations: [HideableHeaderDirective],
  exports: [HideableHeaderDirective]
})
export class HideableHeaderModule {
  constructor(@Optional() @SkipSelf() parentModule: HideableHeaderModule) {}

  /**
   * Call HideableHeaderModule.forRoot on your app.module. Any other modules that
   * use this can just import HideableHeaderModule.
   * 
   * The configuration has one required parameter, `height`, which is the height of
   * the element you attach the directive to. You can also provide styling options
   * see {@link HideableHeaderConfig}
   */
  static forRoot(config: HideableHeaderConfig): ModuleWithProviders {
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
