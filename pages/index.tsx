import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { EuiText, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const [newRoom, setNewRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState('');

  useEffect(() => {
    if(!newRoom) {
      setNewRoom(roomGen());
    }
  }, [newRoom]);

  const roomGen = () => {
    function a() {
      return String.fromCharCode(65+Math.floor(Math.random() * 26));
    }
    return a().concat(a(),a(),a());
  }

  const onChange = (e) => {
      setJoinRoom(e.target.value.replace(/[1-9]/g, "").toUpperCase())
  };

  return (
    <EuiFlexGroup direction="column" alignItems="center">
      <EuiFlexItem>
        <EuiText textAlign="center">
          <h1>Welcome to Weblength</h1>
          <h3>New game</h3>
        </EuiText>
        <EuiButton
          color="primary"
          onClick={() => {
            router.push(`/room/${newRoom}`);
          }}
        >
          Create room
        </EuiButton>
        <br></br><br></br><br></br>
        <EuiText textAlign="center">
          <h3>Join a game</h3>
        </EuiText>
        <EuiFieldText
          placeholder="Enter room code"
          value={joinRoom}
          onChange={(e) => onChange(e)}
          maxLength={4}
        />
        <EuiButton
          color="primary"
          onClick={() => {
            if(joinRoom.length === 4){
              router.push(`/room/${joinRoom}`);
            }
          }}
        >
          Join room
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Home;
