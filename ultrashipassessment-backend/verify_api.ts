import { generateToken } from './src/auth';
import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/';

const adminToken = generateToken({ id: 'admin1', role: 'admin' });
const employeeToken = generateToken({ id: 'emp1', role: 'employee' });

async function runQuery(query: string, variables: any = {}, token: string = '') {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

async function verify() {
  console.log('--- Verifying API ---');

  // 1. List Employees (Public/Employee)
  console.log('\n1. List Employees (No Auth)');
  const listQuery = `
    query {
      employees {
        id
        name
        class
      }
    }
  `;
  const listResult = await runQuery(listQuery);
  console.log('Result:', JSON.stringify(listResult.data, null, 2));

  // 2. Add Employee (Admin Only)
  console.log('\n2. Add Employee (Admin Auth)');
  const addMutation = `
    mutation {
      addEmployee(name: "New Guy", age: 25, class: "11A", subjects: ["Art"], attendance: 90.0) {
        id
        name
      }
    }
  `;
  const addResult = await runQuery(addMutation, {}, adminToken);
  console.log('Result:', JSON.stringify(addResult.data, null, 2));

  // 3. Add Employee (Unauthorized)
  console.log('\n3. Add Employee (Employee Auth - Should Fail)');
  const addFailResult = await runQuery(addMutation, {}, employeeToken);
  console.log('Errors:', JSON.stringify(addFailResult.errors, null, 2));

  // 4. Pagination
  console.log('\n4. Pagination (Limit 1)');
  const paginationQuery = `
    query {
      employees(limit: 1) {
        name
      }
    }
  `;
  const pageResult = await runQuery(paginationQuery);
  console.log('Result:', JSON.stringify(pageResult.data, null, 2));

  // 5. Sorting
  console.log('\n5. Sorting (By Name DESC)');
  const sortQuery = `
    query {
      employees(sortBy: "name", sortOrder: "desc") {
        name
      }
    }
  `;
  const sortResult = await runQuery(sortQuery);
  console.log('Result:', JSON.stringify(sortResult.data, null, 2));
}

verify().catch(console.error);
