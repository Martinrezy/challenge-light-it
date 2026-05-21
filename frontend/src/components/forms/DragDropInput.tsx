import { useEffect, useRef, useState, type DragEvent } from 'react';
import './DragDropInput.css';

interface DragDropInputProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  showError: boolean;
}

export function DragDropInput({ file, onChange, error, showError }: DragDropInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFiles = (files: FileList | null) => {
    const picked = files?.[0];
    if (!picked) return;
    onChange(/\.jpe?g$/i.test(picked.name) ? picked : null);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="field">
      <label className="field__label">Document photo (JPG)</label>
      <div
        className={`dropzone ${dragOver ? 'dropzone--over' : ''} ${file ? 'dropzone--filled' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,image/jpeg"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {file && previewUrl ? (
          <>
            <img className="dropzone__preview" src={previewUrl} alt="Document preview" />
            <span className="dropzone__name">{file.name}</span>
          </>
        ) : (
          <p className="dropzone__hint">Drag & drop a JPG here, or click to browse</p>
        )}
      </div>
      {showError && error && <p className="field__error">{error}</p>}
    </div>
  );
}
