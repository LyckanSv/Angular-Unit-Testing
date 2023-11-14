import { pipe } from 'rxjs';
import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display weak if 5 value is passed', () => {
    const pipe = new StrengthPipe()
    expect(pipe.transform(5)).toEqual('5 (weak)')
  })

  it('should display strong if 12 value is passed', () => {
    const pipe = new StrengthPipe()
    expect(pipe.transform(12)).toEqual('12 (strong)')
  })

  it('should display strongest if 22 value is passed', () => {
    const pipe = new StrengthPipe()
    expect(pipe.transform(22)).toEqual('22 (strongest)')
  })
});
