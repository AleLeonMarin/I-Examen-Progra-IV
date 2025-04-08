import { useCallback } from 'react';
import { User } from '~/components/UserTable';

export function useSortUsers(setUsers: React.Dispatch<React.SetStateAction<User[]>>) {
  return useCallback((column: keyof User) => {
    setUsers((prev) =>
      [...prev].sort((a, b) => a[column].localeCompare(b[column]))
    );
  }, [setUsers]);
}