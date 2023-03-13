namespace RchidatWebApplicationBackEndSide.Models.Entities
{
    public class UserCommentMC
    {
        public int IDComment { get; set; }
        public int IDUser { get; set; }
        public string Description { get; set; }
        public int Star { get; set; }
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUser { get; set; }
    }
}
