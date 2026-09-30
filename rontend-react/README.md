# Pizzeria — React Frontend

This is a React port of the Angular `pizza-frontend` app — same pages, same
features, same styling, same backend API. It's meant to be a drop-in
alternative frontend for your existing `backend/` (Node/Express/MongoDB),
which does not need any changes.

## What's the same as the Angular version

- Same 4 pages: Home ("Our story"), Order Pizza, Build Ur Pizza, Shopping Cart
- Same navbar with logo, nav links, and live cart badge
- Same cart behavior: add/remove, quantity +/-, Build-Ur-Pizza items excluded
  from "My Cart" and the navbar count, shown only in the "Ingredients"
  dropdown on the totals panel
- Same API endpoints: `GET /api/pizzas`, `GET /api/ingredients`,
  `POST /api/orders/checkout`
- Same CSS (colors, layout, class names) — copied directly from the Angular
  component stylesheets, so it looks identical

## What's different (Angular → React equivalents)

| Angular concept | React equivalent | Where |
|---|---|---|
| `@Injectable({ providedIn: 'root' })` singleton service | React Context + custom hook | `src/context/CartContext.js` |
| `BehaviorSubject` / `Observable` | `useState` + Context (re-renders subscribers automatically) | `src/context/CartContext.js` |
| `*ngIf`, `*ngFor`, `[ngClass]` | `{condition && ...}`, `.map()`, template literals in `className` | every `.jsx` file |
| `HttpClient` | `axios` | `src/services/*.js` |
| Angular Router (`RouterModule`, `routerLink`) | `react-router-dom` (`Routes`, `Route`, `Link`/`NavLink`) | `src/App.js`, `src/components/Navbar` |
| `environment.ts` | `src/config.js` + `.env` | — |
| Component `.ts` + `.html` + `.css` (3 files) | Component `.jsx` (logic + markup together) + `.css` | `src/components/*` |

## Project structure

```
pizzeria-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Home/
│   │   ├── OrderPizza/
│   │   ├── BuildPizza/
│   │   └── ShoppingCart/
│   ├── context/
│   │   └── CartContext.js      ← shared cart state (like CartService)
│   ├── services/
│   │   ├── pizzaService.js
│   │   ├── ingredientsService.js
│   │   └── orderService.js
│   ├── assets/
│   │   └── pizza-logo.png
│   ├── config.js               ← API base URL (like environment.ts)
│   ├── App.js                  ← routes + providers (like app.module.ts)
│   ├── index.js                ← entry point (like main.ts)
│   └── index.css               ← global styles (copied from styles.css)
├── package.json
└── .env.example
```

## Setup

```bash
cd pizzeria-react
npm install
cp .env.example .env      # edit REACT_APP_API_URL if your backend runs elsewhere
npm start                  # runs on http://localhost:3000
```

Make sure your existing backend is running first:
```bash
cd ../backend
npm install
npm start                  # runs on http://localhost:7000
```

The React app expects the API at `http://localhost:7000/api` by default
(same as your Angular app's `environment.ts`).

## Notes

- Cart state persists to `sessionStorage` under the key `pizzeria_cart` —
  same storage key and same behavior as the Angular version, so switching
  between the two frontends during development won't lose your cart.
- `CartContext` mirrors every method your `CartService` has:
  `addItem`, `updateQuantity`, `incrementQuantity`, `decrementQuantity`,
  `removeItem`, `clearCart`, plus derived `itemCount` and `subtotal`.
