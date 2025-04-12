"use client";

import { useEffect, useState } from "react";
import Modal from "~/components/UI/modal";
import ConfirmModal from "~/components/UI/confirmModal";
import UserTable, { User } from "~/components/UserTable";
import { useUsers } from "~/hooks/useUsers";
import { useFilteredUsers } from "~/hooks/useFilteredUsers";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [filter, setFilter] = useState("");
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const { users, setUsers, loading, error, restoreUsers } = useUsers();
  const filteredUsers = useFilteredUsers(users, filter);

  const handleSort = (column: keyof User, direction: "asc" | "desc" | "original") => {
    if (direction === "original") {
      restoreUsers();
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
    setShowRestoreConfirm(true);
  };

  const confirmRestore = () => {
    restoreUsers();
    setFilter("");
    setShowRestoreConfirm(false);
  };

  const cancelRestore = () => {
    setShowRestoreConfirm(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
        Loading users<span className="dots" />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>User List</h1>
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative", flex: "1" }}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                top: "50%",
                right: "0px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Filter by country"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "8px 8px 8px 10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            />
          </div>

          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            onClick={handleRestore}
          >
            <svg
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
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0-6.74-2.74L21 16"></path>
              <path d="M16 21h5v-5"></path>
            </svg>
            <span>Restore</span>
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
        message={`An error occurred while loading users: ${error}`}
        onClose={() => setShowModal(false)}
      />

      <ConfirmModal
        isOpen={userToDelete !== null}
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ConfirmModal
        isOpen={showRestoreConfirm}
        message="Are you sure you want to restore the table to its original state?"
        onConfirm={confirmRestore}
        onCancel={cancelRestore}
      />
    </div>
  );
}