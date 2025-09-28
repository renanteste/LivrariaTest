using MediatR;
using Livraria.Application.Dto;

namespace Livraria.Application.Queries
{
    public record GetUsersQuery() : IRequest<IEnumerable<UserDto>>;
}
