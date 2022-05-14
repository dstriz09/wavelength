import { EuiText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputSlider from "../../components/InputSlider/InputSlider";
import { cards } from "../../cards";

export default function Room({}) {
  const router = useRouter();
  const { id } = router.query;
  const [guess, setGuess] = useState(0);
  const [card, setCard] = useState([""]);
  const [targetGuess, setTargetGuess] = useState(Math.random() * 101);

  useEffect(() => {
    setCard(cards[Math.floor(Math.random() * cards.length)]);
  }, []);

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(+e.target.value);
  };

  return (
    <EuiFlexGroup
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <EuiFlexItem>
        <EuiText textAlign="center">
          <h2>Welcome to room {id}</h2>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <InputSlider
          onChange={handleGuess}
          guess={guess}
          card={card}
          targetGuess={targetGuess}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
