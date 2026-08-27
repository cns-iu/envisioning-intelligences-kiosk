<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

## Envisioning Intelligences Kiosk Quick Start

- Stack: Nx 23 + Angular 22 single-application workspace; package manager is npm.
- Use `npx nx` for local Nx commands to avoid global CLI drift.
- The workspace contains one project: `envisioning-intelligences-kiosk` (application, rooted at the repository root).

## High-Value Commands

- Install dependencies: `npm install`
- List projects: `npx nx show projects`
- Serve the app: `npx nx serve envisioning-intelligences-kiosk`
- Build the app: `npx nx build envisioning-intelligences-kiosk`
- Test the app: `npx nx test envisioning-intelligences-kiosk`
- Lint the app: `npx nx lint envisioning-intelligences-kiosk`
- Format the workspace: `npx nx format:write`

## Application CSS Class Naming

- Name application-owned CSS classes using `app-<component>` for the component root and `app-<component>--<class>` for its elements, variants, and states.
- Use kebab case for both `<component>` and `<class>`. The component name should normally match the Angular selector without the `app-` prefix or, when more appropriate, the component directory name.
- Examples: `app-kiosk-card-carousel`, `app-kiosk-card-carousel-controls--icon`, and `app-kiosk-card-carousel-controls--next-slide`.
- Do not use a single hyphen to separate the component and class. For example, use `app-kiosk-card-carousel-controls--icon`, not `app-kiosk-card-carousel-controls-icon`.
- Apply the convention consistently to static template classes, component or directive host classes, SCSS selectors, classes added through Angular APIs, and application classes used in tests.
- Classes supplied through dynamic bindings are consumer- or data-owned and do not have to follow this convention. Do not rename their values solely to satisfy the application pattern.
- Third-party framework classes, including Angular Material, CDK, and Swiper classes, are exempt.
- When renaming a class, update its templates, styles, TypeScript references, and tests together.

## Testing Expectations

- Unit tests use `@angular/build:unit-test` with coverage enabled by default.
- Coverage thresholds are enforced at 85% for branches, functions, lines, and statements.
- Use watch mode when iterating: `npx nx test envisioning-intelligences-kiosk --configuration=watch`.
- When writing tests, prefer Testing Library APIs (`@testing-library/angular` and `@testing-library/dom`) over direct DOM access.
- Prefer `user-event` for interactions and `@testing-library/jest-dom` matchers for rendered DOM assertions.
- Import `@testing-library/jest-dom/vitest` in `src/test-setup.ts`, not in individual `*.spec.ts` files.
- Avoid low-level patterns such as `querySelector`, `querySelectorAll`, manual `dispatchEvent`, and raw `element.click()` unless there is no Testing Library equivalent.
- Do not add JSDoc to helper functions, fixtures, constants, types, or other test scaffolding declared in `*.spec.ts` files. Keep test code self-explanatory through clear naming instead.

## Documentation Map (Link, Don't Duplicate)

- Repository overview: [README.md](README.md)
- Application configuration and targets: [project.json](project.json)
- Workspace defaults and generator settings: [nx.json](nx.json)

## Documentation Expectations

- Outside `*.spec.ts` files, generate JSDoc blocks for code, including private and protected members and non-exported functions, types, constants, and helpers, when they add clarity.
- Place JSDoc blocks for Angular components, directives, and similar classes immediately before the class declaration, not between the decorator and the class.
- Document functions with `@param` tags for each parameter and `@returns` when the function returns a value.
- Use `@throws`, `@see`, `@deprecated`, and inline links such as `{@link ...}` when they improve the API documentation.
- Keep documentation concise and accurate; document intent, contracts, and edge cases instead of restating obvious implementation details.

## Agent Pitfalls

- Use nearby code as the primary guide for naming, structure, patterns, and APIs when generating new code.
- After generating code, run `npx nx format:write` so generated files follow workspace formatting conventions.
- `npx nx show project <name>` may open an interactive project graph UI; use `--json` for non-interactive terminal output.
- Do not edit generated artifacts under `coverage/` or `dist/` unless explicitly requested.
