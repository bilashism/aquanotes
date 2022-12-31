import { useReducer } from 'react';
import { useForm } from 'react-hook-form';

enum GoalActionKind {
  GLASS_SIZE = 'GLASS_SIZE',
  WATER_AMOUNT = 'WATER_AMOUNT',
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
      };
    case GoalActionKind.GLASS_SIZE:
      return {
        ...state,
        glassSize: payload,
        totalGlasses: calculateTotalGlasses(state.waterAmount, payload),
      };
    default:
      return state;
  }
};

const Goals = () => {
  const { register, handleSubmit } = useForm<GoalFormData>();

  const [{ waterAmount, glassSize, waterInML, totalGlasses }, dispatch] =
    useReducer(goalReducer, {
      waterAmount: 2,
      glassSize: 250,
      waterInML: literToMl(2),
      totalGlasses: calculateTotalGlasses(2, 250),
    });

  const setGoal = (data: GoalFormData): void => {
    dispatch({ type: GoalActionKind.WATER_AMOUNT, payload: data.waterAmount });
    dispatch({ type: GoalActionKind.GLASS_SIZE, payload: data.glassSize });
  };

  return (
    <div className="grid grid-cols-2 gap-8 justify-between sticky top-0 left-0">
      <form
        className="flex flex-col items-end gap-8"
        method="post"
        onSubmit={handleSubmit(setGoal)}
      >
        <div className="mb-3 pt-3 flex flex-col">
          <label
            className="relative flex display-4 font-weight-bold text-center mb-3 num-font isolate z-10"
            htmlFor="goal-inp"
          >
            <span className="placeholder absolute top-0 w-full text-center m-0 block">
              88.88
            </span>
            <span className="goal-label text-cyan-600 relative m-0 block w-full">
              0{parseFloat(`${waterAmount}`).toFixed(2)}
            </span>{' '}
          </label>{' '}
          <input
            id="goal-inp"
            className="goal-inp m-0 w-full"
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
        <div className="flex justify-between items-center mb-3 w-full">
          <div className="">
            <label className="mb-0 mr-2" htmlFor="glass-size">
              Glass Size
            </label>
            <select
              id="glass-size"
              className="glass-size flex-grow-1 px-4 py-2"
              {...register('glassSize', {
                required: 'Please select a goal',
                valueAsNumber: true,
              })}
              defaultValue={glassSize}
              onChange={(ev) => {
                dispatch({
                  type: GoalActionKind.GLASS_SIZE,
                  payload: Number(ev.target.value),
                });
              }}
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
            className="border inline-flex relative overflow-hidden py-2 px-3 font-bold"
            type="submit"
          >
            Set Goal!
          </button>
        </div>
      </form>
      <div
        className="capitalize flex sm:flex-col justify-between xl:order-first"
        title={`1 glass = ${glassSize}ml`}
      >
        <p className="d-inline-flex align-items-end">
          <span className="inline-flex items-center gap-2" title="Total intake">
            <svg
              className="bottle-svg w-20 h-32"
              width="196.3px"
              height="409.6px"
              viewBox="0 0 196.3 409.6"
            >
              <rect
                x="86.3"
                y="12"
                className="st0"
                width="23.6"
                height="38.5"
              />
              <path
                className="st1"
                d="M159.4,62c0-11.1-9.1-20.3-20.3-20.3H57.2c-11.1,0-20.3,9.1-20.3,20.3v29.7c0,11.1,9.1,20.3,20.3,20.3h81.9
   c11.1,0,20.3-9.1,20.3-20.3V62z M159.4,62"
              />
              <path
                className="st0"
                d="M188.7,316.2c0-21.5-21.3-63.8-21.3-91.7c0-27.9,21.3-45.8,21.3-67.3v-55.4c0-16.7-13.7-30.4-30.4-30.4H38
   c-16.7,0-30.4,13.7-30.4,30.4v55.4c0,21.5,21.3,39.4,21.3,67.3S7.6,294.7,7.6,316.2v55.4C7.6,388.3,21.3,402,38,402h120.3
   c16.7,0,30.4-13.7,30.4-30.4V316.2z M188.7,316.2"
              />
              <path
                className="st1"
                d="M7.6,354.9v16.7C7.6,388.3,21.3,402,38,402h120.3c16.7,0,30.4-13.7,30.4-30.4v-16.7H7.6z M7.6,354.9"
              />
              <path
                className="st2"
                d="M60.1,239.4l42.9-89.5v61.5l33.3,11.8l-42.9,89.5v-63.1L60.1,239.4z M60.1,239.4"
              />
              <path
                className="st1"
                d="M40,266.9H23.6c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,263.5,44.2,266.9,40,266.9L40,266.9z M40,266.9"
              />
              <path
                className="st1"
                d="M40,290.5H15c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,287.1,44.2,290.5,40,290.5L40,290.5z M40,290.5"
              />
              <path
                className="st1"
                d="M40,314.2H8.9c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,310.8,44.2,314.2,40,314.2L40,314.2z M40,314.2"
              />
              <path
                className="st1"
                d="M40,170.3H9.6c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,166.8,44.2,170.3,40,170.3L40,170.3z M40,170.3"
              />
              <path
                className="st1"
                d="M40,193.9H18.5c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,190.5,44.2,193.9,40,193.9L40,193.9z M40,193.9"
              />
              <path
                className="st1"
                d="M40,217.5H27.5c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6H40c4.2,0,7.6,3.4,7.6,7.6
   C47.6,214.1,44.2,217.5,40,217.5L40,217.5z M40,217.5"
              />
              <path
                className="st1"
                d="M172.7,266.9h-16.4c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h16.4c4.2,0,7.6,3.4,7.6,7.6
   C180.3,263.5,176.9,266.9,172.7,266.9L172.7,266.9z M172.7,266.9"
              />
              <path
                className="st1"
                d="M181.3,290.5h-24.9c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h24.9c4.2,0,7.6,3.4,7.6,7.6
   C188.9,287.1,185.5,290.5,181.3,290.5L181.3,290.5z M181.3,290.5"
              />
              <path
                className="st1"
                d="M187.4,314.2h-31.1c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h31.1c4.2,0,7.6,3.4,7.6,7.6
   C195,310.8,191.6,314.2,187.4,314.2L187.4,314.2z M187.4,314.2"
              />
              <path
                className="st1"
                d="M186.7,170.3h-30.3c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h30.3c4.2,0,7.6,3.4,7.6,7.6
   C194.3,166.8,190.9,170.3,186.7,170.3L186.7,170.3z M186.7,170.3"
              />
              <path
                className="st1"
                d="M177.8,193.9h-21.5c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h21.5c4.2,0,7.6,3.4,7.6,7.6
   C185.4,190.5,182,193.9,177.8,193.9L177.8,193.9z M177.8,193.9"
              />
              <path
                className="st1"
                d="M168.8,217.5h-12.4c-4.2,0-7.6-3.4-7.6-7.6c0-4.2,3.4-7.6,7.6-7.6h12.4c4.2,0,7.6,3.4,7.6,7.6
   C176.4,214.1,173,217.5,168.8,217.5L168.8,217.5z M168.8,217.5"
              />
              <path
                d="M138.8,215.9l-28.2-10v-56.1c0-3.6-2.5-6.6-5.9-7.4c-3.5-0.8-7,0.9-8.5,4.1l-42.9,89.5c-1,2-1,4.3-0.1,6.3
   c0.9,2,2.6,3.6,4.7,4.2l27.9,8.5v57.5c0,3.6,2.5,6.6,5.9,7.4c0.6,0.1,1.1,0.2,1.7,0.2c2.9,0,5.6-1.6,6.9-4.3l42.9-89.5
   c0.9-1.9,1-4.2,0.2-6.2C142.4,218.2,140.8,216.6,138.8,215.9L138.8,215.9z M100.9,279.2v-29.7c0-3.3-2.2-6.3-5.4-7.3l-24.8-7.6
   l24.6-51.4v28c0,3.2,2,6.1,5.1,7.2l25.3,9L100.9,279.2z M196.3,157.2v-55.4c0-18-12.5-33.1-29.3-37V62c0-15.4-12.5-27.9-27.9-27.9
   h-21.5V15.2h0.5c4.2,0,7.6-3.4,7.6-7.6c0-4.2-3.4-7.6-7.6-7.6H78.2c-4.2,0-7.6,3.4-7.6,7.6c0,4.2,3.4,7.6,7.6,7.6h0.5v18.9H57.2
   c-15.4,0-27.9,12.5-27.9,27.9v2.9C12.5,68.8,0,83.9,0,101.9v55.4c0,11.9,5.3,22.4,10.4,32.6c5.3,10.6,10.9,21.6,10.9,34.7
   c0,13.7-5.8,31.7-11.3,49.2C4.8,289.8,0,305,0,316.2v55.4c0,21,17,38,38,38h120.3c21,0,38-17,38-38v-55.4c0-11.2-4.8-26.4-10-42.5
   c-5.6-17.5-11.3-35.5-11.3-49.2c0-13,5.5-24,10.9-34.7C191,179.6,196.3,169.1,196.3,157.2L196.3,157.2z M93.9,15.2h8.4v18.9h-8.4
   V15.2z M44.5,62c0-7,5.7-12.7,12.7-12.7h81.9c7,0,12.7,5.7,12.7,12.7v1.9H44.5V62z M181.1,371.6c0,12.6-10.2,22.8-22.8,22.8H38
   c-12.6,0-22.8-10.2-22.8-22.8v-9.1h165.9V371.6z M181.1,157.2c0,8.3-4.1,16.4-8.8,25.8c-5.9,11.7-12.5,24.9-12.5,41.5
   c0,16,6.1,35.2,12,53.8c4.8,14.9,9.3,29,9.3,37.9v31H15.2v-31c0-8.9,4.5-23,9.3-37.9c5.9-18.6,12-37.8,12-53.8
   c0-16.6-6.6-29.8-12.5-41.5c-4.7-9.4-8.8-17.5-8.8-25.8v-55.4c0-12.6,10.2-22.8,22.8-22.8h120.3c12.6,0,22.8,10.2,22.8,22.8V157.2z
    M181.1,157.2"
              />
            </svg>{' '}
          </span>
          <span className="">{waterInML || literToMl(waterAmount)}ml</span>
        </p>
        <p className="inline-flex items-end">
          <span className="inline-flex items-center gap-2" title="Total glass">
            <svg className="glass-svg w-20 h-32" viewBox="0 0 27.8 41.8">
              <defs>
                <rect id="SVGID_1_" width="27.8" height="41.8" />
              </defs>
              <clipPath id="SVGID_2_">
                <use xlinkHref="#SVGID_1_" style={{ overflow: 'visible' }} />
              </clipPath>
              <path
                className="st0"
                d="M27.2,2.3c0-0.7,0-2.3-13.6-2.3C0,0,0,1.6,0,2.3c0,1.3-0.2,31.5,5.6,37.4c0.7,0.8,1.6,1.1,2.5,1.1h11.2
                                c0.9,0,1.7-0.4,2.5-1.1C27.5,33.8,27.2,3.6,27.2,2.3L27.2,2.3z M1.6,2.6c2.5-1.3,21.5-1.3,24,0c0,2.9,0,7.5-0.3,12.3
                                c-1,0.9-1.7,1.4-2.3,1.4h0c-0.6,0-1.4-0.4-2.3-1.4l-0.6-0.6l-0.6,0.6c-1,1-1.8,1.4-2.6,1.4c0,0,0,0,0,0c-0.8,0-1.6-0.5-2.5-1.4
                                l-0.6-0.6L13.2,15c-1.9,1.9-3.3,1.9-5.1,0.1l-0.6-0.6L7,15c-0.9,0.9-1.8,1.4-2.5,1.3c-0.7,0-1.6-0.5-2.5-1.5
                                C1.7,10,1.6,5.5,1.6,2.6L1.6,2.6z M20.5,38.5c-0.4,0.4-0.9,0.7-1.3,0.7H8c-0.5,0-0.9-0.2-1.3-0.7c-2.7-2.7-4-12.4-4.6-21.4
                                c0.8,0.5,1.5,0.8,2.3,0.9c1.1,0.1,2.1-0.4,3.2-1.3c1,0.9,2.1,1.3,3.1,1.3c0,0,0,0,0,0c1,0,2.1-0.5,3.1-1.4
                                c1.1,0.9,2.1,1.3,3.1,1.3c1,0,2.1-0.5,3.1-1.4c1,0.9,2,1.3,2.9,1.3c0,0,0,0,0,0c0.7,0,1.4-0.3,2.2-0.8
                                C24.6,26.2,23.2,35.8,20.5,38.5L20.5,38.5z M20.5,38.5"
              />
              <path d="M17,21.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C16.7,21,17,21.4,17,21.8L17,21.8z M17,21.8" />
              <path
                d="M18.6,25.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C18.3,25,18.6,25.4,18.6,25.8L18.6,25.8z
                                    M18.6,25.8"
              />
              <path d="M21,29.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C20.7,29,21,29.4,21,29.8L21,29.8z M21,29.8" />
              <path
                d="M14.6,27.4c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8C14.3,26.6,14.6,27,14.6,27.4L14.6,27.4z
                                    M14.6,27.4"
              />
              <path
                d="M20.2,21c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C19.9,20.2,20.2,20.6,20.2,21L20.2,21z
                                    M20.2,21"
              />
              <path
                d="M8.1,28.3c0.6,0,1.2-0.2,1.6-0.6l1.8-1.6c1-0.9,1-2.4,0.1-3.4l-1.6-1.8c-0.9-1-2.4-1-3.4-0.1l-1.8,1.6
                                c-0.5,0.4-0.7,1-0.8,1.7c0,0.6,0.2,1.3,0.6,1.7l1.6,1.8C6.8,28,7.3,28.3,8.1,28.3C8,28.3,8,28.3,8.1,28.3L8.1,28.3z M5.8,24.7
                                c-0.1-0.2-0.2-0.4-0.2-0.6c0-0.2,0.1-0.4,0.2-0.6l1.8-1.6c0.2-0.1,0.4-0.2,0.5-0.2c0.2,0,0.4,0.1,0.6,0.3l1.6,1.8
                                c0.3,0.3,0.3,0.8,0,1.1l-1.8,1.6c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.3L5.8,24.7z M5.8,24.7"
              />
              <path
                d="M17.1,31.5c-0.9-1-2.4-1-3.4-0.1L12,33c-0.5,0.4-0.7,1-0.8,1.7c0,0.6,0.2,1.3,0.6,1.7l1.6,1.8c0.5,0.5,1.1,0.8,1.8,0.8
                                c0.6,0,1.2-0.2,1.6-0.6l1.8-1.6c0.5-0.4,0.7-1,0.8-1.7c0-0.6-0.2-1.3-0.6-1.7L17.1,31.5z M17.6,35.4l-1.8,1.6
                                c-0.3,0.3-0.8,0.3-1.1,0L13,35.3c-0.1-0.2-0.2-0.4-0.2-0.6s0.1-0.4,0.2-0.6l1.8-1.6c0.2-0.1,0.4-0.2,0.5-0.2c0.2,0,0.4,0.1,0.6,0.3
                                l1.6,1.8C17.9,34.6,17.9,35.1,17.6,35.4L17.6,35.4z M17.6,35.4"
              />
              <path
                d="M8.2,32.3c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C7.9,31.5,8.2,31.9,8.2,32.3L8.2,32.3z
                                    M8.2,32.3"
              />
              <path
                d="M9.8,37.1c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8C9.5,36.3,9.8,36.7,9.8,37.1L9.8,37.1z
                                    M9.8,37.1"
              />
            </svg>{' '}
          </span>
          <span className="count-glass lead num-font">
            {totalGlasses || calculateTotalGlasses(waterAmount, glassSize)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Goals;
