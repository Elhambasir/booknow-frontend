'use client';
import React, { useState, useRef, useEffect } from 'react';
import TimeKeeper from 'react-timekeeper';
import { AlarmClock } from 'lucide-react'; // ⏰ Clock icon

export default function ReactTimePicker({
    time,
    setTime
}: {
    time: string | null,
    setTime: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const [showTime, setShowTime] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const pickerHeight = 300;
      setOpenAbove(spaceBelow < pickerHeight);
      setShowTime(!showTime);
    }
  };


  return (
    <div className="relative inline-block w-full">
      {/* Input wrapper */}
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={time||''}
          readOnly
          onClick={handleOpen}
          className="cursor-pointer border pr-10 pl-3 py-[6px] rounded-md bg-white focus:outline-none w-full"
        />
        {/* Clock icon */}
        <div
          onClick={handleOpen}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 cursor-pointer"
        >
          <AlarmClock className="w-4 h-4" />
        </div>
      </div>

      {/* Time picker */}
      {showTime && (
        <div
          ref={pickerRef}
          className={`absolute z-50 shadow-lg ${
            openAbove ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <TimeKeeper
            time={time}
            onChange={(newTime) => setTime(newTime.formatted12)}
            switchToMinuteOnHourSelect
            closeOnMinuteSelect={false}
            onDoneClick={() => setShowTime(false)}
          />
        </div>
      )}
    </div>
  );
}
