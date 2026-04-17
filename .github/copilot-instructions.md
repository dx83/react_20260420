# Copilot Instructions for react2

## Project Overview

This is a **Create React App** project built with React 19, Redux, and React Router v7. The application includes authentication flows (Login component) and a home page, styled with Ant Design components and custom CSS.

**Stack:**
- React 19.2.5 (functional components + hooks)
- Redux (@reduxjs/toolkit, react-redux)
- React Router v7 for navigation
- Ant Design (antd) for UI components
- Axios for HTTP requests
- Jest + React Testing Library for testing

## Essential Commands

```bash
npm start       # Development server on http://localhost:3000 (hot reload enabled)
npm test        # Jest test runner in watch mode
npm run build   # Production build to /build folder
npm run eject   # ⚠️ One-way operation: exposes webpack config (avoid unless necessary)
```

## Project Structure

```
src/
├── App.js              # Main app with Routes (Home, Login)
├── components/         # React components (functional)
│   ├── Home.js
│   └── Login.js
├── App.css             # App-level styles
├── index.css           # Global styles
├── index.js            # Entry point with BrowserRouter
├── setupTests.js       # Jest configuration
└── App.test.js         # Test example
```

## Code Conventions

### Component Structure
- **Functional components only** — Use hooks (useState, useEffect, useCallback, etc.) rather than class components
- **Component files in `src/components/`** — One component per file, named with PascalCase
- **CSS modules or inline styles** — Keep component styles near the component or create corresponding `.css` files
- **Import pattern:** Import React and hooks at the top, then UI libraries (antd, react-router), then local components

### Redux & State Management
- Use **@reduxjs/toolkit** for store configuration (createSlice, configureStore)
- Keep slices organized by feature (e.g., `src/features/auth/`, `src/features/user/`)
- Actions/reducers should be co-located in slices
- Use hooks: `useSelector` for reading state, `useDispatch` for actions
- Async thunks: Use `createAsyncThunk` for side effects

### React Router
- Routes defined in `App.js` using `<Routes>` and `<Route>` components
- Navigation with `<Link>` (antd `Button` with `navigate` hook) or `useNavigate()` hook
- Route paths should match component names when possible (e.g., `/login` → `Login.js`)

### Testing
- Test files colocated with components: `ComponentName.test.js`
- Use React Testing Library (preferred over Enzyme)
- Test user interactions, not implementation details
- Mock Redux store in tests using redux MockStore or redux-toolkit utilities

### HTTP & Proxying
- Use **axios** for HTTP calls
- Configure API proxy in `package.json` (development) or use `http-proxy-middleware` for advanced routing
- Keep API calls in custom hooks or Redux async thunks

### Styling
- Ant Design components for UI (buttons, forms, layouts)
- Custom CSS in corresponding `.css` files or CSS-in-JS (optional)
- Use CSS custom properties for theming where needed
- Keep global styles in `index.css`

## Build & Deployment

- **Development:** `npm start` uses webpack dev server with hot reload
- **Production:** `npm run build` creates optimized bundles in `/build/`
- **CRA defaults:** Minification, tree-shaking, lazy-code-splitting supported
- No need to eject unless you require custom webpack configuration

## Key Pitfalls & Solutions

| Issue | Prevention |
|-------|-----------|
| Redux state mutations | Always return new objects in reducers; redux-toolkit's Immer handles this automatically |
| Stale closures in effects | Add dependencies array to `useEffect`; use `useCallback` for dependencies |
| Missing React imports | React 19+ supports JSX without explicit import (but may still need for typing) |
| Unoptimized re-renders | Use `React.memo()` for prop-heavy components; `useCallback` for handlers passed as props |
| CSS import conflicts | Use CSS modules (`.module.css`) or keep naming conventions consistent |
| Async race conditions | Cancel requests in cleanup; use thunk abort patterns in Redux |

## Quick Links & Patterns

- **Add a new page:** Create `.js` in `src/components/`, add `<Route>` in `App.js`
- **Add Redux state:** Create slice in `src/features/[feature]/[name]Slice.js`, import in store
- **Add a form:** Use Ant Design Form component (`antd/Form`) with Redux dispatch or local state
- **Configure API endpoint:** Set `REACT_APP_API_BASE_URL` in `.env` and use axios interceptors

## Notes for AI Assistants

- When creating new components, follow the functional component pattern with hooks
- If adding Redux state, recommend creating a slice with descriptive actions
- Suggest tests for new functionality using React Testing Library patterns
- When modifying routes, remember to update the Routes in `App.js`
- For HTTP calls, ask if the request should be managed by Redux (for shared state) or a local hook
