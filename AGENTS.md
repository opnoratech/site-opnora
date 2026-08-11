# Opnora Project Rules

## Communication

- Always respond in Brazilian Portuguese (pt-BR).
- Clearly explain what was changed, which files were modified, and how to test the result.
- Before making large or potentially risky changes, briefly explain the plan and wait for confirmation.

## Code Quality

- Use TypeScript correctly and avoid `any`.
- Do not create new files, dependencies, or libraries unless they are genuinely necessary.
- Preserve the existing project structure, conventions, and patterns.
- Do not perform broad refactoring when the request is limited to a visual or isolated functional adjustment.
- Fix lint errors, type errors, and unused imports related to the task before completing it.

## Interface and Experience

- Prioritize responsiveness, especially on mobile devices.
- Do not change the desktop design unless the task requires it.
- Maintain Opnora's visual identity: technological, sophisticated, minimalist, and premium.
- Use smooth, lightweight, and performant animations.
- Avoid excessive effects, too much blur, strong glow, or unnecessary motion.
- Maintain basic accessibility through adequate contrast, clickable controls, readable text, and keyboard navigation where applicable.

## Final Validation

- Verify that the application still compiles successfully.
- Run or recommend the appropriate validation commands for the project.
- Report possible side effects, limitations, or points that still require review.

## Security and Control

- Never expose, print, transmit, or modify credential values from `.env` files, API keys, tokens, passwords, or secrets.
- Never run `git push`, production deployments, file deletions, database migrations, or critical configuration changes without explicit confirmation.
- Before removing dependencies, files, or existing functionality, explain the impact and wait for confirmation.
- Do not update dependency versions or configuration files without a clear necessity.
