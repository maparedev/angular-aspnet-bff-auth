# Development Guide

## Prerequisites

- .NET 8 SDK or later
- Node.js 20 LTS
- npm 10 or later
- Visual Studio Code or Visual Studio 2022 (recommended)

## Backend Development

### Project Structure

```
backend/
├── BffApp/
│   ├── Controllers/
│   ├── Services/
│   ├── Middleware/
│   ├── Program.cs
│   └── appsettings.json
└── IdentityServer/
    ├── Pages/
    ├── Services/
    ├── Program.cs
    └── appsettings.json
```

### Running Locally

1. **Start IdentityServer**:
   ```bash
   cd backend/IdentityServer
   dotnet run
   ```
   Runs on `https://localhost:5000`

2. **Start BFF Application**:
   ```bash
   cd backend/BffApp
   dotnet run
   ```
   Runs on `https://localhost:5001`

### Key Files

- `Program.cs` - Configuration and middleware setup
- `appsettings.json` - Local settings
- `appsettings.Development.json` - Development overrides

## Frontend Development

### Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── components/
│   │   ├── pages/
│   │   └── app.config.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── tsconfig.json
└── package.json
```

### Running Locally

```bash
cd frontend
npm install
ng serve
```

Application runs on `http://localhost:4200`

### Development Server

The Angular dev server includes a proxy configuration to forward API requests to the BFF backend.

## Testing

### Backend Tests

```bash
cd backend/BffApp
dotnet test
```

### Frontend Tests

```bash
cd frontend
ng test
```

## Debugging

### Backend (Visual Studio)

1. Open `backend/BffApp.sln`
2. Set breakpoints
3. Press F5 to debug

### Backend (VS Code)

1. Install C# extension
2. Open backend folder
3. Press F5 to start debugging

### Frontend

1. Open `http://localhost:4200` in browser
2. Open DevTools (F12)
3. Set breakpoints in Sources tab

## Common Tasks

### Adding a New API Endpoint

1. Create controller in `backend/BffApp/Controllers/`
2. Define service in `backend/BffApp/Services/`
3. Add route in `Program.cs`
4. Create service in Angular `src/app/services/`
5. Add HTTP call with interceptor support

### Adding Authentication to a Component

1. Inject `AuthService` in component
2. Use `authService.isAuthenticated$` observable
3. Apply `AuthGuard` to route

### Database Operations

Use Entity Framework Core in ASP.NET Core:

```bash
cd backend/BffApp
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Environment Configuration

### Backend

Create `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Warning"
    }
  },
  "IdentityServer": {
    "Authority": "https://localhost:5000",
    "ClientId": "bff",
    "ClientSecret": "secret"
  }
}
```

### Frontend

Create `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001'
};
```

## Troubleshooting

### CORS Issues

- Ensure BFF is configured with correct frontend origin
- Check `program.cs` CORS configuration
- Verify cookies are being sent with requests

### Certificate Issues

- For local HTTPS: `dotnet dev-certs https --trust`
- Regenerate if needed: `dotnet dev-certs https --clean`

### Port Already in Use

- Change port in `launchSettings.json`
- Or kill process: `lsof -ti :5001 | xargs kill -9` (macOS/Linux)

## Best Practices

1. **Never store tokens in localStorage** - BFF pattern handles this
2. **Always use HTTPS** in production
3. **Validate tokens on backend** - Don't trust client validation
4. **Keep credentials out of version control** - Use appsettings files
5. **Use environment variables** for sensitive configuration
6. **Test authentication flows** thoroughly
7. **Monitor token expiration** and refresh automatically

## Next Steps

- [ ] Configure database connection
- [ ] Set up CI/CD pipeline
- [ ] Add unit tests
- [ ] Implement logging
- [ ] Add error handling
- [ ] Deploy to staging
