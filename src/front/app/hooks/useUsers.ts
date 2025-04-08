import { useEffect, useState } from 'react';
import { User } from '~/components/UserTable';

export function useUsers() {
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener usuarios');
        return res.json();
      })
      .then((data) => {
        setOriginalUsers(data);
        setUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const restoreUsers = () => {
    setUsers(originalUsers);
  };

  return {
    users,
    setUsers,
    loading,
    error,
    restoreUsers,
  };
}