// Used to build query string based on preferences data
import { PreferencesData } from '@/models';

export function usePreferencesData() {
  // Function to build query string from formData
  const buildQueryString = (formData: PreferencesData): string => {
    const queryParts: string[] = [];

    // Check sort order (orderBy and sortBy)
    if (formData.sortBy && formData.orderBy) {
      queryParts.push(`sort=${formData.sortBy}%3A${formData.orderBy.toLowerCase()}`);
    }

    // Check minAge and maxAge
    if (formData.minAge) {
      queryParts.push(`ageMin=${formData.minAge}`);
    }
    if (formData.maxAge) {
      queryParts.push(`ageMax=${formData.maxAge}`);
    }

    // If 'all' is not true, process breedPreferences
    if (!formData.all && formData.breedPreferences) {
      // Loop through the breedPreferences object
      Object.keys(formData.breedPreferences).forEach((breed) => {
        const isChecked = formData.breedPreferences[breed];

        // If the breed is selected (checked), add it to the query string
        if (isChecked) {
          const formattedBreed = breed.replace(/ /g, '+'); // Replace spaces with "+"
          queryParts.push(`breeds=${formattedBreed}`);
        }
      });
    }

    return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  };

  return {
    buildQueryString, // Export the function for use in React components
  };
}
