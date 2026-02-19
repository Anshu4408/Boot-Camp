"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  CartesianGrid,
  Label
} from "recharts";

const data = [
  { week: "1", hours: 1 },
  { week: "2", hours: 1.2 },
  { week: "3", hours: 1.1 },
  { week: "4", hours: 1.5 },
  { week: "5", hours: 1.7 },
  { week: "6", hours: 1.4 },
  { week: "7", hours: 2 },
];

const highlightIndex = 4; // Index to highlight

const DashboardCharts = () => {
  const [mode, setMode] = useState("Monthly");

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Overview</h3>
        <button
          className="bg-[#7C3AED] text-white px-6 py-2 rounded-full font-medium text-sm focus:outline-none"
          onClick={() => setMode(mode === "Monthly" ? "Weekly" : "Monthly")}
        >
          {mode}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
          <YAxis domain={[0.5, 2]} axisLine={false} tickLine={false} tick={{ fill: '#A0AEC0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: 8, background: '#fff', border: '1px solid #E5E7EB', fontSize: 14 }}
            labelStyle={{ color: '#7C3AED' }}
          />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#294C7A"
            strokeWidth={3}
            dot={false}
          />
          {/* Highlighted Dot */}
          <ReferenceDot
            x={data[highlightIndex].week}
            y={data[highlightIndex].hours}
            r={8}
            fill="#7C3AED"
            stroke="#fff"
            strokeWidth={3}
            label={{
              value: "Hours\n(spent per week)",
              position: "right",
              fill: "#294C7A",
              fontSize: 16,
              fontWeight: 600,
              offset: 20,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
