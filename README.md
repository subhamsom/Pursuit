# Pursuit 🏔
### A Chrome extension that replaces your new tab with a cinematic landscape and one honest thought.

Built during a job search. Forked for any search.

---

## What it does

Every time you open a new tab, you get a full-screen landscape photo, a live clock, and one grounding quote. Hover over it to read the full thought. That's it.

The quotes are written for job seekers. But the structure works for any community that needs a daily reminder of something real.

---

## What's inside

```
pursuit/
  manifest.json        Chrome extension config
  newtab.html          The entire UI
  newtab.css           Styles and animations
  newtab.js            Clock, quote logic, background fetching
  quotes.json          63 quotes, easy to replace
  fonts/               Bundled woff2 fonts
  icons/               Extension icons at 16, 48, 128px
```

---

## Make it yours 🎨

1. Open `quotes.json` and replace the quotes with your own. Each entry needs two fields:
```json
{
  "headline": "Your one-liner here.",
  "full": "The fuller thought that earns the headline."
}
```

2. Get a free Pexels API key at [pexels.com/api](https://www.pexels.com/api)

3. Find a Pexels collection that fits your mood. Replace the collection ID in `newtab.js`:
```javascript
`https://api.pexels.com/v1/collections/YOUR_COLLECTION_ID?type=photos&per_page=15&page=${page}`
```

4. Replace the icons in the `icons/` folder with your own at 16x16, 48x48, and 128x128px

5. Update the name and description in `manifest.json`

---

## Run it locally 🛠

1. Go to `chrome://extensions`
2. Turn on Developer mode (top right toggle)
3. Click Load unpacked
4. Select this folder
5. Open a new tab

---

## Publish it 🚀

1. Go inside the folder, select all files, and compress them into a zip
2. Go to [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
3. Pay the one-time $5 developer registration fee
4. Upload the zip and fill in the store listing
5. Submit for review. Takes 1 to 7 days.

---

## One important rule 🔑

Your Pexels API key must never be pushed to GitHub. Before every commit, replace the real key in `newtab.js` with a placeholder:

```javascript
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY';
```

---

## Ideas for other niches 💡

The quote database and background collection are the only two things that define the experience. Some directions worth exploring:

- Sobriety and recovery
- Fitness and training
- Startup founders
- Creative work and writers block
- Parenting
- Language learning

---

Built by [@subhamsom](https://www.linkedin.com/in/subhamsom05/) during a job search.

Happy pursuit. 🌄
