# MIMC — Codex Agent Instructions

## Purpose

This repository is a small Body Mass Index (BMI/IMC) calculator with daily water guidance and Portuguese, English, and Spanish translations.

The current maintenance workflow uses implementation tickets under `docs/tickets/current/` as the source of truth for a Codex task.

## Before changing code

1. Read this file.
2. Read the requested ticket under `docs/tickets/current/` completely.
3. Inspect every source file referenced by that ticket.
4. Reproduce or reason through the reported behavior before editing.
5. Keep the existing vanilla HTML/CSS/JavaScript approach unless the ticket explicitly requires an architectural change.

## Implementation rules

- Work only on the scope described by the current ticket.
- Prefer small, understandable fixes over rewrites.
- Do not introduce a framework, build system, package manager, or external dependency for maintenance work unless explicitly required.
- Preserve Portuguese, English, and Spanish support.
- Do not silently remove existing functionality.
- Avoid inline event handlers when touching the relevant interaction; prefer JavaScript event listeners where practical.
- Keep accessibility and keyboard interaction in mind when modifying controls.
- Treat responsive behavior as part of correctness, not optional polish.
- Validate numeric input before calculations and do not render `NaN`, `Infinity`, or misleading health results.
- If a requirement is ambiguous, report the ambiguity rather than inventing product behavior.

## Completion protocol

Before considering a ticket complete:

1. Check every acceptance criterion explicitly.
2. Test the calculator with valid and invalid inputs.
3. Test all three languages, including switching language after results are already visible.
4. Test representative mobile, tablet, and desktop viewport widths when layout is in scope.
5. Summarize changed files, tests performed, and any remaining limitations.

Do not implement unrelated cleanup merely because you notice it while working on a ticket.
