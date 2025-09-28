using Livraria.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Livraria.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users => Set<User>();
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<User>().Property(u => u.Nome).IsRequired().HasMaxLength(150);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
        }
    }
}
