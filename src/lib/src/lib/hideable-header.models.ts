import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';

export interface HideableHeaderConfig {
  heightTransform: number;

  units?: string;

  position?: string;

  top?: string;

  left?: string;

  transition?: string;
}

export const HIDEABLE_HEADER_CONFIG = new InjectionToken<HideableHeaderConfig>('HIDEABLE_HEADER_CONFIG');
