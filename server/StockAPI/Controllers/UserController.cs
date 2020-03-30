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

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

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

        public class AuthenticationForm
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Type { get; set; }
        }

        //register/login handler 
        //optional login body included here
        [HttpPost]
        public dynamic Create([FromBody]AuthenticationForm form)
        {
            dynamic jsonResponse = new JObject();

            if (form.Email == "" || form.Email == null)
            {
                return BadRequest();
            }

            var uniqueEmail = _context.Users.Count(e => e.Email == form.Email);

            if (form.Type == "login")
            {
                User findUser = _context.Users.FirstOrDefault(u => u.Name == form.Email);
                bool testLogin = ValidateLogin(form.Password, findUser);

                if (testLogin == true)
                {
                    var tokenString = GenerateJSONWebToken(findUser);
                    jsonResponse.token = tokenString;
                    jsonResponse.status = "OK";
                    return jsonResponse;
                }
                else
                {
                    return BadRequest();
                }
            }
            else if(form.Type == "register" && uniqueEmail == 0)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(form.Password, out passwordHash, out passwordSalt);

                User newUser = new User
                {
                    Name = form.Name,
                    Email = form.Email,
                    Password = passwordHash,
                    PasswordSalt = passwordSalt
                };
                _context.Users.Add(newUser);
                _context.SaveChanges();

                var tokenString = GenerateJSONWebToken(newUser);
                jsonResponse.token = tokenString;
                jsonResponse.status = "OK";
                return jsonResponse;
            }

            return "Failed to authenticate, please try again";
        }

        string GenerateJSONWebToken(User user)
        {
            var securityKey
                = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials
                = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti,
                            Guid.NewGuid().ToString()),
                new Claim("userId", user.Id.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //find if name/password exist in DB context.
        bool ValidateLogin(string password, User user)
            {
                return VerifyPasswordHash(password, user.Password, user.PasswordSalt);
            }
        }
    }