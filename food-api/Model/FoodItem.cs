using System;

namespace FoodApi
{
    public class FoodItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string Code { get; set; }
        public DateTime Date { get; set; }
    }
}