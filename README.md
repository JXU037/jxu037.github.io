# Personal Website

A lightweight, dependency-free personal website built with plain **HTML, CSS, and vanilla JavaScript**. No build step, no frameworks — just static files that deploy instantly to GitHub Pages (or any static host).

## Features

- Responsive layout (mobile → desktop)
- Light/dark theme toggle (remembers your choice, respects system preference)
- Accessible: skip link, keyboard-friendly nav, semantic HTML, reduced-motion support
- Fast: single CSS file, single JS file, inline SVG favicon — zero external requests

## File structure

```
personal_site/
├── index.html      # Page content and structure
├── style.css       # All styling + theme variables
├── script.js       # Theme toggle, mobile nav, dynamic year
├── favicon.svg     # Inline vector favicon
├── .nojekyll       # Tells GitHub Pages to skip Jekyll processing
└── README.md
```

## Run locally

Just open `index.html` in a browser, or serve it with any static server:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repo on GitHub and push these files:

   ```bash
   git init
   git add .
   git commit -m "Initial personal site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick `main` / `root`, and save.
4. Your site goes live at `https://<username>.github.io/<repo>/`.

> Tip: Name the repo `<username>.github.io` to serve it at the root domain `https://<username>.github.io/`.

## Customize

- Replace every instance of **"Your Name" / "YN"** and the placeholder text in `index.html`.
- Update the project cards, skills list, email, and social links.
- Change the accent color by editing `--accent` in `style.css`.
