#!/bin/bash
# Show which version of the assistant setup this session runs. Never blocks.
cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
echo "Assistant setup version: $(git log -1 --date=format:'%d %b %Y' --format='%h, %ad: %s' 2>/dev/null)"
exit 0
