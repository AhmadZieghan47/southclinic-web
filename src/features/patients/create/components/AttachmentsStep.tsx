/**
 * AttachmentsStep Component
 * Step 3: File uploads with drag-and-drop
 */

import { useCallback, useRef } from 'react';
import { Upload, File, Image, X, AlertCircle } from 'lucide-react';
import { Card, Button, AlertBanner } from '../../../../design-system';
import type { AttachmentFile, AttachmentsData } from '../CreatePatientWizard.types';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../CreatePatientWizard.types';
import styles from './Steps.module.css';

interface AttachmentsStepProps {
  attachmentsData: AttachmentsData;
  onAddFile: (file: File) => void;
  onRemoveFile: (id: string) => void;
  errors?: Record<string, string>;
}

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Get file icon based on type
function getFileIcon(type: string) {
  if (type.startsWith('image/')) {
    return <Image size={20} className={styles.fileIcon} />;
  }
  return <File size={20} className={styles.fileIcon} />;
}

export function AttachmentsStep({
  attachmentsData,
  onAddFile,
  onRemoveFile,
}: AttachmentsStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      Array.from(files).forEach((file) => {
        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          console.warn(`File type ${file.type} not allowed`);
          return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          console.warn(`File ${file.name} exceeds maximum size`);
          return;
        }

        onAddFile(file);
      });
    },
    [onAddFile]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileSelect]
  );

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  // Trigger file input click
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={styles.stepContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Attachments</h2>
        <p className={styles.sectionDescription}>
          Upload patient referrals, reports, or consent forms. Files should be PDF, JPG, or PNG,
          and no larger than 10MB each.
        </p>
      </div>

      {/* Upload Area */}
      <Card className={styles.formCard}>
        <div
          className={styles.dropZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <Upload size={40} className={styles.dropZoneIcon} />
          <div className={styles.dropZoneText}>
            <span className={styles.dropZoneLink}>Click to upload</span> or drag and drop
          </div>
          <p className={styles.dropZoneHelp}>PDF, JPG, PNG (max. 10MB per file)</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_FILE_TYPES.join(',')}
            multiple
            onChange={handleInputChange}
            className={styles.hiddenInput}
          />
        </div>
      </Card>

      {/* Uploaded Files */}
      {attachmentsData.files.length > 0 && (
        <Card className={styles.formCard}>
          <h3 className={styles.cardTitle}>Uploaded Files</h3>
          <div className={styles.fileList}>
            {attachmentsData.files.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={() => onRemoveFile(file.id)}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Info Banner */}
      <AlertBanner variant="info" title="Optional Step">
        Attachments are optional. You can add files now or upload them later from the patient's profile.
      </AlertBanner>
    </div>
  );
}

// File Item Component
interface FileItemProps {
  file: AttachmentFile;
  onRemove: () => void;
}

function FileItem({ file, onRemove }: FileItemProps) {
  const isError = file.status === 'error';
  const isUploading = file.status === 'uploading';

  return (
    <div className={`${styles.fileItem} ${isError ? styles.fileItemError : ''}`}>
      <div className={styles.fileItemIcon}>
        {isError ? (
          <AlertCircle size={20} className={styles.fileIconError} />
        ) : (
          getFileIcon(file.type)
        )}
      </div>
      
      <div className={styles.fileItemInfo}>
        <p className={styles.fileName}>{file.name}</p>
        {isUploading && file.progress !== undefined ? (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${file.progress}%` }}
            />
          </div>
        ) : (
          <p className={styles.fileSize}>{formatFileSize(file.size)}</p>
        )}
        {isError && file.error && (
          <p className={styles.fileError}>{file.error}</p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className={styles.fileRemoveButton}
        aria-label="Remove file"
      >
        <X size={18} />
      </Button>
    </div>
  );
}

export default AttachmentsStep;
