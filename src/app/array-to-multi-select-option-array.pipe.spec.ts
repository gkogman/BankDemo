import { ArrayToMultiSelectOptionArrayPipe } from './array-to-multi-select-option-array.pipe';

describe('ArrayToMultiSelectOptionArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayToMultiSelectOptionArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
