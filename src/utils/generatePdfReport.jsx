// utils/generatePdfReport.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

export const generatePdfReport = async ({ narrativeId, chartId, mapId, filename = "city-report" }) => {
  const doc = new jsPDF("p", "pt", "a4");

  // Header
  doc.setFontSize(18);
  doc.text("📄 City Development Report", 40, 40);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, 60);

  let currentY = 90;

  // Smart Narrative
  const narrativeEl = document.getElementById(narrativeId);
  if (narrativeEl) {
    const text = narrativeEl.innerText.split("\n").filter(Boolean);
    doc.setFontSize(14);
    doc.text("🧠 Key Insights", 40, currentY);
    currentY += 20;
    doc.setFontSize(11);
    text.forEach((line) => {
      doc.text(`• ${line}`, 50, currentY);
      currentY += 16;
    });
    currentY += 10;
  }

  // Insert Chart Image
  const addImageFromDOM = async (domId, label) => {
    const el = document.getElementById(domId);
    if (el) {
      const canvas = await html2canvas(el);
      const imgData = canvas.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(14);
      doc.text(label, 40, 40);
      doc.addImage(imgData, "PNG", 40, 60, 500, 300);
    }
  };

  await addImageFromDOM(chartId, "📊 Metric Trends Over Time");
  await addImageFromDOM(mapId, "🗺️ Geographic Visualization");

  doc.save(`${filename}.pdf`);
};
