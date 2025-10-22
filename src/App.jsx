import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SheetViewPage from './pages/SheetViewPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Auth Routes (no layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Main Routes (with layout) - Protected, requires authentication */}
      <Route path="/*" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sheet/:sheetName" element={<SheetViewPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
