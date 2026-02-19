 "use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PerformanceChart = ({ courseId, userId }) => {
  const [completion, setCompletion] = useState(0);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch user progress
        const progressRes = await fetch(`/api/user-progress/${courseId}`);
        const progressData = await progressRes.json();
        // Fetch total stages in course
        const stagesRes = await fetch(`/api/course/${courseId}/stages`);
        const stagesData = await stagesRes.json();
        // Fetch leaderboard rank
        const rankRes = await fetch(`/api/leaderboard/me?courseId=${courseId}`);
        const rankData = await rankRes.json();

        const completed = progressData.completedStageIds?.length || 0;
        const total = stagesData.stages?.length || 1;
        const percent = Math.round((completed / total) * 100);
        setCompletion(percent);
        setRank(rankData.rank);
      } catch (e) {
        setCompletion(0);
        setRank(null);
      } finally {
        setLoading(false);
      }
    }
    if (courseId) fetchData();
  }, [courseId]);

  const chartData = [
    { value: completion },
    { value: 100 - completion },
  ];
  const COLORS = ["#3D348B", "#F3F4F6"];

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center" style={{ minWidth: 280 }}>
      <div className="w-full text-left mb-2 text-lg font-semibold">Performance</div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
            ))}
          </Pie>
          {/* Center label */}
          <text x={140} y={120} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#222">
            %course completion
          </text>
          <text x={140} y={140} textAnchor="middle" dominantBaseline="middle" fontSize={18} fill="#3D348B" fontWeight="bold">
            {completion}%
          </text>
        </PieChart>
      </ResponsiveContainer>
      {/* Removed leaderboard rank display */}
    </div>
  );
};

export default PerformanceChart;
