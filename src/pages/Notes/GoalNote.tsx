import React from 'react';

const tips: string[] = [
  'Drink Right When You Wake Up',
  'Try Not to Eat Until 30-40 Minutes After Drinking',
  'Drink Before You Eat',
  "DON'T: Drown Your Stomach During Mealtime",
  'Drink Before and After a Workout',
  "DON'T: Drink Too Much During a Workout",
  'Drink Before Bath Time',
  'Drink Before Bedtime',
  "DON'T: Drink While Standing or Running",
  "Drink When You're Tired",
];

const GoalNote: React.FC<{ idx: number }> = ({ idx }) => {
  return (
    <label
      htmlFor={`item-${idx + 1}`}
      className="item checkbox-label relative flex justify-between items-center py-3 px-4"
    >
      <div className="">
        <h4 className="">
          Glass no <span className="font-bold">{idx + 1}</span>
        </h4>
        <p className="flex flex-wrap gap-2 items-center text-sm ">
          <svg
            className="w-10 h-10 caret-svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z" />
          </svg>
          {tips[Math.floor(Math.random() * tips.length)]}
        </p>
      </div>
      <input id={`item-${idx + 1}`} type="checkbox" className="sr-only" />
      <div className="relative checkbox">
        <svg className="w-12 h-12 checkbox-svg" viewBox="0 0 20 20">
          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
          <polyline points="4 11 8 15 16 6" />
        </svg>
      </div>
      <p className="absolute text-sm hidden task-msg">Well done!</p>
    </label>
  );
};

export default GoalNote;
