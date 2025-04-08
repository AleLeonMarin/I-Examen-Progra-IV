import { useState } from 'react';
import UserTable, { User } from '~/components/UserTable';
import { useUsers } from '~/hooks/useUsers';
import { useFilteredUsers } from '~/hooks/useFilteredUsers';
import { useSortUsers } from '~/hooks/useSortUsers';

export default function Index() {
  const [filter, setFilter] = useState('');
  const { users, setUsers, loading, error, restoreUsers } = useUsers();
  const filteredUsers = useFilteredUsers(users, filter);
  const handleSort = useSortUsers(setUsers);

  const handleDelete = (index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRestore = () => {
    restoreUsers();
    setFilter('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        Cargando usuarios<span className="dots" />
      </div>
    );
  }
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