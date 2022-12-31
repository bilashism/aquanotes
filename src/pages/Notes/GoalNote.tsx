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
    <div>
      <h2>Glass no - {idx + 1}</h2>
      <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
    </div>
  );
};

export default GoalNote;
