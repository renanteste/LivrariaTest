using Microsoft.AspNetCore.Mvc;
using Livraria.Domain.Interfaces;
using Livraria.Application.Services;

namespace Livraria.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly JwtService _jwt;
        public AuthController(IUserRepository repo, JwtService jwt) { _repo = repo; _jwt = jwt; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _repo.GetByEmailAsync(req.Email);
            if (user == null) return Unauthorized();

            // verify hash
            var parts = user.PasswordHash.Split('.');
            if (parts.Length != 2) return Unauthorized();
            var salt = Convert.FromBase64String(parts[0]);
            var hashed = parts[1];
            var candidate = Convert.ToBase64String(Microsoft.AspNetCore.Cryptography.KeyDerivation.KeyDerivation.Pbkdf2(
                password: req.Password, salt: salt, prf: Microsoft.AspNetCore.Cryptography.KeyDerivation.KeyDerivationPrf.HMACSHA256, iterationCount: 10000, numBytesRequested: 256 / 8));
            if (candidate != hashed) return Unauthorized();

            var token = _jwt.GenerateToken(user);
            return Ok(new { token });
        }
    }

    public record LoginRequest(string Email, string Password);
}
