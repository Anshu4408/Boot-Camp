'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, X, Cpu, Lock, Zap } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdminAuth } from '@/hooks/useAuth';
import Sidehero from '@/components/sidehero';

const AdminCoursesPage = () => {
  const router = useRouter();
  const { token, isAdmin } = useAdminAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: '',
    community: 'tecOs',
    isPublished: false,
  });

  useEffect(() => {
    if (token && isAdmin) {
      fetchCourses();
    }
  }, [token, isAdmin]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data?.data || data || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const community = formData.community || 'tecOs';
      const payload = {
        title: formData.title,
        description: formData.description,
        community,
        isPublished: formData.isPublished,
      };
      if (formData.order) payload.order = parseInt(formData.order);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchCourses();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (formData.title) payload.title = formData.title;
      if (formData.description) payload.description = formData.description;
      if (formData.order) payload.order = parseInt(formData.order);
      if (formData.community) payload.community = formData.community;
      payload.isPublished = formData.isPublished;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${editingCourse._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        await fetchCourses();
        setEditingCourse(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleTogglePublish = async (courseId, nextValue) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ isPublished: nextValue }),
        }
      );

      if (response.ok) {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error updating publish status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      order: '',
      community: 'tecOs',
      isPublished: false,
    });
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      description: course.description || '',
      order: course.order?.toString() || '',
      community: course.community || 'tecOs',
      isPublished: course.isPublished || false,
    });
  };

  if (!token || !isAdmin) {
    return null;
  }

  return (
    
    <div className="flex h-screen bg-gray-50 p-0 m-0">
      <Sidehero />
    
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-6xl font-semibold text-gray-900 tracking-wide">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Create, edit, and delete courses</p>
            </div>
           
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.community}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/courses/${course._id}`)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Order: {course.order}</span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!course.isPublished}
                          onChange={(e) => handleTogglePublish(course._id, e.target.checked)}
                          className="h-4 w-4 text-[#7C4BE7] rounded"
                        />
                        <span
                          className={`px-2 py-1 rounded-full font-semibold ${
                            course.isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCourse) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingCourse ? 'Edit Course' : 'Create Course'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingCourse(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={editingCourse ? handleUpdate : handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Community</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, community: 'tecOs' }))}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.community === 'tecOs'
                        ? 'border-[#7C4BE7] bg-[#F3E8FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Cpu size={28} className="mx-auto mb-2 text-[#7C4BE7]" />
                    <h4 className="font-semibold text-sm text-gray-900">TeCOS</h4>
                    <p className="text-xs text-gray-600 mt-1">Technology & Code</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, community: 'cypher' }))}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.community === 'cypher'
                        ? 'border-[#7C4BE7] bg-[#F3E8FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Lock size={28} className="mx-auto mb-2 text-[#7C4BE7]" />
                    <h4 className="font-semibold text-sm text-gray-900">Cypher</h4>
                    <p className="text-xs text-gray-600 mt-1">Security & Crypto</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, community: 'Nuts&volts' }))}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.community === 'Nuts&volts'
                        ? 'border-[#7C4BE7] bg-[#F3E8FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Zap size={28} className="mx-auto mb-2 text-[#7C4BE7]" />
                    <h4 className="font-semibold text-sm text-gray-900">Nuts&volts</h4>
                    <p className="text-xs text-gray-600 mt-1">Electronics & Hardware</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, order: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                />
              </div>


              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7C4BE7] text-white text-sm font-semibold rounded-md hover:bg-[#6C3DD6] transition"
                >
                  {editingCourse ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCourse(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
        </div>
      )}


      {/* Floating New Course Button */}
      <button
        onClick={() => {
          setEditingCourse(null);
          resetForm();
          setShowCreateModal(true);
        }}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 bg-[#7C4BE7] text-white font-semibold rounded-full shadow-lg hover:bg-[#6C3DD6] transition-all hover:shadow-xl z-40"
        title="Create New Course"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">New Course</span>
      </button>
    </div>
  );
};

export default AdminCoursesPage;
