import { useState } from "react";
import "~/css/styles/table.css";

export type User = {
  name?: string;
  surname?: string;
  country?: string;
  photo?: string;
};

type Props = {
  users: User[];
  onSort: (column: keyof User, direction: "asc" | "desc" | "original") => void;
  onDelete: (user: User) => void;
};

export default function UserTable({ users, onSort, onDelete }: Props) {
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "original">("original");

  const handleSort = (column: keyof User) => {
    let nextDirection: "asc" | "desc" | "original" = "asc";

    if (sortColumn === column) {
      nextDirection = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? "original" : "asc";
    }

    setSortColumn(nextDirection === "original" ? null : column);
    setSortDirection(nextDirection);
    onSort(column, nextDirection);
  };

  return (
    <div className="user-table-container">
      <div className="table-scroll-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th onClick={() => handleSort("name")}>
                Nombre {sortColumn === "name" && (sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "")}
              </th>
              <th onClick={() => handleSort("surname")}>
                Apellido {sortColumn === "surname" && (sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "")}
              </th>
              <th onClick={() => handleSort("country")}>
                País {sortColumn === "country" && (sortDirection === "asc" ? "▲" : sortDirection === "desc" ? "▼" : "")}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-message">No se encontraron usuarios</td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={user.photo || "/placeholder.svg"}
                      alt="foto"
                      width={50}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const name = user.name || "U";
                        const surname = user.surname || "N";
                        target.src = `https://ui-avatars.com/api/?name=${name}+${surname}&background=random`;
                      }}
                    />
                  </td>
                  <td>{user.name || "-"}</td>
                  <td>{user.surname || "-"}</td>
                  <td>{user.country || "-"}</td>
                  <td>
                    <button className="delete-button" onClick={() => onDelete(user)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
