import React, { Component } from 'react'
import axios from 'axios';
export const MyContext = React.createContext();

class Context extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             rooms: [],
             featuredRooms: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8000/hotel/get_room_list/")
        .then(respone => {
            this.setState({
                rooms: respone.data
            })
        })
        .catch(error => {
            return error;
        })
        const featured = this.state.rooms.filter(room => room.featured);
        this.setState({
            featuredRooms: featured
        })
    }
    
    render() {
        // console.log(this.state.rooms);
        // console.log("featured rooms from context", this.state.featuredRooms);
        return (
            <MyContext.Provider value={{...this.state}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default Context;
