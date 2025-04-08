import { useEffect, useState, useMemo, useCallback } from 'react';
import UserTable, { User } from '~/components/UserTable';

export default function Index() {
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<keyof User>('country');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos
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

  // Ordenar
  const handleSort = useCallback((column: keyof User) => {
    setUsers((prev) =>
      [...prev].sort((a, b) => a[column].localeCompare(b[column]))
    );
    setSortBy(column);
  }, []);

  // Filtrar
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.country.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [users, filter]);

  // Eliminar
  const handleDelete = useCallback((index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Restaurar
  const handleRestore = () => {
    setUsers(originalUsers);
    setFilter('');
    setSortBy('country');
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <input
        type="text"
        placeholder="Filtrar por país"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      />

      <button onClick={handleRestore} style={{ marginLeft: '10px' }}>
        Restaurar
      </button>

      <UserTable
        users={filteredUsers}
        onSort={handleSort}
        onDelete={handleDelete}
      />
    </div>
  );
}
