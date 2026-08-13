# MIMC-001 — Stabilize language switching, responsive layout, and calculator validation

**Status:** Ready for implementation  
**Type:** Bug fix / Responsive UI / Accessibility  
**Priority:** High

## Objective

Fix the main correctness and usability problems found in the current MIMC implementation without changing the project's basic vanilla HTML/CSS/JavaScript architecture.

The completed page should remain a simple BMI calculator with daily water guidance and Portuguese, English, and Spanish support, while behaving consistently when users switch languages and when the page is used at different viewport sizes.

## Repository findings

### 1. Language switching does not refresh calculated result text

Static interface text is translated through elements with `data-translate-id`. The generated BMI result (`#IMC-results`) and daily-water message (`#daily-water`) are not part of that mechanism.

The calculation runs during page initialization using the language stored at that moment. If the user calculates a result and then selects another language, `loadTranslations()` updates the labels/header/legend/button, but the already-rendered calculated messages remain in the previous language.

This creates a mixed-language interface.

Relevant files:
- `scripts/index.js`
- `scripts/portuguese.js`
- `scripts/english.js`
- `scripts/spanish.js`
- `index.html`

### 2. Translation loading is asynchronous and repeated per translated element

`loadTranslations()` loops over every `[data-translate-id]` element and calls `withTranslation()` for each one. `withTranslation()` dynamically imports the same language module for every translated element.

This makes language changes harder to reason about and creates unnecessary asynchronous work. Refactor language loading so one language package is loaded for a language change and then applied consistently to the UI.

The implementation must also make it straightforward to re-render dynamic result messages in the selected language.

### 3. Unsupported language values silently become Spanish

`withTranslation()` currently uses Spanish as the final `else` branch. If session storage ever contains an unsupported/corrupt value, it is silently interpreted as Spanish.

Use an explicit supported-language policy and a predictable fallback. Preserve the current intended default of Portuguese unless there is a strong existing-code reason not to.

### 4. Document language metadata is not synchronized

`index.html` is permanently declared as `<html lang="en">` even though the application defaults to Portuguese and allows switching between Portuguese, English, and Spanish.

When the active language changes, update `document.documentElement.lang` to an appropriate language code so assistive technologies and browsers receive the correct language metadata.

### 5. The main layout is not responsive

The current CSS uses desktop-oriented fixed sizing, including:
- `#main-div { margin: 25px 200px; }`
- a four-column grid for the main card;
- `.form form { grid-template-columns: 200px 10% 10% 1fr 1fr; }`
- fixed/minimum widths and margins in the language controls;
- large text blocks and images without a mobile layout strategy.

There are currently no media queries in `styles/index.css`.

At narrow widths this can produce cramped controls, horizontal overflow, poor spacing, or content that does not adapt naturally.

Create responsive behavior for at least:
- mobile / narrow screens;
- tablet / medium screens;
- desktop / wide screens.

Do not redesign the visual identity. Adapt the existing design.

### 6. Header and language selector need narrow-screen behavior

The header contains the logo, potentially long translated title, and language dropdown in one flex row. The translated title lengths vary substantially between languages.

Ensure the header remains usable without horizontal overflow or overlapping content in Portuguese, English, and Spanish.

The language selector must remain keyboard usable.

### 7. Form fields are missing explicit IDs

The labels use `for="weight"` and `for="height"`, but the corresponding inputs have `name` attributes only and no matching `id` attributes.

Add matching IDs so the labels are programmatically associated with their inputs.

### 8. Numeric input validation is too weak

The current implementation uses `parseInt()` on URL query values and primarily checks `Number.isNaN(imc)`.

This allows problematic cases such as:
- zero height, which can produce `Infinity`;
- negative height or weight;
- decimal values being truncated by `parseInt()`;
- empty or malformed values producing unclear behavior.

Validate inputs before calculating.

Use numeric parsing that preserves legitimate decimal values. Weight and height must be finite positive numbers before BMI/water calculations are rendered.

Do not show `NaN`, `Infinity`, negative BMI, or misleading ideal-weight/water values.

### 9. BMI classification boundary should be made internally consistent

`getImcColor()` currently treats BMI values from `18` upward as the normal/green range while the ideal maximum calculation uses `24.99`.

Use one clearly defined set of boundaries consistently for classification and ideal-range messaging. For this maintenance ticket, use the conventional adult BMI boundaries already implied by the existing UI intent:
- underweight: BMI < 18.5;
- normal range: BMI >= 18.5 and < 25;
- overweight indicator: BMI >= 25.

This ticket is not intended to expand the calculator into medical diagnosis or additional obesity categories.

### 10. Calculation interaction should not depend unnecessarily on URL query navigation

The current form uses `action="#"`, has no explicit method, and the script reads `window.location.search`. This makes calculation state tied to navigation/query parameters and contributes to awkward re-rendering behavior.

Refactor the interaction so submitting the form can calculate and render the result on the current page without requiring a page reload or URL query string as the application's calculation state.

Preserve the visible behavior: enter weight and height, press Calculate, see BMI/ideal-weight guidance and daily-water guidance.

### 11. Existing result-state classes must not accumulate incorrectly

When recalculating, ensure `#IMC-results` has only the appropriate current state class (`yellow`, `green`, `red`, or `unavailable`) rather than retaining a class from an earlier result.

## Out of scope

Do **not**:
- migrate the project to React/Vue/Angular or another framework;
- add a backend;
- add accounts or persistence beyond the existing language preference behavior;
- redesign the project's visual identity;
- replace the existing images merely for aesthetic reasons;
- turn this maintenance ticket into a full rewrite;
- add medical diagnostic functionality beyond the existing BMI/water-guidance purpose.

## Acceptance Criteria

- [ ] Selecting Portuguese, English, or Spanish translates all static UI text.
- [ ] If a BMI/water result is already visible, changing language immediately re-renders that result in the newly selected language without requiring another calculation or page reload.
- [ ] Language switching uses one coherent language-package load per language change rather than importing the same module independently for every static translated element.
- [ ] Unsupported stored language values fall back predictably to a supported language.
- [ ] The document's `<html lang>` value follows the selected language.
- [ ] Weight and height labels are correctly associated with their inputs.
- [ ] Valid decimal weight/height values can be processed without integer truncation.
- [ ] Zero, negative, missing, non-finite, or malformed input does not produce `NaN`, `Infinity`, or misleading calculated output.
- [ ] BMI classification uses consistent boundaries: `<18.5`, `18.5–<25`, and `>=25`.
- [ ] Form submission calculates on the current page without requiring a reload/query-string round trip.
- [ ] Recalculating replaces prior result-state styling correctly.
- [ ] The page has no avoidable horizontal scrolling at representative widths around 320px, 375px, 768px, 1024px, and desktop widths.
- [ ] Header/logo/title/language controls remain usable in all three languages at narrow widths.
- [ ] Form controls, result content, legend, water illustration, and footer adapt to mobile, tablet, and desktop layouts.
- [ ] The language selector remains usable with keyboard focus, not only pointer hover.
- [ ] Existing Portuguese, English, and Spanish translations remain available.
- [ ] Existing BMI result, ideal-weight guidance, and daily-water guidance continue to work for valid input.

## Suggested implementation direction

This is guidance, not a requirement to reproduce an exact code shape.

A simple solution can:

1. Keep a single `currentLanguage` state in `scripts/index.js`.
2. Load the selected translation module once when language changes.
3. Apply static translations from the loaded package.
4. Store the latest valid calculation inputs/result in JavaScript state.
5. Re-render dynamic result text whenever the language changes.
6. Attach form and language-selector behavior with JavaScript event listeners.
7. Validate numeric values before invoking calculation functions.
8. Add responsive CSS using fluid sizing and a small number of sensible breakpoints.

Do not introduce a framework to accomplish this.

## Manual verification scenarios

### Language
1. Load the page with no stored preference; verify the intended default language.
2. Switch PT → EN → ES → PT before calculating.
3. Calculate a valid result in Portuguese, then switch to English and Spanish; verify both result messages change immediately.
4. Refresh and verify the stored supported language is restored.
5. Simulate an unsupported stored language value and verify the fallback.

### Calculator
1. Test a normal valid case such as 70 kg / 170 cm.
2. Test decimal values.
3. Test BMI immediately below and at 18.5.
4. Test BMI immediately below and at 25.
5. Test zero height.
6. Test zero weight.
7. Test negative values.
8. Test missing fields.
9. Calculate multiple times and verify result colors/classes update correctly.

### Responsive layout
Check approximately 320px, 375px, 768px, 1024px, and a normal desktop width in all three languages. Verify no horizontal overflow and no overlapping/cut-off primary controls or content.

## Definition of Done

- Every acceptance criterion above has been checked.
- Changes remain understandable and appropriately small for this project.
- No framework or unnecessary dependency has been introduced.
- All three languages have been manually exercised.
- Valid and invalid calculator cases have been exercised.
- Responsive behavior has been checked at representative viewport widths.
- The implementation summary identifies changed files and verification performed.
