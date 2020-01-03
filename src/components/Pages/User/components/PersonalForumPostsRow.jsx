import React from 'react'

const PersonalForumPostsRow = (props) => {
    const {topicData} = props
    return (
        <div className="row align-items-center flex-nowrap">
            <div className="col-4">
                {topicData.title}
            </div>
            <div className="col-4">
                {topicData.posted.toDate().toUTCString()}
            </div>
            <div className="col-4">
                {topicData.lastPost.toDate().toUTCString()}
            </div>
        </div>
    )
}

export default PersonalForumPostsRow
