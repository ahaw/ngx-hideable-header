import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';

export interface HideableHeaderConfig {
  heightTransform: number;

  units?: string;
}

export const HIDEABLE_HEADER_CONFIG = new InjectionToken<HideableHeaderConfig>('HIDEABLE_HEADER_CONFIG');
