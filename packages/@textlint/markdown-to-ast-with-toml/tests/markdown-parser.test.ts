// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { parse } from '../src/index';
import { runCategorizedFixtureTests, runUnitFixtureTests } from './helpers/run-fixture-tests';

// Yaml Frontmatter
runCategorizedFixtureTests('fixtures', parse);
