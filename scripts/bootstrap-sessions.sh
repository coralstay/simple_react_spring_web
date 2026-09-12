#!/usr/bin/env bash
#
# ==========================================================================
#  !!! WARNING — READ BEFORE RUNNING !!!
#
#  Running this script immediately launches 4 REAL, AUTONOMOUS Claude Code
#  sessions (implementer / reviewer / verify / logger), each seeded with a
#  "/loop ${LOOP_INTERVAL} ..." prompt as its very first message. From the
#  moment each iTerm2 tab opens, that session starts acting on its own —
#  reading backlog tasks, editing files, running tests, creating git
#  commits, and opening GitHub pull requests — with no further confirmation
#  from you in between loop iterations.
#
#  Before running this script:
#    - Read scripts/session-prompts/implementer.md
#    - Read scripts/session-prompts/reviewer.md
#    - Read scripts/session-prompts/verify.md
#    - Read scripts/session-prompts/logger.md
#  and make sure you actually want those 4 loops to start running now.
#
#  See docs/SESSIONS.md for the full design/rationale behind this 4-session
#  setup (worktree layout, what each role does each cycle, relationship to
#  TASK-55 / TASK-61).
# ==========================================================================

set -euo pipefail

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------

# Fixed repo-root path (not auto-detected) so this script behaves the same
# regardless of which worktree/cwd it happens to be invoked from.
REPO_ROOT="/Users/flynn_macpro/simple_react_spring_web"

WORKTREES_DIR="$REPO_ROOT/.claude/worktrees"

# How often each session's /loop prompt re-runs. NOTE: as of TASK-62.2–62.5
# this value is already baked into each scripts/session-prompts/<role>.md
# file as a literal "/loop 60m " prefix — changing this variable alone does
# NOT change the running sessions' interval. It's kept here so the intent
# is documented in one place and so a future revision of this script (or of
# the prompt files) can template it instead of hardcoding 60m in prose.
LOOP_INTERVAL="60m"

# --------------------------------------------------------------------------
# Step 1: idempotent worktree setup
#
# implementer/reviewer/verify each run out of their own named git worktree.
# logger runs directly out of the main repo root (no separate worktree) —
# see docs/SESSIONS.md for why.
# --------------------------------------------------------------------------

# ensure_worktree <dir_name> <branch_name>
#
# If $WORKTREES_DIR/<dir_name> already exists, do nothing (idempotent).
# Otherwise create it via `git worktree add`, reusing the branch if it
# already exists (e.g. from a previous partial setup) or creating it fresh
# otherwise.
ensure_worktree() {
  local dir_name="$1"
  local branch_name="$2"
  local path="$WORKTREES_DIR/$dir_name"

  if [ -d "$path" ]; then
    echo "[bootstrap-sessions] worktree already exists, skipping: $path"
    return 0
  fi

  echo "[bootstrap-sessions] creating worktree: $path (branch: $branch_name)"
  mkdir -p "$WORKTREES_DIR"

  if git -C "$REPO_ROOT" show-ref --verify --quiet "refs/heads/$branch_name"; then
    # Branch already exists (e.g. pushed from elsewhere) — attach worktree to it.
    git -C "$REPO_ROOT" worktree add "$path" "$branch_name"
  else
    # Branch doesn't exist yet — create it together with the worktree.
    git -C "$REPO_ROOT" worktree add -b "$branch_name" "$path"
  fi
}

ensure_worktree "implementer-workspace" "worktree-implementer-workspace"
ensure_worktree "reviewer-workspace" "worktree-reviewer-workspace"
ensure_worktree "verify-workspace" "worktree-verify-workspace"

IMPLEMENTER_DIR="$WORKTREES_DIR/implementer-workspace"
REVIEWER_DIR="$WORKTREES_DIR/reviewer-workspace"
VERIFY_DIR="$WORKTREES_DIR/verify-workspace"
LOGGER_DIR="$REPO_ROOT"

# --------------------------------------------------------------------------
# Step 2: build a small launcher script per tab
#
# Each tab needs to `cd` into its session's directory and then run
# `claude "$(cat scripts/session-prompts/<role>.md)"` (relative to that
# directory's own worktree root, at runtime). Rather than trying to embed
# that multi-quoted command directly inside an AppleScript string (fragile:
# nested single/double quotes, $(...) inside AppleScript text, etc.), we
# write it out to a small temp shell script per role and have iTerm2 just
# run `bash <tmp-script>`. This keeps the AppleScript side trivial.
# --------------------------------------------------------------------------

make_tab_script() {
  local dir="$1"
  local role="$2"
  local tmp
  tmp="$(mktemp -t "bootstrap-session-${role}")"

  {
    printf '#!/usr/bin/env bash\n'
    printf 'cd %q\n' "$dir"
    printf 'exec claude "$(cat scripts/session-prompts/%s.md)"\n' "$role"
  } > "$tmp"
  chmod +x "$tmp"

  echo "$tmp"
}

IMPLEMENTER_SCRIPT="$(make_tab_script "$IMPLEMENTER_DIR" "implementer")"
REVIEWER_SCRIPT="$(make_tab_script "$REVIEWER_DIR" "reviewer")"
VERIFY_SCRIPT="$(make_tab_script "$VERIFY_DIR" "verify")"
LOGGER_SCRIPT="$(make_tab_script "$LOGGER_DIR" "logger")"

echo "[bootstrap-sessions] implementer -> $IMPLEMENTER_DIR"
echo "[bootstrap-sessions] reviewer    -> $REVIEWER_DIR"
echo "[bootstrap-sessions] verify      -> $VERIFY_DIR"
echo "[bootstrap-sessions] logger      -> $LOGGER_DIR (main repo, no worktree)"
echo "[bootstrap-sessions] loop interval baked into prompt files: $LOOP_INTERVAL"

# --------------------------------------------------------------------------
# Step 3: open iTerm2 — one window, 4 tabs, one per role.
#
# mktemp paths never contain characters that upset a single-quoted
# AppleScript string, so this stays simple and robust.
# --------------------------------------------------------------------------

osascript <<APPLESCRIPT
tell application "iTerm2"
  activate

  set newWindow to (create window with default profile)

  tell current session of newWindow
    write text "bash '$IMPLEMENTER_SCRIPT'"
  end tell

  tell newWindow
    create tab with default profile
    tell current session of current tab
      write text "bash '$REVIEWER_SCRIPT'"
    end tell

    create tab with default profile
    tell current session of current tab
      write text "bash '$VERIFY_SCRIPT'"
    end tell

    create tab with default profile
    tell current session of current tab
      write text "bash '$LOGGER_SCRIPT'"
    end tell
  end tell
end tell
APPLESCRIPT

echo "[bootstrap-sessions] done — 4 iTerm2 tabs opened (implementer/reviewer/verify/logger)."
