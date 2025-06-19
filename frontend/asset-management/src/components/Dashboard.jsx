import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [overview, setOverview] = useState({
    overallAssets: 0,
    availableAssets: 0,
    usersLoggedIn: 0,
    dealers: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch overview stats
    fetch("http://localhost:5000/overview")
      .then((response) => response.json())
      .then((data) => {
        console.log("📊 Overview data:", data);
        setOverview(data);
      })
      .catch((error) => console.error("❌ Error fetching overview:", error));

    // Fetch recent asset activity
    fetch("http://localhost:5000/recentActivity")
      .then((response) => response.json())
      .then((data) => {
        console.log("📝 Recent activity:", data);
        setRecentActivity(data);
      })
      .catch((error) => console.error("❌ Error fetching recent activity:", error));
  }, []);

  const pieData = [
    { name: "Overall Assets", value: overview.overallAssets },
    { name: "Users Logged In", value: overview.usersLoggedIn },
    { name: "Dealers", value: overview.dealers },
  ];

  const costData = recentActivity.map((item) => ({
    name: item.product,
    value: item.total,
  }));

  const totalAssetCost = recentActivity.reduce((acc, item) => acc + item.total, 0);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

  return (
    <div className="dashboard">
      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="card">
          <h3>OVERALL ASSETS</h3>
          <p>{overview.overallAssets}</p>
        </div>

        <div className="card">
          <h3>AVAILABLE ASSETS</h3>
          <p>{overview.availableAssets}</p>
        </div>

        <div className="card">
          <h3>DEALERS</h3>
          <p>{overview.dealers}</p>
        </div>

        <div className="card">
          <h3>USERS LOGGED IN</h3>
          <p>{overview.usersLoggedIn}</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Company Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Brand</th>
              <th>Rate Per Unit</th>
              <th>Total Rate</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.length === 0 ? (
              <tr>
                <td colSpan="7">No recent activity.</td>
              </tr>
            ) : (
              recentActivity.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.brand}</td>
                  <td>₹{item.rate}</td>
                  <td>₹{item.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Charts Section */}
      <div className="assets-summary">
        <div className="categorized-assets">
          <h3>Overview Summary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="current-cost">
          <h3>Current Assets Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-cost-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="total-cost-text">
            <strong>Total Cost: </strong>₹{totalAssetCost.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
