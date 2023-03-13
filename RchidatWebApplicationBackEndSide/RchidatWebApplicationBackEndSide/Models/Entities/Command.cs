using System.Data;

namespace RchidatWebApplicationBackEndSide.Models.Entities
{
    public class Command
    {
        public int IDCommand { get; set; }
        public int IDUser { get; set; }
        public DateTime CommandDate { get; set; } = DateTime.Now;
        public string State { get; set; } = "Traitement en cours";
    }
}
