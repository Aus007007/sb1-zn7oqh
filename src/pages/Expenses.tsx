import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  DollarSign,
  Calendar,
  FileText,
  Plus,
  Check,
  X,
  Clock,
} from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  attachments: string[];
  submittedBy: string;
}

function ExpensesPage() {
  const { data: expenses } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          category: 'Travel',
          amount: 5000,
          date: '2024-03-10',
          description: 'Client meeting travel expenses',
          status: 'pending',
          attachments: ['receipt1.pdf'],
          submittedBy: 'John Doe',
        },
        {
          id: '2',
          category: 'Office Supplies',
          amount: 2500,
          date: '2024-03-12',
          description: 'Monthly office supplies',
          status: 'approved',
          attachments: ['receipt2.pdf', 'invoice.pdf'],
          submittedBy: 'Jane Smith',
        },
      ] as Expense[];
    },
  });

  const ExpenseCard = ({ expense }: { expense: Expense }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {expense.category}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{expense.description}</p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            expense.status === 'approved'
              ? 'bg-green-100 text-green-800'
              : expense.status === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {expense.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign className="h-4 w-4 mr-2" />
          ₹{expense.amount.toLocaleString()}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          {expense.date}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {expense.attachments.length} attachment(s)
            </span>
          </div>
        </div>
        {expense.status === 'pending' && (
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Expense Management
        </h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Submit Expense
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Expenses
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹
                {expenses
                  ?.reduce((acc, exp) => acc + exp.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pending Approvals
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  expenses?.filter((exp) => exp.status === 'pending').length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Approved This Month
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  expenses?.filter((exp) => exp.status === 'approved')
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {expenses?.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}

export default ExpensesPage;