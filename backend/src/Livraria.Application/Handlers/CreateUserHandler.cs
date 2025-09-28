using MediatR;
using Livraria.Application.Commands;
using Livraria.Domain.Interfaces;
using Livraria.Application.Dto;
using Livraria.Domain.Entities;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Livraria.Application.Handlers
{
    public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
    {
        private readonly IUserRepository _repo;
        public CreateUserHandler(IUserRepository repo) => _repo = repo;

        public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var exists = await _repo.GetByEmailAsync(request.Email);
            if (exists != null) throw new InvalidOperationException("Email já cadastrado");

            // hash password (PBKDF2)
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create()) rng.GetBytes(salt);
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: request.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            var combinedHash = $"{Convert.ToBase64String(salt)}.{hashed}";

            var user = new User { Nome = request.Nome, Email = request.Email, PasswordHash = combinedHash };
            var created = await _repo.AddAsync(user);
            return new UserDto(created.Id, created.Nome, created.Email, created.CreatedAt);
        }
    }
}
