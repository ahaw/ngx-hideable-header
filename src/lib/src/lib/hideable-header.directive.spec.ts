import { HideableHeaderDirective } from './hideable-header.directive';

describe('HideableHeaderDirective', () => {
  it('should create an instance', () => {
    const directive = new HideableHeaderDirective(
      { nativeElement: { offsetTo: '0px' } },
      undefined as any, undefined as any, { height: -80 }
    );
    expect(directive).toBeTruthy();
  });
});
