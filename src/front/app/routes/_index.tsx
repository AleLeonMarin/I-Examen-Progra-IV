"use client";

import { useEffect, useState } from "react";
import Modal from "~/components/UI/modal";
import ConfirmModal from "~/components/UI/confirmModal";
import UserTable, { User } from "~/components/UserTable";
import { useUsers } from "~/hooks/useUsers";
import { useFilteredUsers } from "~/hooks/useFilteredUsers";
import { useSortUsers } from "~/hooks/useSortUsers";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [filter, setFilter] = useState("");

  const { users, setUsers, loading, error, restoreUsers } = useUsers();
  const filteredUsers = useFilteredUsers(users, filter);
  const handleSort = (column: keyof User, direction: "asc" | "desc" | "original") => {
    if (direction === "original") {
      restoreUsers(); // reinicia la lista original
      return;
    }
  
    const sorted = [...users].sort((a, b) => {
      const aVal = a[column]?.toString().toLowerCase() || "";
      const bVal = b[column]?.toString().toLowerCase() || "";
  
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  
    setUsers(sorted);
  };
  
  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  const requestDelete = (user: User) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u !== userToDelete));
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lista de Usuarios</h1>

        <div className="filter-container">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Filtrar por país"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="restore-button" onClick={handleRestore} title="Restaurar usuarios">
            <svg
              className="restore-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
              <path d="M16 21h5v-5"></path>
            </svg>
            <span className="button-text">Restaurar</span>
          </button>
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onSort={handleSort}
        onDelete={requestDelete}
      />

      <Modal
        isOpen={showModal}
        message={`Ocurrió un error al cargar los usuarios: ${error}`}
        onClose={() => setShowModal(false)}
      />

      <ConfirmModal
        isOpen={userToDelete !== null}
        message="¿Estás seguro que deseas eliminar este usuario?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
