'use client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    const facts = [
      "Our platform processes requests in under 500ms on average.",
      "You can use keyboard shortcuts to navigate faster.",
      "Over 90% of users find what they need within 3 clicks.",
      "We refresh your data every 30 seconds automatically."
    ];
    setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-card-color z-50 space-y-6">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 48, color: 'var(--color-primary)' }} spin />}
        className="custom-spin" // Applies the custom class
      />

      <div className="text-center max-w-md px-4">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Please wait</h3>
        <p className="text-gray-600">Loading your content...</p>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#8B2433] h-2 rounded-full animate-pulse"
            style={{ width: '70%' }}
          ></div>
        </div>

        <p className="mt-4 text-sm text-gray-500 italic">
          Did you know? {randomFact}
        </p>
      </div>
    </div>
  );
};

export default Loader;