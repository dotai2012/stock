using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockAPI.Models;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        // For example:
        // http://localhost:<port #>/api/Trade/1

        [HttpGet("{id}", Name = "GetTrade")]
        public IActionResult GetById(long id)
        {
            var item = _context.Trades.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Trade trade)
        {
            if (trade.Type == "" || trade.Type == null)
            {
                return BadRequest();
            }
            _context.Trades.Add(trade);
            _context.SaveChanges();
            return new ObjectResult(trade);
        }

        [HttpPut]
        [Route("MyEdit")] // Custom route
        public IActionResult GetByParams([FromBody]Trade trade)
        {
            var item = _context.Trades.Where(t => t.Id == trade.Id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                item.Type = trade.Type;
                item.Price = trade.Price;
                item.Quantity = trade.Quantity;
                _context.SaveChanges();
            }
            return new ObjectResult(item);
        }

        [HttpDelete]
        [Route("MyDelete")] // Custom route
        public IActionResult MyDelete(long Id)
        {
            var item = _context.Trades.Where(t => t.Id == Id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            _context.Trades.Remove(item);
            _context.SaveChanges();
            return new ObjectResult(item);
        }
    }
}