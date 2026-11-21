# 🙌 Contributing to ngx-skeleton-loader

Thanks for your interest in improving the **ngx-skeleton-loader** project! Whether it's fixing bugs, improving
documentation, or suggesting new features, your help is welcome 🙏

---

## 🚀 Getting Started

> **Requirements**
> **Node.js >= 24.15**, **Bun >= 1.4** and **npm >= 11** (see `engines` in `package.json`).
> The workspace is developed and tested with Angular 22.3, TypeScript 6.0 and Vitest 5.1.

### 1. Clone the Repository

```bash
git clone https://github.com/fsegurai/ngx-skeleton-loader.git
cd ngx-skeleton-loader
```

### 2. Install Dependencies

```bash
bun install
```

`bun install` also installs the Husky git hooks (`prepare`).

### 3. Build the Library

```bash
bun run build:lib
```

The demo consumes the **built** library: the root `tsconfig.json` maps `@fsegurai/ngx-skeleton-loader` to
`dist/lib`.

### 4. Start Development Server

```bash
bun start
```

This runs the library watch build (`watch:lib`) and the demo dev server together, at
[http://localhost:4200](http://localhost:4200).

---

## 📁 Project Structure

```
ngx-skeleton-loader/
├── lib/                          # Library source code
│   └── src/
│       ├── configuration/        # provideSkeletonLoader, SKELETON_LOADER_CONFIG, types
│       ├── skeleton-loader/      # SkeletonLoaderComponent and its styles
│       └── index.ts              # Library public API
├── demo/                         # Demo application (dogfoods the library)
├── docs/<version>/               # Versioned docs: content/*.md, manifest.json, search-index.json, playground/
└── README.md
```

> The library must use relative imports only: `check:lib-imports` (run by `build:lib`) fails on aliased or self
> imports, which ng-packagr does not rewrite.

---

## 🧪 Running Tests

Tests run with Vitest (jsdom) through the Angular CLI `@angular/build:unit-test` builder (`ng test`).

| Command                           | What it does                                     |
|-----------------------------------|--------------------------------------------------|
| `bun run test-local:lib`          | Library specs in watch mode                      |
| `bun run test-ci_cd:lib`          | Library specs once (CI)                          |
| `bun run test-ci_cd:coverage:lib` | Library specs with coverage                      |
| `bun run test-local:demo`         | Demo specs in watch mode                         |
| `bun run test-ci_cd:demo`         | Demo specs once (builds the library first)       |
| `bun run type-check:lib`          | Type-checks the library and its specs            |
| `bun run type-check:demo`         | Type-checks the demo                             |

### SCSS Structure

- Keep styles scoped to the component
- Expose theming through `--ngx-skeleton-loader-*` CSS custom properties, and list every new variable at the top of
  `skeleton-loader.component.scss`, in the README and in the theming guide
- Respect `prefers-reduced-motion` for any new animation

---

## 📝 Documentation

### Code Documentation

- Add JSDoc comments for all public APIs
- Document non-obvious logic

### README, docs and playground

When adding or changing features:

1. Update `README.md` with usage examples
2. Update the pages under `docs/<version>/content/` (manifest-generator frontmatter: `label`, `description`,
   `order`, `tags`, `keywords`, `icon`, and `breadcrumbTitle` on section `README.md` files)
3. Regenerate the manifest and search index:

   ```bash
   bun run generate:manifest   # writes docs/<package version>/manifest.json and search-index.json
   ```

4. Update or add playground samples in `docs/<version>/playground/` and validate them with the Arkodex validator:

   ```bash
   bun <path-to-Arkodex>/scripts/validate-playground.ts docs/<version>
   ```

   Samples run without a build step (JIT): import `@angular/compiler` first, use zoneless change detection, keep
   import map URLs pinned to exact versions (or `{version}` for this library) and style the page with the `--pg-*`
   preview variables.

5. Add an entry to `CHANGELOG.md`

---

## 🔍 Code Quality

The project uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
bun run lint:check   # lint + format check
bun run lint:fix     # apply safe fixes and formatting
```

Husky runs `lint:fix` on `pre-commit` and `format:audit` on `pre-push`.

### Type Safety

- Use strict TypeScript configuration
- Avoid `any` type; prefer `unknown` when type is uncertain
- Leverage type inference when the type is obvious

---

## ✍️ Commit Message Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)**.

| Type        | Description                           |
|-------------|---------------------------------------|
| `feat:`     | New feature                           |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation only changes            |
| `refactor:` | Code refactoring (no behavior change) |
| `test:`     | Adding or fixing tests                |
| `build:`    | Build system or dependencies          |
| `ci:`       | CI workflows                          |
| `chore:`    | Maintenance tasks                     |

Example:

```bash
git commit -m "feat(theming): add a variable for the shimmer width"
```

---

## 🚀 Pull Request Process

### Before Submitting

1. **Check your changes:**

   ```bash
   bun run lint:check
   bun run type-check:lib && bun run type-check:demo
   bun run test-ci_cd:lib && bun run test-ci_cd:demo
   bun run build:lib && bun run build:demo
   ```

2. **Update documentation:**
   - Add/update README examples
   - Update the docs, regenerate the manifest and validate the playground
   - Update CHANGELOG.md
   - Add JSDoc comments for new APIs

3. **Verify demo application:**
   ```bash
   bun start
   ```
   Test your changes in the demo app

### PR Guidelines

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Write clear commit messages:**
   ```
   feat: add a pulse-dark color variable

   - Add --ngx-skeleton-loader-pulse-dark-color
   - Document it in the README and the theming guide
   ```

3. **Keep PRs focused:**
   - One feature or fix per PR
   - Include tests for new functionality
   - Update documentation

4. **PR Title Format:**
   - `feat: description` for new features
   - `fix: description` for bug fixes
   - `docs: description` for documentation
   - `refactor: description` for refactoring

---

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Angular version**
2. **ngx-skeleton-loader version**
3. **Steps to reproduce**
4. **Expected behavior**
5. **Actual behavior**
6. **Minimal reproduction example**

---

## 💡 Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and motivation
3. **Provide examples** of the desired API
4. **Consider backward compatibility**

---

## 🤝 Code of Conduct

This project follows the [Angular Code of Conduct](https://github.com/angular/angular/blob/main/CODE_OF_CONDUCT.md).
Please be respectful and inclusive in all interactions.

---

## 📞 Getting Help

- **GitHub Issues:** For bugs and feature requests
- **GitHub Discussions:** For questions and community support
- **Documentation:** Check the README.md and `docs/` for usage examples

Thank you for contributing to ngx-skeleton-loader! 🎉
