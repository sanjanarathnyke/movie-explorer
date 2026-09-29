# Movie Explorer App - Routing Specification

## Router

Use React Router for application navigation.

The application must use client-side routing.

---

# Routes

## Login

Path:

/login

Component:

Login

Purpose:

Allow the user to log in.

---

## Home

Path:

/

Component:

Home

Purpose:

Display:

- Search bar
- Trending movies
- Search results

---

## Movie Details

Path:

/movie/:id

Component:

MovieDetails

Purpose:

Display detailed information about a selected movie.

The movie ID must be obtained from the URL parameter.

Example:

/movie/550

The MovieDetails page must use the ID to retrieve movie information from TMDb.

---

## Favorites

Path:

/favorites

Component:

Favorites

Purpose:

Display movies saved to the user's local favorites list.

---

# Navigation

Use React Router navigation.

Movie cards must navigate to:

/movie/:id

Navbar links:

Home → /
Favorites → /favorites

Login:

/login

---

# Protected Navigation

The application has a frontend-only login interface.

If authentication state is implemented using AuthContext:

Unauthenticated users should be redirected to:

/login

Authenticated users can access:

/
 /movie/:id
/favorites

Do not implement backend authentication for this assignment.

---

# Unknown Routes

Create a NotFound page or fallback route.

Example:

/*

Display:

"Page not found."

Provide a button to return to Home.

---

# Route Structure

Recommended structure:

BrowserRouter
└── App
    └── Routes
        ├── /login
        ├── /
        ├── /movie/:id
        ├── /favorites
        └── *

---

# Route Navigation Rules

1. Do not use normal anchor tags for internal application navigation.
2. Use Link or NavLink from react-router-dom.
3. Use useNavigate when navigation is required programmatically.
4. Use useParams to retrieve movie IDs.
5. Keep routing configuration inside App.js or a dedicated routing file.
6. Do not duplicate route definitions.
7. Route paths must remain consistent throughout the application.