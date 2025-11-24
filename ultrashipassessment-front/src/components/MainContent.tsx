import React, { useState } from 'react';
import { Employee } from '../types';
import { mockEmployees } from '../mockData';
import EmployeeGrid from './EmployeeGrid';
import EmployeeTile from './EmployeeTile';
import EmployeeDetail from './EmployeeDetail';
import './MainContent.css';

const MainContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = mockEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-content">
      <div className="content-header">
        <h1>Employee Directory</h1>
        <div className="view-switcher">
          <button 
            className={`switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button 
            className={`switch-btn ${viewMode === 'tile' ? 'active' : ''}`}
            onClick={() => setViewMode('tile')}
          >
            Tile View
          </button>
        </div>
      </div>

      <div className="content-body">
        {viewMode === 'grid' ? (
          <EmployeeGrid employees={currentEmployees} onSelect={setSelectedEmployee} />
        ) : (
          <div className="employee-tile-grid">
            {currentEmployees.map((employee) => (
              <EmployeeTile 
                key={employee.id} 
                employee={employee} 
                onSelect={setSelectedEmployee} 
              />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}

          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetail 
          employee={selectedEmployee} 
          onBack={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default MainContent;
