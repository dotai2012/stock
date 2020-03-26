using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockAPI.Models
{
   
    public class StockContext : DbContext
    {
        public StockContext(DbContextOptions<StockContext> options) : base(options) { }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Trade> Trades { get; set; }
        public DbSet<User> Users { get; set; }

        // override of parent DbContext's virtual method.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define bridge table's  primary key.
            modelBuilder.Entity<User>()
                .HasKey(tp => new { tp.Id });

            //// Define bridge table's foreign keys.
            //modelBuilder.Entity<User>()
            //  .HasOne(tp => tp.Stocks)
            //  .WithMany(tp => tp.User)
            //  .HasForeignKey(fk => new { fk.UserId });
            // // .OnDelete(DeleteBehavior.Restrict);  Prevent cascade delete

            //modelBuilder.Entity<User>()
            //  .HasOne(tp => tp.Trades)
            //  .WithMany(tp => tp.User)
            //  .HasForeignKey(fk => new { fk.UserId });
            ////.OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete
        }





    }
}
