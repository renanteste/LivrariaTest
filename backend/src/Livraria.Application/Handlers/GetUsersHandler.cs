using MediatR;
using Livraria.Application.Queries;
using Livraria.Application.Dto;
using Livraria.Domain.Interfaces;

namespace Livraria.Application.Handlers
{
    public class GetUsersHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
    {
        private readonly IUserRepository _repo;
        public GetUsersHandler(IUserRepository repo) => _repo = repo;

        public async Task<IEnumerable<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _repo.GetAllAsync();
            return users.Select(u => new UserDto(u.Id, u.Nome, u.Email, u.CreatedAt));
        }
    }
}
