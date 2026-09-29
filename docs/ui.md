# Movie Explorer App - UI Specification

## UI Framework

Use Material UI (MUI) for the application interface.

Do not use another UI framework.

Use MUI components and responsive utilities wherever practical.

---

## Theme

Implement both:

- Light mode
- Dark mode

Create a reusable MUI theme configuration.

The user must be able to switch between light and dark mode.

Persist the selected theme using localStorage.

Use a ThemeContext for theme state.

---

## Global Layout

The application should contain a consistent layout:

- Navbar
- Main content area
- Responsive container
- Footer if required

The Navbar should provide navigation to:

- Home
- Favorites
- Theme toggle
- Logout

---

## Login Page

Create a clean centered login form.

Fields:

- Username
- Password

Components:

- TextField
- Button
- Typography
- Paper/Card
- Container

Requirements:

- Required field validation.
- Password field must hide the password.
- Display validation errors.
- Provide a clear login button.
- Responsive layout.

The login page should have a modern movie/entertainment visual style.

---

## Home Page

The Home page must contain:

1. Search section
2. Trending movies section
3. Search results section

The layout must remain responsive.

---

## Search Bar

Create a reusable SearchBar component.

It must contain:

- Text input
- Search button
- Clear action where appropriate

The search bar should be easy to use on mobile and desktop.

Display the last searched movie/search term where appropriate.

---

## Movie Card

Create a reusable MovieCard component.

Each movie card must display:

- Poster
- Movie title
- Release year
- Rating

The card must be clickable.

Clicking the card must navigate to:

/movie/:id

The card should also provide a favorite action.

Use MUI Card components.

---

## Movie Grid

Create a reusable MovieGrid component.

The grid must automatically adapt to screen size.

Example behavior:

Mobile:
- 2 columns

Tablet:
- 3 columns

Desktop:
- 4 or more columns depending on available space

Do not hard-code a fixed card width that breaks responsive layouts.

---

## Trending Section

Display trending movies in a visually distinct section.

Use reusable MovieCard components.

Provide appropriate loading and error states.

---

## Movie Details Page

Display:

- Large movie poster
- Movie title
- Release date
- Rating
- Overview
- Genres
- Runtime
- Cast
- Trailer/video
- Favorite button

Use a responsive two-column layout on desktop.

Use a single-column layout on mobile.

Provide a Back button.

---

## Favorites Page

Display saved favorite movies using MovieGrid and MovieCard.

If there are no favorites, display a friendly empty state.

Example:

"No favorite movies yet."

Provide a navigation option to return to the Home page.

---

## Loading State

Use MUI loading indicators.

For movie grids, skeleton loading can be used.

Loading UI must prevent the application from appearing broken while API requests are running.

---

## Error State

API failures must display a user-friendly message.

Do not expose raw Axios errors or technical stack traces to the user.

Example:

"Unable to load movies right now. Please try again."

Provide a retry action where appropriate.

---

## Empty State

Handle cases such as:

- No search results
- No favorites
- Missing movie data

Use clear messages and appropriate MUI components.

---

## Visual Style

The application should feel like a modern movie discovery platform.

Use:

- Clear typography
- Strong movie poster presentation
- Consistent spacing
- Rounded cards where appropriate
- Responsive layouts
- Good contrast
- Accessible buttons
- Consistent MUI theme

Avoid excessive animations or unnecessary visual effects.

---

## Accessibility

Use:

- Meaningful button labels
- Accessible form labels
- Alt text for movie posters
- Keyboard-accessible controls
- Sufficient color contrast

Do not rely only on color to communicate information.