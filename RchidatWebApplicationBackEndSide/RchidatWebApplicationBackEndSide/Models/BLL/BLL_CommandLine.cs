using RchidatWebApplicationBackEndSide.Models.DAL;
using RchidatWebApplicationBackEndSide.Models.Entities;

namespace RchidatWebApplicationBackEndSide.Models.BLL
{
    public class BLL_CommandLine
    {
        public static void Add(CommandLine commandLine) => DAL_CommandLine.Add(commandLine);
        public static void Update(int id1,int id2,CommandLine commandLine) => DAL_CommandLine.Update(id1,id2,commandLine);
        public static void Delete(int id1,int id2) => DAL_CommandLine.Delete(id1,id2);
        public static CommandLine Get(int id1, int id2) => DAL_CommandLine.SelectById(id1,id2);
        public static List<CommandLine> Get() => DAL_CommandLine.SelectAll();
    }
}
