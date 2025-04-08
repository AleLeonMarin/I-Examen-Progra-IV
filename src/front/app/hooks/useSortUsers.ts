import { useCallback } from 'react';
import { User } from '~/components/UserTable';

export function useSortUsers(setUsers: React.Dispatch<React.SetStateAction<User[]>>) {
    return useCallback((column: keyof User) => {
      setUsers((prev) =>
        [...prev].sort((a, b) => {
          const aValue = a[column] || '';
          const bValue = b[column] || '';
          return aValue.localeCompare(bValue);
        })
      );
    }, [setUsers]);
  }