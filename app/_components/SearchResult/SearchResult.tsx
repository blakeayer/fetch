import React from 'react';
import Image from 'next/image';
import { Dog } from '@/models';

const SearchResult = ({ result }: { result: Dog }) => {
  return (
    <div className="p-5">
      <div className="relative h-48 w-full">
        <Image
          fill
          src={result.img}
          alt={result.name}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <div>Name: {result.name}</div>
        <div>Age: {result.age}</div>
        <div>Breed: {result.breed}</div>
        <div>Zip Code: {result.zip_code}</div>
      </div>
    </div>
  );
};

export default SearchResult;
