import React, { memo, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";

const UserTable = memo(function UserTable({
  data,
  sortBy,
  sortOrder,
  onSort
}) {
  const columns = useMemo(() => [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    { key: "salary", label: "Salary" },
    { key: "joinDate", label: "Join Date" },
    { key: "status", label: "Status" }
  ], []);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <button
                  className="sort-button"
                  onClick={() => onSort(column.key)}
                  aria-label={`Sort by ${column.label}`}
                >
                  {column.label}

                  <ArrowUpDown size={14} />

                  {sortBy === column.key && (
                    <span>
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>

                <td>
                  <div className="user-name">
                    <div className="avatar">
                      {user.name.charAt(0)}
                    </div>

                    {user.name}
                  </div>
                </td>

                <td>{user.email}</td>
                <td>{user.department}</td>

                <td>
                  ${user.salary.toLocaleString("en-US")}
                </td>

                <td>{user.joinDate}</td>

                <td>
                  <span
                    className={`status-badge ${user.status.toLowerCase()}`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="empty-state">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default UserTable;