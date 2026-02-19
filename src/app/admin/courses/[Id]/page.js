'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronRight, BookOpen, ClipboardList } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdminAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Sidehero from '@/components/sidehero';

const AdminCourseDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.Id;
  const { token, isAdmin } = useAdminAuth();

  const [course, setCourse] = useState(null);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateStageModal, setShowCreateStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [stageFormData, setStageFormData] = useState({
    title: '',
    type: 'article',
    description: '',
    order: '',
    passingPercentage: 60,
    allowRetries: true,
    questions: [],
  });

  const [expandedStage, setExpandedStage] = useState(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentStageId, setCurrentStageId] = useState(null);
  const [assessmentFormData, setAssessmentFormData] = useState({
    passingPercentage: 60,
    allowRetries: true,
    questions: [],
  });

  useEffect(() => {
    if (token && isAdmin && courseId) {
      fetchCourse();
      fetchStages();
    }
  }, [token, isAdmin, courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCourse(data?.data || data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const fetchStages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}/stages`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStages(data?.data || data || []);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: stageFormData.title,
        type: stageFormData.type,
      };
      if (stageFormData.description && stageFormData.type === 'article') {
        payload.description = stageFormData.description;
      }
      if (stageFormData.order) payload.order = parseInt(stageFormData.order);

      // For assessment type, create stage and then create assessment
      if (stageFormData.type === 'assessment') {
        // First create the stage
        const stageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}/stages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (stageResponse.ok) {
          const stageData = await stageResponse.json();
          const newStageId = stageData?.data?._id || stageData?._id;

          // Then create the assessment if there are questions
          if (stageFormData.questions.length > 0 && newStageId) {
            const assessmentPayload = {
              passingPercentage: stageFormData.passingPercentage,
              allowRetries: stageFormData.allowRetries,
              questions: stageFormData.questions,
            };

            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${newStageId}/assessment`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(assessmentPayload),
              }
            );
          }

          await fetchStages();
          setShowCreateStageModal(false);
          resetStageForm();
        }
      } else {
        // For article type, create normally
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}/stages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          await fetchStages();
          setShowCreateStageModal(false);
          resetStageForm();
        }
      }
    } catch (error) {
      console.error('Error creating stage:', error);
    }
  };

  const handleUpdateStage = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (stageFormData.title) payload.title = stageFormData.title;
      if (stageFormData.description) payload.description = stageFormData.description;
      if (stageFormData.type) payload.type = stageFormData.type;
      if (stageFormData.order) payload.order = parseInt(stageFormData.order);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${editingStage._id}`,
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
        await fetchStages();
        setEditingStage(null);
        resetStageForm();
      }
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  const handleDeleteStage = async (stageId) => {
    if (!confirm('Are you sure you want to delete this stage?')) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${stageId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchStages();
      }
    } catch (error) {
      console.error('Error deleting stage:', error);
    }
  };

  const resetStageForm = () => {
    setStageFormData({
      title: '',
      type: 'article',
      description: '',
      order: '',
      passingPercentage: 60,
      allowRetries: true,
      questions: [],
    });
  };

  const openEditStageModal = (stage) => {
    setEditingStage(stage);
    setStageFormData({
      title: stage.title || '',
      type: stage.type || 'article',
      description: stage.description || '',
      order: stage.order?.toString() || '',
      passingPercentage: 60,
      allowRetries: true,
      questions: [],
    });
  };

  const addQuestionToStage = () => {
    setStageFormData({
      ...stageFormData,
      questions: [
        ...stageFormData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
        },
      ],
    });
  };

  const updateQuestionInStage = (index, field, value) => {
    const updatedQuestions = [...stageFormData.questions];
    updatedQuestions[index][field] = value;
    setStageFormData({ ...stageFormData, questions: updatedQuestions });
  };

  const updateQuestionOptionInStage = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...stageFormData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setStageFormData({ ...stageFormData, questions: updatedQuestions });
  };

  const removeQuestionFromStage = (index) => {
    const updatedQuestions = stageFormData.questions.filter((_, i) => i !== index);
    setStageFormData({ ...stageFormData, questions: updatedQuestions });
  };

  const fetchAssessment = async (stageId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${stageId}/assessment`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const assessment = data?.data || data;
        setCurrentAssessment(assessment);
        setCurrentStageId(stageId);
        setAssessmentFormData({
          passingPercentage: assessment.passingPercentage || 60,
          allowRetries: assessment.allowRetries !== false,
          questions: assessment.questions || [],
        });
        setShowAssessmentModal(true);
      }
    } catch (error) {
      console.error('Error fetching assessment:', error);
    }
  };

  const handleSaveAssessment = async (stageId) => {
    try {
      const payload = {
        passingPercentage: assessmentFormData.passingPercentage,
        allowRetries: assessmentFormData.allowRetries,
        questions: assessmentFormData.questions,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${currentStageId}/assessment`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setShowAssessmentModal(false);
        setCurrentAssessment(null);
        setCurrentStageId(null);
        resetAssessmentForm();
      }
    } catch (error) {
      console.error('Error saving assessment:', error);
    }
  };

  const handleDeleteAssessment = async (stageId) => {
    if (!confirm('Are you sure you want to delete this assessment?')) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stages/${currentStageId}/assessment`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setShowAssessmentModal(false);
        setCurrentAssessment(null);
        setCurrentStageId(null);
        resetAssessmentForm();
        await fetchStages();
      }
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  const resetAssessmentForm = () => {
    setAssessmentFormData({
      passingPercentage: 60,
      allowRetries: true,
      questions: [],
    });
  };

  const addQuestion = () => {
    setAssessmentFormData({
      ...assessmentFormData,
      questions: [
        ...assessmentFormData.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctOptionIndex: 0,
        },
      ],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...assessmentFormData.questions];
    updatedQuestions[index][field] = value;
    setAssessmentFormData({ ...assessmentFormData, questions: updatedQuestions });
  };

  const updateQuestionOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...assessmentFormData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setAssessmentFormData({ ...assessmentFormData, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = assessmentFormData.questions.filter((_, i) => i !== index);
    setAssessmentFormData({ ...assessmentFormData, questions: updatedQuestions });
  };

  if (!token || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <Sidehero />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <button
                onClick={() => router.push('/admin/courses')}
                className="text-sm text-gray-500 hover:text-gray-700 mb-2"
              >
                ← Back to Courses
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
                {course?.title || 'Course Details'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{course?.description}</p>
            </div>
            
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-sm text-gray-500">Loading stages...</p>
          ) : (
            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() =>
                          setExpandedStage(expandedStage === stage._id ? null : stage._id)
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedStage === stage._id ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                      </button>
                      <div className="flex items-center gap-2">
                        {stage.type === 'article' ? (
                          <BookOpen size={18} className="text-[#7C4BE7]" />
                        ) : (
                          <ClipboardList size={18} className="text-[#7C4BE7]" />
                        )}
                        <h3 className="text-base font-semibold text-gray-900">{stage.title}</h3>
                      </div>
                      <span className="text-xs text-gray-400">Order: {stage.order}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {stage.type === 'assessment' && (
                        <button
                          onClick={() => fetchAssessment(stage._id)}
                          className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition"
                        >
                          Edit Assessment
                        </button>
                      )}
                      <button
                        onClick={() => openEditStageModal(stage)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStage(stage._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedStage === stage._id && stage.type === 'article' && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700 mt-3">{stage.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Stage Modal */}
      {(showCreateStageModal || editingStage) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingStage ? 'Edit Stage' : 'Create Stage'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateStageModal(false);
                  setEditingStage(null);
                  resetStageForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={editingStage ? handleUpdateStage : handleCreateStage}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={stageFormData.title}
                  onChange={(e) => setStageFormData({ ...stageFormData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Stage Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStageFormData({ ...stageFormData, type: 'article' })}
                    className={`p-4 rounded-lg border-2 transition ${
                      stageFormData.type === 'article'
                        ? 'border-[#7C4BE7] bg-[#F3E8FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Image src='/book.png' width={64} height={64} className="mx-auto mb-2 text-[#7C4BE7]" />
                    <h4 className="font-semibold text-sm text-gray-900">Descriptive</h4>
                    <p className="text-xs text-gray-600 mt-1">Add a new lesson for reading content.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStageFormData({ ...stageFormData, type: 'assessment' })}
                    className={`p-4 rounded-lg border-2 transition ${
                      stageFormData.type === 'assessment'
                        ? 'border-[#7C4BE7] bg-[#F3E8FF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Image src='/assessment.svg' width={64} height={64} className="mx-auto mb-2 text-[#7C4BE7]" />
                    <h4 className="font-semibold text-sm text-gray-900">Assessment</h4>
                    <p className="text-xs text-gray-600 mt-1">Add a quiz, assignment or a test.</p>
                  </button>
                </div>
              </div>

              {stageFormData.type === 'article' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={stageFormData.description}
                    onChange={(e) =>
                      setStageFormData({ ...stageFormData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                    rows={5}
                  />
                </div>
              )}

              {stageFormData.type === 'assessment' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passing Percentage
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={stageFormData.passingPercentage}
                        onChange={(e) =>
                          setStageFormData({
                            ...stageFormData,
                            passingPercentage: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="allowRetriesStage"
                        checked={stageFormData.allowRetries}
                        onChange={(e) =>
                          setStageFormData({
                            ...stageFormData,
                            allowRetries: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-[#7C4BE7] rounded"
                      />
                      <label htmlFor="allowRetriesStage" className="ml-2 text-sm text-gray-700">
                        Allow Retries
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Questions</h3>
                      <button
                        type="button"
                        onClick={addQuestionToStage}
                        className="px-3 py-1 text-xs bg-[#7C4BE7] text-white rounded-md hover:bg-[#6C3DD6] transition"
                      >
                        Add Question
                      </button>
                    </div>

                    {stageFormData.questions.map((q, questionIndex) => (
                      <div key={questionIndex} className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">Question {questionIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeQuestionFromStage(questionIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <textarea
                          value={q.question}
                          onChange={(e) => updateQuestionInStage(questionIndex, 'question', e.target.value)}
                          placeholder="Enter question text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                          rows={2}
                        />

                        <div className="space-y-2">
                          {q.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-stage-${questionIndex}`}
                                checked={q.correctOptionIndex === optionIndex}
                                onChange={() =>
                                  updateQuestionInStage(questionIndex, 'correctOptionIndex', optionIndex)
                                }
                                className="w-4 h-4 text-[#7C4BE7]"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                  updateQuestionOptionInStage(questionIndex, optionIndex, e.target.value)
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={stageFormData.order}
                  onChange={(e) => setStageFormData({ ...stageFormData, order: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7C4BE7] text-white text-sm font-semibold rounded-md hover:bg-[#6C3DD6] transition"
                >
                  {editingStage ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateStageModal(false);
                    setEditingStage(null);
                    resetStageForm();
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

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit Assessment</h2>
                <button
                  onClick={() => {
                    setShowAssessmentModal(false);
                    setCurrentAssessment(null);
                    setCurrentStageId(null);
                    resetAssessmentForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passing Percentage
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={assessmentFormData.passingPercentage}
                    onChange={(e) =>
                      setAssessmentFormData({
                        ...assessmentFormData,
                        passingPercentage: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowRetries"
                    checked={assessmentFormData.allowRetries}
                    onChange={(e) =>
                      setAssessmentFormData({
                        ...assessmentFormData,
                        allowRetries: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#7C4BE7] rounded"
                  />
                  <label htmlFor="allowRetries" className="ml-2 text-sm text-gray-700">
                    Allow Retries
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Questions</h3>
                  <button
                    onClick={addQuestion}
                    className="px-3 py-1 text-xs bg-[#7C4BE7] text-white rounded-md hover:bg-[#6C3DD6] transition"
                  >
                    Add Question
                  </button>
                </div>

                {assessmentFormData.questions.map((q, questionIndex) => (
                  <div key={questionIndex} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700">Question {questionIndex + 1}</h4>
                      <button
                        onClick={() => removeQuestion(questionIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                      placeholder="Enter question text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                      rows={2}
                    />

                    <div className="space-y-2">
                      {q.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${questionIndex}`}
                            checked={q.correctOptionIndex === optionIndex}
                            onChange={() =>
                              updateQuestion(questionIndex, 'correctOptionIndex', optionIndex)
                            }
                            className="w-4 h-4 text-[#7C4BE7]"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateQuestionOption(questionIndex, optionIndex, e.target.value)
                            }
                            placeholder={`Option ${optionIndex + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7C4BE7]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center gap-3">
              <button
                onClick={() => handleSaveAssessment(currentStageId)}
                className="flex-1 px-4 py-2 bg-[#7C4BE7] text-white text-sm font-semibold rounded-md hover:bg-[#6C3DD6] transition"
              >
                Save Assessment
              </button>
              {currentAssessment && (
                <button
                  onClick={() => handleDeleteAssessment(currentStageId)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition"
                >
                  Delete Assessment
                </button>
              )}
              <button
                onClick={() => {
                  setShowAssessmentModal(false);
                  setCurrentAssessment(null);
                  setCurrentStageId(null);
                  resetAssessmentForm();
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating New Stage Button */}
      <button
        onClick={() => setShowCreateStageModal(true)}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 bg-[#7C4BE7] text-white font-semibold rounded-full shadow-lg hover:bg-[#6C3DD6] transition-all hover:shadow-xl z-40"
        title="Create New Stage"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">New Stage</span>
      </button>
    </div>
  );
};

export default AdminCourseDetailPage;
