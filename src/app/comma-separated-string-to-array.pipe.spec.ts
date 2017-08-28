import { CommaSeparatedStringToArrayPipe } from './comma-separated-string-to-array.pipe';

describe('CommaSeparatedStringToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new CommaSeparatedStringToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
