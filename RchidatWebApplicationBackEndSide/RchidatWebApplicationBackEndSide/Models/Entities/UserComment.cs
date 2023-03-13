namespace RchidatWebApplicationBackEndSide.Models.Entities
{
    public class UserComment
    {
        public int IDComment { get; set; }
        public int IDUser { get; set; }
        public string Description { get; set; }
        public int Star { get; set; }
        public DateTime CommentDate { get; set; }=DateTime.Now;
        public bool State { get; set; } = true;
    }
}
