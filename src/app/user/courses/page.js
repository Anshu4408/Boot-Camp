'use client';
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import PerformanceChart from '@/components/PerformanceChart';
import { Bell, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useAuthToken } from '@/components/AuthTokenProvider';
import { useRouter } from 'next/navigation';


const page = () => {
    const[AllCourses, setAllCourses] = React.useState([]);
    const[courses, setCourses] = React.useState([]);
    const[showAddModal, setShowAddModal] = React.useState(false);
    const[showDeleteModal, setShowDeleteModal] = React.useState(false);
    const[unenrolledCourses, setUnenrolledCourses] = React.useState([]);
    const { token } = useAuthToken();
    const dropdownRef = React.useRef(null);
    const deleteDropdownRef = React.useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAddModal(false);
            }
            if (deleteDropdownRef.current && !deleteDropdownRef.current.contains(event.target)) {
                setShowDeleteModal(false);
            }
        };

        if (showAddModal || showDeleteModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAddModal, showDeleteModal]);

        
        React.useEffect(() => {
            const fetchProgress = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/my`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Fetched progress data:', data);
                        setCourses( data.data); // Handle different response structures
                    } else {
                        console.error('Failed to fetch progress data');
                    }
                } catch (error) {
                    console.error('Error fetching progress data:', error);
                }
            };

            fetchProgress();
        }, []); // Empty dependency array to run only once on mount

    
    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllCourses(data.data); // Handle different response structures
                } else {
                    console.error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []); // Empty dependency array to run only once on mount

    // Calculate unenrolled courses
    React.useEffect(() => {
        console.log('AllCourses:', AllCourses);
        console.log('courses (enrolled):', courses);
        
        if (AllCourses.length > 0) {
          // Get IDs of enrolled courses, guard against removed courses
          const enrolledIds = courses
            .map((c) => c.course?._id || c.course?.id)
            .filter(Boolean);

            console.log('Enrolled IDs:', enrolledIds);
            
            // Filter AllCourses to find courses NOT in enrolled list
            const unenrolled = AllCourses.filter(course => {
                const courseId = course._id || course.id;
                return !enrolledIds.includes(courseId);
            });
            
            console.log('Unenrolled courses:', unenrolled);
            setUnenrolledCourses(unenrolled);
        }
    }, [AllCourses, courses]);

    const handleEnrollCourse = async (courseId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
               
            });
            if (response.ok) {
                // Refresh courses list
                const coursesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/my`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (coursesResponse.ok) {
                    const data = await coursesResponse.json();
                    setCourses(data.data || data);
                }
                setShowAddModal(false);
            } else {
                console.error('Failed to enroll in course');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    // const handleUnenrollCourse = async (courseId) => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/unenroll`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({ courseId }),
    //         });
    //         if (response.ok) {
    //             // Refresh courses list
    //             const coursesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/my`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });
    //             if (coursesResponse.ok) {
    //                 const data = await coursesResponse.json();
    //                 setCourses(data.data || data);
    //             }
    //             setShowDeleteModal(false);
    //         } else {
    //             console.error('Failed to unenroll from course');
    //         }
    //     } catch (error) {
    //         console.error('Error unenrolling from course:', error);
    //     }
    // };


  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">MANAGE COURSES</h1>
              <p className="text-sm text-gray-500 mt-1">Add, Edit Or Remove Courses In Your Platform</p>
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

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowAddModal(!showAddModal)}
                className="px-4 py-2 rounded-md bg-[#7C4BE7] text-white text-xs font-semibold hover:bg-[#6C3DD6] transition"
              >
                Add New Course
              </button>
              
              {/* Add Course Dropdown */}
              {showAddModal && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl w-[600px] z-50 border border-gray-200">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-800">Available Courses</h2>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="p-4 max-h-[400px] overflow-auto">
                    {unenrolledCourses.length === 0 ? (
                      <p className="text-center text-gray-500 py-8 text-xs">You can choose multiple course</p>
                    ) : (
                      <div className="space-y-2">
                        {unenrolledCourses.map((course, index) => (
                          <div
                            key={course._id || course.id || `unenrolled-${index}`}
                            className="grid grid-cols-4 gap-4 items-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            
                            <div className="text-xs text-gray-700">{course.title || course.name}</div>
                            <div className="text-xs text-gray-500">{course.instructor || course.community || 'N/A'}</div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleEnrollCourse(course._id)}
                                className="px-3 py-1.5 bg-[#7FEAD7] text-gray-700 text-xs font-semibold rounded hover:bg-[#6DD9C6] transition"
                              >
                                ADD COURSE
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* <button 
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                className="px-4 py-2 rounded-md bg-[#E75151] text-white text-xs font-semibold hover:bg-[#D64343] transition"
              >
                Delete Course
              </button>

              {/* Delete Course Dropdown */}
              {/*showDeleteModal && (
                <div className="absolute top-full left-32 mt-2 bg-white rounded-lg shadow-xl w-[600px] z-50 border border-gray-200" ref={deleteDropdownRef}>
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-800">Enrolled Courses</h2>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="p-4 max-h-[400px] overflow-auto">
                    {courses.length === 0 ? (
                      <p className="text-center text-gray-500 py-8 text-xs">No enrolled courses</p>
                    ) : (
                      <div className="space-y-2">
                        {courses.map((course) => (
                          <div
                            key={course._id}
                            className="grid grid-cols-4 gap-4 items-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="text-xs text-gray-700">{course.title || course.name}</div>
                            <div className="text-xs text-gray-500">{course.instructor || course.community || 'N/A'}</div>
                            <div className="text-xs text-gray-500">{course.progress || 0}%</div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleUnenrollCourse(course._id)}
                                className="px-3 py-1.5 bg-[#FFB3B3] text-gray-700 text-xs font-semibold rounded hover:bg-[#FF9999] transition"
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )*/} 
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses"
                className="pl-9 pr-4 py-2 text-xs bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
              <div className="grid grid-cols-6 gap-4 px-5 py-4 text-xs font-semibold text-gray-500 border-b border-gray-200">
           
                <div>NAME</div>
                <div>PROGRESS</div>
                <div>DATE ADDED</div>
                <div>Community</div>
                <div>STATUS</div>
              </div>
              <div className="flex-1 overflow-auto">
                {courses && courses.map((course, index) => {
                  const isRemoved = !course.course;
                  const courseId = course.course?._id || course.course?.id || `removed-${index}`;
                  const courseName = isRemoved
                    ? 'Course removed'
                    : (course.course.name || course.course.title || 'Untitled Course');
                  const dateAdded = isRemoved ? 'N/A' : (course.course.dateAdded || course.course.createdAt || 'N/A');
                  const dateDisplay = typeof dateAdded === 'string' ? dateAdded.split(' ') : ['N/A'];
                  
                  return (
                  <div
                    key={`${courseId}-${index}`}
                    className={`grid grid-cols-6 gap-4 px-5 py-4 text-xs border-b border-gray-100 items-center ${
                      isRemoved ? 'text-gray-400 bg-gray-50' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      if (isRemoved) return;
                      router.push(`/user/course/${courseId}`);
                    }}
                  >
                  
                     
                    <div className="leading-4">
                      {courseName}
                    </div>
                    <div>
                      <div className="w-24 h-1.5 rounded-full bg-gray-200">
                        <div
                          className={`h-1.5 rounded-full ${course.progressColor || 'bg-purple-500'}`}
                          style={{ width: `${isRemoved ? 0 : (course.progress || 0)}%` }}
                        />
                      </div>
                    </div>
                    <div className="leading-4">
                      {dateDisplay[0]} {dateDisplay[1] || ''}
                      <div className="text-gray-400">{dateDisplay[2] || ''}</div>
                    </div>
                    <div>{isRemoved ? 'Removed' : (course.course.community || course.instructor || 'N/A')}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-md text-[10px] font-semibold ${
                        isRemoved
                          ? 'bg-gray-200 text-gray-600'
                          : course.status === 'Paused'
                            ? 'bg-yellow-100 text-yellow-700'
                            : (course.statusColor || 'bg-green-100 text-green-700')
                      }`}>
                        {isRemoved
                          ? 'Removed'
                          : course.status === 'Paused'
                            ? 'Paused'
                            : (course.status || 'Active')}
                      </span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
