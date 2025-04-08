import React from 'react';
import '~/css/styles/table.css';

export type User = {
  name: string;
  surname: string;
  country: string;
  photo: string;
};

type Props = {
  users: User[];
  onSort: (column: keyof User) => void;
  onDelete: (index: number) => void;
};

export default function UserTable({ users, onSort, onDelete }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => onSort('name')}>Nombre</th>
          <th onClick={() => onSort('surname')}>Apellido</th>
          <th onClick={() => onSort('country')}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr key={i}>
            <td><img src={user.photo} alt="foto" width={50} /></td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.country}</td>
            <td>
              <button onClick={() => onDelete(i)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
