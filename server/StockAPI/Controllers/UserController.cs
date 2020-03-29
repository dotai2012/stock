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
        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        // For example:
        // http://localhost:<port #>/api/User/1
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetById(long id)
        {
            var item = _context.Users.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        //register/login handler 
        //optional login body included here
        [HttpPost]
        public dynamic Create([FromBody]User user)
        {
            dynamic jsonResponse = new JObject();

            if (user.Name == "" || user.Name == null) 
            {
                return BadRequest();
            }

            //if from the client this key has been set to true, we assume they want to login, and we execute this logic.
            //if not, we treat this as a new post requst to register (generate) a user.
            // on the client, this register post request must be set to false as the default...

            if (user.Validate == true)
            {
                bool testLogin = ValidateLogin(user);
                if (testLogin == true)
                 {
                var tokenString = GenerateJSONWebToken(user);
                jsonResponse.token = tokenString;
                jsonResponse.status = "OK";
                return jsonResponse;
                } else {
                    return BadRequest();
                }
            } 
            else
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                new ObjectResult(user);
                var tokenString = GenerateJSONWebToken(user);
                jsonResponse.token = tokenString;
                jsonResponse.status = "OK";
                return jsonResponse;
            }
        }

        [HttpDelete]
        [Route("MyDelete")] // Custom route
        public IActionResult MyDelete(long Id)
        {
            var item = _context.Users.Where(t => t.Id == Id).FirstOrDefault();
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

        //find if name/password exist in DB context.
        bool ValidateLogin(User user)
        {
           var item = _context.Users.FirstOrDefault(t => t.Name == user.Name && t.Password == user.Password);
             if (item == null)
              {
               return false;
              }

            return true;
            }

        }
    }