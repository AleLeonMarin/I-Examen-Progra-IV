"use client"

import { useState } from "react"
import '~/css/styles/table.css';

export type User = {
  name: string
  surname: string
  country: string
  photo: string
}

type Props = {
  users: User[]
  onSort: (column: keyof User) => void
  onDelete: (index: number) => void
}

export default function UserTable({ users, onSort, onDelete }: Props) {
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
    onSort(column)
  }

  return (
    <div className="user-table-container">
      <div className="table-scroll-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>
                <button
                  className={`sort-button ${sortColumn === "name" ? "active" : ""}`}
                  onClick={() => handleSort("name")}
                >
                  Nombre
                  <svg
                    className="sort-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th>
                <button
                  className={`sort-button ${sortColumn === "surname" ? "active" : ""}`}
                  onClick={() => handleSort("surname")}
                >
                  Apellido
                  <svg
                    className="sort-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th>
                <button
                  className={`sort-button ${sortColumn === "country" ? "active" : ""}`}
                  onClick={() => handleSort("country")}
                >
                  País
                  <svg
                    className="sort-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </th>
              <th className="actions-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-message">
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={i}>
                  <td>
                    <div className="avatar">
                      <img
                        src={user.photo || "/placeholder.svg"}
                        alt={`${user.name} ${user.surname}`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://ui-avatars.com/api/?name=${user.name}+${user.surname}&background=random`
                        }}
                      />
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>
                    <span className="country-badge">{user.country}</span>
                  </td>
                  <td className="actions-column">
                    <button className="delete-button" onClick={() => onDelete(i)} aria-label="Eliminar usuario">
                      <svg
                        className="delete-icon"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
