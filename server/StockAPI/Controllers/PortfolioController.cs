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
    public class PortfolioController : ControllerBase
    {
        private readonly StockContext _context;

        public PortfolioController(StockContext context)
        {
            _context = context;
        }

        public class Performance
        {
            public double Total { get; set; }
            public DateTime Date { get; set; }
        }

        // GET: api/Portfolio
        [HttpGet]
        public ActionResult<IEnumerable<Performance>> GetPortfolio()
        {
            List<Performance> portfolio = new List<Performance>();

            // TODO: replace with JWT user id
            var trades = _context.Trades.Where(t => t.UserId == 1).GroupBy(t => t.Date.Date);

            foreach (var trade in trades)
            {
                double totalWorth = 0;

                foreach (var item in trade)
                {
                    if (item.Type == "buy")
                    {
                        totalWorth += item.Price * item.Quantity;
                    } else
                    {
                        totalWorth -= item.Price * item.Quantity;
                    }
                }

                Performance newPerformance = new Performance
                {
                    Total = totalWorth,
                    Date = DateTime.Now,
                };

                portfolio.Add(newPerformance);
            }

            return portfolio;
        }
    }
}
