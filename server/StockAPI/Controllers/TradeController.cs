using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockAPI.Models;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    //     public TodoController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor) {
    //     _context = context;
    //     var bearer = httpContextAccessor.HttpContext.Request.Headers["Authorization"];
    //     var handler = new JwtSecurityTokenHandler();
    //     var token = handler.ReadJwtToken(bearer.ToString().Replace("Bearer " , ""));
    //     _email = token.Subject;
    // }

    public class TradeController : ControllerBase
    {
        private readonly StockContext _context;

        public TradeController(StockContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Trade> GetAll()
        {
            return _context.Trades.ToList();
        }

        [HttpPost]
        public IActionResult Create([FromBody]Trade trade)
        {
            if (trade.Type == "" || trade.Type == null)
            {
                return BadRequest();
            }


            // TODO: replace with JWT user id
            int userId = 1;

            Stock stock = _context.Stocks.SingleOrDefault(s => s.Symbol == trade.Symbol && s.UserId == userId);
            double balance = stock == null ? 0 : stock.Balance;

            if (stock != null)
            {
                if (trade.Type == "buy")
                {
                    stock.Balance += trade.Quantity;
                } else if (trade.Type == "sell" && stock.Balance >= trade.Quantity)
                {
                    stock.Balance -= trade.Quantity;
                } else
                {
                    return StatusCode(400, "You can't sell the amount that > the available balance");
                }
            } else if (trade.Type == "buy")
            {
                Stock newStock = new Stock
                {
                    Symbol = trade.Symbol,
                    Balance = trade.Quantity,
                    UserId = userId
                };

                _context.Stocks.Add(newStock);
            } else
            {
                return StatusCode(400, $"You don't have any {trade.Symbol}");
            }


            if (trade.Type == "buy" || (trade.Type == "sell" && balance != 0))
            {
                Trade newTrade = new Trade
                {
                    Price = trade.Price,
                    Quantity = trade.Quantity,
                    Symbol = trade.Symbol,
                    Type = trade.Type,
                    Date = DateTime.Now,
                    UserId = userId
                };

                _context.Trades.Add(newTrade);
                _context.SaveChanges();

                return new ObjectResult(newTrade);

            }
            else
            {
                return StatusCode(400, $"You don't have any {trade.Symbol}");
            }
        }
    }
}