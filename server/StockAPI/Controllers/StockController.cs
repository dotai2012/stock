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
    }
}