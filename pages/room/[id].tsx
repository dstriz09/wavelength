import { EuiText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useRouter } from 'next/router';

export default function Room({ }) {
  const router = useRouter()
  const { id } = router.query
  return (
    <EuiFlexGroup direction="column" alignItems="center">
      <EuiFlexItem>
        <EuiText textAlign="center">
          <h2>Welcome to room {id}</h2>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
