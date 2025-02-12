import { useFormContext } from 'react-hook-form';
import { PreferencesData } from '@/models';
import useBreedsCheckbox from '@/lib/useBreedsCheckbox';

interface BreedSelectionSectionProps {
  breeds: string[];
}

export default function BreedSelectionSection({ breeds }: BreedSelectionSectionProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<PreferencesData>();
  const { selectedBreeds, allChecked, handleCheckboxChange, handleAllChange } = useBreedsCheckbox(
    breeds,
    watch,
    setValue
  );
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div>
        <h3>Available Dog Breeds</h3>
        <p>Select all breeds you&apos;re interested in:</p>
      </div>

      <ul className='grid grid-cols-4 gap-2 w-full'>
        <li>
          <label className='flex gap-2'>
            <input
              type="checkbox"
              {...register('all')}
              checked={allChecked}
              onChange={(e) => handleAllChange(e.target.checked)}
            />
            All
          </label>
        </li>

        {breeds.map((breed) => (
          <li key={breed}>
            <label className='flex gap-2'>
              <input
                type="checkbox"
                {...register(`breedPreferences.${breed}`)}
                className="checkbox"
                checked={selectedBreeds[breed] ?? false}
                onChange={(e) => handleCheckboxChange(breed, e.target.checked)}
              />
              <span className='capitalize'>{breed.toLowerCase()}</span>
            </label>
          </li>
        ))}
      </ul>

      {errors.breedPreferences && <span>Please select at least one breed</span>}
    </div>
  );
}
