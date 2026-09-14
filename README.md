# Capstone Portfolio

Three pages (`index.html`, `projects.html`, `about.html`), one shared stylesheet
(`css/styles.css`), and one shared script (`js/main.js`). No build step, no
frameworks, no external JS libraries.

## What's real vs. what's new

Every project described in `projects.html` links to one of your actual repos
(`homework_1`, `homework7web-dev`, `Homework-8-Form-with-Validation-API-Fetch`,
`homework_2_projects`, `milestone_project`) with a description written from
each repo's real README/code &mdash; nothing here is placeholder ("CLI Tool",
"Web Framework," etc.) like the last two attempts used.

The design (dark, warm-neutral palette; Fraunces + IBM Plex Sans; accessible
contact form with a fieldset/legend/aria-live pattern) is new, but the color
tokens were chosen and contrast-checked (by relative-luminance calculation,
same math WebAIM's checker uses) specifically for this build: body text
~15:1, muted text ~7.4:1, accent-on-background ~7.1:1, all comfortably past
the 4.5:1 AA minimum. I can't run the actual WAVE tool from here (no live
browser), so **please still run it yourself against the deployed pages
before you submit** &mdash; treat the zero-error goal as verified-by-design,
not verified-by-tool, until you've checked it.

## Working JavaScript

- Mobile nav toggle (keyboard-operable menu, `aria-expanded` state) on all three
  pages.
- Full contact-form validation and Gmail delivery on `about.html`: per-field live validation,
  inline `aria-live` errors, a focus-managed `role="alert"` error summary,
  a disabled sending state, and a success message on valid submit. Client-side
  only, as noted on the page.

## Deploying to GitHub Pages

The simplest path is to put this inside your existing `milestone_project`
repo (or a fresh repo) and turn on Pages:

```bash
# from inside a local clone of the target repo
cp -r path/to/this/portfolio/* .
git add .
git commit -m "Capstone draft: real project timeline, accessible contact form"
git push
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy
from a branch → Branch: main / (root)** → Save. The live URL will be
`https://ASharlayne.github.io/<repo-name>/`.

## Connecting the contact form to Gmail

The Gmail relay source is in [`contact-relay.gs`](./contact-relay.gs). To
deploy it securely:

1. Open [script.google.com](https://script.google.com/) and create a new
   project.
2. Paste the contents of `contact-relay.gs` into the script editor.
3. Choose **Deploy → New deployment**, select **Web app**, and set **Execute
   as** to yourself and **Who has access** to anyone.
4. Authorize the requested Gmail permissions and copy the generated web-app
   URL.
5. Add that URL to the contact-form submission endpoint in `js/main.js`.

The script sends messages to `a.sharlayne@gmail.com` and does not require
publishing a Gmail password, API key, or other credential in this repository.

## Before peer review

- [ ] Run WAVE (wave.webaim.org) against the deployed URL for all three pages.
- [ ] Resize the browser down to 320px and up to 1200px to confirm the nav toggle and layout hold up.
- [ ] Tab through the contact form keyboard-only, including triggering an error and using the error-summary links.
- [ ] Swap in a real email/LinkedIn link in the footer if you want one beyond GitHub.
