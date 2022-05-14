import { EuiText, EuiFlexGroup, EuiFlexItem, EuiButton} from "@elastic/eui";
import { useRouter } from 'next/router';
import { database } from '../../firebaseConfig';
import { doc, deleteDoc } from "firebase/firestore";

export default function Room() {
  const router = useRouter()
  const { id, roomid } = router.query

  const deleteRoom = () => {
    let room = roomid?.toString()
    deleteDoc(doc(database, "rooms", room))
      .then(() => {
        router.push(`/`)
      })
  }

  return (
    <EuiFlexGroup direction="column" alignItems="center">
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
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
