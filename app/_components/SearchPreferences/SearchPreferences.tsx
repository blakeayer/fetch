import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { PreferencesData, SortByEnum, OrderByEnum } from '@/models';
import BreedPreferences from './sections/BreedPreferences';
import { useBreeds } from '@/lib/useBreeds';
import { usePreferencesData } from '@/lib/usePreferencesData';

const SearchPreferences = () => {
  const router = useRouter();
  const { data, isLoading, error } = useBreeds();
  const { buildQueryString } = usePreferencesData();
  const methods = useForm<PreferencesData>({
    defaultValues: {
      sortBy: 'breed',
      orderBy: 'asc',
    },
  });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: PreferencesData) => {
    console.log('data: ', data);
    const queryString = buildQueryString(data);
    router.push(queryString);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        {data && <BreedPreferences breeds={data ?? []} />}
        {isLoading && <div>Loading breeds...</div>}
        {error && <div>Error loading breeds. Please try again later.</div>}

        <label className="flex gap-2">
          Min Age:
          <input type="number" {...register('minAge')} />
        </label>

        <label className="flex gap-2">
          Max Age:
          <input type="number" {...register('maxAge')} />
        </label>

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

        <div className="flex flex-col gap-2">
          <span>Order By:</span>
          <div className="flex gap-4">
            {Object.values(OrderByEnum.enum).map((value) => (
              <label key={value} className="flex items-center gap-2 capitalize">
                <input
                  type="radio"
                  {...register('orderBy')}
                  value={value}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <button
          className="flex rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          type="submit"
        >
          Find My Perfect Dog
        </button>
      </form>
    </FormProvider>
  );
};

export default SearchPreferences;
