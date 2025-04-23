// src: types/e2e-lint-plugin.types.ts
// @(#) : プラグイン、Lint用の型定義
//
// Copyright (c) 2025 Furukawa Atsushi <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// -- imports
// textlint
import type {
  TextlintPluginProcessor,
  TextlintPluginProcessorConstructor,
  // Rule
  TextlintRuleModule,
} from '@textlint/types';

// --- type definition

/**
 * Internal representation of a plugin used by TextlintKernel.
 * Typically constructed from a Textlint plugin module.
 */
export type E2EInternalPlugin = {
  /**
   * The processor constructor exported from a Textlint plugin.
   * Required for creating the pre/post-processing logic.
   */
  Processor: TextlintPluginProcessorConstructor;

  /**
   * Function to return a list of supported file extensions, e.g. ['.md'].
   */
  availableExtensions: () => string[];
};

/**
 * E2E-facing plugin entry used to configure a plugin for testing.
 * Includes the plugin module and any runtime processor if needed.
 */
export type E2EPluginEntry = {
  /**
   * A unique ID for this plugin instance (e.g. 'markdown').
   */
  pluginId: string;

  /**
   * The raw plugin module (typically a TextlintPluginModule).
   * The type is unknown to allow both standard and custom plugins.
   */
  plugin: unknown;

  /**
   * Optionally passed pre/post-processor implementation for unified or custom parsers.
   */
  processor?: TextlintPluginProcessor;

  /**
   * Optional configuration values passed to the plugin at runtime.
   */
  options?: Record<string, unknown>;
};

/**
 * Definition of a single rule entry used by TextlintKernel.
 */
export type E2ERuleEntry = {
  /**
   * The rule identifier (e.g. 'no-todo').
   */
  ruleId: string;

  /**
   * The rule module, must conform to TextlintRuleModule interface.
   */
  rule: TextlintRuleModule;
};

/**
 * Represents the full configuration passed to TextlintKernel for lint execution.
 */
export type E2ELintOptions = {
  /**
   * The text content to be linted.
   */
  text: string;

  /**
   * File extension (e.g. '.md') used to select the plugin and processor.
   */
  ext: string;

  /**
   * The input path used for virtual or real file context (for messages).
   */
  inputPath?: string;

  /**
   * List of plugin entries to be used during linting.
   */
  plugins: E2EPluginEntry[];

  /**
   * List of rule entries to be applied.
   */
  rules: E2ERuleEntry[];
};
