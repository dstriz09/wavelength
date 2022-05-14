import { levels } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_levels";

interface Levels {
  min: number;
  max: number;
  color: string;
}

const createInputLevels = (targetGuess: number) => {
  const levels: Levels[] = [];
  const successMin = adjustInputLevels(targetGuess - 3);
  const successMax = adjustInputLevels(targetGuess + 3);
  const warningLowerMin = adjustInputLevels(targetGuess - 6);
  const warningLowerMax = adjustInputLevels(targetGuess - 3);
  const warningUpperMin = adjustInputLevels(targetGuess + 3);
  const warningUpperMax = adjustInputLevels(targetGuess + 6);
  const dangerLowerMin = adjustInputLevels(targetGuess - 9);
  const dangerLowerMax = adjustInputLevels(targetGuess - 6);
  const dangerUpperMin = adjustInputLevels(targetGuess + 6);
  const dangerUpperMax = adjustInputLevels(targetGuess + 9);

  //Handles ranges that exceed 0-100
  const adjustOverflowValues = (min: number, max: number, color: string) => {
    if (min < max) {
      levels.push({ min, max, color });
    } else {
      levels.push({ min, max: 100, color }, { min: 0, max, color });
    }
  };

  adjustOverflowValues(successMin, successMax, "success");
  adjustOverflowValues(warningLowerMin, warningLowerMax, "warning");
  adjustOverflowValues(warningUpperMin, warningUpperMax, "warning");
  adjustOverflowValues(dangerLowerMin, dangerLowerMax, "danger");
  adjustOverflowValues(dangerUpperMin, dangerUpperMax, "danger");
  console.log(levels);
  return levels;
};

export default createInputLevels;

//This will convert any number below 0
//or above 100 to still be on the scale of 0 - 100
const adjustInputLevels = (level: any) => {
  if (level < 0) {
    return 100 + level;
  } else if (level > 100) {
    return level - 100;
  } else return level;
};
