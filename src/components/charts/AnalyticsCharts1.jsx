// import React, { memo } from "react";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend
// } from "recharts";

// import {
//   registrationData,
//   departmentData,
//   userStatusData,
//   revenueData
// } from "../../data/chartData";

// const STATUS_COLORS = ["#16a36a", "#e05252", "#e89a32"];

// const currencyFormatter = (value) =>
//   `$${Number(value).toLocaleString("en-US")}`;

// const AnalyticsCharts = memo(function AnalyticsCharts() {
//   return (
//     <section className="analytics-section">

//       <div className="analytics-heading">
//         <div>
//           <h3>Analytics Overview</h3>
//           <p>Monitor registrations, departments and revenue.</p>
//         </div>

//         <span className="analytics-period">
//           Last 12 months
//         </span>
//       </div>

//       <div className="charts-grid">

//         {/* 1. Registration Line Chart */}
//         <div className="chart-card">

//           <div className="chart-header">
//             <div>
//               <h4>User Registrations</h4>
//               <p>Monthly registration trends</p>
//             </div>

//             <span className="chart-indicator purple-indicator">
//               +18.5%
//             </span>
//           </div>

//           <div className="chart-container">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={registrationData}
//                 margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#edf0f5"
//                 />

//                 <XAxis
//                   dataKey="month"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 11 }}
//                 />

//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 11 }}
//                 />

//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: 8,
//                     border: "1px solid #e9ebf1"
//                   }}
//                 />

//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   name="Registrations"
//                   stroke="#6257e8"
//                   strokeWidth={3}
//                   dot={false}
//                   activeDot={{ r: 6 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//         </div>

//         {/* 2. Department Bar Chart */}
//         <div className="chart-card">

//           <div className="chart-header">
//             <div>
//               <h4>Department Distribution</h4>
//               <p>Employees by department</p>
//             </div>

//             <span className="chart-indicator blue-indicator">
//               6 Departments
//             </span>
//           </div>

//           <div className="chart-container">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={departmentData}
//                 margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
//               >
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#edf0f5"
//                 />

//                 <XAxis
//                   dataKey="department"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 10 }}
//                   interval={0}
//                   angle={-15}
//                   textAnchor="end"
//                   height={55}
//                 />

//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 11 }}
//                 />

//                 <Tooltip />

//                 <Bar
//                   dataKey="employees"
//                   name="Employees"
//                   fill="#4789e8"
//                   radius={[5, 5, 0, 0]}
//                   maxBarSize={42}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//         </div>

//         {/* 3. User Status Donut Chart */}
//         <div className="chart-card">

//           <div className="chart-header">
//             <div>
//               <h4>User Status</h4>
//               <p>Overall user distribution</p>
//             </div>
//           </div>

//           <div className="chart-container donut-container">

//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>

//                 <Pie
//                   data={userStatusData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={65}
//                   outerRadius={95}
//                   paddingAngle={4}
//                   stroke="none"
//                 >
//                   {userStatusData.map((entry, index) => (
//                     <Cell
//                       key={entry.name}
//                       fill={STATUS_COLORS[index]}
//                     />
//                   ))}
//                 </Pie>

//                 <Tooltip />

//                 <Legend
//                   verticalAlign="bottom"
//                   height={30}
//                   iconType="circle"
//                 />

//               </PieChart>
//             </ResponsiveContainer>

//           </div>

//         </div>

//         {/* 4. Revenue Area Chart */}
//         <div className="chart-card">

//           <div className="chart-header">
//             <div>
//               <h4>Revenue Overview</h4>
//               <p>Monthly revenue performance</p>
//             </div>

//             <span className="chart-indicator green-indicator">
//               +25.4%
//             </span>
//           </div>

//           <div className="chart-container">

//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart
//                 data={revenueData}
//                 margin={{ top: 15, right: 15, left: 5, bottom: 5 }}
//               >
//                 <defs>
//                   <linearGradient
//                     id="revenueGradient"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="0%"
//                       stopColor="#16a36a"
//                       stopOpacity={0.3}
//                     />

//                     <stop
//                       offset="95%"
//                       stopColor="#16a36a"
//                       stopOpacity={0.02}
//                     />
//                   </linearGradient>
//                 </defs>

//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#edf0f5"
//                 />

//                 <XAxis
//                   dataKey="month"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 11 }}
//                 />

//                 <YAxis
//                   tickFormatter={(value) => `$${value / 1000}k`}
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#929baa", fontSize: 11 }}
//                 />

//                 <Tooltip
//                   formatter={(value) => [
//                     currencyFormatter(value),
//                     "Revenue"
//                   ]}
//                 />

//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   name="Revenue"
//                   stroke="#16a36a"
//                   strokeWidth={2.5}
//                   fill="url(#revenueGradient)"
//                 />

//               </AreaChart>
//             </ResponsiveContainer>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// });

// export default AnalyticsCharts;