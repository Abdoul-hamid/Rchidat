namespace RchidatWebApplicationBackEndSide.Models.Entities
{
    public class Article
    {
        public int IDArticle { get; set; }

        public int IDCatalog { get; set; }

        public string Designation { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public string ImageArticle { get; set; }

        public int MinStock { get; set; }

        public int MaxStock { get; set; }

        public int Quantity { get; set; }

        public DateTime ExpireDate { get; set; }

        public float ReductionRate { get; set; }

        public float LastPrice { get; set; }
        public bool State { get; set; } = true;

    }
}
