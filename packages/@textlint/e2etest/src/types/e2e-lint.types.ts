// src: types/e2e-lint.types.ts
// @(#) : e2e-lint.types.ts
//
// Copyright (c) 2025 atsushifx <atsushifx@gmail.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// types
import type { E2EErrorMessage, E2ETestOptions } from '@/types';

/**
 * Lint 実行後の結果を保持する構造体。
 * - TextlintKernel の `lintText()` や E2E テストにおける出力結果として使用。
 * - `filePath` は対象ファイルを一意に識別するための仮想または実パス。
 */
type E2ELintResult = {
  /** 実行対象となったファイルパス */
  filePath: string;
  /** 検出されたエラーメッセージ一覧 */
  messages: E2EErrorMessage[];
};

/**
 * fixture ベースの E2E テストにおける、1ケース分のテスト入力構造。
 * - `input.md` および `output.json` から構成される。
 * - `ext` はプラグイン判定や振り分けに使用されるファイル拡張子。
 */
type E2EParsedFixtureInput = {
  /** 入力ファイルのパス */
  inputPath: string;
  /** 対象となるテキスト本文 */
  text: string;
  /** 入力ファイルの拡張子（例: `.md`, `.txt`） */
  ext: string;
};

/**
 * fixture ベースの E2E テストにおける、1ケース分のテスト出力構造。
 * - input: input.md からパースされる構造体
 * - expected: output.json から読み込んだ構造体
 */
type E2EParsedFixture = {
  /**
   * input.md から解析された構造体
   */
  input: E2EParsedFixtureInput;
  /**
   * output.json から解析された構造体
   */
  output: E2EErrorMessage[];
};

/**
 * Lint 実行用の非同期関数型。
 *
 * この関数は、E2E テストにおいて個別の Markdown/TOML ファイルを解析し、
 * Textlint のルールとプラグイン設定に基づいて lint 処理を実行します。
 *
 * @param text - Lint 対象となるテキストデータ（Markdown/TOML等）
 * @param inputPath - テスト対象ファイルの仮想または実パス（識別用）
 * @param ext - 拡張子（例: `.md`, `.custom`）で、プラグイン分岐に利用
 * @param options - 使用する TextlintKernel、プラグイン、ルールなどの設定情報
 * @returns `Promise<E2ELintResult>` - 検出されたメッセージとファイル情報を含む lint 結果
 *
 * @example
 * const result = await lintFn("# TODO: text", "path/to/input.md", ".md", options);
 * console.log(result.messages);
 */
type E2ELintFunction = (
  _text: string,
  _inputPath: string,
  _ext: string,
  _options: E2ETestOptions,
) => Promise<E2ELintResult>;

// --- export
export type { E2ELintFunction, E2ELintResult, E2EParsedFixture, E2EParsedFixtureInput };
