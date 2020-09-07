import React, {useContext} from 'react'
import {MyContext} from "../Context";

export default function SingleRommPage({match}) {
    const context = useContext(MyContext);
    const room = context.rooms.find(room => room.room_slug === match.params['room_slug']);
    console.log(room);
    return (
        <div>
            Single Room Page
        </div>
    )
}
