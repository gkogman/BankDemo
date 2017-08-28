import { ContractInstancePropertyPipe } from './contract-instance-property.pipe';

describe('ContractInstancePropertyPipe', () => {
  it('create an instance', () => {
    const pipe = new ContractInstancePropertyPipe();
    expect(pipe).toBeTruthy();
  });
});
