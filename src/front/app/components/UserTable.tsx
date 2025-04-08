import { useEffect, useMemo, useState, useCallback } from "react";
import { User } from "../types/user";

interface Props {
  initialUsers: User[];
}

export default function UserTable({ initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof User>("country");
  const [sortAsc, setSortAsc] = useState(true);

  const handleDelete = useCallback((index: number) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleRestore = useCallback(() => {
    setUsers(initialUsers);
    setFilter("");
    setSortColumn("country");
    setSortAsc(true);
  }, [initialUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.country.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [users, filter]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aVal = a[sortColumn].toString().toLowerCase();
      const bVal = b[sortColumn].toString().toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortColumn, sortAsc]);

  const toggleSort = (column: keyof User) => {
    if (column === sortColumn) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          placeholder="Filtrar por país"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <button onClick={handleRestore}>Restaurar</button>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>Foto</th>
            <th onClick={() => toggleSort("first_name")}>Nombre</th>
            <th onClick={() => toggleSort("last_name")}>Apellido</th>
            <th onClick={() => toggleSort("country")}>País</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#527775" : "#827775" }}>
              <td><img src={user.picture} width={50} /></td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.country}</td>
              <td><button onClick={() => handleDelete(i)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
