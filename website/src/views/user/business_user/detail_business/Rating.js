import React from 'react'
import ReactStars from 'react-stars'

const Rating = (props) => {
    const ratingchange=(newRating)=>{
        props.handleRate(newRating)
    }
    return (
        <div className="rate">
            <ReactStars count={5} value={props.rate} onChange={ratingchange}></ReactStars>
        </div>
    )
}

export default Rating
