using Xunit;
using Moq;
using Livraria.Domain.Interfaces;
using Livraria.Application.Handlers;
using Livraria.Application.Commands;
using Livraria.Domain.Entities;
using FluentAssertions;

public class CreateUserHandlerTests
{
    [Fact]
    public async Task Handle_Should_CreateUser_When_EmailNotExists()
    {
        var repoMock = new Mock<IUserRepository>();
        repoMock.Setup(r => r.GetByEmailAsync(It.IsAny<string>())).ReturnsAsync((User?)null);
        repoMock.Setup(r => r.AddAsync(It.IsAny<User>())).ReturnsAsync((User u) => u);

        var handler = new CreateUserHandler(repoMock.Object);
        var cmd = new CreateUserCommand("Nome", "email@test.com", "senha123");

        var result = await handler.Handle(cmd, CancellationToken.None);

        result.Should().NotBeNull();
        result.Email.Should().Be("email@test.com");
        repoMock.Verify(r => r.AddAsync(It.IsAny<User>()), Times.Once);
    }
}
