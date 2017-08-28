import { UTCToLocalPipe } from './utcto-local.pipe';

describe('UTCToLocalPipe', () => {
  it('create an instance', () => {
    const pipe = new UTCToLocalPipe();
    expect(pipe).toBeTruthy();
  });
});
