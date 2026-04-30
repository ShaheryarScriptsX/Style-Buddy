# Style Buddy Mobile App

This folder contains the Style Buddy React Native mobile app. It is built with JavaScript and Expo so we can develop locally first, test quickly in the browser or Android emulator, and prepare for Play Store release later.

This README is the working memory for the mobile app. Update it whenever we complete a feature, change a decision, or discover a setup issue, so future Cursor sessions and other IDEs can understand the project without chat history.

## Current Status

The mobile app has the first authentication flow connected to the local API.

Completed so far:

- Expo React Native app scaffold.
- JavaScript-only setup, no TypeScript.
- Monorepo-safe entry file with `index.js`.
- Web support installed for browser preview on port `8081`.
- Local API URL configuration through `EXPO_PUBLIC_API_URL`.
- Login screen.
- Signup screen.
- Forgot password screen.
- Local authenticated home screen.
- Session persistence with `AsyncStorage`.
- Shared auth API client.
- Shared auth button component.
- Shared auth text input component.
- Password visibility eye icon for password fields.
- Futuristic dark UI theme with glowing cards, animated background blobs, and animated screen entrance.

## How To Run

Run these commands from the repository root.

Start the backend API:

```bash
npm run dev:api
```

Start the mobile app:

```bash
npm run dev:mobile
```

Open web preview:

```bash
npm run web
```

Open Android emulator:

```bash
npm run android
```

The web app usually runs at:

```text
http://localhost:8081
```

## Environment

Create `apps/mobile/.env` from `apps/mobile/.env.example`.

For browser testing on the same laptop:

```bash
EXPO_PUBLIC_API_URL=http://localhost:4000
```

For Expo Go or a real Android phone, use the computer LAN IP instead of `localhost`:

```bash
EXPO_PUBLIC_API_URL=http://192.168.x.x:4000
```

Restart Expo after changing environment variables.

## Current Stack

- React Native with JavaScript.
- Expo for development, web preview, and Android builds later.
- React Navigation for routing.
- AsyncStorage for local auth session persistence.
- Expo vector icons for password visibility icons.
- Local Express API integration through `fetch`.

Planned later:

- TanStack Query for API caching.
- Zustand if global app state grows.
- React Hook Form and Zod for larger forms.

## Current Folder Structure

```text
apps/mobile/
  App.js                         App navigation and auth gate
  index.js                       Expo root registration entry
  app.json                       Expo app config
  babel.config.js                Expo Babel config
  package.json                   Mobile app dependencies and scripts
  src/
    components/
      AuthButton.js              Shared auth button
      AuthScreenShell.js         Animated auth screen background/layout
      AuthTextInput.js           Shared input with password eye toggle
    config/
      api.js                     API base URL config
    features/
      auth/
        authApi.js               Login/signup/forgot password API calls
        AuthContext.js           Auth session provider
        authStorage.js           AsyncStorage helpers
        screens/
          LoginScreen.js
          SignupScreen.js
          ForgotPasswordScreen.js
      home/
        HomeScreen.js            Temporary authenticated landing screen
    theme/
      colors.js                  Shared color palette
```

## Product Roadmap

### Phase 1: Authentication

Status: in progress, mostly complete for local MVP.

- Login.
- Signup.
- Forgot password request.
- Persist local session.
- Logout.
- Improve form validation messages.
- Add vendor/customer role selection during signup.
- Add loading and success states that feel polished.

### Phase 2: Customer Discovery

Status: not started.

- Home screen with featured salons.
- Search screen.
- Category list.
- City and area filters.
- Vendor listing cards.
- Empty states and loading skeletons.

### Phase 3: Vendor Profile

Status: not started.

- Vendor detail screen.
- Logo, cover image, gallery preview.
- Service list with prices.
- Rating and review summary.
- Address and Google Maps action.
- Direct call and WhatsApp buttons.
- Instagram, Facebook, and website links.

### Phase 4: Booking Flow

Status: not started.

- Service selection.
- Date and time selection.
- Customer notes.
- Booking confirmation.
- My bookings screen.
- Booking status labels.

### Phase 5: Vendor Area

Status: not started.

- Vendor profile setup.
- Manage services.
- Manage gallery.
- View booking requests.
- Update booking status.
- Manage offers.

### Phase 6: Release Preparation

Status: not started.

- App icon.
- Splash screen.
- Android package review.
- Production API URL.
- Privacy policy and terms links.
- Error tracking.
- Play Store build.

## Design Direction

Current design direction:

- Premium beauty marketplace.
- Dark futuristic background.
- Pink and purple glow accents.
- Rounded cards and soft glass-style panels.
- Animated entrance for auth screens.
- Subtle animated background blobs.
- Strong typography with clear hierarchy.

Next UI improvements:

- Add proper logo asset.
- Add salon/beauty imagery.
- Add onboarding illustrations.
- Add skeleton loaders.
- Add toast messages.
- Add responsive polish for Android emulator and small phones.

## Decisions Made

- App name is `Style Buddy`.
- Mobile app is written in JavaScript, not TypeScript.
- Backend is local first and will be deployed later.
- Expo is used for faster React Native development.
- Authentication uses a local Express API for now.
- Password fields must include an eye icon to show or hide the password.
- README files are used as the persistent project record because Cursor chat history may not always be available across windows.

## Known Notes

- Browser preview works on port `8081`.
- Android emulator requires Android Studio and a running virtual device.
- Real phone testing requires Expo Go and a LAN API URL.
- If Expo web dependencies are missing, install `react-native-web`, `react-dom`, and `@expo/metro-runtime`.
- If Expo cannot resolve the entry file, confirm `package.json` has `"main": "index.js"` and `index.js` calls `registerRootComponent(App)`.

## Progress Log

### 2026-04-28

- Created the mobile app scaffold inside the monorepo.
- Added Expo setup and local web preview support.
- Added auth screens for login, signup, and forgot password.
- Added local authenticated home screen.
- Connected auth screens to the local API.
- Added persistent session storage.
- Fixed Expo web dependency issues.
- Fixed Expo monorepo entry file issue.
- Improved UI with futuristic dark design and animations.
- Added password visibility eye icon.

## Rule For Future Work

Keep UI components focused on rendering. Put API calls, validation, storage, and business logic inside feature services, hooks, context providers, or shared packages.

After every meaningful change, update this README under `Current Status`, `Product Roadmap`, and `Progress Log`.
