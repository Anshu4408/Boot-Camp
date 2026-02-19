'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuthToken } from '@/components/AuthTokenProvider';
import StageItem from '@/components/StageItem';

const page = () => {
  const router = useRouter();
  const { Id } = useParams();
  const { token } = useAuthToken();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stages, setStages] = useState([]);
  const [completedStages, setCompletedStages] = useState([]);

  const handleStageComplete = (stageId) => {
    setCompletedStages((prev) => [...prev, stageId]);
  };

  const handleStageSubmit = (stageId) => {
    setCompletedStages((prev) => [...prev, stageId]);
  };

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (!token || !Id) {
      return;
    }

    const fetchCourse = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${Id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setError('Failed to load course.');
          setLoading(false);
          return;
        }

        const data = await response.json();
        const courseData = data.data.course;
        setCourse(courseData);
        setStages(data?.data.stages || []);
        setCompletedStages(data?.data.completedStageIds || []);
        console.log('Fetched course data:', courseData);
        console.log('Fetched stages data:', data?.data.stages);
      } catch (fetchError) {
        console.error('Error loading course:', fetchError);
        setError('Failed to load course.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [Id, token]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">
                {course?.name || course?.title || 'Course'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {course?.description || 'Course details and materials.'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell size={18} className="text-gray-500" />
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                  6
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden" />
                <div className="text-xs text-gray-600">
                  <div className="font-semibold text-gray-800">Kim Tae</div>
                  <div>User</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading course...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400">COURSE ID</p>
                  <p className="text-sm text-gray-800 mt-1">{Id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">INSTRUCTOR</p>
                  <p className="text-sm text-gray-800 mt-1">
                    {course?.instructor || course?.community || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">STATUS</p>
                  <p className="text-sm text-gray-800 mt-1">
                    {course?.status || 'Active'}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">Course Content</h2>
                  <span className="text-xs text-gray-400">
                    {completedStages.length} / {stages.length} completed
                  </span>
                </div>

                {stages.length === 0 ? (
                  <p className="text-sm text-gray-500 mt-3">No stages available.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {stages.map((stage, index) => {
                      const stageId = stage?._id || `stage-${index}`;
                      const isCompleted = completedStages.includes(stageId);
                      
                      // Lock stages if previous stage not completed
                      const isLocked = index > 0 && !completedStages.includes(stages[index - 1]?._id);

                      return (
                        <StageItem
                          key={stageId}
                          stage={stage}
                          index={index}
                          isCompleted={isCompleted}
                          isLocked={isLocked}
                          onComplete={handleStageComplete}
                          onSubmit={handleStageSubmit}
                          token={token}
                          courseId={Id}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
