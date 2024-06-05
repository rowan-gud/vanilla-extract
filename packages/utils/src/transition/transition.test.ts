import { transition } from './transition';

describe('class Transition', () => {
  describe('duration', () => {
    it('should set the duration of the transition', () => {
      const result = transition('opacity').duration('1s');

      expect(result).toMatchObject({
        properties: ['opacity'],
        durationValue: '1s',
      });
    });
  });

  describe('easing()', () => {
    it('should set the easing function of the transition', () => {
      const result = transition('opacity').easing('ease-in');

      expect(result).toMatchObject({
        properties: ['opacity'],
        easingValue: 'ease-in',
      });
    });
  });

  describe('and()', () => {
    it('should chain multiple transitions together', () => {
      const result = transition('opacity').and(transition('transform'));

      expect(result).toMatchObject({
        properties: ['opacity'],
        otherTransitions: [
          expect.objectContaining({ properties: ['transform'] }),
        ],
      });
    });
  });

  describe('toString()', () => {
    it('should build the transition string', () => {
      const result = transition('opacity').toString();

      expect(result).toBe('opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    });

    it('should build the transition string with duration and easing', () => {
      const result = transition('opacity')
        .duration('1s')
        .easing('ease-in')
        .toString();

      expect(result).toBe('opacity 1s ease-in');
    });

    it('should build the transition string with multiple transitions chained', () => {
      const result = transition('opacity')
        .duration('1s')
        .and(transition('transform'))
        .toString();

      expect(result).toBe(
        'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      );
    });

    it('should build the transition string with multiple properties', () => {
      const result = transition('opacity', 'transform').toString();

      expect(result).toBe(
        'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      );
    });
  });
});
