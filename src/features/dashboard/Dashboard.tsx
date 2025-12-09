/**
 * Dashboard Page
 * Main dashboard with statistics and data visualization
 */

import React from 'react';
import { Card, Button } from '../../design-system';
import { TrendingUp, Users, ShoppingCart, DollarSign, Download, RefreshCw } from 'lucide-react';
import styles from './Dashboard.module.css';

// Stat card component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'info';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon, color }) => {
  return (
    <Card>
      <div className={styles.statCard}>
        <div className={styles.statIcon} data-color={color}>
          {icon}
        </div>
        <div className={styles.statContent}>
          <p className={styles.statTitle}>{title}</p>
          <h3 className={styles.statValue}>{value}</h3>
          <div className={`${styles.statChange} ${isPositive ? styles.positive : styles.negative}`}>
            <TrendingUp size={14} />
            <span>{change}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Sample data
const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    product: 'Premium Plan',
    amount: '$299',
    status: 'Completed',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    product: 'Basic Plan',
    amount: '$99',
    status: 'Pending',
  },
  {
    id: '#ORD-003',
    customer: 'Bob Johnson',
    product: 'Enterprise Plan',
    amount: '$999',
    status: 'Completed',
  },
  {
    id: '#ORD-004',
    customer: 'Alice Brown',
    product: 'Premium Plan',
    amount: '$299',
    status: 'Processing',
  },
  {
    id: '#ORD-005',
    customer: 'Charlie Wilson',
    product: 'Basic Plan',
    amount: '$99',
    status: 'Completed',
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
        </div>
        <div className={styles.actions}>
          <Button variant="outlinePrimary" size="sm">
            <RefreshCw size={16} />
          </Button>
          <Button variant="primary">
            <Download size={16} />
            <span style={{ marginLeft: '8px' }}>Export</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="+12.5% from last month"
          isPositive={true}
          icon={<DollarSign size={24} />}
          color="primary"
        />
        <StatCard
          title="Total Users"
          value="8,549"
          change="+8.2% from last month"
          isPositive={true}
          icon={<Users size={24} />}
          color="success"
        />
        <StatCard
          title="Total Orders"
          value="1,423"
          change="-3.1% from last month"
          isPositive={false}
          icon={<ShoppingCart size={24} />}
          color="warning"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change="+0.8% from last month"
          isPositive={true}
          icon={<TrendingUp size={24} />}
          color="info"
        />
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <Card title="Revenue Overview" className={styles.chartCard}>
          <div className={styles.chartPlaceholder}>
            <TrendingUp size={48} />
            <p>Chart visualization would go here</p>
            <p className={styles.chartHint}>
              Integrate with Chart.js, Recharts, or similar library
            </p>
          </div>
        </Card>

        <Card title="User Activity" className={styles.chartCard}>
          <div className={styles.chartPlaceholder}>
            <Users size={48} />
            <p>Chart visualization would go here</p>
            <p className={styles.chartHint}>
              Integrate with Chart.js, Recharts, or similar library
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card
        title="Recent Orders"
        headerActions={
          <Button variant="outlinePrimary" size="sm">
            View All
          </Button>
        }
        noPadding
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.id}</strong>
                </td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>
                  <strong>{order.amount}</strong>
                </td>
                <td>
                  <span className={styles.badge} data-status={order.status.toLowerCase()}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Dashboard;
