# Commit Convention Guide

This project uses emoji-based conventional commits for clear and beautiful git history.

## Commit Format

```
<emoji> <type>: <subject>

[optional body]

[optional footer]
```

## Commit Types

| Emoji | Type | Description |
|-------|------|-------------|
| ✨ | `feat` | A new feature |
| 🐛 | `fix` | A bug fix |
| 📖 | `docs` | Documentation only changes |
| 💄 | `style` | Changes that do not affect the meaning of the code |
| 🛠 | `refactor` | A code change that neither fixes a bug nor adds a feature |
| ⚡️ | `perf` | A code change that improves performance |
| ✅ | `test` | Adding missing tests or correcting existing tests |
| 📦 | `build` | Changes that affect the build system or external dependencies |
| ⚙️ | `ci` | Changes to our CI configuration files and scripts |
| 🚀 | `chore` | Other changes that don't modify src or test files |
| 🗑 | `revert` | Reverts a previous commit |
| 🤞 | `try` | Add untested to production |
| 🎉 | `init` | Project init |

## Examples

```bash
✨ feat: add user authentication system
🐛 fix: resolve navigation bug on mobile devices
📖 docs: update API documentation with new endpoints
💄 style: improve button hover effects and animations
🛠 refactor: restructure component folder hierarchy
⚡️ perf: optimize image loading with lazy loading
✅ test: add unit tests for auth service
📦 build: update dependencies to latest versions
⚙️ ci: add GitHub Actions workflow for deployment
🚀 chore: update .gitignore with new patterns
```

## How It Works

1. **Auto Template**: When you run `git commit`, a template with all types will open
2. **Validation**: Git hooks validate your commit message format
3. **Enforcement**: Invalid formats will be rejected with helpful error messages

## Quick Commit

For quick commits, use the `-m` flag:

```bash
git commit -m "✨ feat: add dark mode toggle"
```

## Writing Good Commits

- Use the imperative mood ("add" not "added" or "adds")
- Capitalize the first letter of the subject
- Don't end the subject with a period
- Keep the subject line under 50 characters
- Use the body to explain what and why (not how)
- Separate subject from body with a blank line

## Disable Hooks (Emergency Only)

If you absolutely need to bypass the hooks:

```bash
git commit --no-verify -m "emergency fix"
```

⚠️ **Note**: Only use `--no-verify` in emergency situations!

## Tools Installed

- **Husky**: Git hooks management
- **Custom hooks**: 
  - `prepare-commit-msg`: Shows commit template
  - `commit-msg`: Validates commit format
