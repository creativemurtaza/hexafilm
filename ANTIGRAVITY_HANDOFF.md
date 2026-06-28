# Hexafilm.ai Marketing Website Handoff

Project path:
`/Users/mac/Work/Hexafilm/# Hexafilm.ai Marketing Website`

Primary file:
`/Users/mac/Work/Hexafilm/# Hexafilm.ai Marketing Website/Hexafilm.dc.html`

Runtime file:
`/Users/mac/Work/Hexafilm/# Hexafilm.ai Marketing Website/support.js`

## Current State

This is a single Claude Design Component HTML file for the Hexafilm.ai marketing website. It includes:

- Sticky nav with aperture logo, desktop links, and mobile burger menu
- Hero section with aperture brand mark, headline, CTA buttons, social proof, and video mockup
- Social proof strip and stats/result cards
- Portfolio grid
- Comparison table
- Process timeline
- Testimonials
- FAQ accordion
- CTA banner and footer
- JS wiring for aperture animation, scroll reveal, FAQ, mobile nav, smooth scrolling, visual-grade options, and metric badge toggling

The project folder also contains screenshots and upload references from the original Claude Design build.

## Important Fix Already Applied

Claude's preview previously had a blank/invisible hero issue caused by unreliable reveal behavior in the embed/rasterizer environment. The current `componentDidMount` uses a scroll/requestAnimationFrame reveal approach instead of relying on `IntersectionObserver`, with a safety fallback that reveals all content after 2200ms.

Responsive nav polish was also applied:

- Desktop nav gap changed to `clamp(18px,2.4vw,34px)`
- Nav link container uses `flex-shrink:0`
- Hero grid gap reduced to `clamp(34px,4vw,56px)`
- Mobile/tablet nav breakpoint changed from `<900px` to `<1120px`

Relevant lines:

- Nav links: `Hexafilm.dc.html` around line 37
- Hero section: `Hexafilm.dc.html` around line 61
- Responsive nav JS: `Hexafilm.dc.html` around line 598

## Verification Completed

Tested with a local server:

```sh
cd "/Users/mac/Work/Hexafilm/# Hexafilm.ai Marketing Website"
python3 -m http.server 4173
```

Then opened:

`http://127.0.0.1:4173/Hexafilm.dc.html`

Verified:

- Hero paints correctly in real browser screenshots
- Scroll reveal ends with `0` hidden reveal items on mobile
- FAQ accordion opens, sets `data-open="1"`, and updates `aria-expanded="true"`
- Mobile burger appears and opens the menu at `390px` width
- Desktop nav remains visible at `1280px` width

The local server was stopped after verification.

## Notes for Antigravity

This folder is not currently a git repository, so `git status` and `git diff` are not available from `/Users/mac/Work/Hexafilm`.

The in-app browser may currently be open directly to:

`file:///Users/mac/Work/Hexafilm/%23%20Hexafilm.ai%20Marketing%20Website/Hexafilm.dc.html`

Direct file opening can work, but local HTTP serving is better for verification because `support.js` loads React/Babel/CDN resources and fetches the component source.

If continuing implementation, preserve the existing single-file Design Component format unless the user asks to convert it into a normal static site or app. Avoid editing `support.js`; it is generated runtime code.

Suggested next checks:

- Full-page desktop screenshot pass from top to footer
- Full-page mobile screenshot pass
- Check whether CTA links should point to a real booking URL instead of `#book`
- Confirm final social links/legal links if production-ready launch is requested
