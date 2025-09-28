using Livraria.Domain.Entities;
using Livraria.Domain.Interfaces;
using Livraria.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Livraria.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _ctx;
        public UserRepository(ApplicationDbContext ctx) => _ctx = ctx;

        public async Task<User?> GetByEmailAsync(string email) =>
            await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetByIdAsync(Guid id) =>
            await _ctx.Users.FindAsync(id);

        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _ctx.Users.OrderBy(u => u.Nome).ToListAsync();

        public async Task<User> AddAsync(User user)
        {
            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
            return user;
        }
    }
}
