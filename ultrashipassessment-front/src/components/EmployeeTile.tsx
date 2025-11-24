import React, { useState } from 'react';
import { Employee } from '../types';
import './EmployeeTile.css';

interface EmployeeTileProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
}

const EmployeeTile: React.FC<EmployeeTileProps> = ({ employee, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  return (
    <div className="employee-tile" onClick={() => onSelect(employee)}>
      <div className="tile-header">
        <div className="tile-avatar">
          {employee.avatarUrl ? (
            <img src={employee.avatarUrl} alt={`${employee.firstName} ${employee.lastName}`} />
          ) : (
            <div className="avatar-placeholder">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
          )}
        </div>
        <div className="tile-options">
          <button className="bun-button" onClick={toggleOptions}>
            ⋮
          </button>
          {showOptions && (
            <div className="options-menu" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => console.log('Edit', employee.id)}>Edit</button>
              <button onClick={() => console.log('Flag', employee.id)}>Flag</button>
              <button onClick={() => console.log('Delete', employee.id)} className="delete-option">Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="tile-content">
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p className="tile-role">{employee.role}</p>
        <p className="tile-dept">{employee.department}</p>
        <div className={`tile-status ${employee.status.toLowerCase().replace(' ', '-')}`}>
          {employee.status}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTile;
