import useAppStore from '../../store/useAppStore';
import { SHEET_DISPLAY_NAMES } from '../../config/constants';

function SheetTabs({ sheets }) {
  const { activeSheet, setActiveSheet } = useAppStore();

  // Filter out empty sheets and reference sheets
  const mainSheets = sheets.filter(sheet =>
    sheet.rowCount > 0 &&
    !['ประเภททะเบียน', 'ชื่อบรษัทและยี่ห้อที่ขอยื่น'].includes(sheet.name)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      <div className="flex overflow-x-auto scrollbar-thin">
        <div className="flex space-x-1">
          {mainSheets.map((sheet) => {
            const isActive = activeSheet === sheet.name;
            const displayName = SHEET_DISPLAY_NAMES[sheet.name] || sheet.name;

            return (
              <button
                key={sheet.name}
                onClick={() => setActiveSheet(sheet.name)}
                className={`tab whitespace-nowrap min-w-fit ${
                  isActive ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <span className="font-medium">{displayName}</span>
                <span className="ml-2 text-xs opacity-75">({sheet.rowCount})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SheetTabs;
