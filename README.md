# Angular 21 + ASP.NET Core BFF Authentication

A modern full-stack application featuring Angular 21 frontend with ASP.NET Core backend using Duende IdentityServer and Backend-for-Frontend (BFF) pattern with cookie-based authentication.

## Project Structure

```
├── backend/                 # ASP.NET Core API
│   ├── BffApp/             # Main BFF application
│   └── IdentityServer/     # Duende IdentityServer setup
├── frontend/               # Angular 21 application
├── docker-compose.yml      # Docker compose for local development
└── README.md
```

## Features

- ✅ Angular 21 frontend with modern TypeScript
- ✅ ASP.NET Core backend with Duende IdentityServer
- ✅ Backend-for-Frontend (BFF) pattern
- ✅ Cookie-based authentication
- ✅ Secure token handling
- ✅ CORS configuration
- ✅ Login/Logout functionality
- ✅ Protected routes with auth guards
- ✅ Refresh token rotation

## Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 20+
- npm 10+

### Backend Setup

```bash
cd backend/BffApp
dotnet restore
dotnet run
```

Backend runs on `https://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs on `http://localhost:4200`

## Architecture

### BFF Pattern
The Backend-for-Frontend pattern provides:
- Token storage on the server (no XSS vulnerability)
- Cookie-based session management
- Automatic token refresh
- Secure CORS handling

### Authentication Flow

1. User logs in via Angular frontend
2. Credentials sent to ASP.NET Core BFF endpoint
3. BFF exchanges credentials with Duende IdentityServer
4. Auth cookie returned to browser
5. Subsequent requests include cookie automatically
6. BFF validates cookie and forwards requests to backend

## Configuration

See individual README files in `backend/` and `frontend/` directories for detailed configuration.

## Security

- Tokens stored server-side (no localStorage)
- Secure, httpOnly cookies
- CSRF protection enabled
- CORS properly configured
- Refresh token rotation

## Development

See DEVELOPMENT.md for development guidelines.

## License

MIT