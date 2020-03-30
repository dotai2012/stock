using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StockAPI.Models
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name  { get; set; }
        [Required]
        [EmailAddress]
        public string Email  { get; set; }
        [Required]
        public byte[] Password { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }

        //Navigation Properties
        //Child Tables
        public virtual ICollection<Stock> Stocks { get; set; }
        public virtual ICollection<Trade> Trades { get; set; }
    }
}