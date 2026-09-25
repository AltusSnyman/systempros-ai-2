# claude-seo, vendored project-locally (2026-09-18)

Source: https://github.com/AgriciDaniel/claude-seo (MIT), commit of 2026-09-11. Only the `seo` orchestrator plus `seo-local`, `seo-maps`, `seo-drift`, `seo-schema` sub-skills and their four agents are vendored. Nothing is installed globally.

Runtime: `tools/claude-seo/.venv` (minimal deps: bs4, requests, lxml, trafilatura, htmldate, google-auth). No Playwright, no PDF stack.

When a SKILL.md says `${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo <script.py> ...` run instead:

    CLAUDE_SEO_DATA_DIR=$PWD/tools/claude-seo tools/claude-seo/.venv/bin/python .claude/skills/seo/scripts/<script.py> ...

`parse_html.py` reads an HTML file (fetch first with `fetch_page.py <url> --output file`); `--url` is only the base for link resolution. macOS has no `timeout`; scripts have their own `--timeout`.

Rules for this repo: use only `/seo local`, `/seo maps` (Tier 0, no DataForSEO), `/seo drift`, `/seo schema`. Never run a full `/seo audit`. The `gsc` MCP server remains the source of truth for our own rankings. The upstream PostToolUse schema hook is deliberately not installed.
