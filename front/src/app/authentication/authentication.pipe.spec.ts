import { AuthenticationPipe } from './authentication.pipe';

describe('AuthenticationPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthenticationPipe();
    expect(pipe).toBeTruthy();
  });
});
