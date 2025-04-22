#!/usr/bin/env bash
#src: ./scripts/sync-configs.sh
#
# @(#) : Sync shared config files into target directory (by type)
#
# @version  1.0.3
# @since    2025-04-15
# @author   atsushifx <atsushifx@gmail.com>
# @license  MIT
#
# Description <<
#   Sync shared config files to sub repository root.
#
# Usage:
#   ./bin/sync-configs.sh <target_dir> <config_type> [--dry-run]
#   config_type: dprint | lefthook | secretlint | all
#
#<<

set -euCo pipefail

##  Constants
readonly REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../" && pwd)"
readonly CONFIG_DIR="${REPO_ROOT}/shared/configs"

## Global Flags
FLAG_DRY_RUN=false

##  Functions

# copy config files to target directory/target files
copy_config() {
  local src_file="$1"
  local dest_file="$2"
  local target_dir="$3"

  if $FLAG_DRY_RUN; then
    echo "  💡 (dry-run) Would copy: ${src_file} → ${dest_file}"
  else
    cp "${CONFIG_DIR}/${src_file}" "${target_dir}/${dest_file}"
    echo "  ✅ ${dest_file} ← ${src_file}"
  fi
}

# copy config files by config files map
copy_config_files() {
  local -n ref_config_files=$1
  local target_dir="$2"

  for mapping in "${ref_config_files[@]}"; do
    IFS=':' read -r src dest <<< "$mapping"
    copy_config "$src" "$dest" "$target_dir"
  done
}

# sync config files calling by config type
sync_config_type() {
  local config_type="$1"
  local target_dir="$2"
  local config_files

  case "$config_type" in
    dprint)
      config_files=("dprint.base.jsonc:dprint.jsonc")
      copy_config_files config_files "$target_dir"
      ;;
    lefthook)
      config_files=("lefthook.base.yml:lefthook.yml")
      copy_config_files config_files "$target_dir"
      ;;
    secretlint)
      config_files=("secretlintrc.base.yml:.secretlintrc.yml")
      copy_config_files config_files "$target_dir"
      ;;
    *)
      echo "❌ Unknown config_type: $config_type"
      echo "   Must be one of: dprint | lefthook | secretlint | all"
      return 1
      ;;
  esac
}

## functions from options

# show usage from the top of this script
print_usage() {
  sed -n 's/^# \{0,1\}//p; /^<<$/q' "$0"
}

## Main Routine
main() {
  local target_dir="${1:-}"
  local config_type="${2:-}"
  local third_arg="${3:-}"

  # 💡 引数がない・または --help/-h のとき usage を出力して終了
  if [[ -z "$target_dir" || -z "$config_type" || "$target_dir" == "--help" || "$target_dir" == "-h" ]]; then
 	print_usage
    exit 0
  fi

  if [[ "$third_arg" == "--dry-run" ]]; then
    FLAG_DRY_RUN=true
  fi

  if [[ ! -d "$target_dir" ]]; then
    echo "❌ Target directory does not exist: $target_dir"
    exit 1
  fi

  echo "📦 Syncing configs ${CONFIG_DIR} to: $target_dir"
  $FLAG_DRY_RUN && echo "🚫 Dry run mode is active. No files will be written."


  if [[ "$config_type" == "all" ]]; then
    local config_types=("dprint" "lefthook" "secretlint")
    for type in "${config_types[@]}"; do
      echo "🔧 [$type]"
      sync_config_type "$type" "$target_dir" || exit 1
    done
  else
    sync_config_type "$config_type" "$target_dir" || exit 1
  fi

  echo "🎉 Sync complete!"
}

main "$@"
