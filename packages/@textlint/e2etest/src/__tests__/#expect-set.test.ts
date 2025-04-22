// src: helpers/tests/expect-set.test.ts
// @(#) : UnitTest: expect DI container check
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// vitest
import { beforeAll, describe, expect, it } from 'vitest';

// DI container
import { getE2EExpect, setE2EExpect } from '@/helpers/core/e2e-expect-runner';

describe('expect DI error test', () => {
  it('should throw error if getE2EExpect is called before set', () => {
    expect(() => {
      getE2EExpect();
    }).toThrowError(
      /`expect` function not set/,
    );
  });

  it('should expect is same if setE2EExpect is called before get', () => {
    setE2EExpect(expect);
    const expectFunction = getE2EExpect();
    expect(expectFunction).toBe(expect);
  });
});

describe('expect DI setting test', () => {
  beforeAll(() => {
    setE2EExpect(expect);
  });

  it('should expect is same if setE2EExpect is called by beforeXXX', () => {
    const expectFunction = getE2EExpect();
    expect(expectFunction).toBe(expect);
  });
});
