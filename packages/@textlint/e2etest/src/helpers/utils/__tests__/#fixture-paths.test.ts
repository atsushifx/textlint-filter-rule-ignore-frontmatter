// src: helpers/utils/__tests__/fixture-paths.test.ts
// @(#) : mockによるテストケース取得
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// vitest
import { beforeAll, beforeEach, describe, expect, it, } from 'vitest';

// lib
import path from 'path';

// fixture-path utils
import { getFixtureTestPath, initializeFixtureBaseDir, } from '../e2e-fixture-paths';

// --- constants
const mockBaseDir = '<mock>';

// --- tests
describe('e2e-fixture-paths: not initialize', () => {
  it('no initialized baseDir is  throw error', () => {
    expect(() => getFixtureTestPath('foo', 'bar',)).toThrow();
  });
});

describe('e2e-fixture-paths: initialize', () => {
  beforeEach(() => {
    initializeFixtureBaseDir(mockBaseDir,);
  },);

  it('returns correct path after initialization', () => {
    const fixturePath = getFixtureTestPath('foo', 'bar',);
    const expected = path.join(mockBaseDir, 'foo', 'bar',);
    expect(expected,).toBe(fixturePath,);
  });
});
