import React, {useContext} from 'react'
import {MyContext} from '../Context';

export default function RoomPage() {
    const data = useContext(MyContext);
    console.log("data from context", data);
    return (
        <div>
            Room Page
        </div>
    )
}
