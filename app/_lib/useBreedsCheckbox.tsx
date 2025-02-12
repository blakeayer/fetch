// Used to handle breeds preferences form state
import { useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

const useBreedsCheckbox = (
  dataBreeds: string[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
) => {
  // ✅ Separate state for "All" checkbox to avoid unnecessary re-renders
  const [allChecked, setAllChecked] = useState(true);

  // ✅ Ensure initial state is defined once breeds are loaded
  const [selectedBreeds, setSelectedBreeds] = useState<Record<string, boolean>>({});

  // TODO: Use queries to persist checked state between page loads
  useEffect(() => {
    if (dataBreeds) {
      const initialState = dataBreeds.reduce((acc, breed) => ({ ...acc, [breed]: false }), {});
      setSelectedBreeds(initialState);
    }
  }, [dataBreeds]); // Runs only when dataBreeds changes

  useEffect(() => {
    if (!dataBreeds) return;

    const isAnyChecked = Object.values(selectedBreeds).some(Boolean);

    // Ensures that if All is checked, Any is unchecked (and vice versa).
    if (allChecked !== !isAnyChecked) {
      setAllChecked(!isAnyChecked);
      setValue('all', !isAnyChecked);
    }
  }, [selectedBreeds, dataBreeds, setValue, allChecked]); // Dependencies are stable

  const handleCheckboxChange = (breed: string, checked: boolean) => {
    setValue(breed, checked);
    setSelectedBreeds((prev) => ({
      ...prev,
      [breed]: checked,
    }));
  };

  const handleAllChange = (checked: boolean) => {
    setAllChecked(checked);
    setValue('all', checked);

    if (dataBreeds) {
      const updatedState = dataBreeds.reduce((acc, breed) => ({ ...acc, [breed]: false }), {});
      setSelectedBreeds(updatedState);
      dataBreeds.forEach((breed) => setValue(breed, false));
    }
  };

  return { selectedBreeds, allChecked, handleCheckboxChange, handleAllChange };
};

export default useBreedsCheckbox;
