import { EuiText, EuiFlexGroup, EuiFlexItem, EuiButton} from "@elastic/eui";
import { useRouter } from 'next/router';
import { database } from '../../firebaseConfig';
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import InputSlider from "../../components/InputSlider/InputSlider";
import { cards } from "../../cards";

export default function Room({}) {
  const router = useRouter();
  const { id, roomid } = router.query
  const [guess, setGuess] = useState(0);
  const [card, setCard] = useState([""]);
  const [targetGuess, setTargetGuess] = useState(
    Math.floor(Math.random() * 101)
  );

  useEffect(() => {
    setCard(cards[Math.floor(Math.random() * cards.length)]);
  }, []);

  const deleteRoom = () => {
    let room = roomid?.toString()
    deleteDoc(doc(database, "rooms", room))
      .then(() => {
        router.push(`/`)
      })
  }

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
        <br></br>
        <EuiButton
          color="primary"
          onClick={() => {
            router.push(`/`)
          }}
        >
          Go back
        </EuiButton>
        <br></br>
        <EuiButton
          color="danger"
          onClick={() => {
            deleteRoom();
          }}
        >
          Delete room
        </EuiButton>
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
