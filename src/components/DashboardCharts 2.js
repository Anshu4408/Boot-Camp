'use client';
import React from 'react';

const DashboardCharts = ({ overallProgress = 0, coursesProgress = [] }) => {
  const circumference = 2 * Math.PI * 50;
  const progressDash = (overallProgress / 100) * circumference;
  const maxProgress = 100;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Performance Card */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">Performance</h3>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" strokeWidth="12" />
              {/* Progress circle */}
             {overallProgress > 0 && (
  <circle
    cx="60"
    cy="60"
    r="50"
    fill="none"
    stroke="#4F46E5"
    strokeWidth="12"
    strokeDasharray={`${progressDash} ${circumference}`}
    strokeLinecap="round"
    transform="rotate(-90 60 60)"
  />
)}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-lg font-bold text-gray-900">{Math.round(overallProgress)}%</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Course Progress</h3>
          <span className="text-xs text-gray-500">
            {coursesProgress.length} enrolled
          </span>
        </div>
        
        <div className="h-32 flex items-end justify-around gap-1">
          {coursesProgress.length > 0 ? (
            coursesProgress.slice(0, 10).map((course, index) => {
              const validProgress = typeof course.progress === 'number' && !isNaN(course.progress) 
                ? Math.min(100, Math.max(0, course.progress))
                : 0;
              
              return (
                <div
                  key={index}
                  className="flex-1 bg-indigo-400 rounded-t-lg hover:bg-indigo-500 transition"
                  style={{ height: `${validProgress}%`, minHeight: '5%' }}
                  title={`${course.name}: ${Math.round(validProgress)}%`}
                ></div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-xs text-gray-400">No courses enrolled</p>
            </div>
          )}
        </div>
        
        <div className="mt-3 text-center text-xs text-gray-600">
          <p>Individual course completion</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
