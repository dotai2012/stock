using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StockAPI.Models
{
    public class Stock
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Symbol { get; set; }
        [Required]
        public double Balance { get; set; }
        [Required]
        public int UserId { get; set; }

        //Navigation Properties
        //Parent Tables
        public virtual User User { get; set; }

    }
}