import React from 'react'

export const AddComment = () => {
    return (
        <form className="mt-1">
            <textarea className="form-control" placeholder="Add a comment..." name="comment" id="comment"></textarea>
            <div className="btn btn-primary d-block ml-auto">Submit</div>
        </form>
    )
}
