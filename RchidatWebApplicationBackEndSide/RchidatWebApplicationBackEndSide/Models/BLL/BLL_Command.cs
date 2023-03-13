using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_Command
    {
        public static int Add(Command command) => DAL_Command.Add(command);
        public static void Delete(int id) => DAL_Command.Delete(id);
        public static Command Get(int id) => DAL_Command.SelectById(id);
        public static List<Command> Get() => DAL_Command.SelectAll();
    }
}
