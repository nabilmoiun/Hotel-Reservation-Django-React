import React from 'react'
import Room from './Room';
export default function RoomList({rooms}) {
    const listofRooms = rooms.map(room => {
        return <Room room={room} key={room.id}/>
    })
    return (
        <>
            {listofRooms}
        </>
    )
}
