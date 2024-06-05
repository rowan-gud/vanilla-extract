import {
  calc,
  max,
  min,
  clamp,
  acos,
  asin,
  atan,
  atan2,
  cos,
  sin,
  tan,
  sqrt,
  log,
  exp,
  abs,
  pow,
  round,
  ceil,
  floor,
  random,
} from './calc';

const css = 'var(--some-css-var)';

describe('class Calc', () => {
  describe('add()', () => {
    it.each`
      args                     | expectedExpressions | expectedBuilt
      ${[]}                    | ${['1']}            | ${'calc(1)'}
      ${[2]}                   | ${['1', '2']}       | ${'calc(1 + 2)'}
      ${[2, '3']}              | ${['1', '2', '3']}  | ${'calc(1 + 2 + 3)'}
      ${[calc(2)]}             | ${['1', '2']}       | ${'calc(1 + 2)'}
      ${[calc(2).add(3)]}      | ${['1', '2 + 3']}   | ${'calc(1 + 2 + 3)'}
      ${[calc(2).subtract(3)]} | ${['1', '2 - 3']}   | ${'calc(1 + 2 - 3)'}
      ${[calc(2).multiply(3)]} | ${['1', '2 * 3']}   | ${'calc(1 + 2 * 3)'}
      ${[calc(2).divide(3)]}   | ${['1', '2 / 3']}   | ${'calc(1 + 2 / 3)'}
      ${[css]}                 | ${['1', css]}       | ${'calc(1 + var(--some-css-var))'}
    `(
      'should add $args to 1 to get $expectedBuilt',
      ({ args, expectedExpressions, expectedBuilt }) => {
        const result = calc(1).add(...args);

        expect(result).toMatchObject({
          expressions: expectedExpressions,
          operator: '+',
        });
        expect(result.toString()).toBe(expectedBuilt);
      },
    );
  });

  describe('subtract()', () => {
    it.each`
      args                     | expectedExpressions | expectedBuilt
      ${[]}                    | ${['1']}            | ${'calc(1)'}
      ${[2]}                   | ${['1', '2']}       | ${'calc(1 - 2)'}
      ${[2, '3']}              | ${['1', '2', '3']}  | ${'calc(1 - 2 - 3)'}
      ${[calc(2)]}             | ${['1', '2']}       | ${'calc(1 - 2)'}
      ${[calc(2).add(3)]}      | ${['1', '2 + 3']}   | ${'calc(1 - 2 + 3)'}
      ${[calc(2).subtract(3)]} | ${['1', '2 - 3']}   | ${'calc(1 - 2 - 3)'}
      ${[calc(2).multiply(3)]} | ${['1', '2 * 3']}   | ${'calc(1 - 2 * 3)'}
      ${[calc(2).divide(3)]}   | ${['1', '2 / 3']}   | ${'calc(1 - 2 / 3)'}
      ${[css]}                 | ${['1', css]}       | ${'calc(1 - var(--some-css-var))'}
    `(
      'should subtract $args from 1 to get $expectedBuilt',
      ({ args, expectedExpressions, expectedBuilt }) => {
        const result = calc(1).subtract(...args);

        expect(result).toMatchObject({
          expressions: expectedExpressions,
          operator: '-',
        });
        expect(result.toString()).toBe(expectedBuilt);
      },
    );
  });

  describe('multiply()', () => {
    it.each`
      args                     | expectedExpressions | expectedBuilt
      ${[]}                    | ${['1']}            | ${'calc(1)'}
      ${[2]}                   | ${['1', '2']}       | ${'calc(1 * 2)'}
      ${[2, '3']}              | ${['1', '2', '3']}  | ${'calc(1 * 2 * 3)'}
      ${[calc(2)]}             | ${['1', '2']}       | ${'calc(1 * 2)'}
      ${[calc(2).add(3)]}      | ${['1', '(2 + 3)']} | ${'calc(1 * (2 + 3))'}
      ${[calc(2).subtract(3)]} | ${['1', '(2 - 3)']} | ${'calc(1 * (2 - 3))'}
      ${[calc(2).multiply(3)]} | ${['1', '2 * 3']}   | ${'calc(1 * 2 * 3)'}
      ${[calc(2).divide(3)]}   | ${['1', '2 / 3']}   | ${'calc(1 * 2 / 3)'}
      ${[css]}                 | ${['1', css]}       | ${'calc(1 * var(--some-css-var))'}
    `(
      'should multiply 1 by $args to get $expectedBuilt',
      ({ args, expectedExpressions, expectedBuilt }) => {
        const result = calc(1).multiply(...args);

        expect(result).toMatchObject({
          expressions: expectedExpressions,
          operator: '*',
        });
        expect(result.toString()).toBe(expectedBuilt);
      },
    );
  });

  describe('divide()', () => {
    it.each`
      args                     | expectedExpressions | expectedBuilt
      ${[]}                    | ${['1']}            | ${'calc(1)'}
      ${[2]}                   | ${['1', '2']}       | ${'calc(1 / 2)'}
      ${[2, '3']}              | ${['1', '2', '3']}  | ${'calc(1 / 2 / 3)'}
      ${[calc(2)]}             | ${['1', '2']}       | ${'calc(1 / 2)'}
      ${[calc(2).add(3)]}      | ${['1', '(2 + 3)']} | ${'calc(1 / (2 + 3))'}
      ${[calc(2).subtract(3)]} | ${['1', '(2 - 3)']} | ${'calc(1 / (2 - 3))'}
      ${[calc(2).multiply(3)]} | ${['1', '2 * 3']}   | ${'calc(1 / 2 * 3)'}
      ${[calc(2).divide(3)]}   | ${['1', '2 / 3']}   | ${'calc(1 / 2 / 3)'}
      ${[css]}                 | ${['1', css]}       | ${'calc(1 / var(--some-css-var))'}
    `(
      'should divide 1 by $args to get $expectedBuilt',
      ({ args, expectedExpressions, expectedBuilt }) => {
        const result = calc(1).divide(...args);

        expect(result).toMatchObject({
          expressions: expectedExpressions,
          operator: '/',
        });
        expect(result.toString()).toBe(expectedBuilt);
      },
    );
  });

  describe('negate()', () => {
    it.each`
      calc                   | expectedExpressions  | expectedBuilt
      ${calc(1)}             | ${['-1', '1']}       | ${'calc(-1 * 1)'}
      ${calc(1).add(3)}      | ${['-1', '(1 + 3)']} | ${'calc(-1 * (1 + 3))'}
      ${calc(1).subtract(3)} | ${['-1', '(1 - 3)']} | ${'calc(-1 * (1 - 3))'}
      ${calc(1).multiply(3)} | ${['-1', '1 * 3']}   | ${'calc(-1 * 1 * 3)'}
      ${calc(1).divide(3)}   | ${['-1', '1 / 3']}   | ${'calc(-1 * 1 / 3)'}
      ${calc(css)}           | ${['-1', css]}       | ${'calc(-1 * var(--some-css-var))'}
    `(
      'should negate $calc to get $expectedBuilt',
      ({ calc, expectedExpressions, expectedBuilt }) => {
        const result = calc.negate();

        expect(result).toMatchObject({
          expressions: expectedExpressions,
          operator: '*',
        });
        expect(result.toString()).toBe(expectedBuilt);
      },
    );
  });

  describe('toString()', () => {
    it.each`
      calc                   | expected
      ${calc(1)}             | ${'calc(1)'}
      ${calc(1).add(3)}      | ${'calc(1 + 3)'}
      ${calc(1).subtract(3)} | ${'calc(1 - 3)'}
      ${calc(1).multiply(3)} | ${'calc(1 * 3)'}
      ${calc(1).divide(3)}   | ${'calc(1 / 3)'}
      ${calc(1).negate()}    | ${'calc(-1 * 1)'}
    `('should build $calc to get $expected', ({ calc, expected }) => {
      expect(calc.toString()).toBe(expected);
    });
  });

  describe('build()', () => {
    it.each`
      calc                   | expected
      ${calc(1)}             | ${'1'}
      ${calc(1).add(3)}      | ${'1 + 3'}
      ${calc(1).subtract(3)} | ${'1 - 3'}
      ${calc(1).multiply(3)} | ${'1 * 3'}
      ${calc(1).divide(3)}   | ${'1 / 3'}
    `('should convert $calc to string $expected', ({ calc, expected }) => {
      expect(calc.build()).toBe(expected);
    });
  });

  describe('min()', () => {
    it('should construct a min expression', () => {
      const result = min(1, 2, 3);

      expect(result).toMatchObject({
        expressions: ['1', '2', '3'],
        operator: undefined,
        fn: 'min',
      });

      expect(result.toString()).toBe('min(1, 2, 3)');
    });

    it('should be able to chain min expressions', () => {
      const result = min(1, 2, 3).add(4);

      expect(result).toMatchObject({
        expressions: ['min(1, 2, 3)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(min(1, 2, 3) + 4)');
    });

    it('should be able to chain min expressions with other calc expressions', () => {
      const result = calc(4).add(3).min(calc(4).add(3), 2, 3);

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)', 'calc(4 + 3)', '2', '3'],
        operator: undefined,
        fn: 'min',
      });

      expect(result.toString()).toBe('min(calc(4 + 3), calc(4 + 3), 2, 3)');
    });
  });

  describe('max()', () => {
    it('should construct a max expression', () => {
      const result = max(1, 2, 3);

      expect(result).toMatchObject({
        expressions: ['1', '2', '3'],
        operator: undefined,
        fn: 'max',
      });

      expect(result.toString()).toBe('max(1, 2, 3)');
    });

    it('should be able to chain max expressions', () => {
      const result = max(1, 2, 3).add(4);

      expect(result).toMatchObject({
        expressions: ['max(1, 2, 3)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(max(1, 2, 3) + 4)');
    });

    it('should be able to chain max expressions with other calc expressions', () => {
      const result = calc(4).add(3).max(calc(4).add(3), 2, 3);

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)', 'calc(4 + 3)', '2', '3'],
        operator: undefined,
        fn: 'max',
      });

      expect(result.toString()).toBe('max(calc(4 + 3), calc(4 + 3), 2, 3)');
    });
  });

  describe('clamp()', () => {
    it('should construct a clamp expression', () => {
      const result = clamp(1, 2, 3);

      expect(result).toMatchObject({
        expressions: ['1', '2', '3'],
        operator: undefined,
        fn: 'clamp',
      });

      expect(result.toString()).toBe('clamp(1, 2, 3)');
    });

    it('should be able to chain clamp expressions', () => {
      const result = clamp(1, 2, 3).add(4);

      expect(result).toMatchObject({
        expressions: ['clamp(1, 2, 3)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(clamp(1, 2, 3) + 4)');
    });

    it('should be able to chain clamp expressions with other calc expressions', () => {
      const result = calc(4).add(3).clamp(calc(4).add(3), 2);

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)', 'calc(4 + 3)', '2'],
        operator: undefined,
        fn: 'clamp',
      });

      expect(result.toString()).toBe('clamp(calc(4 + 3), calc(4 + 3), 2)');
    });
  });

  describe('acos()', () => {
    it('should construct an acos expression', () => {
      const result = acos(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'acos',
      });

      expect(result.toString()).toBe('acos(1)');
    });

    it('should be able to chain acos expressions', () => {
      const result = acos(1).add(4);

      expect(result).toMatchObject({
        expressions: ['acos(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(acos(1) + 4)');
    });

    it('should be able to chain acos expressions with other calc expressions', () => {
      const result = calc(4).add(3).acos();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'acos',
      });

      expect(result.toString()).toBe('acos(calc(4 + 3))');
    });
  });

  describe('asin()', () => {
    it('should construct an asin expression', () => {
      const result = asin(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'asin',
      });

      expect(result.toString()).toBe('asin(1)');
    });

    it('should be able to chain asin expressions', () => {
      const result = asin(1).add(4);

      expect(result).toMatchObject({
        expressions: ['asin(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(asin(1) + 4)');
    });

    it('should be able to chain asin expressions with other calc expressions', () => {
      const result = calc(4).add(3).asin();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'asin',
      });

      expect(result.toString()).toBe('asin(calc(4 + 3))');
    });
  });

  describe('atan()', () => {
    it('should construct an atan expression', () => {
      const result = atan(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'atan',
      });

      expect(result.toString()).toBe('atan(1)');
    });

    it('should be able to chain atan expressions', () => {
      const result = atan(1).add(4);

      expect(result).toMatchObject({
        expressions: ['atan(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(atan(1) + 4)');
    });

    it('should be able to chain atan expressions with other calc expressions', () => {
      const result = calc(4).add(3).atan();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'atan',
      });

      expect(result.toString()).toBe('atan(calc(4 + 3))');
    });
  });

  describe('atan2()', () => {
    it('should construct an atan2 expression', () => {
      const result = atan2(1, 2);

      expect(result).toMatchObject({
        expressions: ['1', '2'],
        operator: undefined,
        fn: 'atan2',
      });

      expect(result.toString()).toBe('atan2(1, 2)');
    });

    it('should be able to chain atan2 expressions', () => {
      const result = atan2(1, 2).add(4);

      expect(result).toMatchObject({
        expressions: ['atan2(1, 2)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(atan2(1, 2) + 4)');
    });

    it('should be able to chain atan2 expressions with other calc expressions', () => {
      const result = calc(4).add(3).atan2(2);

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)', '2'],
        operator: undefined,
        fn: 'atan2',
      });

      expect(result.toString()).toBe('atan2(calc(4 + 3), 2)');
    });
  });

  describe('cos()', () => {
    it('should construct a cos expression', () => {
      const result = cos(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'cos',
      });

      expect(result.toString()).toBe('cos(1)');
    });

    it('should be able to chain cos expressions', () => {
      const result = cos(1).add(4);

      expect(result).toMatchObject({
        expressions: ['cos(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(cos(1) + 4)');
    });

    it('should be able to chain cos expressions with other calc expressions', () => {
      const result = calc(4).add(3).cos();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'cos',
      });

      expect(result.toString()).toBe('cos(calc(4 + 3))');
    });
  });

  describe('sin()', () => {
    it('should construct a sin expression', () => {
      const result = sin(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'sin',
      });

      expect(result.toString()).toBe('sin(1)');
    });

    it('should be able to chain sin expressions', () => {
      const result = sin(1).add(4);

      expect(result).toMatchObject({
        expressions: ['sin(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(sin(1) + 4)');
    });

    it('should be able to chain sin expressions with other calc expressions', () => {
      const result = calc(4).add(3).sin();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'sin',
      });

      expect(result.toString()).toBe('sin(calc(4 + 3))');
    });
  });

  describe('tan()', () => {
    it('should construct a tan expression', () => {
      const result = tan(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'tan',
      });

      expect(result.toString()).toBe('tan(1)');
    });

    it('should be able to chain tan expressions', () => {
      const result = tan(1).add(4);

      expect(result).toMatchObject({
        expressions: ['tan(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(tan(1) + 4)');
    });

    it('should be able to chain tan expressions with other calc expressions', () => {
      const result = calc(4).add(3).tan();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'tan',
      });

      expect(result.toString()).toBe('tan(calc(4 + 3))');
    });
  });

  describe('sqrt()', () => {
    it('should construct a sqrt expression', () => {
      const result = sqrt(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'sqrt',
      });

      expect(result.toString()).toBe('sqrt(1)');
    });

    it('should be able to chain sqrt expressions', () => {
      const result = sqrt(1).add(4);

      expect(result).toMatchObject({
        expressions: ['sqrt(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(sqrt(1) + 4)');
    });

    it('should be able to chain sqrt expressions with other calc expressions', () => {
      const result = calc(4).add(3).sqrt();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'sqrt',
      });

      expect(result.toString()).toBe('sqrt(calc(4 + 3))');
    });
  });

  describe('log()', () => {
    it('should construct a log expression', () => {
      const result = log(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'log',
      });

      expect(result.toString()).toBe('log(1)');
    });

    it('should be able to chain log expressions', () => {
      const result = log(1).add(4);

      expect(result).toMatchObject({
        expressions: ['log(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(log(1) + 4)');
    });

    it('should be able to chain log expressions with other calc expressions', () => {
      const result = calc(4).add(3).log();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'log',
      });

      expect(result.toString()).toBe('log(calc(4 + 3))');
    });
  });

  describe('exp()', () => {
    it('should construct an exp expression', () => {
      const result = exp(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'exp',
      });

      expect(result.toString()).toBe('exp(1)');
    });

    it('should be able to chain exp expressions', () => {
      const result = exp(1).add(4);

      expect(result).toMatchObject({
        expressions: ['exp(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(exp(1) + 4)');
    });

    it('should be able to chain exp expressions with other calc expressions', () => {
      const result = calc(4).add(3).exp();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'exp',
      });

      expect(result.toString()).toBe('exp(calc(4 + 3))');
    });
  });

  describe('abs()', () => {
    it('should construct an abs expression', () => {
      const result = abs(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'abs',
      });

      expect(result.toString()).toBe('abs(1)');
    });

    it('should be able to chain abs expressions', () => {
      const result = abs(1).add(4);

      expect(result).toMatchObject({
        expressions: ['abs(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(abs(1) + 4)');
    });

    it('should be able to chain abs expressions with other calc expressions', () => {
      const result = calc(4).add(3).abs();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'abs',
      });

      expect(result.toString()).toBe('abs(calc(4 + 3))');
    });
  });

  describe('pow()', () => {
    it('should construct a pow expression', () => {
      const result = pow(1, 2);

      expect(result).toMatchObject({
        expressions: ['1', '2'],
        operator: undefined,
        fn: 'pow',
      });

      expect(result.toString()).toBe('pow(1, 2)');
    });

    it('should be able to chain pow expressions', () => {
      const result = pow(1, 2).add(4);

      expect(result).toMatchObject({
        expressions: ['pow(1, 2)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(pow(1, 2) + 4)');
    });

    it('should be able to chain pow expressions with other calc expressions', () => {
      const result = calc(4).add(3).pow(2);

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)', '2'],
        operator: undefined,
        fn: 'pow',
      });

      expect(result.toString()).toBe('pow(calc(4 + 3), 2)');
    });
  });

  describe('round()', () => {
    it('should construct a round expression', () => {
      const result = round(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'round',
      });

      expect(result.toString()).toBe('round(1)');
    });

    it('should be able to chain round expressions', () => {
      const result = round(1).add(4);

      expect(result).toMatchObject({
        expressions: ['round(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(round(1) + 4)');
    });

    it('should be able to chain round expressions with other calc expressions', () => {
      const result = calc(4).add(3).round();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'round',
      });

      expect(result.toString()).toBe('round(calc(4 + 3))');
    });
  });

  describe('ceil()', () => {
    it('should construct a ceil expression', () => {
      const result = ceil(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'ceil',
      });

      expect(result.toString()).toBe('ceil(1)');
    });

    it('should be able to chain ceil expressions', () => {
      const result = ceil(1).add(4);

      expect(result).toMatchObject({
        expressions: ['ceil(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(ceil(1) + 4)');
    });

    it('should be able to chain ceil expressions with other calc expressions', () => {
      const result = calc(4).add(3).ceil();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'ceil',
      });

      expect(result.toString()).toBe('ceil(calc(4 + 3))');
    });
  });

  describe('floor()', () => {
    it('should construct a floor expression', () => {
      const result = floor(1);

      expect(result).toMatchObject({
        expressions: ['1'],
        operator: undefined,
        fn: 'floor',
      });

      expect(result.toString()).toBe('floor(1)');
    });

    it('should be able to chain floor expressions', () => {
      const result = floor(1).add(4);

      expect(result).toMatchObject({
        expressions: ['floor(1)', '4'],
        operator: '+',
      });

      expect(result.toString()).toBe('calc(floor(1) + 4)');
    });

    it('should be able to chain floor expressions with other calc expressions', () => {
      const result = calc(4).add(3).floor();

      expect(result).toMatchObject({
        expressions: ['calc(4 + 3)'],
        operator: undefined,
        fn: 'floor',
      });

      expect(result.toString()).toBe('floor(calc(4 + 3))');
    });
  });

  describe('random()', () => {
    it('should generate a random number between 0 and 1', () => {
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.1234);

      const result = random();

      expect(result).toMatchObject({
        expressions: ['0.1234'],
        operator: undefined,
        fn: 'calc',
      });
    });

    it('should generate a random number and apply the scale', () => {
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.1234);

      const result = random(10);

      expect(result).toMatchObject({
        expressions: ['1.234'],
        operator: undefined,
        fn: 'calc',
      });
    });

    it('should generate a random number and apply the scale and offset', () => {
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.1234);

      const result = random(10, 5);

      expect(result).toMatchObject({
        expressions: ['6.234'],
        operator: undefined,
        fn: 'calc',
      });
    });
  });
});
