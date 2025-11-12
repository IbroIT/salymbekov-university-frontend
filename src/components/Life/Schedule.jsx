import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';

// Настройка worker для react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfScheduleViewer = () => {
  const { t } = useTranslation('common');
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState('');

  const onFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setPageNumber(1);
      setError('');
    } else {
      setError('Please select a valid PDF file');
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error('Error loading PDF:', error);
    setError(t('schedule.error'));
  }, [t]);

  const goToPreviousPage = useCallback(() => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t('schedule.title')}
      </h1>

      {/* Загрузка файла */}
      {!file && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-400 mb-6"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => document.getElementById('pdf-input').click()}
        >
          <div className="text-gray-600 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium">{t('schedule.dragAndDrop')}</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
            {t('schedule.selectFile')}
          </button>
          <input
            id="pdf-input"
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* PDF просмотрщик */}
      {file && (
        <div className="space-y-4">
          {/* Панель управления */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
              >
                {t('schedule.previous')}
              </button>
              <span className="text-gray-700">
                {t('schedule.page')} {pageNumber} {t('schedule.of')} {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
              >
                {t('schedule.next')}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
              >
                {t('schedule.zoomOut')}
              </button>
              <span className="text-gray-700 min-w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded transition-colors"
              >
                {t('schedule.zoomIn')}
              </button>
            </div>

            <button
              onClick={() => setFile(null)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              {t('schedule.loadPdf')}
            </button>
          </div>

          {/* PDF документ */}
          <div className="border rounded-lg overflow-hidden">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex justify-center items-center py-12">
                  <div className="text-lg text-gray-600">{t('schedule.loading')}</div>
                </div>
              }
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                className="flex justify-center"
                loading={
                  <div className="flex justify-center items-center py-8">
                    <div className="text-gray-600">{t('schedule.loading')}</div>
                  </div>
                }
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfScheduleViewer;