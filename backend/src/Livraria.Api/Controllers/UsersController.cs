using MediatR;
using Microsoft.AspNetCore.Mvc;
using Livraria.Application.Commands;
using Livraria.Application.Queries;
using Livraria.Application.Dto;


namespace Livraria.Api.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator) => _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest req)
        {
            try
            {
                var cmd = new CreateUserCommand(req.Nome, req.Email, req.Password);
                var created = await _mediator.Send(cmd);
                return CreatedAtAction(null, new { id = created.Id }, created);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _mediator.Send(new GetUsersQuery());
            return Ok(users);
        }

       
    }
}
