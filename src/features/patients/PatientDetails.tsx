/**
 * Patient Details Page
 * Displays comprehensive patient information with appointments, payments, and files
 */

import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { usePatientDetails } from '../../hooks/usePatientDetails';
import { Card, Button, Input } from '../../design-system';
import styles from './PatientDetails.module.css';

export const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'payments' | 'files'>('appointments');

  const {
    patient,
    loading,
    error,
    searchText,
    handleSearch,
    handleRetry,
    clearError,
    filteredAppointments,
    filteredPayments,
    filteredFiles,
  } = usePatientDetails({ patientId: id });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleBookAppointment = () => {
    if (patient?.id) {
      navigate(`/appointments/new/${patient.id}`);
    } else {
      navigate('/appointments/new');
    }
  };

  const handleBeginTreatment = () => {
    if (patient?.id) {
      navigate(`/treatment/begin/${patient.id}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading patient details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <Card className={styles.errorCard}>
          <div className={styles.errorContent}>
            <p className={styles.errorMessage}>{error.message}</p>
            <div className={styles.errorActions}>
              <Button variant="outlinePrimary" size="sm" onClick={handleRetry}>
                Retry
              </Button>
              <Button variant="outlineSecondary" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          </div>
        </Card>
        <div className={styles.backButton}>
          <Link to="/patients">
            <Button variant="secondary">← Back to Patients List</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!patient) {
    return (
      <div className={styles.container}>
        <Card>
          <h2>Patient Not Found</h2>
          <p>The requested patient could not be found.</p>
          <Link to="/patients">
            <Button variant="primary">Back to Patients List</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Calculate age
  const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();

  return (
    <div className={styles.container}>
      {/* Patient Header */}
      <Card className={`${styles.patientHeader} ${!patient.isActive ? styles.inactive : ''}`}>
        {!patient.isActive && (
          <div className={styles.inactiveWarning}>⚠️ This patient is currently inactive</div>
        )}

        <div className={styles.headerContent}>
          <div className={styles.patientInfo}>
            <div className={styles.avatar}>
              <span className={styles.avatarText}>{patient.fullName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div className={styles.patientId}>#{patient.id}</div>
              <div className={styles.patientName}>{patient.fullName}</div>
              <div className={styles.badges}>
                {patient.hasInsurance ? (
                  <span className={styles.badgeInsurance}>Insurance</span>
                ) : null}
                {patient.extraCare ? (
                  <span className={styles.badgeExtraCare}>Extra Care</span>
                ) : null}
                {!patient.isActive && <span className={styles.badgeInactive}>Inactive</span>}
              </div>
              <div className={styles.patientContact}>📞 {patient.phone}</div>
            </div>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.patientBalance}>
              Balance:{' '}
              <span
                className={
                  parseFloat(patient.balance) < 0 ? styles.negativeBalance : styles.positiveBalance
                }
              >
                {patient.balance} JD
              </span>
            </div>
            {patient.isActive ? (
              <Button variant="primary" onClick={handleBookAppointment}>
                Book Appointment
              </Button>
            ) : (
              <Button variant="warning" onClick={handleBeginTreatment}>
                Begin Treatment
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Patient Information Grid */}
      <div className={styles.infoGrid}>
        {/* About & Insurance */}
        <Card>
          <h3 className={styles.cardTitle}>About & Insurance</h3>
          <div className={styles.infoFields}>
            <div className={styles.field}>
              <label>DOB</label>
              <span>{patient.dob}</span>
            </div>
            <div className={styles.field}>
              <label>Age</label>
              <span>{age} years</span>
            </div>
            <div className={styles.field}>
              <label>Gender</label>
              <span>
                {patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}
              </span>
            </div>
            <div className={styles.field}>
              <label>National ID</label>
              <span>{patient.nationalId || 'N/A'}</span>
            </div>
          </div>
        </Card>

        {/* Medical History */}
        <Card>
          <h3 className={styles.cardTitle}>Medical History & Implants</h3>
          <div className={styles.infoFields}>
            <div className={styles.fieldFull}>
              <label>Medical History</label>
              {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                <ul className={styles.list}>
                  {patient.medicalHistory.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              ) : (
                <span className={styles.noData}>No medical history recorded</span>
              )}
            </div>
            <div className={styles.fieldFull}>
              <label>Orthopedic Implants</label>
              {patient.orthopedicImplants && patient.orthopedicImplants.length > 0 ? (
                <ul className={styles.list}>
                  {patient.orthopedicImplants.map((implant, index) => (
                    <li key={index}>{implant}</li>
                  ))}
                </ul>
              ) : (
                <span className={styles.noData}>No orthopedic implants recorded</span>
              )}
            </div>
          </div>
        </Card>

        {/* Active Plan (if exists) */}
        {patient.isActive && patient.plans && patient.plans.length > 0 ? (
          <Card>
            <h3 className={styles.cardTitle}>Active Treatment Plan</h3>
            <div className={styles.infoFields}>
              <div className={styles.field}>
                <label>Plan Type</label>
                <span>{patient.plans[0].planType.replace('_', ' ')}</span>
              </div>
              <div className={styles.field}>
                <label>Status</label>
                <span className={styles.badgeSuccess}>{patient.plans[0].status}</span>
              </div>
              <div className={styles.field}>
                <label>Sessions</label>
                <span>
                  {patient.plans[0].completedSessions} / {patient.plans[0].totalSessions || '∞'}
                </span>
              </div>
              <div className={styles.field}>
                <label>Price</label>
                <span>{patient.plans[0].priceJd} JD</span>
              </div>
            </div>
          </Card>
        ) : null}
      </div>

      {/* Tabs Section */}
      <Card>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'appointments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'payments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'files' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('files')}
          >
            Files
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <Input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Session Type</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyState}>
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{new Date(appointment.startsAt).toLocaleString()}</td>
                      <td>{appointment.sessionType.replace('_', ' ')}</td>
                      <td>{appointment.location}</td>
                      <td>
                        <span className={styles[`status${appointment.status}`]}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>{appointment.noteEn || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Plan ID</th>
                  <th>Appointment ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyState}>
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{new Date(payment.paidAt).toLocaleDateString()}</td>
                      <td className={styles.amountCell}>{payment.amountJd} JD</td>
                      <td>{payment.method}</td>
                      <td>{payment.planId || '-'}</td>
                      <td>{payment.appointmentId || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyState}>
                      No files found
                    </td>
                  </tr>
                ) : (
                  filteredFiles.map((file) => (
                    <tr key={file.id}>
                      <td>{file.labelEn || file.labelAr || 'Untitled'}</td>
                      <td>{file.mimeType}</td>
                      <td>{(file.sizeBytes / 1024).toFixed(2)} KB</td>
                      <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button variant="outlinePrimary" size="sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Back Button */}
      <div className={styles.backButton}>
        <Link to="/patients">
          <Button variant="secondary">← Back to Patients List</Button>
        </Link>
      </div>
    </div>
  );
};

export default PatientDetails;
