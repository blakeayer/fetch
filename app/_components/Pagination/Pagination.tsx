import React from "react";
import Link from "next/link";

import { SearchResults } from "@/models";

interface PaginationProps {
  searchResults: SearchResults;
}

const Pagination = ({ searchResults }: PaginationProps) => {
  const { next, total } = searchResults;
  const cleanNext = next?.replace("/dogs", "");

  const pageSize = 25;
  const totalPages = Math.ceil(total / pageSize);

  const urlParams = new URLSearchParams(next?.split("?")[1]);
  const fromValue = parseInt(urlParams.get("from") || "0", 10);
  const currentPage = fromValue / pageSize;

  const urls = next?.split("&");

  return (
    <nav>
    <ul className="flex flex-wrap gap-2">
      {Array.from({ length: totalPages }, (_, index) => {
        const from = index * pageSize;
        const pageUrl = cleanNext ? cleanNext.replace(/from=\d+/, `from=${from}`) : `/search?from=${from}`;

        return (
          <li key={index}>
            <Link href={pageUrl}>{index + 1}</Link>
          </li>
        );
      })}
    </ul>
  </nav>
  );
};

export default Pagination;