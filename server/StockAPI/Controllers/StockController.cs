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
    public class StockController : ControllerBase
    {

        private readonly StockContext _context;

        public StockController(StockContext context)
        {
            _context = context;
        }

        // GetAll() is automatically recognized as
        // http://localhost:<port #>/api/Stock
        [HttpGet]
        public IEnumerable<Stock> GetAll()
        {
            return _context.Stocks.ToList();
        }

        // GetById() is automatically recognized as
        // http://localhost:<port #>/api/Stock/{id}

        // For example:
        // http://localhost:<port #>/api/Stock/1

        [HttpGet("{id}", Name = "GetStock")]
        public IActionResult GetById(long id)
        {
            var item = _context.Stocks.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Stock stock)
        {
            if ( stock.Symbol == "" || stock.Symbol==null)
            {
                return BadRequest();
            }
            _context.Stocks.Add(stock);
            _context.SaveChanges();
            return new ObjectResult(stock);
        }

        [HttpPut]
        [Route("MyEdit")] // Custom route
        public IActionResult GetByParams([FromBody]Stock stock)
        {
            var item = _context.Stocks.Where(t => t.Id == stock.Id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                item.Symbol = stock.Symbol;
                _context.SaveChanges();
            }
            return new ObjectResult(item);
        }

        [HttpDelete]
        [Route("MyDelete")] // Custom route
        public IActionResult MyDelete(long Id)
        {
            var item = _context.Stocks.Where(t => t.Id == Id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            _context.Stocks.Remove(item);
            _context.SaveChanges();
            return new ObjectResult(item);
        }




    }
}