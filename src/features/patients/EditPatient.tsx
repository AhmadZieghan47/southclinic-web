/**
 * Edit Patient Page
 * Form for editing existing patient information
 */

import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPatientById, updatePatient } from '../../services/patientApi';
import { Card, Button, Input } from '../../design-system';
import type { Patient, UpdatePatientData } from '../../types/patient';
import styles from './EditPatient.module.css';

export const EditPatient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'M' as 'M' | 'F' | 'O',
    phone: '',
    nationalId: '',
    hasInsurance: false,
    extraCare: false,
    notes: '',
  });

  // Fetch patient data
  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getPatientById(id);
        setPatient(data);
        
        // Populate form
        setFormData({
          fullName: data.fullName,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          nationalId: data.nationalId || '',
          hasInsurance: data.hasInsurance,
          extraCare: data.extraCare,
          notes: data.notes || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load patient');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    try {
      setSaving(true);
      setError(null);
      
      const updateData: UpdatePatientData = {
        fullName: formData.fullName,
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone,
        nationalId: formData.nationalId || null,
        hasInsurance: formData.hasInsurance,
        extraCare: formData.extraCare,
        notes: formData.notes || null,
      };
      
      await updatePatient(id, updateData);
      
      // Navigate back to patient details
      navigate(`/patients/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update patient');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading patient...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link to="/patients" className={styles.backLink}>
          ← Patients
        </Link>
      </div>

      <Card>
        <h2 className={styles.title}>Edit Patient</h2>
        
        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Patient Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Patient Information</h3>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name *</label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dob">Date of Birth *</label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={styles.select}
                  required
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nationalId">National ID</label>
                <Input
                  id="nationalId"
                  name="nationalId"
                  type="text"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="hasInsurance"
                    checked={formData.hasInsurance}
                    onChange={handleInputChange}
                  />
                  <span>Has Insurance</span>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="extraCare"
                    checked={formData.extraCare}
                    onChange={handleInputChange}
                  />
                  <span>Extra Care</span>
                </label>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Link to={`/patients/${id}`}>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="primary" loading={saving} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditPatient;
