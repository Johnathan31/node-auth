# Backend

This article explains two main aspects of the project:

- Server Life Cycle
- API Endpoints

---

# Server Life Cycle

## Registration

When a new client creates an account, three pieces of information must be provided:

- Username
- Email
- Password

The server performs several validation steps before creating the account.

### Email Validation

The email must follow a valid format:

```text
example@example.com
```

Otherwise, registration fails.

### Password Validation

Passwords must:

- Be at least 8 characters long.
- Contain at least one letter.
- Contain at least one digit.
- Contain at least one special character.

If any requirement is not met, registration fails.

### Password Hashing

After validation, the password is hashed using _bcrypt_ before being stored in PostgreSQL.

The original password is never saved.

### Database Generated Values

The database automatically creates:

- `id` (auto-incrementing `SERIAL`)
- `created_at` (`CURRENT_TIMESTAMP`)

---

## Login

To log in:

1. The client submits their email and password.
2. The server retrieves the user's password hash.
3. bcrypt compares the provided password with the stored hash.
4. If authentication succeeds, a JWT is generated.
5. The JWT is stored in an HttpOnly cookie named `token`.

Cookie settings:

```text
HttpOnly
SameSite=Strict
Secure (production only)
Path=/
Expires after 7 days
```

After successful login, the client is authenticated.

---

## Authentication

Protected routes use the `auth` middleware.

The middleware:

1. Checks whether the `token` cookie exists.
2. Verifies the JWT signature and expiration date.
3. Extracts the payload.
4. Stores the payload in `req.user`.

If verification fails, the request is rejected.

---

## Account Details

When requesting account information:

1. Authentication is performed using the `token` cookie.
2. The user ID is extracted from the JWT.
3. The corresponding user is retrieved from PostgreSQL.
4. User information is returned.

---

## Logout

When logging out:

1. Authentication is performed.
2. The `token` cookie is removed.
3. The client becomes unauthenticated.

---

# API Endpoints

## Health check

**POST** `/`

### Response

```json
{
  "success": true,
  "message": "API is running"
}
```

Used to check the API is actually running.

## Register

**POST** `/api/v1/register`

### Request

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "$Password123"
}
```

### Response Status Codes

| Status | Description                      |
| ------ | -------------------------------- |
| `201`  | User registered successfully     |
| `400`  | Invalid email or missing fields  |
| `409`  | Username or email already exists |
| `422`  | Password too weak                |
| `500`  | Internal server error            |

---

## Login

**POST** `/api/v1/login`

### Request

```json
{
  "email": "john@example.com",
  "password": "$Password123"
}
```

### Response Status Codes

| Status | Description               |
| ------ | ------------------------- |
| `200`  | Login successful          |
| `400`  | Email or password missing |
| `401`  | Invalid credentials       |
| `500`  | Internal server error     |

### Notes

A successful login creates an HttpOnly cookie named:

```text
token
```

containing a signed JWT.

---

## Current User

**GET** `/api/v1/me`

Authentication required.

### Successful Response

```json
{
  "details": {
    "id": 1,
    "username": "john",
    "email": "john@example.com"
  },
  "authenticated": true
}
```

### User Not Found

```json
{
  "error": "User not found.",
  "authenticated": false
}
```

### Not Authenticated

```json
{
  "authenticated": false
}
```

### Internal Error

```json
{
  "error": "Internal Error"
}
```

### Response Status Codes

| Status | Description           |
| ------ | --------------------- |
| `200`  | Success               |
| `401`  | Not authenticated     |
| `404`  | User not found        |
| `500`  | Internal server error |

---

## Logout

**POST** `/api/v1/logout`

Authentication required.

### Not Authenticated

```json
{
  "authenticated": false
}
```

### Response Status Codes

| Status | Description             |
| ------ | ----------------------- |
| `200`  | Successfully logged out |
| `401`  | Not authenticated       |

### Notes

The logout endpoint removes the `token` HttpOnly cookie.
