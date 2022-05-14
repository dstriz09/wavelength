import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiRange,
  EuiText,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import createInputLevels from "../../utils/createInputLevels";

interface InputProps {
  onChange: any;
  guess: number;
  card: string[];
  targetGuess?: number;
}

const InputSlider = ({ onChange, guess, card, targetGuess }: InputProps) => {
  const first = card[0];
  const second = card[1];
  const [levels, setLevels] = useState<any>([]);

  useEffect(() => {
    targetGuess && setLevels(createInputLevels(targetGuess));
  }, [targetGuess]);

  return (
    <div style={{ margin: "10rem 1rem" }}>
      <EuiFlexGroup
        gutterSize="xl"
        wrap={false}
        responsive={false}
        justifyContent="spaceBetween"
      >
        <EuiFlexItem grow={false}>
          <EuiText>
            <p>{first}</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText>
            <p>{second}</p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      {targetGuess ? (
        <EuiRange
          onChange={onChange}
          min={0}
          max={100}
          value={guess}
          levels={levels}
        />
      ) : (
        <EuiRange onChange={onChange} min={0} max={100} value={guess} />
      )}
    </div>
  );
};

export default InputSlider;
