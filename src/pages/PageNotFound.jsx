import React from 'react'
import {useHistory} from 'react-router-dom';

const PageNotFound = () => {
    const history = useHistory();
    return (
        <div className="container">
            <img src="https://miro.medium.com/max/1200/1*EQisBuMOijQT8woW0Jn6pA.jpeg" alt="err-img" ></img>
            <button className="btn btn-primary" onClick = {history.push('/')   }>Go Back</button>
        </div >
    )
}

export default PageNotFound