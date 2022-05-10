using System.Collections.Generic;

namespace PlaceholderAPI.Models
{
    public class ResponseDTO
    {
        public IEnumerable<Photo> Photos { get; set; }

        public string Query { get; set; }

        public int NumbersFound { get; set; }

        public int ItemsPerPage { get; set; }

        public int From { get; set; }   
    }
}
