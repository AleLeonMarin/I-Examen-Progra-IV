import { useMemo } from 'react';
import { User } from '~/components/UserTable';

export function useFilteredUsers(users: User[], filter: string) {
    return useMemo(() => {
        return users.filter((u) =>
            (u.country || '').toLowerCase().startsWith(filter.toLowerCase())
        );
    }, [users, filter]);
}