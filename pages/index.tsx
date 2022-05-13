import type { NextPage } from "next";
import React, { useState } from "react";
import { EuiText, EuiFieldText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

const Home: NextPage = () => {
  const [room, setRoom] = useState("");

  return (
    <EuiFlexGroup direction="column" alignItems="center">
      <EuiFlexItem>
        <EuiText textAlign="center">
          <h1>Welcome to Weblength</h1>
          <h3>Join a room</h3>
        </EuiText>
        <EuiFieldText
          placeholder="Placeholder text"
          value={room}
          onChange={(e) =>
            setRoom(e.target.value.replace(/[1-9]/g, "").toUpperCase())
          }
          maxLength={4}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Home;
