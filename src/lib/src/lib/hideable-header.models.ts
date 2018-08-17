import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';

export interface HideableHeaderConfig {
  translateValue1: number;

  translateValue2: number;
}

export const HIDEABLE_HEADER_CONFIG = new InjectionToken<HideableHeaderConfig>('HIDEABLE_HEADER_CONFIG');
