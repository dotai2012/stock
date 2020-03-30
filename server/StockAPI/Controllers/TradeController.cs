using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

    public class TradeController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly int _userId;

        public TradeController(StockContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;

            var bearer = httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(bearer.ToString().Replace("Bearer " , ""));
            _userId = int.Parse(token.Id);
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

            Stock stock = _context.Stocks.SingleOrDefault(s => s.Symbol == trade.Symbol && s.UserId == _userId);
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
                    UserId = _userId
                };

                _context.Stocks.Add(newStock);
            } else
            {
                return StatusCode(400, $"You don't have any {trade.Symbol}");
            }


            if (trade.Type == "buy" || (trade.Type == "sell" && balance > 0 && trade.Quantity <= balance))
            {
                Trade newTrade = new Trade
                {
                    Price = trade.Price,
                    Quantity = trade.Quantity,
                    Symbol = trade.Symbol,
                    Type = trade.Type,
                    Date = DateTime.Now,
                    UserId = _userId
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