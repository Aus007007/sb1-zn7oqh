import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { User, Mail, Phone, Building, Calendar } from 'lucide-react';
import type { Employee } from '../../types';

const columnHelper = createColumnHelper<Employee>();

interface EmployeeTableProps {
  employees: Employee[];
  isLoading?: boolean;
}

export default function EmployeeTable({ employees, isLoading }: EmployeeTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = [
    columnHelper.accessor('employeeId', {
      header: 'Employee ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('department', {
      header: 'Department',
      cell: (info) => (
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-2 text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('position', {
      header: 'Position',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('contactNumber', {
      header: 'Contact',
      cell: (info) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('joinDate', {
      header: 'Join Date',
      cell: (info) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {new Date(info.getValue()).toLocaleDateString()}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: employees,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}