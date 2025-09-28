using Livraria.Domain.Entities;

namespace Livraria.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> AddAsync(User user);
    }
}
