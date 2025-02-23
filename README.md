# 🛠️ Badge Forge – Forge Your Own Badges! 🔥

![Badge Forge](badges/Badge.svg)
![Badge Forge version](badges/Version.svg)
![Github stars](badges/Stars.svg)
![Code coverage](badges/Coverage.svg)
[![Continuous integration](https://github.com/bakajvo/badge-forge/actions/workflows/ci.yml/badge.svg)](https://github.com/bakajvo/badge-forge/actions/workflows/ci.yml)
![Prettier](badges/Prettier.svg)

Why waste time manually adding badges when you can forge them like a pro? ⚒️🔥

Badge Forge transforms your configuration into a glorious set of shields.io badges, making your GitHub README shine ✨.

## 🚀 Why Use Badge Forge?

- ✅ Automated badge generation – no more manual badge tinkering
- ✅ Super simple setup – just run it and let the magic happen
- ✅ Instantly boost your repo’s style points 😎
- ✅ Faster than a blacksmith on caffeine ☕⚡

## 💾 Installation

```shell
npm install -g badge-forge
```

Start forging today! 🏗️🔗

## 🛠 Badge Forge – Configuration Guide & Usage

### 1️⃣ Basic Usage

```sh
badge-forge generate
```

✅ Automatically loads the configuration from supported config files and generates badges.

### 2️⃣ Supported Configuration File Formats

Since Badge Forge uses cosmiconfig, it supports multiple configuration file formats and locations.

> 📌 Supported File Names (searched automatically)
> The tool will look for configuration files in the following order:

- **YAML**:
    - .badge-forgerc.yml
    - .badge-forgerc.yaml
- **JSON**:
    - .badge-forgerc.json
- **JavaScript / TypeScript**:
    - .badge-forgerc.js
    - .badge-forgerc.ts
    - badge-forge.config.js
    - badge-forge.config.ts
- **Package JSON (package.json)**
    - Looks for a "badgeForge" key inside package.json

### 3️⃣ Example Configurations for Each Format

📄 YAML (.badge-forgerc.yml or .badge-forgerc.yaml)

```yaml
badges:
    - label: Stars
      message: '{} ⭐'
      source: https://api.github.com/search/repositories?q=%22badge-forge%22
      path: $.items[?(@.full_name=='bakajvo/badge-forge')].stargazers_count
      color: 3dc8ff

    - label: Badge
      message: Forge 🔥🔨
      color: b58259

    - label: Version
      message: '{}'
      source: package.json
      path: $.version
      color: 6aff3d

    - label: Coverage
      message: '{}%'
      source: coverage/coverage-summary.json
      path: $.total.statements.pct
      color: db0921

    - label: Code style
      message: prettier
      color: ff69b4
      filename: Prettier
```

📄 JSON (.badge-forgerc.json)

```json
{
    "badges": [
        {
            "label": "Stars",
            "message": "{} ⭐",
            "source": "https://api.github.com/search/repositories?q=%22badge-forge%22",
            "path": "$.items[?(@.full_name=='bakajvo/badge-forge')].stargazers_count",
            "color": "3dc8ff"
        },
        {
            "label": "Badge",
            "message": "Forge 🔥🔨",
            "color": "b58259"
        },
        {
            "label": "Version",
            "message": "{}",
            "source": "package.json",
            "path": "$.version",
            "color": "6aff3d"
        },
        {
            "label": "Coverage",
            "message": "{}%",
            "source": "coverage/coverage-summary.json",
            "path": "$.total.statements.pct",
            "color": "db0921"
        },
        {
            "label": "Code style",
            "message": "prettier",
            "color": "ff69b4",
            "filename": "Prettier"
        }
    ]
}
```

📄 JavaScript (badge-forge.config.js/ts or .badge-forgerc.js/ts)

```js
export default {
    badges: [
        {
            label: 'Stars',
            message: '{} ⭐',
            source: 'https://api.github.com/search/repositories?q=%22badge-forge%22',
            path: "$.items[?(@.full_name=='bakajvo/badge-forge')].stargazers_count",
            color: '3dc8ff',
        },
        {
            label: 'Badge',
            message: 'Forge 🔥🔨',
            color: 'b58259',
        },
        {
            label: 'Version',
            message: '{}',
            source: 'package.json',
            path: '$.version',
            color: '6aff3d',
        },
        {
            label: 'Coverage',
            message: '{}%',
            source: 'coverage/coverage-summary.json',
            path: '$.total.statements.pct',
            color: 'db0921',
        },
        {
            label: 'Code style',
            message: 'prettier',
            color: 'ff69b4',
            filename: 'Prettier',
        },
    ],
}
```

📄 Adding Configuration Inside package.json
Instead of creating a separate file, you can add the configuration inside package.json:

```json
{
    "name": "my-project",
    "version": "1.0.0",
    "badgeForge": {
        "badges": [
            {
                "label": "Stars",
                "message": "{} ⭐",
                "source": "https://api.github.com/search/repositories?q=%22badge-forge%22",
                "path": "$.items[?(@.full_name=='bakajvo/badge-forge')].stargazers_count",
                "color": "3dc8ff"
            },
            {
                "label": "Badge",
                "message": "Forge 🔥🔨",
                "color": "b58259"
            },
            {
                "label": "Version",
                "message": "{}",
                "source": "package.json",
                "path": "$.version",
                "color": "6aff3d"
            }
        ]
    }
}
```

✅ This allows badge-forge to fetch configuration directly from package.json.

### 4️⃣ Using in CI/CD Pipelines

📌 Add a script in package.json

```json
{
    "scripts": {
        "generate-badges": "badge-forge generate"
    }
}
```

Example of GitHub Action workflow that runs Badge Forge on every push to main or daily at midnight (UTC). 🚀

#### 📌 .github/workflows/badge-forge.yml
```yaml
name: Generate Badges

on:
push:
branches:
  - main
schedule:
  - cron: "0 0 * * *" # Runs daily at midnight UTC

jobs:
generate-badges:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: "npm"

    - name: Install dependencies
      run: npm ci

    - name: Generate badges
      run: npm run generate-badges # Ensure this script exists in package.json

    - name: Commit and push changes
      run: |
        git config --global user.name "github-actions[bot]"
        git config --global user.email "github-actions[bot]@users.noreply.github.com"
        git add README.md
        git commit -m "Auto-update badges" || echo "No changes to commit"
        git push
```
