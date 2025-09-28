using MediatR;
using Livraria.Application.Dto;

namespace Livraria.Application.Commands
{
    public record CreateUserCommand(string Nome, string Email, string Password) : IRequest<UserDto>;
}
