using Duende.IdentityServer.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, config) =>
{
    config
        .MinimumLevel.Debug()
        .WriteTo.Console();
});

builder.Services.AddIdentityServer()
    .AddInMemoryIdentityResources(new[]
    {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResource("api", "API Access", new[] { "api_scope" })
    })
    .AddInMemoryApiScopes(new[]
    {
        new ApiScope("api", "BFF API") { UserClaims = { "name", "email" } }
    })
    .AddInMemoryApiResources(new[]
    {
        new ApiResource("api", "BFF API")
        {
            Scopes = { "api" }
        }
    })
    .AddInMemoryClients(new[]
    {
        new Client
        {
            ClientId = "bff",
            ClientSecrets = { new Secret("bff-secret".Sha256()) },
            AllowedGrantTypes = GrantTypes.Code,
            RequireConsent = false,
            RedirectUris = { "https://localhost:5001/signin-oidc" },
            PostLogoutRedirectUris = { "https://localhost:5001/signout-callback-oidc" },
            AllowedScopes = { "openid", "profile", "api" },
            AllowOfflineAccess = true,
            AccessTokenLifetime = 3600,
            AbsoluteRefreshTokenLifetime = 2592000,
            SlidingRefreshTokenLifetime = 1296000
        }
    })
    .AddTestUsers(new[]
    {
        new Duende.IdentityServer.Test.TestUser
        {
            SubjectId = "1",
            Username = "admin",
            Password = "password",
            Claims = new[]
            {
                new System.Security.Claims.Claim("name", "Admin User"),
                new System.Security.Claims.Claim("email", "admin@example.com")
            }
        },
        new Duende.IdentityServer.Test.TestUser
        {
            SubjectId = "2",
            Username = "user",
            Password = "password",
            Claims = new[]
            {
                new System.Security.Claims.Claim("name", "Test User"),
                new System.Security.Claims.Claim("email", "user@example.com")
            }
        }
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowBFF", policy =>
    {
        policy
            .WithOrigins("https://localhost:5001", "http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors("AllowBFF");
app.UseIdentityServer();

app.Run();

public partial class Program { }
