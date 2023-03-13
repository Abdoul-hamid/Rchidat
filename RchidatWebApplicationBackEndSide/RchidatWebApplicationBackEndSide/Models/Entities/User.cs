namespace RchidatWebApplicationBackEndSide.Models.Entities
{
    public class User
    {
        public int IDUser { get; set; }
        public string FirstName {get; set;}
        public string LastName { get;set;}
        public string Email { get;set;}
        public string Password { get;set;}
        public string Phone { get;set;}
        public string? Gender { get;set;}
        public string? City { get;set;}
        public string? Country { get;set;}
        public string? ImageUser { get;set;}
        public DateTime CreatedAt { get;set;} = DateTime.Now;
        public DateTime ModifiedAt { get; set; } = DateTime.Now;
        public string? FullAddress { get;set;}
        public string Role { get; set; } = "Client";
        public bool State { get; set; } =true;
        public bool Status { get;set;}=false;

    }
}
