# MIMC

MIMC is a simple multilingual Body Mass Index (BMI/IMC) calculator built with vanilla HTML, CSS, and JavaScript.

It was originally created as a college project and later improved to provide a more reliable and responsive experience across devices and languages.

## Features

- BMI/IMC calculation from weight and height
- Ideal-weight range guidance based on BMI boundaries
- Daily water-intake guidance based on body weight
- Portuguese, English, and Spanish interface
- Dynamic language switching without page reload
- Responsive layout for desktop, tablet, and mobile
- Input validation for invalid, zero, negative, and decimal values
- Accessible form labels and language metadata

## Technologies

- HTML5
- CSS3
- JavaScript

No framework, build tool, backend, or external runtime is required.

## Project structure

```text
mimc/
├── images/
├── scripts/
├── styles/
├── docs/
│   ├── AGENTS.md
│   └── tickets/
│       ├── current/
│       └── completed/
├── index.html
└── README.md
```

## Languages

The interface supports:

- Portuguese
- English
- Spanish

The selected language is preserved for the current browser session.

## Running locally

Clone the repository and open `index.html` in a browser.

```bash
git clone https://github.com/ms-pucinelli/mimc.git
cd mimc
```

Then open `index.html` directly or use a simple local development server of your choice.

## Maintenance workflow

The repository includes lightweight implementation documentation under `docs/`.

Current work is described in `docs/tickets/current/`, while completed maintenance tickets are archived in `docs/tickets/completed/`. `docs/AGENTS.md` contains instructions used when working with coding agents such as Codex.

## Background

MIMC began as an academic frontend project focused on practicing HTML, CSS, JavaScript, forms, calculations, and multilingual interfaces. It was later revisited to fix language-switching issues, improve validation, stabilize the header across translations, and make the layout responsive on different screen sizes.

---

Created by Pamela Gomes.
