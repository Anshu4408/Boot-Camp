'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardHeader from '@/components/DashboardHeader'
import WelcomeBanner from '@/components/WelcomeBanner'
import StatsCard from '@/components/StatsCard'
import AssignmentTable from '@/components/AssignmentTable'
import DashboardCharts from '@/components/DashboardCharts'
import { CheckSquare, CheckCircle, Trophy } from 'lucide-react'
import { useAuthToken } from '@/components/AuthTokenProvider';
import PerformanceChart from '@/components/PerformanceChart';


const page = () => {
    const router = useRouter();
    const { token } = useAuthToken();
    const [userDetails, setUserDetails] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [overallProgress, setOverallProgress] = React.useState(0);
    const [activeTasks, setActiveTasks] = React.useState(0);
    const [completedTasks, setCompletedTasks] = React.useState(0);
    const [pendingAssessments, setPendingAssessments] = React.useState([]);
    const [coursesProgress, setCoursesProgress] = React.useState([]);

    useEffect(() => {
      if (!token) {
        router.push('/');
        return;
      }
    }, [token, router]);

    useEffect(() => {
      if (!token) return;
      
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const userData = data.data || data.user || data;
            setUserDetails(userData);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      const fetchDashboardData = async () => {
        try {
          // Fetch enrolled courses
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/my`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            console.error('Failed to fetch courses');
            return;
          }

          const data = await response.json();
          const enrolledCourses = data?.data || data || [];
          setCourses(enrolledCourses);

          // Calculate progress using completedStageIds and total stages
          const progressData = enrolledCourses
            .filter(course => course.course && course.completedStageIds)
            .map(course => {
              const totalStages = course.course.stages ? course.course.stages.length : 0;
              const completedStages = course.completedStageIds.length;
              const progress = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;
              return {
                name: course.course.title || course.course.name || 'Unknown Course',
                progress: Math.min(100, Math.max(0, progress)),
              };
            });

          setCoursesProgress(progressData);
          const totalProgress = progressData.reduce((sum, c) => sum + c.progress, 0);
          setOverallProgress(progressData.length > 0 ? totalProgress / progressData.length : 0);

          // Tasks and assessments (optional, can be improved if needed)
          setActiveTasks(0);
          setCompletedTasks(0);
          setPendingAssessments([]);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };

      fetchUserDetails();
      fetchDashboardData();
    }, [token]);


    if (!token) {
      return null;
    }

    return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 overflow-auto p-4">
          {/* Welcome Banner */}
          <WelcomeBanner userName={userDetails?.name || "User"} />
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <StatsCard icon={CheckSquare} label="Active Tasks" value={activeTasks.toString()} color="purple" />
            <StatsCard icon={CheckCircle} label="Completed Tasks" value={completedTasks.toString()} color="blue" />
            <StatsCard icon={Trophy} label="Courses Enrolled" value={courses.length.toString()} color="indigo" />
          </div>

          {/* Charts and Assignment Table */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="col-span-2">
              <DashboardCharts overallProgress={overallProgress} coursesProgress={coursesProgress} />
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
              {/* Performance Chart Integration */}
              <PerformanceChart progress={overallProgress} />
            </div>
            </div>
            <div>
              <AssignmentTable assignments={pendingAssessments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
