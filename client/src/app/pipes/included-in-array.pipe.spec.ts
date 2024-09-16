import { IncludedInArrayPipe } from './included-in-array.pipe';

describe('IncludedInPipe', () => {
  it('create an instance', () => {
    const pipe = new IncludedInArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
