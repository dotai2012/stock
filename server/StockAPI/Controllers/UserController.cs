using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using StockAPI.Models;

namespace StockAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StockContext _context;
        private IConfiguration _config;

        public UserController(StockContext context, IConfiguration config)
        {
            _context = context;
            _config = config; 
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
         Roles = "Admin,Manager")]
        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        // For example:
        // http://localhost:<port #>/api/User/1

        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(long id)
        {
            var item = _context.Users.FirstOrDefault(t => t.Id == id.ToString());
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public JObject Create([FromBody]User user)
        {
            dynamic jsonResponse = new JObject();

      
            var tokenString = GenerateJSONWebToken(user);
            jsonResponse.token = tokenString;
            jsonResponse.status = "OK";
            return jsonResponse;
        }

        [HttpPut]
        [Route("MyEdit")] // Custom route
        public IActionResult GetByParams([FromBody]User user)
        {
            var item = _context.Users.Where(t => t.Id == user.Id).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                item.Name = user.Name;
                item.Password = user.Password;
                item.Email = user.Email;
                _context.SaveChanges();
            }
            return new ObjectResult(item);
        }

        [HttpDelete]
        [Route("MyDelete")] // Custom route
        public IActionResult MyDelete(long Id)
        {
            var item = _context.Users.Where(t => t.Id == Id.ToString()).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }
            _context.Users.Remove(item);
            _context.SaveChanges();
            return new ObjectResult(item);
        }

        string GenerateJSONWebToken(User user)
        {
            var securityKey
                = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials
                = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
      
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}