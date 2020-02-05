import React, { Component } from 'react';
import axios from 'axios'

class download extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`/api/users/download/${id}`).then(response=>{
            console.log(response)
        });
    }   

    render() {
        return (
            <div>
                Download ready!
            </div>
        );
    }
}

export default download;