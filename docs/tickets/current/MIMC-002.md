# MIMC-002 — Keep language menu anchored consistently in the header

**Status:** Ready for implementation  
**Type:** UI bug / Responsive header  
**Priority:** Medium

## Objective

Make the language selector stay visually anchored near the right edge of the header with a consistent right margin, regardless of the active language or the length of the translated header title.

## Problem

During smoke testing, the language dropdown shifts horizontally when switching between Portuguese and English because the header currently uses a flex layout centered around content whose width changes with the translated title.

The language control should not move simply because the title text is longer or shorter.

Observed behavior:
- Portuguese title width places the language selector at one horizontal position.
- English title width shifts the language selector to a different position.
- The same risk applies to Spanish and to future translation-length differences.

## Desired behavior

The header should have a stable visual structure:

- logo area on the left;
- title occupying the central flexible area;
- language selector anchored to the right with a deliberate, consistent right margin;
- title length must not push the language control left or right;
- dropdown options should open aligned with the language control;
- the selector should remain usable on desktop, tablet, and mobile.

The preferred implementation is a layout model that assigns clear regions to logo, title, and language selector (for example CSS Grid or another robust equivalent), rather than relying on content width and centered flex distribution.

Do not use brittle pixel positioning that only works for the current title strings.

## Scope

Relevant file:
- `styles/index.css`

Change HTML only if truly necessary for semantic/layout robustness.

## Acceptance Criteria

- [ ] At the same viewport width, the language selector occupies the same right-side position in Portuguese, English, and Spanish.
- [ ] The selector has a consistent intentional right margin from the viewport/header edge.
- [ ] Changing language does not visibly shift the selector horizontally.
- [ ] The translated title may grow or shrink without overlapping the logo or language selector.
- [ ] The title remains visually balanced within the available central header area.
- [ ] Dropdown options stay aligned with their trigger button.
- [ ] The dropdown does not overflow the right edge of the viewport.
- [ ] Desktop behavior is verified around 1366px and 1024px.
- [ ] Tablet/mobile behavior remains usable around 768px, 375px, and 320px.
- [ ] Portuguese, English, and Spanish are all smoke-tested.
- [ ] No calculator or translation logic is changed as part of this ticket unless required to preserve existing behavior.

## Out of Scope

Do not:
- redesign the header visual identity;
- change translation copy merely to make strings the same length;
- introduce a framework or dependency;
- modify calculator behavior;
- bundle unrelated UI cleanup into this ticket.

## Suggested implementation direction

Prefer a structure where the three header responsibilities do not compete for horizontal position.

For example, on desktop/tablet the header can behave conceptually like:

```text
| logo |        flexible centered title area        | language |
```

A CSS Grid such as `auto minmax(0, 1fr) auto` is one possible solution, with the language area aligned to the end and an explicit header horizontal padding/right margin. This is guidance, not a required exact implementation.

For narrow mobile widths, adapt the layout intentionally rather than preserving the desktop row at all costs. The language control may move to another row if necessary, but its position should remain deterministic and consistent across languages at the same viewport width.

## Manual Verification

At each representative width (1366, 1024, 768, 375, 320):

1. Load Portuguese and note the language button position.
2. Switch to English.
3. Switch to Spanish.
4. Confirm the language button does not shift horizontally because of title length.
5. Open the dropdown in each language.
6. Confirm options are aligned, visible, and do not overflow.
7. Confirm title, logo, and dropdown do not overlap.

## Definition of Done

- All acceptance criteria have been verified.
- The header is structurally stable across all three languages.
- The fix remains small and scoped to header layout behavior.
- No unrelated functional changes are included.
