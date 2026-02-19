'use client';
import React from 'react';

const AssignmentTable = ({ assignments = [] }) => {

  const getProgressColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-400';
      case 'Not Started':
        return 'bg-red-400';
      default:
        return 'bg-yellow-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Not Started':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-base font-bold mb-3 text-gray-900">Pending Assessments</h3>
      
      <div className="overflow-x-auto max-h-48 overflow-y-auto">
        {assignments.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">No pending assessments</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-semibold text-gray-600 text-xs">Name</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-600 text-xs">Course</th>
                <th className="text-left py-2 px-2 font-semibold text-gray-600 text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-2 px-2 text-gray-900 truncate text-xs">{assignment.name}</td>
                  <td className="py-2 px-2 text-gray-600 text-xs">{assignment.courseName}</td>
                  <td className={`py-2 px-2 font-medium text-xs ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignmentTable;
