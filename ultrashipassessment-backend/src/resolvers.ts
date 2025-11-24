import { v4 as uuidv4 } from 'uuid';

// Mock Data
let employees = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    class: '10A',
    subjects: ['Math', 'Physics'],
    attendance: 95.5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    class: '10B',
    subjects: ['English', 'History'],
    attendance: 98.0,
  },
  // Add more mock data as needed
];

export const resolvers = {
  Query: {
    employees: (_: any, { page = 1, limit = 10, sortBy, sortOrder = 'asc', filterName, filterClass }: any) => {
      let filteredEmployees = [...employees];

      // Filtering
      if (filterName) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }
      if (filterClass) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.class.toLowerCase() === filterClass.toLowerCase()
        );
      }

      // Sorting
      if (sortBy) {
        filteredEmployees.sort((a: any, b: any) => {
          if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      return filteredEmployees.slice(startIndex, endIndex);
    },
    employee: (_: any, { id }: any) => {
      return employees.find(emp => emp.id === id);
    },
  },
  Mutation: {
    addEmployee: (_: any, { name, age, class: className, subjects, attendance }: any, context: any) => {
      // Auth check will go here
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can add employees');
      }

      const newEmployee = {
        id: uuidv4(),
        name,
        age,
        class: className,
        subjects,
        attendance,
      };
      employees.push(newEmployee);
      return newEmployee;
    },
    updateEmployee: (_: any, { id, ...updates }: any, context: any) => {
      // Auth check will go here
      if (!context.user || context.user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can update employees');
      }

      const index = employees.findIndex(emp => emp.id === id);
      if (index === -1) throw new Error('Employee not found');

      employees[index] = { ...employees[index], ...updates };
      return employees[index];
    },
  },
};
