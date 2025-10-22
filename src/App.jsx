import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SheetViewPage from './pages/SheetViewPage';
import SearchPage from './pages/SearchPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sheet/:sheetName" element={<SheetViewPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
