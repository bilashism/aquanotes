import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaGlassWhiskey } from 'react-icons/fa';
import { CiGlass } from 'react-icons/ci';
import GoalNote from './GoalNote';

enum GoalActionKind {
  GLASS_SIZE = 'GLASS_SIZE',
  WATER_AMOUNT = 'WATER_AMOUNT',
  CREATE_GOAL_NOTE = 'CREATE_GOAL_NOTE',
}
interface GoalAction {
  type: GoalActionKind;
  payload: number;
}

type GoalFormData = {
  waterAmount: number;
  glassSize: number;
};

interface GoalState {
  waterAmount: number;
  glassSize: number;
  waterInML?: number;
  totalGlasses?: number;
  notesArr?: number[];
}

/**
 * This function takes a number as an argument and returns a number.
 * @param {number} liter - number -&gt; The liter value that you want to convert to ml.
 */
const literToMl = (liter: number): number => liter * 1000;

/**
 * "Given a number of liters of water and a glass size, return the number of glasses needed to hold
 * that water."
 *
 * The function takes two arguments:
 *
 * water: number
 * glassSize: number
 * And returns a number
 * @param {number} water - number - the amount of water in liters
 * @param {number} glassSize - The size of the glass in ml
 * @returns The total number of glasses needed to drink the amount of water.
 */
const calculateTotalGlasses = (water: number, glassSize: number): number => {
  return Math.ceil(literToMl(water) / glassSize);
};

/**
 * It takes a state and an action and returns a new state
 * @param {GoalState} state - GoalState
 * @param {GoalAction}  - GoalState - the type of the state
 * @returns The goalReducer is returning the state.
 */
const goalReducer = (state: GoalState, { type, payload }: GoalAction) => {
  switch (type) {
    case GoalActionKind.WATER_AMOUNT:
      return {
        ...state,
        waterAmount: payload,
        waterInML: literToMl(payload),
        totalGlasses: calculateTotalGlasses(payload, state.glassSize),
        notesArr: [],
      };
    case GoalActionKind.GLASS_SIZE:
      return {
        ...state,
        glassSize: payload,
        totalGlasses: calculateTotalGlasses(state.waterAmount, payload),
        notesArr: [],
      };
    case GoalActionKind.CREATE_GOAL_NOTE:
      localStorage.setItem(
        GoalActionKind.CREATE_GOAL_NOTE,
        JSON.stringify(Array.from(Array(payload).keys()))
      );
      return {
        ...state,
        notesArr: Array.from(Array(payload).keys()),
      };
    default:
      return state;
  }
};
const Goals = () => {
  const { register, handleSubmit } = useForm<GoalFormData>();

  const [
    { waterAmount, glassSize, waterInML, totalGlasses, notesArr },
    dispatch,
  ] = useReducer(goalReducer, {
    waterAmount: Number(localStorage.getItem(GoalActionKind.WATER_AMOUNT)) || 2,
    glassSize: Number(localStorage.getItem(GoalActionKind.GLASS_SIZE)) || 250,
    waterInML: literToMl(
      Number(localStorage.getItem(GoalActionKind.WATER_AMOUNT)) || 2
    ),
    totalGlasses: calculateTotalGlasses(
      Number(localStorage.getItem(GoalActionKind.WATER_AMOUNT)) || 2,
      Number(localStorage.getItem(GoalActionKind.GLASS_SIZE)) || 250
    ),
    notesArr:
      JSON.parse(localStorage.getItem(GoalActionKind.CREATE_GOAL_NOTE) ?? '') ||
      [],
  });

  const setGoal = (data: GoalFormData): void => {
    dispatch({ type: GoalActionKind.WATER_AMOUNT, payload: data.waterAmount });
    localStorage.setItem(GoalActionKind.WATER_AMOUNT, `${data.waterAmount}`);

    dispatch({ type: GoalActionKind.GLASS_SIZE, payload: data.glassSize });
    localStorage.setItem(GoalActionKind.GLASS_SIZE, `${data.glassSize}`);

    dispatch({
      type: GoalActionKind.CREATE_GOAL_NOTE,
      payload: calculateTotalGlasses(data.waterAmount, data.glassSize),
    });
    // localStorage.setItem(
    //   'goalNotes',
    //   JSON.stringify({
    //     glassSize,
    //     waterAmount,
    //     totalGlasses,
    //     notesArr: Array.from(Array(totalGlasses).keys()),
    //   })
    // );
    toast.success(`Your goal is set to ${waterInML}ml/day 🎉`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 justify-center md:justify-between sticky top-0 left-0">
        <form
          className="flex flex-col justify-center gap-8"
          method="post"
          onSubmit={handleSubmit(setGoal)}
        >
          <div className="flex flex-col gap-4 w-full">
            <label
              className="relative flex justify-center font-bold text-center isolate z-10 font-['digital7'] text-4xl xl:text-6xl"
              htmlFor="goal-inp"
            >
              <span className="absolute top-0 block -z-10 text-gray-200">
                88.88
              </span>
              <span className="text-emerald-500 relative block">
                0{parseFloat(`${waterAmount}`).toFixed(2)}
              </span>{' '}
            </label>{' '}
            <input
              id="goal-inp"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
              type="range"
              min=".5"
              max="6"
              step=".1"
              defaultValue={waterAmount}
              autoComplete="off"
              title="In liters"
              {...register('waterAmount', {
                required: 'Please provide a goal',
                valueAsNumber: true,
              })}
              onChange={(ev) =>
                dispatch({
                  type: GoalActionKind.WATER_AMOUNT,
                  payload: ev.target.valueAsNumber,
                })
              }
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <div className="">
              <label className="mb-0 mr-2" htmlFor="glass-size">
                Glass Size
              </label>
              <select
                id="glass-size"
                className="border px-4 py-2"
                {...register('glassSize', {
                  required: 'Please select a goal',
                  valueAsNumber: true,
                })}
                defaultValue={glassSize}
                onChange={(ev) =>
                  dispatch({
                    type: GoalActionKind.GLASS_SIZE,
                    payload: Number(ev.target.value),
                  })
                }
              >
                <option className="text-dark" value="125">
                  125ml
                </option>
                <option className="text-dark" value="250">
                  250ml
                </option>
                <option className="text-dark" value="500">
                  500ml
                </option>
                <option className="text-dark" value="750">
                  750ml
                </option>
                <option className="text-dark" value="1000">
                  1000ml
                </option>
              </select>
            </div>
            <button
              className="border inline-flex justify-center items-center bg-emerald-500 hover:bg-emerald-700 text-white transition-colors py-2 px-6 font-bold"
              type="submit"
            >
              Set Goal!
            </button>
          </div>
        </form>
        <div
          className="capitalize flex flex-wrap gap-8 justify-around items-center xl:order-first"
          title={`1 glass = ${glassSize}ml`}
        >
          <p className="inline-flex flex-col text-center items-center">
            <span
              className="inline-flex items-center gap-2"
              title="Total intake"
            >
              {<FaGlassWhiskey className="w-20 h-20" />}{' '}
            </span>
            <span className="text-emerald-500">
              {waterInML || literToMl(waterAmount)}ml
            </span>
          </p>
          <p className="inline-flex flex-col text-center items-center">
            <span
              className="inline-flex items-center gap-2"
              title="Total glass"
            >
              {<CiGlass className="w-20 h-20" />}{' '}
            </span>
            <span className="text-emerald-500">
              {totalGlasses || calculateTotalGlasses(waterAmount, glassSize)}
            </span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 bg-white z-10 relative">
        {notesArr?.map((glass) => (
          <GoalNote key={`glass-${glass}`} idx={glass} />
        ))}
      </div>
    </>
  );
};

export default Goals;
