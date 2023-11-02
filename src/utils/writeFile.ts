import * as XLSX from 'xlsx'
import { excelFile } from '../store/features/filesSlice';

export const writeFile = (currentFile: any) => {
    const writeFile = { name: currentFile.name, data: currentFile.data };
    const dataArray = writeFile.data.map((obj: any) => Object.values(obj));
    // Create a worksheet from the array of arrays
    const ws = XLSX.utils.aoa_to_sheet([
      Object.keys(writeFile.data[0]),
      ...dataArray,
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");
    XLSX.writeFile(workbook, writeFile.name);
  };