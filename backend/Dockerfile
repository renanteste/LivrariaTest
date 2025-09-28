FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["src/Livraria.Api/Livraria.Api.csproj", "src/Livraria.Api/"]
COPY ["src/Livraria.Application/Livraria.Application.csproj", "src/Livraria.Application/"]
COPY ["src/Livraria.Domain/Livraria.Domain.csproj", "src/Livraria.Domain/"]
COPY ["src/Livraria.Infrastructure/Livraria.Infrastructure.csproj", "src/Livraria.Infrastructure/"]

RUN dotnet restore "src/Livraria.Api/Livraria.Api.csproj"

COPY . .
WORKDIR "/src/src/Livraria.Api"
RUN dotnet build "Livraria.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Livraria.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["dotnet", "Livraria.Api.dll"]