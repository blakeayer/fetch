import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PreferencesData, searchPreferencesSchema, SortByEnum, OrderByEnum } from '@/models';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBreeds } from '@/lib/useBreeds';
import { usePreferencesData } from '@/lib/usePreferencesData';
import { usePreferencesStore, defaultFormState } from '@/stores/preferences-store';

const SearchForm = () => {
  const router = useRouter();
  const { data: breeds } = useBreeds();
  const { buildQueryString } = usePreferencesData();
  const { storeState, updateStoreState, resetStoreState, initializeBreedPreferences } =
    usePreferencesStore();
  const [syncedState, setSyncedState] = useState<Partial<PreferencesData>>(storeState);

  // Sync form state with store state
  useEffect(() => {
    setSyncedState(storeState);
  }, [storeState]);

  // Initialize breed preferences when breeds data is loaded, but only if they haven't been initialized yet
  useEffect(() => {
    if (breeds && (!storeState.breedPreferences || Object.keys(storeState.breedPreferences).length === 0)) {
      initializeBreedPreferences(breeds);
    }
  }, [breeds, initializeBreedPreferences, storeState.breedPreferences]);

  const { register, handleSubmit, reset, setValue, getValues } = useForm<PreferencesData>({
    resolver: zodResolver(searchPreferencesSchema),
    defaultValues: syncedState,
  });

  const onSubmit = async (data: PreferencesData) => {
    console.log('formData: ', data);
    const queryString = buildQueryString(data);
    updateStoreState(data);
    router.push(`/search?${queryString}`);
  };

  const handleReset = () => {
    if (breeds) {
      const freshDefaultState = {
        ...defaultFormState,
        breedPreferences: breeds.reduce(
          (acc, breed) => ({
            ...acc,
            [breed]: false,
          }),
          {}
        ),
      };
      resetStoreState();
      reset(freshDefaultState);
      updateStoreState(freshDefaultState);
      router.push('/search');
    }
  };

  const handleAllChange = (checked: boolean) => {
    if (checked) {
      // When All is checked, uncheck all breeds
      const currentBreedPreferences = getValues('breedPreferences');
      const newBreedPreferences = Object.keys(currentBreedPreferences || {}).reduce(
        (acc, breed) => ({
          ...acc,
          [breed]: false,
        }),
        {}
      );
      setValue('breedPreferences', newBreedPreferences, { shouldDirty: true });
    }
  };

  const handleBreedChange = (breed: string, checked: boolean) => {
    setValue(`breedPreferences.${breed}` as `breedPreferences.${string}`, checked, { shouldDirty: true });

    if (checked) {
      // When any breed is checked, uncheck All
      setValue('all', false, { shouldDirty: true });
    } else {
      // When unchecking a breed, check if it was the last one
      const currentBreedPreferences = getValues('breedPreferences');
      const hasCheckedBreeds = Object.values(currentBreedPreferences || {}).some(v => v);

      // If no breeds are checked, turn All back on
      if (!hasCheckedBreeds) {
        setValue('all', true, { shouldDirty: true });
      }
    }
  };

  return (
    <form aria-labelledby="form-heading" className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <h2 id="form-heading" className="text-2xl font-bold text-center">Search Preferences</h2>
      <p>Breeds:</p>
      {/* ALL BREEDS */}
      <label className="flex gap-2 items-center" htmlFor="all">
        <input
          id="all"
          type="checkbox"
          {...register('all')}
          onChange={(e) => handleAllChange(e.target.checked)}
          className="checkbox w-4 h-4 cursor-pointer"
        />
        All
      </label>

      {/* INDIVIDUAL BREEDS */}
      <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {breeds?.map((breed) => (
          <li key={breed}>
            <label className="flex gap-2 items-center" htmlFor={breed}>
              <input
                id={breed}
                type="checkbox"
                {...register(`breedPreferences.${breed}`)}
                className="checkbox w-4 h-4 cursor-pointer"
                onChange={(e) => handleBreedChange(breed, e.target.checked)}
              />
              <span className="capitalize">{breed.toLowerCase()}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* MIN AGE */}
      <label className="flex gap-2 items-center">
        Min Age:
        <input
          type="number"
          {...register('minAge', { valueAsNumber: true })}
          className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg"
        />
      </label>

      {/* MAX AGE */}
      <label className="flex gap-2 items-center">
        Max Age:
        <input
          type="number"
          {...register('maxAge', { valueAsNumber: true })}
          className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg"
        />
      </label>

      {/* SORT BY */}
      <label className="flex gap-2 items-center">
        Sort By:
        <select {...register('sortBy')} className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg capitalize">
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
            <label htmlFor={value} key={value} className="flex items-center gap-2 capitalize">
              <input
              id={value}
                className="bg-slate-100 hover:bg-slate-300 text-slate-800 font-bold py-2 px-4 rounded-lg cursor-pointer"
                type="radio"
                {...register('orderBy')}
                value={value}
              />
              {value}
            </label>
          ))}
        </div>
      </div>

      {/* SUBMIT */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4"
        type="submit"
      >
        Find My Perfect Dog
      </button>

      {/* RESET */}
      <button
        type="button"
        onClick={handleReset}
        className="flex rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        Clear Form
      </button>
    </form>
  );
};

export default SearchForm;
