import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import {
  Search,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  RefreshCw,
  LogOut
} from "lucide-react";
import React, { lazy, Suspense } from "react";
import StatCards from "./components/StatCards";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
const AnalyticsCharts = lazy(
  () => import("./components/charts/AnalyticsCharts1")
);

import useDebounce from "./hooks/useDebounce";

import {
  fetchUsers,
  fetchDashboardStats,
  clearDashboardCache
} from "./services/dashboardService";

import "./App.css";

const PAGE_SIZE = 10;

export default function Dashboard() {

  // Pagination
  const [page, setPage] = useState(1);

  // Search
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // Sorting
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // API data
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [total, setTotal] = useState(0);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  // Memoized pagination calculations
  const totalPages = useMemo(
    () => Math.ceil(total / PAGE_SIZE),
    [total]
  );

  const offset = useMemo(
    () => (page - 1) * PAGE_SIZE,
    [page]
  );

  // Fetch dashboard data
  const loadDashboard = useCallback(async (signal) => {

    setLoading(true);
    setError(null);

    try {

      // Execute both independent requests concurrently
      const [usersResponse, statsResponse] = await Promise.all([

        fetchUsers({
          offset,
          limit: PAGE_SIZE,
          search: debouncedSearch,
          sortBy,
          sortOrder,
          signal
        }),

        fetchDashboardStats({ signal })

      ]);

      // Ignore outdated request
      if (signal.aborted) return;

      setUsers(usersResponse.data);
      setTotal(usersResponse.total);
      setStats(statsResponse);

    } catch (err) {

      if (
        err.name !== "AbortError" &&
        !signal.aborted
      ) {
        setError(err.message || "Unable to load dashboard.");
      }

    } finally {

      if (!signal.aborted) {
        setLoading(false);
      }
    }

  }, [
    offset,
    debouncedSearch,
    sortBy,
    sortOrder
  ]);

  // Fetch whenever dependencies change
  useEffect(() => {

    const controller = new AbortController();

    loadDashboard(controller.signal);

    return () => {
      controller.abort();
    };

  }, [loadDashboard, refreshKey]);

  // Search handler
  const handleSearch = useCallback((event) => {

    setSearch(event.target.value);
    setPage(1);

  }, []);

  // Sorting handler
  const handleSort = useCallback((column) => {
  if (sortBy === column) {
    setSortOrder((previous) =>
      previous === "asc" ? "desc" : "asc"
    );
  } else {
    setSortBy(column);
    setSortOrder("asc");
  }

  setPage(1);
}, [sortBy]);

  // Pagination handler
  const handlePageChange = useCallback((newPage) => {

    setPage((currentPage) => {
      return Math.max(
        1,
        Math.min(newPage, totalPages)
      );
    });

  }, [totalPages]);

  // Refresh and invalidate cache
  const handleRefresh = useCallback(() => {

    clearDashboardCache();
    setRefreshKey((previous) => previous + 1);

  }, []);

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">A</div>
          <span>AdminPanel</span>
        </div>

        <div className="sidebar-menu">

          <p className="menu-heading">MENU</p>

          <a href="#" className="menu-item active">
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          <a href="#users" className="menu-item">
            <Users size={19} />
            Users
          </a>

          <p className="menu-heading">PREFERENCES</p>

          <a href="#settings" className="menu-item">
            <Settings size={19} />
            Settings
          </a>

        </div>

        <div className="sidebar-bottom">
          <a href="#logout" className="menu-item">
            <LogOut size={19} />
            Logout
          </a>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">

          <div>
            <h2>Dashboard</h2>
            <p>Welcome back! Here's your overview.</p>
          </div>

          <div className="topbar-right">

            <button
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            <div className="profile">
              <div className="profile-avatar">SN</div>

              <div>
                <strong>Admin User</strong>
                <span>Administrator</span>
              </div>
            </div>

          </div>

        </header>

        <section className="dashboard-body">

  {/* Statistics */}
  <StatCards stats={stats} />

  {/* Analytics Charts */}
  <Suspense fallback={<div className="loading-state">
  Loading analytics...
</div>}>
  <AnalyticsCharts />
</Suspense>

  {/* User Management */}
  <section className="content-card" id="users">

            <div className="section-header">

              <div>
                <h3>User Management</h3>
                <p>Manage and monitor all registered users.</p>
              </div>

              <button
                className="refresh-button"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw size={16} />
                Refresh
              </button>

            </div>

            {/* Search toolbar */}
            <div className="table-toolbar">

              <div className="search-box">
                <Search size={18} />

                <input
                  type="search"
                  placeholder="Search name, email or department..."
                  value={search}
                  onChange={handleSearch}
                  aria-label="Search users"
                />
              </div>

              <span className="result-count">
                {total} users found
              </span>

            </div>

            {/* Error */}
            {error && (
              <div className="error-message" role="alert">

                <span>{error}</span>

                <button onClick={handleRefresh}>
                  Retry
                </button>

              </div>
            )}

            {/* Loading */}
            {loading ? (

              <div className="loading-state" role="status">
                <div className="spinner" />
                Loading dashboard data...
              </div>

            ) : (

              <>
                <UserTable
                  data={users}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  limit={PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </>

            )}

          </section>

        </section>

        <footer className="footer">
          © 2026 AdminPanel. All rights reserved.
        </footer>

      </main>
    </div>
  );
}