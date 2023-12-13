import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myFile', this.state.file);
        axios.post("http://localhost:5000/upload", formData)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ file: e.target.files });
        this.setState({email:e.target.value});
    }
    render() {
      
        return (
            <div className = "Uploader">
            <form method="POST" action="/upload" encType="multipart/form-data">
            <h1>Upload</h1>
                    <input type="file" className="file" name="myFile" onChange={this.onChange} />
                    <input type="email" name="email" placeholder="Enter your email" />
            {console.log(this.state.file)}
                    <button type="submit" className = "yeah">Upload</button>
                </form>
            </div>
        );
}
       
}

export default App;