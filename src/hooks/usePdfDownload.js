import { useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

// Helper function to add clickable links to PDF
const addClickableLinks = async (pdf, element, offsetX, offsetY, finalWidth, finalHeight, imgWidth, imgHeight) => {
  try {
    // Find all anchor tags in the element
    const links = element.querySelectorAll('a[href]');
    
    // Calculate scaling factor
    const scaleX = finalWidth / imgWidth;
    const scaleY = finalHeight / imgHeight;
    
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Calculate relative position within the element
      const relativeX = rect.left - elementRect.left;
      const relativeY = rect.top - elementRect.top;
      
      // Calculate position in PDF coordinates
      const pdfX = offsetX + (relativeX * scaleX);
      const pdfY = offsetY + (relativeY * scaleY);
      const pdfWidth = rect.width * scaleX;
      const pdfHeight = rect.height * scaleY;
      
      // Add clickable link to PDF
      const url = link.href;
      if (url && url.startsWith('http')) {
        pdf.link(pdfX, pdfY, pdfWidth, pdfHeight, { url: url });
      } else if (url && url.startsWith('mailto:')) {
        pdf.link(pdfX, pdfY, pdfWidth, pdfHeight, { url: url });
      }
    });
  } catch (error) {
    console.warn('Error adding clickable links to PDF:', error);
  }
};

export const usePdfDownload = () => {
  const downloadPdf = useCallback(async (elementId, filename = 'resume') => {
    try {
      // Show loading toast
      const toastId = toast.loading('🔄 Generating PDF...');

      // Find the element to convert
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      // Configure html2canvas for better quality and optimal sizing
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        logging: false, // Disable logging to avoid console spam
        removeContainer: true, // Remove the temporary container
        onclone: (clonedDoc) => {
          // Ensure the cloned document has our PDF styles applied
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            // Add pdf-optimized class if not present
            if (!clonedElement.classList.contains('pdf-optimized')) {
              clonedElement.classList.add('pdf-optimized');
            }
            
            // Remove any max-width constraints that might limit the content
            clonedElement.style.maxWidth = 'none';
            clonedElement.style.width = '210mm';
            
            // Force all elements to use computed styles to avoid oklch
            const style = clonedDoc.createElement('style');
            style.textContent = `
              * { 
                color: inherit !important; 
                background-color: inherit !important; 
                border-color: inherit !important; 
              }
              .text-blue-600, .text-blue-500 { color: #2563eb !important; }
              .text-gray-900, .text-gray-800, .text-gray-700 { color: #374151 !important; }
              .text-gray-600, .text-gray-500 { color: #6b7280 !important; }
              .border-blue-600, .border-blue-500 { border-color: #2563eb !important; }
              .bg-blue-50 { background-color: #eff6ff !important; }
            `;
            clonedDoc.head.appendChild(style);
          }
        }
      });

      // Calculate dimensions for A4 page
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate ratio to fit content in A4 with minimal margins
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio * 0.95; // Use 95% of available space
      const finalHeight = imgHeight * ratio * 0.95;
      
      // Center the content with small margins
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      
      // Add clickable links to PDF
      await addClickableLinks(pdf, element, x, y, finalWidth, finalHeight, imgWidth, imgHeight);
      
      // Download the PDF
      pdf.save(`${filename}.pdf`);
      
      // Update toast to success
      toast.update(toastId, {
        render: `✅ ${filename}.pdf downloaded successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
      return false;
    }
  }, []);

  return { downloadPdf };
};
