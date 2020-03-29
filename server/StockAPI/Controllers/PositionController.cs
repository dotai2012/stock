using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockAPI.Models;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly StockContext _context;

        public PositionController(StockContext context)
        {
            _context = context;
        }

        public class Position
        {
            public string Symbol { get; set; }
            public double Price { get; set; }
            public double Quantity { get; set; }
        }

        // GET: api/position
        [HttpGet]
        public ActionResult<IEnumerable<Position>> GetPositions()
        {
            List<Position> positions = new List<Position>();

            // TODO: replace with JWT user id
            var trades = _context.Trades.Where(t => t.UserId == 1).GroupBy(t => t.Symbol);

            foreach (var trade in trades)
            {
                double totalPrice = 0;
                double totalQuantity = 0;

                foreach (var item in trade)
                {
                    if (item.Type == "buy")
                    {
                        totalQuantity += item.Quantity;
                    } else
                    {
                        totalQuantity -= item.Quantity;
                    }
                    totalPrice += item.Price;
                }

                if (totalQuantity > 0)
                {
                    Position newPosition = new Position {
                        Symbol = trade.Key,
                        Price = totalPrice / trade.Count(),
                        Quantity = totalQuantity
                    };

                    positions.Add(newPosition);
                }
            }

            return positions;
        }

    }
}
