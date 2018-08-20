import { InjectionToken } from '@angular/core';

/**
 * Configuration optins for the header. The only required
 * value is heightTransform.
 */
export interface HideableHeaderConfig {

  /**
   * The value of the height to transform the header by. Default value is the height of the header in the DOM
   */
  height?: number;

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

/**
 * The view properties of the Hideable Header
 */
export interface ViewProperties {
  /**
   * The current scroll top value
   */
  scrollTop: number;

  /**
   * The last scroll top value
   */
  lastScrollTop: number;

  /**
   * The height of the transition based on the height of the DOM element, or configuration option
   */
  transitionHeight: number;
}

/**
 * The injection token for the configuration
 */
export const HIDEABLE_HEADER_CONFIG = new InjectionToken<HideableHeaderConfig>('HIDEABLE_HEADER_CONFIG');
