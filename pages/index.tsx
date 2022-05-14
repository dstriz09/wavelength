import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { EuiText, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiButton } from "@elastic/eui";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { database } from '../firebaseConfig';
import { setDoc, doc, collection, getDocs, where, query, DocumentData } from "firebase/firestore";

const roomsCollection = collection(database,'rooms');

const Home: NextPage = () => {
  const router = useRouter();
  const [newRoom, setNewRoom] = useState('');
  const [joinRoom, setJoinRoom] = useState('');
  const [roomList, setRoomList] = useState<any[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getActiveRooms = () => {
    let docs: React.SetStateAction<any[]> = [];
    getDocs(roomsCollection)
      .then((data) => {
        data.forEach((doc) => {
          let id = doc.id;
          let rd = doc.data();
          rd.id = id;
          docs.push(rd);
        })
        setRoomList(docs)
      })
  };

  const createNewRoom = () => {
    const currentRoom = newRoom;
    const docID = "randomID"+ currentRoom
    setDoc(doc(database, "rooms", docID), {
      room: currentRoom,
      users: []
    }).then(() => {
      setNewRoom('');
    }).then(() => {
      router.push(`/room/${newRoom}?roomid=${docID}`);
    })
  }

  useEffect(() => {
    if(!newRoom) {
      setNewRoom(roomGen());
      getActiveRooms();
    }
  }, [getActiveRooms, newRoom]);

  const roomGen = () => {
    const a = () => String.fromCharCode(65+Math.floor(Math.random() * 26));
    return a().concat(a(),a(),a());
  }

  const joinExistingRoom = () => {
    let matches: DocumentData[] = []
    getDocs(query(roomsCollection, where("room", "==", joinRoom)))
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let id = doc.id;
          let rd = doc.data();
          rd.id = id;
          matches.push(rd);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })
    .then(() => {
      if (matches.length > 0){
        router.push(`/room/${joinRoom}/?roomid=${matches[0].id}`)
      } else {
        window.alert("room does not exist");
      }
    });
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
            createNewRoom();
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
              joinExistingRoom();
            }
          }}
        >
          Join room
        </EuiButton>
        <br></br>
        <EuiText textAlign="center">
          <h3>Active rooms:</h3>
          {roomList.map((room, key) => {
            return (
              <li key={key} id={room.id}>
                <Link href={`/room/${room.room}?roomid=${room.id}`}>
                  <a>{room.room}</a>
                </Link>
              </li>
            )
          })}
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Home;
