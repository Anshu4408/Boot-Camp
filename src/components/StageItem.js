'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Lock } from 'lucide-react';

const StageItem = ({ stage, index, isCompleted, isLocked, onComplete, onSubmit, token, courseId }) => {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const stageId = stage?._id;
  const stageType = stage?.type;

  const fetchContent = async () => {
    if (content || loading || isLocked) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/stages/${stageId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch stage content');
        setLoading(false);
        return;
      }

      const data = await response.json();
      setContent(data?.data || data);
    } catch (err) {
      console.error('Error fetching stage content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (isLocked) return;
    if (!expanded) {
      fetchContent();
    }
    setExpanded(!expanded);
  };

  const handleCompleteArticle = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/stages/${stageId}/complete`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onComplete(stageId);
      } else {
        console.error('Failed to mark article as complete');
      }
    } catch (err) {
      console.error('Error completing article:', err);
    }
  };

  const handleSubmitAssessment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/stages/${stageId}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data?.data || data);
        if (data?.data?.passed || data?.passed) {
          onSubmit(stageId);
        }
      } else {
        console.error('Failed to submit assessment');
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
    }
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={handleToggle}
        disabled={isLocked}
        className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition ${
          isLocked ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          {isLocked ? (
            <Lock size={16} className="text-gray-400" />
          ) : isCompleted ? (
            <CheckCircle size={16} className="text-green-600" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">#{stage?.order ?? index + 1}</span>
              <h3 className="text-sm font-semibold text-gray-800">{stage?.title || 'Untitled Stage'}</h3>
              <span className="text-[10px] uppercase tracking-wide text-gray-500">{stageType || 'content'}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{stage?.description || 'No description provided.'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
              Completed
            </span>
          )}
          {!isLocked && (expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
        </div>
      </button>

      {expanded && !isLocked && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4">
          {loading ? (
            <p className="text-sm text-gray-500">Loading content...</p>
          ) : stageType === 'article' ? (
            <div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap mb-4">
                {content?.article?.content || content?.content || 'No content available.'}
              </div>
              {!isCompleted && (
                <button
                  onClick={handleCompleteArticle}
                  className="px-4 py-2 bg-[#7C4BE7] text-white text-xs font-semibold rounded-md hover:bg-[#6C3DD6] transition"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          ) : stageType === 'assessment' ? (
            <div>
              {result ? (
                <div className="space-y-3">
                  <div
                    className={`px-4 py-3 rounded-lg text-sm font-semibold ${
                      result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {result.passed ? '✓ Assessment Passed' : '✗ Assessment Failed'}
                  </div>
                  <p className="text-xs text-gray-600">
                    Score: {result.score || 0}% (Passing: {content?.assessment?.passingScore || 70}%)
                  </p>
                  {!result.passed && (
                    <button
                      onClick={() => {
                        setResult(null);
                        setAnswers({});
                      }}
                      className="px-4 py-2 bg-[#7C4BE7] text-white text-xs font-semibold rounded-md hover:bg-[#6C3DD6] transition"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {content?.assessment?.questions?.map((q, qIndex) => (
                    <div key={q._id || `q-${qIndex}`} className="space-y-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="space-y-1">
                        {q.options.map((option, oIndex) => (
                          <label
                            key={`${q._id}-${oIndex}`}
                            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={q._id}
                              value={oIndex}
                              checked={answers[q._id] === oIndex}
                              onChange={() => handleAnswerChange(q._id, oIndex)}
                              className="w-4 h-4 text-[#7C4BE7]"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-4 py-2 bg-[#7C4BE7] text-white text-xs font-semibold rounded-md hover:bg-[#6C3DD6] transition"
                  >
                    Submit Assessment
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Unknown stage type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StageItem;
