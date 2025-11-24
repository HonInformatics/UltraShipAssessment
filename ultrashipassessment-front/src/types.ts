export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  location: string;
  joinDate: string;
  avatarUrl?: string;
}
