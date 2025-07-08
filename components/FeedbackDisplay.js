"use client";
import React from "react";

const FeedbackPage = ({ feedback }) => {
  if (!feedback) return <div className="text-white">No feedback data found.</div>;

  const rating = feedback?.rating || {};
  const summary = feedback?.summary;
  const recommendation = feedback?.recommendation;
  const recommendationMsg = feedback?.recommendationMsg;

  return (
    <div className="flex justify-center py-10 px-4 bg-black min-h-screen">
      <div className="w-full max-w-[794px] bg-[#1f1f1f] p-10 rounded-xl shadow-2xl text-white space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Interview Feedback</h1>
          <p className="text-gray-400 text-sm">Review based on your recent interview</p>
        </div>

        {/* Ratings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Skill Ratings</h2>
          <div className="space-y-5">
            {Object.entries(rating).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize text-lg">{key}</span>
                  <span className="font-semibold">{value}/10</span>
                </div>
                <div className="w-full bg-gray-800 h-4 rounded">
                  <div
                    className="h-4 rounded bg-blue-500"
                    style={{ width: `${(value / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{summary}</p>
        </div>

        {/* Recommendation */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Recommendation</h2>
          <p className="text-lg text-gray-300 mb-2">
            <span className="font-bold text-white">Recommended:</span>{" "}
            {recommendation === "Yes" ? (
              <span className="text-green-400">Yes</span>
            ) : (
              <span className="text-red-400">No</span>
            )}
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">{recommendationMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
