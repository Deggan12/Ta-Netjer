# Ta-Netjer Website — Setup Guide

## Files
- `index.html` — Main homepage
- `style.css`  — All styles
- `app.js`     — Cart, products, interactions
- `logo.png`   — **Place your logo here** (the Eye of Horus / Ta Netjer logo)

## Quick Start
1. Copy your logo image into this folder and name it `logo.png`
2. Open `index.html` in a browser — it works with no server needed
3. For production, host all three files on any static host (Netlify, Vercel, GitHub Pages, etc.)

## Adding Product Photos
An `images/` folder is already created inside this project. The code already expects these exact filenames:

- `images/BlueSoap.png` — Blue Lotus Artisan Shaving & Body Soap
- `images/OatmealSoap.png` — Oatmeal Soap
- `images/BlackseedSoap.png` — Charcoal & Black Seed Soap
- `images/TurmericMask.png` — Turmeric Face Mask
- `images/Hairoil.png` — Hair Growth Solution
- `images/Deodorant.png` — Deodorant Cream

Just drop your image files into the `images/` folder using these exact names (case-sensitive) and they'll appear on the site automatically — no code changes needed.

## Editing Prices
All prices in `app.js` are currently **placeholders**. Find the `PRODUCTS` array near the top of the file and update the `price:` value for each product to your real price.

## Checkout & Payment (E-Transfer)
The site now has a full 3-step checkout flow:
1. **Cart** — customer reviews items and totals
2. **Checkout form** — customer enters name, email, and shipping address
3. **E-Transfer instructions** — shows your payment email (`tanetjer.nature@gmail.com`), the exact amount, and a unique order reference number, with copy buttons and step-by-step instructions

Orders are NOT automatically sent anywhere yet — the customer fills the form and is shown payment instructions, then completes the e-Transfer manually through their own bank. You will receive the transfer once they send it, with the order number in the message field so you can match it to their order.

**Note:** the form does not yet email you the order details automatically. Right now it only displays them to the customer. If you want order details (name, email, address, items) emailed to you automatically when someone checks out, that requires a small backend (e.g. a simple form service like Formspree, or a Google Sheets integration) — let me know if you'd like this added.

### Adding Card Payments Later
When you're ready, Stripe Checkout is the easiest way to accept cards:
https://stripe.com/docs/payments/accept-a-payment

## Colours (for reference)
| Name        | Value     |
|-------------|-----------|
| Obsidian    | #0D0B08   |
| Sand Gold   | #C8A96E   |
| Terracotta  | #D4602A   |
| Parchment   | #F2EAD8   |
| Ivory       | #FDFAF4   |