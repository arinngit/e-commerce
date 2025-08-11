import ProtectedRoute from '../../components/routes/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected Dashboard Content</div>
    </ProtectedRoute>
  );
}