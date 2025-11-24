import React from 'react';
import { Employee } from '../types';
import './EmployeeGrid.css';

interface EmployeeGridProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees, onSelect }) => {
  return (
    <div className="employee-grid-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Location</th>
            <th>Join Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} onClick={() => onSelect(employee)} className="employee-row">
              <td>{employee.id}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                  {employee.status}
                </span>
              </td>
              <td>{employee.location}</td>
              <td>{employee.joinDate}</td>
              <td>
                <button className="view-btn" onClick={(e) => { e.stopPropagation(); onSelect(employee); }}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeGrid;
