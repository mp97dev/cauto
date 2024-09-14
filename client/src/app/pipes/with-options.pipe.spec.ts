import { WithOptionsPipe } from './with-options.pipe';

describe('WithOptionsPipe', () => {
  it('create an instance', () => {
    const pipe = new WithOptionsPipe();
    expect(pipe).toBeTruthy();
  });
});
