using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockAPI.Models;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class PortfolioController : ControllerBase
    {
        private readonly StockContext _context;
        private readonly int _userId;

        public PortfolioController(StockContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;

            var bearer = httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(bearer.ToString().Replace("Bearer " , ""));
            _userId = int.Parse(token.Id);
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

            var trades = _context.Trades.Where(t => t.UserId == _userId).GroupBy(t => t.Date.Date);

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
