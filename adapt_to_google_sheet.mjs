import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

async function adaptSheet() {
  const templatePath = 'c:\\Workspace\\D-Void\\drive_sheet_download.xlsx';
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(templatePath);
  const ws = wb.getWorksheet(1);

  // List of all 12 events in strict chronological order
  const events = [
    {
      date: '2026-09-17',
      name: 'Casino Night',
      link: 'dvoid.vercel.app/2026-09/17-casino/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-09-25',
      name: 'Ibiza Vibes (Inicio de Semestre ASEUDLA)',
      link: 'dvoid.vercel.app/2026-09/25-evento-udla/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-01',
      name: 'La Tentación',
      link: 'dvoid.vercel.app/2026-10/01-la-tentacion/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-08',
      name: 'MEDICINE After Dark',
      link: 'dvoid.vercel.app/2026-10/08-medicine/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-15',
      name: 'Fashion Week',
      link: 'dvoid.vercel.app/2026-10/15-fashion-week/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-22',
      name: 'Old Hollywood (Hollywood Never Dies)',
      link: 'dvoid.vercel.app/2026-10/22-hollywood-never-dies/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-23',
      name: 'Secret Cult',
      link: 'dvoid.vercel.app/2026-10/23-secret-cult/ (por desplegar)',
      status: 'Aún no iniciado (Brief recibido)'
    },
    {
      date: '2026-10-24',
      name: 'Halloween Freak Show',
      link: 'dvoid.vercel.app/2026-10/24-freak-show/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-10-28',
      name: 'AFTER DARK',
      link: 'dvoid.vercel.app/2026-10/28-after-dark/ (por desplegar)',
      status: 'En Desarrollo'
    },
    {
      date: '2026-11-07',
      name: 'CRIMINIX',
      link: 'dvoid.vercel.app/2026-11/07-criminix/',
      status: 'Completado (100%)'
    },
    {
      date: '2026-11-12',
      name: 'DJ Padre Guilherme – Pre-Party (Countdown Party)',
      link: 'dvoid.vercel.app/2026-11/12-padre-guilherme/ (por desplegar)',
      status: 'Aún no iniciado (Brief recibido)'
    },
    {
      date: '2026-11-19',
      name: 'Greek Odyssey (Santorini Night)',
      link: 'dvoid.vercel.app/2026-11/19-greek-odyssey/ (por desplegar)',
      status: 'Aún no iniciado (Brief recibido)'
    }
  ];

  const startRow = 6;
  const endRow = startRow + events.length - 1; // 17

  // Update KPI Formulas in Row 4
  const cellA4 = ws.getCell('A4');
  cellA4.value = { formula: `COUNTA(B${startRow}:B${endRow})` };
  
  const cellB4 = ws.getCell('B4');
  cellB4.value = { formula: `COUNTIF(D${startRow}:D${endRow}, "Completado*")` };
  
  const cellC4 = ws.getCell('C4');
  cellC4.value = { formula: `COUNTIF(D${startRow}:D${endRow}, "*desplegar*") + COUNTIF(D${startRow}:D${endRow}, "*Producción*")` };
  
  const cellD4 = ws.getCell('D4');
  cellD4.value = { formula: `COUNTIF(D${startRow}:D${endRow}, "*Desarrollo*")` };

  // Set column widths to match Google Sheet nicely
  ws.getColumn(1).width = 16;
  ws.getColumn(2).width = 38;
  ws.getColumn(3).width = 56;
  ws.getColumn(4).width = 32;

  // Clear existing data rows if any beyond
  for (let r = startRow; r <= Math.max(endRow, 30); r++) {
    const row = ws.getRow(r);
    for (let c = 1; c <= 4; c++) {
      row.getCell(c).value = null;
    }
  }

  // Populate events
  events.forEach((ev, idx) => {
    const rowNum = startRow + idx;
    const row = ws.getRow(rowNum);
    row.height = 24;

    // Col A: Fecha
    const cellA = row.getCell(1);
    cellA.value = ev.date;
    cellA.font = { name: 'Roboto', size: 10 };
    cellA.alignment = { horizontal: 'center', vertical: 'middle' };
    cellA.border = { bottom: { style: 'thin', color: { argb: 'FFE2E8EF' } } };

    // Col B: Evento
    const cellB = row.getCell(2);
    cellB.value = ev.name;
    cellB.font = { name: 'Google Sans', size: 10, bold: true, color: { argb: 'FF141E33' } };
    cellB.alignment = { horizontal: 'left', vertical: 'middle' };
    cellB.border = { bottom: { style: 'thin', color: { argb: 'FFE2E8EF' } } };

    // Col C: Link de Vercel
    const cellC = row.getCell(3);
    const cleanUrl = ev.link.split(' ')[0];
    const hasNote = ev.link.includes('(');
    cellC.value = ev.link;
    cellC.font = { name: 'Roboto', size: 10, color: { argb: 'FF1155CC' }, underline: true };
    cellC.alignment = { horizontal: 'left', vertical: 'middle' };
    cellC.border = { bottom: { style: 'thin', color: { argb: 'FFE2E8EF' } } };

    // Col D: Estado
    const cellD = row.getCell(4);
    cellD.value = ev.status;
    let statusColor = 'FF14663F'; // green for completed
    if (ev.status.includes('Desarrollo')) statusColor = 'FFB2660C'; // amber
    if (ev.status.includes('no iniciado') || ev.status.includes('Pendiente')) statusColor = 'FF6B7280'; // gray
    
    cellD.font = { name: 'Google Sans', size: 10, bold: true, color: { argb: statusColor } };
    cellD.alignment = { horizontal: 'center', vertical: 'middle' };
    cellD.border = { bottom: { style: 'thin', color: { argb: 'FFE2E8EF' } } };
  });

  const outPaths = [
    'c:\\Workspace\\D-Void\\eventos.xlsx'
  ];

  for (const p of outPaths) {
    await wb.xlsx.writeFile(p);
  }
  console.log('Successfully updated eventos.xlsx!');

  // Generate Google Sheets-compatible CSV
  const csvLines = [
    '"BASE DE DATOS DE EVENTOS • D-VOID","","",""',
    '"TOTAL EVENTOS","COMPLETADOS","EN PRODUCCIÓN","EN DESARROLLO"',
    `"=COUNTA(B6:B${endRow})","=COUNTIF(D6:D${endRow}, ""Completado*"")","=COUNTIF(D6:D${endRow}, ""*desplegar*"") + COUNTIF(D6:D${endRow}, ""*Producción*"")","=COUNTIF(D6:D${endRow}, ""*Desarrollo*"")"`,
    '"Fecha","Evento","Link de Vercel","Estado"'
  ];

  events.forEach(ev => {
    csvLines.push(`"${ev.date}","${ev.name.replace(/"/g, '""')}","${ev.link.replace(/"/g, '""')}","${ev.status.replace(/"/g, '""')}"`);
  });

  const csvContent = '\uFEFF' + csvLines.join('\r\n') + '\r\n';
  fs.writeFileSync('c:\\Workspace\\D-Void\\eventos.csv', csvContent, 'utf8');
  console.log('Successfully updated eventos.csv!');
}

adaptSheet().catch(console.error);
