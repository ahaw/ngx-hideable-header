import { InjectionToken } from '@angular/core';

/**
 * Configuration optins for the header. The only required
 * value is heightTransform.
 */
export interface HideableHeaderConfig {

  /**
   * The value of the height to transform the header by, this
   * should match the fixed height of the header
   */
  height: number;

  /**
   * The type of style units to use. The default is 'px'
   */
  units?: string;

  /**
   * The style position to be used, the default is 'fixed'
   */
  position?: string;

  /**
   * The style top for the header, the default is 0
   */
  top?: string;

  /**
   * The left style for the header, the default is 0
   */
  left?: string;

  /**
   * The transition style for the header, default is 'all 0.5s'
   */
  transition?: string;
}

export interface ViewProperties {
  scrollTop: number;
  lastScrollTop: number;
  clientHeight: number;
}

/**
 * The injection token for the configuration
 */
export const HIDEABLE_HEADER_CONFIG = new InjectionToken<HideableHeaderConfig>('HIDEABLE_HEADER_CONFIG');
