using Microsoft.EntityFrameworkCore.Migrations;

namespace StockAPI.Migrations
{
    public partial class AddedUserValidateProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Validate",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Validate",
                table: "Users");
        }
    }
}
