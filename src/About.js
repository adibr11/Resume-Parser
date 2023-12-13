import { Link } from 'react-router-dom'
import './App.css'
import React from 'react'
const About = () => {
    return (
        <div className = "aboutClass">
            <h1>About Page</h1>
            <p> Hiring people is an expensive and time-consuming process- <br></br>
                With this resume parser you can upload documents, store them locally on your server <br></br>
                Those files will then be parsed by keywords, and uploaded to a MongoDB database. <br></br>
                The MongoDB database automatically parses out the first and last name of the individual <br></br>
                As well as storing the E-Mail of the client for future reference <br></br>
                            </p>

            <h2> Limitations & Use </h2><p>
                This is a pretty basic parser, just storing each of the words as keywords for later search <br></br>
                Future improvements will include a more indepth priority stacking of resumes based on experience <br></br>
                As well as sorting by school ranking <br></br>
                The MongoDB querying is quite efficient as a debounce function is implemented to stop the spam of querying <br></br>
                    Only text files are available to be parsed at the moment. <br></br>
                Input sanitation is also not implemented currently leaving the querying open to SQL Injection attacks <br></br>
            </p>
           

        </div>
    )
}
export default About