
import React, { memo, useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import { fetchAnalyticsData } from "../../services/analyticsService";

const STATUS_COLORS = ["#16a36a", "#e05252", "#e89a32"];

const currencyFormatter = (value) =>
  `$${Number(value).toLocaleString("en-US")}`;

function AnalyticsCharts() {
  const [charts, setCharts] = useState({
    registrationData: [],
    departmentData: [],
    userStatusData: [],
    revenueData: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCharts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchAnalyticsData(controller.signal);

        if (controller.signal.aborted) return;

        setCharts(response);
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message || "Unable to load analytics data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCharts();

    return () => controller.abort();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="chart-message">
        Loading analytics charts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-message chart-error">
        <p>{error}</p>
        <button onClick={() => setRetryCount((count) => count + 1)}>
          Retry
        </button>
      </div>
    );
  }

  const {
    registrationData,
    departmentData,
    userStatusData,
    revenueData
  } = charts;

  return (
    <section className="analytics-section">
      <div className="analytics-heading">
        <div>
          <h2>Analytics Overview</h2>
          <p>Performance and business metrics</p>
        </div>
      </div>

      <div className="charts-grid">

        {/* Registration Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>User Registrations</h3>
            <span className="chart-indicator">Monthly</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Department Distribution</h3>
            <span className="chart-indicator">Employees</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="employees"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Status Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>User Status</h3>
            <span className="chart-indicator">Distribution</span>
          </div>

          <div className="chart-container donut-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Revenue Overview</h3>
            <span className="chart-indicator">Monthly</span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#6366f1"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={currencyFormatter} />
                <Tooltip formatter={currencyFormatter} />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(AnalyticsCharts);
