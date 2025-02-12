import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PreferencesData, searchPreferencesSchema, SortByEnum, OrderByEnum } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useBreeds } from '@/lib/useBreeds';
import { usePreferencesData } from '@/lib/usePreferencesData';
import { usePreferencesStore } from '@/stores/preferences-store';

const SearchForm = () => {
  const router = useRouter();
  const { buildQueryString } = usePreferencesData();
  const { register, formState, handleSubmit } = useForm<PreferencesData>({
    resolver: zodResolver(searchPreferencesSchema),
  });
  const { storeState, updateStoreState, resetStoreState } = usePreferencesStore();

  const onSubmit = async (data: PreferencesData) => {
    const queryString = buildQueryString(data);
    router.push(queryString);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <pre>FORM STATE: {JSON.stringify(formState, null, 2)}</pre>
      <pre>STORE STATE: {JSON.stringify(storeState, null, 2)}</pre>

      {/* ALL BREEDS */}
      <label className="flex gap-2">
        <input type="checkbox" {...register('all')} />
        All
      </label>

      {/* INDIVIDUAL BREEDS */}
      {/* <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <label className="flex gap-2">
              <input
                type="checkbox"
                {...register(`breedPreferences.${breed}`)}
                className="checkbox"
              />
              <span className="capitalize">{breed.toLowerCase()}</span>
            </label>
          </li>
        ))}
      </ul> */}
      {/* MIN AGE */}
      <label className="flex gap-2">
        Min Age:
        <input type="number" {...register('minAge')} />
      </label>
      {/* MAX AGE */}
      <label className="flex gap-2">
        Max Age:
        <input type="number" {...register('maxAge')} />
      </label>

      {/* SORT BY */}
      <label className="flex gap-2">
        Sort By:
        <select {...register('sortBy')} className="capitalize">
          {Object.values(SortByEnum.enum).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {/* ORDER BY */}
      <div className="flex flex-col gap-2">
        <span>Order By:</span>
        <div className="flex gap-4">
          {Object.values(OrderByEnum.enum).map((value) => (
            <label key={value} className="flex items-center gap-2 capitalize">
              <input type="radio" {...register('orderBy')} value={value} />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        className="flex rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        type="submit"
      >
        Find My Perfect Dog
      </button>

      {/* RESET */}
      <button
        className="flex rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        type="button"
      >
        Clear Form
      </button>
    </form>
  );
};

export default SearchForm;
