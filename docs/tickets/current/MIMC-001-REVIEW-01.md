# MIMC-001 — Review Round 01

**Review status:** Changes requested  
**Reviewed implementation commit:** `3ab7ac08b8816537569c01735be9b24f5f178a48`

This review is part of MIMC-001. Codex must read this file together with `MIMC-001.md` before making the next correction pass.

## What is accepted from the current implementation

Code review confirms that the implementation now addresses the following ticket requirements in a reasonable way:

- language state is centralized and unsupported language values fall back to Portuguese;
- changing language re-renders static translations and the latest dynamic calculation;
- the document language metadata is synchronized (`pt-BR`, `en`, `es`);
- labels now have matching input IDs;
- calculation no longer relies on URL query parameters or page navigation;
- decimal values are preserved through `Number(...)` rather than truncated with `parseInt()`;
- empty, zero, negative and non-finite values are rejected before valid result rendering;
- BMI classification now uses `<18.5`, `18.5–<25`, and `>=25`;
- prior result-state classes are removed before applying the new state;
- language selection no longer depends on inline `onclick` handlers;
- the implementation preserves vanilla HTML/CSS/JavaScript and does not introduce unnecessary dependencies.

These items must remain working during the correction pass.

## Changes requested

### 1. Desktop form layout is still visually unbalanced

The current desktop/base CSS still uses the old form grid:

```css
.form form {
    grid-template-columns: 200px 10% 10% 1fr 1fr;
}
```

This produces poor spacing at a normal desktop width. In the reviewed UI:

- the translated labels are squeezed into a narrow column and wrap unnecessarily (for example Spanish `Introduce tu peso:` / `Introduce tu altura:`);
- labels and inputs do not read as clear field pairs;
- the inputs look detached from their labels;
- large unused gaps appear inside the form area;
- the Calculate button width/alignment feels unrelated to the input fields;
- the water-result panel occupies a large block on the right while the input area feels compressed on the left.

Refactor the **base/desktop form layout**, not just the existing media queries.

### 2. Establish a clear field-pair layout

Each field should visually read as one unit:

`Label  →  Input`

For desktop/tablet layouts:

- give the label column enough width for Portuguese, English, and Spanish without avoidable word wrapping;
- give inputs a consistent practical width;
- use a visible and consistent horizontal gap between label and input;
- use a visible and consistent vertical gap between Weight and Height rows;
- avoid percentage columns whose only purpose is empty spacing;
- do not stretch small number inputs across excessive width.

A simple two-column grid for the field area is preferred over the current five-column layout unless another equally clear solution is justified.

### 3. Improve vertical rhythm of the input section

The current field rows feel crowded relative to the large amount of empty card space.

Provide intentional spacing between:

- Weight row;
- Height row;
- Calculate button;
- dynamic water result when visible.

The form should feel balanced before and after calculation.

Suggested visual target (not exact pixel requirements):

- approximately `20–32px` row spacing between primary form sections on desktop;
- approximately `16–24px` horizontal spacing between labels and fields;
- enough internal padding around the form area so labels do not visually touch the card edge.

Use fluid sizing where appropriate rather than hard-coding the screenshot dimensions.

### 4. Calculate button should belong to the form hierarchy

The Calculate button currently spans a width/alignment that visually competes with the field layout.

Adjust it so it clearly belongs beneath the Weight/Height controls. It may align with the input column or span the logical field group, but it should not appear as an unrelated bar.

Maintain a comfortable clickable/tappable target.

### 5. Rebalance the entire main card on desktop

The card currently has a strong left/right imbalance.

At normal desktop widths, aim for a composition where:

- the form controls have a clear left-side region;
- the daily-water result has a clear right-side region when visible;
- the BMI result/legend and illustration remain visually connected below or within a coherent content grid;
- whitespace is distributed intentionally rather than produced by unused grid columns.

Do **not** redesign colors, imagery, typography family, or the application's identity. This is a spacing/layout refinement.

### 6. Do not optimize only for Spanish

The screenshot used for review is Spanish, but the same desktop layout must work with all three languages.

Verify label/title wrapping in:

- Portuguese;
- English;
- Spanish.

A longer translation should wrap gracefully only when the viewport genuinely requires it, not because the desktop label column is artificially narrow.

### 7. Keep responsive improvements coherent across breakpoints

The previous implementation added breakpoints at `1024px`, `767px`, and `374px`. Keep or simplify them as appropriate, but ensure the base desktop layout and breakpoints form one coherent responsive system.

Do not fix desktop spacing in a way that regresses mobile/tablet behavior.

## UI acceptance additions for MIMC-001

The ticket is not approved until all of these are true:

- [ ] At a normal desktop viewport, Weight and Height labels do not wrap unnecessarily in Portuguese, English, or Spanish.
- [ ] Each label/input pair has clear visual association and consistent alignment.
- [ ] Weight and Height rows have comfortable vertical separation.
- [ ] The Calculate button is visually aligned with the form controls rather than appearing detached.
- [ ] The form area has intentional internal padding and does not feel compressed against the left side of the card.
- [ ] The form and daily-water result share the available desktop width in a balanced way.
- [ ] Empty space inside the main card is intentional; no large gaps exist solely because of unused grid columns.
- [ ] The layout remains coherent before a calculation (when result panels are empty) and after a calculation (when BMI/water text appears).
- [ ] Portuguese, English, and Spanish have been visually checked at desktop width after the spacing changes.
- [ ] Existing mobile/tablet acceptance criteria from `MIMC-001.md` still pass.

## Required verification for next handoff

Before reporting completion, Codex should manually inspect or render at least:

- desktop around 1366px or similar, in PT/EN/ES;
- 1024px;
- 768px;
- 375px;
- 320px.

For desktop, specifically verify both **before calculation** and **after a valid calculation**.

Do not publish directly to `main` for the correction pass. Work on a dedicated branch and open a pull request for review.
