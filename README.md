# EVAS GI 2.0

## Prerequisites

- Node.js (v18.18.0 or later)
- pnpm

## Installation

1. Run `pnpm install`
2. Create a .env file at the root directory of the project and add the necessary environment variables. See the .env.sample file for reference.
3. Run `pnpm run dev`

## NPM scripts

Available development scripts:

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `dev`             | Start the development server.                          |
| `build`           | Build the production version                           |
| `preview`         | Run Vite preview                                       |
| `lint`            | Lint TypeScript files using ESLint                     |
| `format`          | Format `.ts`, `.tsx`, and `.json` files using Prettier |
| `test`            | Run vitest with testing-library                        |
| `release`         | Run `commit-and-tag-version` for versioning            |
| `prepare`         | Install Husky                                          |
| `storybook`       | View the UI Styles of this project                     |
| `build-storybook` | storybook build                                        |
| `release`         | Realease new version and create/update changelog.md    |

## Tech Stack

Technologies used in this project

- React
- React Query
- TypeScript
- Zustand
- Axios
- Vitest + React
- Storybook
- Chakra UI

## Project structure

```
.
├── .husky
├── .storybook
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
├── src
│   ├── App.tsx
│   ├── NotFound.tsx
│   ├── components  // common components ex: Pagination
│   ├── features
│   │   ├── [feature-name]
│   │       ├── [feature-name].tsx
│   │       ├── components
│   │       ├── hooks    // hooks of features
│   │       ├── types    // typeScript type definitions
│   │       ├── services // dealing with logical
│   │       ├── store    // client state
│   │       └── index.ts
│   ├── layout
│   ├── lib
│   │   ├── api.ts
│   │   ├── interceptor.ts
│   │   ├── test-utils.tsx
│   │   └── validation.ts
│   ├── main.tsx
│   ├── routes
│   ├── services          // common services - dealing with server
│   ├── store             // state management - zustand
│   ├── stories           // define components, pages ui
│   ├── test
│   │   └── setup.ts
│   ├── theme             // Chakra custom
│   ├── types             // 共用 Folder for TypeScript type definitions
│   └── vite-env.d.ts
├── .commitlintrc.json    // CommitLint configuration file, used for checking the format of Git commit messages
├── .env.sample           // .env template file, storing sample environment variables
├── .eslintrc.cjs
├── .gitignore
├── .prettierignore
├── .prettierrc
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Commit Rules

> type(scope?): title

- type

  - `ci`：修改 CI 配置文件或腳本
  - `chore`：對非業務邏輯程式碼的更改，例如更新開發工具
  - `docs`：文件更新
  - `feat`：新增功能
  - `fix`：修復 bug
  - `perf`：改善程式的性能
  - `refactor`：重構程式碼，不添加新功能或修復 bug
  - `revert`：還原先前的 commit
  - `style`：改善程式碼風格，例如縮排、空格等
  - `test`：增加或修改測試程式

- title (sentence-case)
  - 簡短地描述提交的改變。首字母大寫，其餘字母小寫。 Ex:`This is an example of sentence case.`

**Example**

- build: Update eslint config for production
- feat: Add new user registration feature
- feat(client): Add new user registration feature
