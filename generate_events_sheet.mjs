import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const data = [
  ['Fecha', 'Evento', 'Link de Vercel', 'Estado'],
  ['2026-09-17', 'Casino Night', 'dvoid.vercel.app/casino', 'Desplegado (Finalizado)'],
  ['2026-09-25', 'Ibiza Vibes (Inicio de Semestre ASEUDLA)', 'dvoid.vercel.app/evento-udla', 'Desplegado (Finalizado)'],
  ['2026-10-01', 'La Tentación (Pre-Halloween)', 'dvoid.vercel.app/la-tentacion', 'Desplegado (Finalizado)'],
  ['2026-10-08', 'Medicine After Dark', 'dvoid.vercel.app/medicine', 'Desplegado (Finalizado)'],
  ['2026-10-15', 'Fashion Week (Satin Bow)', 'dvoid.vercel.app/fashion-week', 'Desplegado (Finalizado)'],
  ['2026-10-22', 'Hollywood Never Dies', 'dvoid.vercel.app/hollywood-never-dies', 'Desplegado (Activo hoy)'],
  ['2026-10-23', 'Secret Cult', 'dvoid.vercel.app/2026-10/23-secret-cult.html (por desplegar)', 'Pendiente (Brief recibido)'],
  ['2026-10-24', 'Halloween Freak Show', 'dvoid.vercel.app/2026-10/24-freak-show.html', 'Desplegado (Listo)'],
  ['2026-10-28', 'AFTER DARK', 'dvoid.vercel.app/2026-10/28-after-dark/ (por desplegar)', 'En Desarrollo'],
  ['2026-11-07', 'CRIMINIX (PUCE)', 'dvoid.vercel.app/criminix', 'Desplegado (Listo)'],
  ['2026-11-12', 'DJ Padre Guilherme – Pre-Party (Countdown Party)', 'dvoid.vercel.app/2026-11/12-padre-guilherme.html (por desplegar)', 'Aún no iniciado (Brief recibido)'],
  ['2026-11-19', 'Greek Odyssey (Santorini Night)', 'dvoid.vercel.app/2026-11/19-greek-odyssey.html (por desplegar)', 'Pendiente (Brief recibido)']
];

// 1. Create CSV with UTF-8 BOM so Excel opens it with proper accents and formatting
const csvRows = data.map(row => 
  row.map(cell => {
    if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
      return '"' + cell.replace(/"/g, '""') + '"';
    }
    return cell;
  }).join(',')
);
const csvContent = '\uFEFF' + csvRows.join('\r\n') + '\r\n';

const paths = [
  'C:\\Workspace\\D-Void\\eventos.csv',
  'C:\\Workspace\\D-Void\\D-Void\\eventos.csv'
];

for (const p of paths) {
  fs.writeFileSync(p, csvContent, 'utf8');
}

// 2. Create XLSX Workbook
const ws = XLSX.utils.aoa_to_sheet(data);
ws['!cols'] = [
  { wch: 14 }, // Fecha
  { wch: 48 }, // Evento
  { wch: 68 }, // Link de Vercel
  { wch: 34 }  // Estado
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Eventos D-Void');

const xlsxPaths = [
  'C:\\Workspace\\D-Void\\eventos.xlsx',
  'C:\\Workspace\\D-Void\\D-Void\\eventos.xlsx'
];

for (const p of xlsxPaths) {
  XLSX.writeFile(wb, p);
}

console.log('Successfully updated CSV and XLSX files with DJ Padre Guilherme event!');
