# Personal Website

My personal website/portfolio, built with **HTML, CSS, and JavaScript** and deployed on Github Pages.

## Repository File structure

```
personal_site/
├── logos           # Stores all logo assets used
   ├── orgs         # Logos of companies and organizations I've been a part of
   └── skills       # Logos of skills displayed in the logo marquee
├── media           # Miscellaneous embedded media and content
├── index.html      # Page content and structure
├── style.css       # All styling + theme variables
├── script.js       # Theme toggle, mobile nav, marquee scrolling animations
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
