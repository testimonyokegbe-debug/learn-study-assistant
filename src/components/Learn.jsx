import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Vite-friendly worker import (fixes the ERR_CONNECTION_REFUSED / fake worker issue)
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// --- Simple IndexedDB helpers for storing the PDF file itself ---
const DB_NAME = "studyAssistantDB";
const STORE_NAME = "pdfs";
const PDF_KEY = "savedPdf";

const openDB = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const savePdfToDB = async (file) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(
      { name: file.name, blob: file, savedAt: Date.now() },
      PDF_KEY
    );
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

const loadPdfFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(PDF_KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
};

const deletePdfFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(PDF_KEY);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};


const Learn = () => {
  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef(null);

  // Load a previously saved PDF on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await loadPdfFromDB();
        if (saved?.blob) {
          const url = URL.createObjectURL(saved.blob);
          setPdf(url);
          setPdfName(saved.name);
        }
      } catch (err) {
        console.error("Failed to load saved PDF:", err);
      }
    })();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [pdf]);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      const pdfUrl = URL.createObjectURL(file);
      setPdf(pdfUrl);
      setPdfName(file.name);
      setPageNumber(1);
      setScale(1);

      // Auto-save to IndexedDB (local, no Firebase involved)
      try {
        await savePdfToDB(file);
      } catch (err) {
        console.error("Failed to save PDF:", err);
      }
    }
  };

  const handleRemove = async () => {
    if (pdf) URL.revokeObjectURL(pdf);
    setPdf(null);
    setPdfName("");
    setNumPages(null);
    try {
      await deletePdfFromDB();
    } catch (err) {
      console.error("Failed to clear saved PDF:", err);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(2.5, +(s + 0.2).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.4, +(s - 0.2).toFixed(2)));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Intro write-up */}
      <div className="px-6 md:px-16 lg:px-24 pt-8 pb-4">
        <h1 className="text-black font-bold text-2xl mb-2">Hello, Learn.</h1>
      </div>

      {/* Learn Introduction */}
      <section className="text-center px-6 pt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Self Learning at own pace.
        </h1>
        <p className="mt-3 text-gray-500">
          Upload your study materials and read them directly in your learning space.
        </p>
      </section>

      {/* PDF Upload */}
      <section className="max-w-3xl mx-auto px-6 mt-10">
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Upload your study material
          </h2>
          <p className="text-gray-500 mt-2 mb-6">
            Select a PDF file to start reading.
          </p>

          <label
            htmlFor="pdf-upload"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-blue-600 transition"
          >
            Choose PDF
          </label>

          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="hidden"
          />
        </div>
      </section>

      {/* PDF Reader */}
      {pdf && (
        <section className="max-w-5xl mx-auto px-6 mt-10 pb-10">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="font-semibold text-gray-800">Your Study Material</h2>
                {pdfName && (
                  <p className="text-xs text-gray-400 mt-0.5">{pdfName}</p>
                )}
              </div>
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  disabled={pageNumber <= 1}
                  className="px-3 py-1 rounded-full border hover:bg-gray-100 disabled:opacity-40"
                >
                  Prev
                </button>
                <span>
                  Page {pageNumber} / {numPages || "…"}
                </span>
                <button
                  onClick={goNext}
                  disabled={numPages && pageNumber >= numPages}
                  className="px-3 py-1 rounded-full border hover:bg-gray-100 disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={zoomOut}
                  className="px-3 py-1 rounded-full border hover:bg-gray-100"
                >
                  −
                </button>
                <span>{Math.round(scale * 100)}%</span>
                <button
                  onClick={zoomIn}
                  className="px-3 py-1 rounded-full border hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Viewer */}
            <div
              ref={containerRef}
              className="w-full flex justify-center bg-gray-100 py-6 overflow-auto max-h-[80vh]"
            >
              <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p className="text-gray-400 py-10">Loading PDF…</p>}
                error={<p className="text-red-400 py-10">Failed to load PDF.</p>}
              >
                <Page
                  pageNumber={pageNumber}
                  width={containerWidth ? containerWidth * 0.9 * scale : undefined}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Learn;