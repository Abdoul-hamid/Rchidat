using Microsoft.Data.SqlClient;
using System.Data;

namespace RchidatWebApplicationBackEndSide.Utilities
{
    public class DataBaseAccessUtilities
    {
        public static int NonQueryRequest(SqlCommand MyCommand)
        {
            try
            {
                try
                {
                    MyCommand.Connection.Open();
                }
                catch (SqlException e)
                {
                    throw new MyException(e, "DataBase Error", e.Message, "DAL");
                }

                return MyCommand.ExecuteNonQuery();
            }
            catch (SqlException e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                MyCommand.Connection.Close();
            }
        }
        public static int NonQueryRequest(SqlConnection Cnn, string SqlResquet)
        {
            try
            {
                try
                {
                    Cnn.Open();
                    SqlCommand cmd = new SqlCommand(SqlResquet, Cnn);
                    return cmd.ExecuteNonQuery();
                }
                catch (SqlException e)
                {
                    throw new MyException(e, "DataBase Error", e.Message, "DAL");
                }
            }
            catch (Exception e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                Cnn.Close();
            }
        }
        public static object ScalarRequest(SqlCommand MyCommand)
        {
            try
            {
                try
                {
                    MyCommand.Connection.Open();
                }
                catch (SqlException e)
                {
                    throw new MyException(e, "DataBase Error", e.Message, "DAL");
                }

                return MyCommand.ExecuteScalar();
            }
            catch (SqlException e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                MyCommand.Connection.Close();
            }
        }
        public static object ScalarRequest(string StrRequest, SqlConnection MyConnection)
        {
            try
            {
                try
                {
                    MyConnection.Open();
                }
                catch (SqlException e)
                {
                    throw new MyException(e, "DataBase Error", e.Message, "DAL");
                }
                SqlCommand MyCommand = new SqlCommand(StrRequest, MyConnection);

                return MyCommand.ExecuteScalar();
            }
            catch (SqlException e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                MyConnection.Close();
            }
        }


        public static DataTable SelectRequest(SqlCommand MyCommand)
        {
            try
            {
                DataTable Table;
                SqlDataAdapter SelectAdapter = new SqlDataAdapter(MyCommand);
                Table = new DataTable();
                SelectAdapter.Fill(Table);
                return Table;
            }
            catch (SqlException e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                MyCommand.Connection.Close();
            }
        }
        public static DataTable SelectRequest(string StrSelectRequest, SqlConnection MyConnection)
        {
            try
            {
                DataTable Table;
                SqlCommand SelectCommand = new SqlCommand(StrSelectRequest, MyConnection);
                SqlDataAdapter SelectAdapter = new SqlDataAdapter(SelectCommand);
                Table = new DataTable();
                SelectAdapter.Fill(Table);
                return Table;
            }
            catch (SqlException e)
            {
                throw new MyException(e, "DataBase Error", e.Message, "DAL");
            }
            finally
            {
                MyConnection.Close();
            }
        }


        public static void ShowRequest(SqlCommand Cmd)
        {
            String ListPar = "\t\t****Texte de la Requete****\n";
            ListPar += Cmd.CommandText + "\n";
            ListPar += "\t\t****Liste des parmêtres : ****\n";
            foreach (SqlParameter Param in Cmd.Parameters)
            {
                ListPar += Param.ParameterName + "\t:\t\"" + Param.Value.ToString() + "\"\t:\t" + Param.DbType.ToString() + "\n";
            }
        }

        public static bool CheckFieldValueExistence(string TableName, string FieldName, SqlDbType FieldType, object FieldValue, SqlConnection MyConnection)
        {
            try
            {
                string StrRequest = "SELECT COUNT(" + FieldName + ") FROM " + TableName + " WHERE ((" + FieldName + " = @" + FieldName + ")";
                StrRequest += "OR ( (@" + (FieldName + 1).ToString() + " IS NULL)AND (" + FieldName + " IS NULL)))";
                SqlCommand Command = new SqlCommand(StrRequest, MyConnection);
                Command.Parameters.Add("@" + FieldName, FieldType).Value = FieldValue;
                Command.Parameters.Add("@" + FieldName + 1, FieldType).Value = FieldValue;
                return ((int)DataBaseAccessUtilities.ScalarRequest(Command) != 0);
            }
            catch (SqlException e)
            {
                throw new MyException(e, "Query Execution Error", e.Message, "DAL");
            }
            finally
            {
                MyConnection.Close();
            }

        }

        public static object GetMaxFieldValue(SqlConnection MyConnection, string TableName, string FieldName)
        {
            try
            {
                string StrMaxRequest = "SELECT MAX(" + FieldName + ") FROM " + TableName;

                SqlCommand Command = new SqlCommand(StrMaxRequest, MyConnection);
                return (ScalarRequest(Command));

            }
            catch (SqlException e)
            {
                throw new MyException(e, "Query Execution Error", e.Message, "DAL");
            }
            finally
            {
                MyConnection.Close();
            }
        }
    }
    public sealed class MyException : Exception
    {
        string _Level;
        string _MyExceptionTile;
        string _MyExceptionMessage;
        public string Level
        {
            get { return this._Level; }
        }
        public string MyExceptionTitle
        {
            get { return this._MyExceptionTile; }
        }
        public string MyExceptionMessage
        {
            get { return this._MyExceptionMessage; }
        }
        public MyException(string ExceptionTitle, string ExceptionMessage, string Level) : base(ExceptionMessage)
        {
            this._MyExceptionTile = ExceptionTitle;
            this._MyExceptionMessage = ExceptionMessage;
            this._Level = Level;
        }
        public MyException(Exception e, string ExceptionTitle, string ExceptionMessage, string Level) : base(e.Message)
        {
            this._MyExceptionTile = ExceptionTitle;
            this._MyExceptionMessage = ExceptionMessage;
            this._Level = Level;
        }
    }
}
