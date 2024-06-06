import { animation } from './animation';

describe('class Animation', () => {
  it('should animation', () => {
    const result = animation('keyframe1', 'keyframe2')
      .duration('1s')
      .timingFunction('ease-in')
      .toString();

    expect(result).toBe('1s ease-in keyframe1, 1s ease-in keyframe2');
  });
});
