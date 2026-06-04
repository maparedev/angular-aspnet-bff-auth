using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BffApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task Login([FromQuery] string? returnUrl = null)
    {
        var props = new AuthenticationProperties
        {
            RedirectUri = returnUrl ?? "/"
        };
        await HttpContext.ChallengeAsync("oidc", props);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync("oidc");
    }

    [HttpGet("user")]
    [Authorize]
    public IActionResult GetUser()
    {
        var user = User;
        return Ok(new
        {
            sub = user.FindFirst("sub")?.Value,
            name = user.FindFirst("name")?.Value,
            email = user.FindFirst("email")?.Value,
            claims = user.Claims.Select(c => new { c.Type, c.Value }).ToList()
        });
    }

    [HttpGet("is-authenticated")]
    public IActionResult IsAuthenticated()
    {
        return Ok(new { isAuthenticated = User.Identity?.IsAuthenticated ?? false });
    }
}
