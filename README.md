# iPad Weather — nightstand display

An always-on weather + clock display for an iPad Air on iOS 12, in landscape.
Files: `index.html` (the whole app), `icon.png` (home-screen icon), `serve.ps1` (serves it from the laptop).
Weather from Open-Meteo (free, no API key). No jailbreak needed.

## What it does

- **Analogue clock** with a live second hand, plus digital time and date.
- **Split-hero landscape layout, all on one screen** — no scrolling. The clock and the current conditions share the top half at a size you can read from bed; a band underneath carries the next 7 hours and the next 4 days. Rotate to portrait and it expands to the full set: six stats, 24 hours and all 7 days.
- **Dims itself at night.** It uses the actual sunrise/sunset times for your location, so the screen goes dark after sunset and comes back at sunrise. Tap the screen at night to brighten it for 30 seconds. Turn the feature off under **Location → Night dimming**.
- **Survives Wi-Fi blips.** If a refresh fails it keeps showing the last good reading and marks it "Offline · last update HH:MM" in amber, retrying every minute. It never goes blank once it has loaded.
- Refreshes weather every 15 minutes. Nudges the layout a few pixels every 10 minutes so a 24/7 static image isn't burnt into the same pixels.

## Setting up the iPad (do this once)

1. **Settings → Display & Brightness → Auto-Lock → Never.** Without this the screen sleeps and it stops being a display.
2. **Keep it on the charger.** Running a screen 24/7 will flatten it in hours otherwise.
3. Turn brightness down to taste — the night dimming sits on top of whatever brightness you set.
4. Optional: **Settings → Accessibility → Guided Access** locks the iPad into the app so a stray swipe can't leave it.

## Getting the app onto the iPad

### Option A — GitHub Pages (best for 24/7)

Recommended if this runs all day and night, because it does **not** depend on your laptop being awake.

1. Create a free account at github.com, then a new **public** repository, e.g. `ipad-weather`.
2. Upload `index.html` and `icon.png` (Add file → Upload files).
3. **Settings → Pages → Source: Deploy from a branch → main / (root) → Save.**
4. After a minute it's live at `https://<your-username>.github.io/ipad-weather/`.
5. On the iPad open that in **Safari** → Share button → **Add to Home Screen** → Add.

Over https the "Use my location" button also works.

### Option B — served from the laptop

Fine for testing, but the display only works while the laptop is awake and running the script.

1. Laptop and iPad on the same Wi-Fi.
2. Right-click `serve.ps1` → **Run with PowerShell**. It prints an address like `http://192.168.1.23:8080/`. Allow it through the firewall if asked.
3. On the iPad, open that address in **Safari** → Share → **Add to Home Screen**.

Two catches: set the laptop to never sleep (Settings → System → Power & battery → Screen and sleep → Never), and reserve a fixed IP for the laptop in your router, otherwise the address changes and the icon stops working.

## Notes

- Use **Safari**, not Chrome. Add to Home Screen only exists in Safari, and every iOS browser uses Safari's engine underneath anyway.
- Launch it from the home-screen icon, not a Safari tab — that's what gives you the full-screen display with no address bar.
- The app ships with a generic default location. Tap **Location** on the iPad to set your own — it's saved on the device, not in this file.
- To change anything later, edit `index.html` and refresh (Option B) or re-upload it (Option A).
