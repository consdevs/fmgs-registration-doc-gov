import { useParams } from 'react-router-dom';
import SheetTable from '../components/sheets/SheetTable';
import { SHEET_DISPLAY_NAMES } from '../config/constants';

function SheetViewPage() {
  const { sheetName } = useParams();
  const displayName = SHEET_DISPLAY_NAMES[sheetName] || sheetName;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{displayName}</h1>
      <SheetTable sheetName={sheetName} />
    </div>
  );
}

export default SheetViewPage;
