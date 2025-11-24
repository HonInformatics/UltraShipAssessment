import React from 'react';
import { Employee } from '../types';
import './EmployeeDetail.css';

interface EmployeeDetailProps {
  employee: Employee;
  onBack: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onBack }) => {
  return (
    <div className="employee-detail-overlay">
      <div className="employee-detail-modal">
        <button className="back-btn" onClick={onBack}>
          ← Back to List
        </button>
        
        <div className="detail-header">
          <div className="detail-avatar">
            {employee.avatarUrl ? (
              <img src={employee.avatarUrl} alt={`${employee.firstName} ${employee.lastName}`} />
            ) : (
              <div className="detail-avatar-placeholder">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
            )}
          </div>
          <div className="detail-title">
            <h2>{employee.firstName} {employee.lastName}</h2>
            <p className="detail-role">{employee.role}</p>
            <span className={`detail-status ${employee.status.toLowerCase().replace(' ', '-')}`}>
              {employee.status}
            </span>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Email</label>
                <p>{employee.email}</p>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{employee.phone}</p>
              </div>
              <div className="detail-item">
                <label>Location</label>
                <p>{employee.location}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Employment Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Department</label>
                <p>{employee.department}</p>
              </div>
              <div className="detail-item">
                <label>Join Date</label>
                <p>{employee.joinDate}</p>
              </div>
              <div className="detail-item">
                <label>Employee ID</label>
                <p>#{employee.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
