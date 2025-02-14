import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SearchResults } from "@/models";

interface PaginationProps {
  searchResults: SearchResults;
}

const Pagination = ({ searchResults }: PaginationProps) => {
  const { next, total } = searchResults;
  const cleanNext = next?.replace("/dogs", "");
  const searchParams = useSearchParams();

  const pageSize = 25;
  const totalPages = Math.ceil(total / pageSize);
  
  // Calculate current page from URL params
  const currentFrom = parseInt(searchParams.get("from") || "0", 10);
  const currentPage = Math.floor(currentFrom / pageSize);

  return (
    <nav aria-label="Search results pagination">
      <ul className="flex flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const from = index * pageSize;
          const pageUrl = cleanNext ? cleanNext.replace(/from=\d+/, `from=${from}`) : `/search?from=${from}`;
          const isActive = currentPage === index;

          return (
            <li key={index}>
              <Link 
                href={pageUrl}
                className={`px-1 py-1 rounded-md ${
                  isActive 
                    ? "bg-blue-500 text-white font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {index + 1}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;