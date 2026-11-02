import React, { memo } from "react";

import {
  Users,
  UserCheck,
  UserX,
  Clock
} from "lucide-react";

const cards = [
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    color: "purple"
  },
  {
    key: "activeUsers",
    label: "Active Users",
    icon: UserCheck,
    color: "green"
  },
  {
    key: "inactiveUsers",
    label: "Inactive Users",
    icon: UserX,
    color: "red"
  },
  {
    key: "pendingUsers",
    label: "Pending Users",
    icon: Clock,
    color: "orange"
  }
];

const StatCards = memo(function StatCards({ stats }) {
  return (
    <div className="stats-grid">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <div className="stat-card" key={key}>
          <div className={`stat-icon ${color}`}>
            <Icon size={22} />
          </div>

          <div>
            <p>{label}</p>
            <h2>{stats?.[key] ?? 0}</h2>
          </div>
        </div>
      ))}
    </div>
  );
});

export default StatCards;