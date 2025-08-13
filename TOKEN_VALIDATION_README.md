# Token Validation System

This document explains how the token validation system works in the Blood Bank Management application.

## Overview

The application implements a comprehensive token validation system that automatically checks JWT token expiration and redirects users to the login page when tokens expire. The system supports 24-hour token validation with automatic logout functionality.

## Key Features

- **Automatic Token Validation**: Tokens are validated on app initialization and periodically checked
- **24-Hour Expiry Support**: Tokens are checked for 24-hour expiration periods
- **Auto-Redirect to Login**: Users are automatically redirected to login when tokens expire
- **Real-time Validation**: Token validation occurs every minute and on tab focus
- **Protected Routes**: Admin routes are protected with authentication checks
- **API Error Handling**: API calls automatically handle token expiration

## Components

### 1. AuthContext (`src/Hook/AuthContext.jsx`)

- Manages authentication state
- Handles token storage in cookies
- Provides login/logout functions
- Validates tokens on initialization

### 2. Token Validation Hook (`src/Hook/useTokenValidation.jsx`)

- Provides comprehensive token validation
- Sets up automatic logout timers
- Handles window focus and visibility change events
- Manages cleanup of timers and intervals

### 3. Auth Utils (`src/Hook/authUtils.jsx`)

- `isTokenExpired(token)`: Checks if a token is expired
- `getTokenExpiryTime(token)`: Gets token expiration timestamp
- `getTimeUntilExpiry(token)`: Calculates time until token expires
- `getUserDetails()`: Extracts user information from token

### 4. Protected Route (`src/Components/Layouts/ProtectedRoute.jsx`)

- Wraps components that require authentication
- Validates user types and permissions
- Redirects unauthorized users

### 5. Auth Middleware (`src/Components/Layouts/AuthMiddleware.jsx`)

- Global token validation wrapper
- Applied to the entire application
- Ensures consistent authentication checks

## How It Works

### Token Storage

- Tokens are stored in cookies using `js-cookie`
- Token format: JWT with expiration time in payload

### Validation Process

1. **App Initialization**: Token is validated when the app loads
2. **Periodic Checks**: Token is checked every 60 seconds
3. **Focus Events**: Token is validated when user returns to the tab
4. **API Calls**: Token is validated before each API request
5. **Route Protection**: Protected routes validate authentication

### Auto-Logout Triggers

- Token expiration time reached
- Invalid or malformed token
- 401/403 API responses
- Manual logout action

### Token Expiry Handling

```javascript
// Check if token is expired
if (isTokenExpired(token)) {
  logout();
  redirectToLogin();
}

// Set up automatic logout timer
const timeUntilExpiry = getTimeUntilExpiry(token);
setTimeout(() => logout(), timeUntilExpiry);
```

## Usage Examples

### Protecting Routes

```javascript
import ProtectedRoute from "@/src/Components/Layouts/ProtectedRoute";

// Protect admin routes
<ProtectedRoute allowedUserTypes={["Admin", "superAdmin"]}>
  <AdminDashboard />
</ProtectedRoute>;
```

### Using Token Validation Hook

```javascript
import useTokenValidation from "@/src/Hook/useTokenValidation";

const MyComponent = () => {
  const { validateToken, logout } = useTokenValidation();

  // Manual token validation
  const handleAction = () => {
    const token = Cookies.get("accessToken");
    if (!validateToken(token)) {
      return;
    }
    // Proceed with action
  };
};
```

### API Error Handling

```javascript
import { handleApiResponse } from "@/src/Utils/Fetch";

const handleApiCall = async () => {
  try {
    const response = await apiRequest("/endpoint");
    if (!handleApiResponse(response, router)) {
      return; // User redirected to login
    }
    // Handle successful response
  } catch (error) {
    // Error handled automatically
  }
};
```

## Configuration

### Token Expiry Time

The system automatically reads the `exp` field from JWT tokens. Ensure your backend sets appropriate expiration times (e.g., 24 hours).

### Validation Intervals

- **Periodic Check**: Every 60 seconds (configurable in `useTokenValidation.jsx`)
- **Focus Check**: On window focus
- **Visibility Check**: On tab visibility change

### Cookie Settings

Tokens are stored in cookies with default settings. You can modify cookie options in the AuthContext:

```javascript
Cookies.set("accessToken", newToken, {
  expires: 1, // 1 day
  secure: true, // HTTPS only
  sameSite: "strict",
});
```

## Security Features

1. **Automatic Cleanup**: Timers and intervals are properly cleaned up
2. **Token Validation**: All tokens are validated before use
3. **Secure Storage**: Tokens stored in HTTP-only cookies
4. **Error Handling**: Graceful handling of invalid tokens
5. **Route Protection**: Unauthorized access prevention

## Troubleshooting

### Common Issues

1. **Token Not Expiring**: Check if backend is setting correct `exp` field
2. **Auto-Logout Not Working**: Verify token validation functions
3. **Infinite Redirects**: Check authentication state management
4. **API Errors**: Ensure proper error handling in API calls

### Debug Mode

Add console logs to debug token validation:

```javascript
console.log("Token expiry time:", getTokenExpiryTime(token));
console.log("Time until expiry:", getTimeUntilExpiry(token));
console.log("Is token expired:", isTokenExpired(token));
```

## Best Practices

1. Always use the `ProtectedRoute` component for sensitive pages
2. Handle API errors with the provided utility functions
3. Test token expiration scenarios thoroughly
4. Monitor token validation performance
5. Keep token expiry times reasonable (24 hours recommended)
