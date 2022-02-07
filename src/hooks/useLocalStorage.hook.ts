import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function getSavedValue(key: string, value: any): any {
  const storageItem = localStorage.getItem(key);
  if (value instanceof Function) return value();
  if (!storageItem) return value;
  return JSON.parse(storageItem);
}

export default function useLocalStorage<S>(key: string, initialState: S|(() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState(() => getSavedValue(key, initialState));
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}
