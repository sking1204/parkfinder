import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {

    const readFromStorage = () => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialValue

        } catch(error) {
            console.error("Error reading from localStorage:", error);
            return initialValue;
        }
    }

    const [storedValue, setStoredValue] = useState(() => readFromStorage());

    const writeToStorage = (value) => {
  
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
    
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch(error) {
            console.error("Error writing to localStorage:", error);
        }
    }

    return [storedValue, writeToStorage];
};

export default useLocalStorage;





