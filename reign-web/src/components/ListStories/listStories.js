import React from "react";
import TimeAgo from "timeago-react";
import "./listStories.css";


export default function listStories({ list ,loading,deleteStory}) {
  //const [openUrl, SetOpenUrl] = useState(false);

  const redirectUrlStory = (url) => {
    if (loading) {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  };

  return (
    <>
      <div className="list-stories">
        {list.map((story) => {
          return (
            <div className="row-story" key={story.objectID}>
                <div className="row-data"  onClick={() =>redirectUrlStory( story.story_url ? story.story_url : story.url)}>
                  <div className="story-desc">
                    <p className="date-primary">
                      {story.story_title ? story.story_title : story.title}
                    </p>
                    <p className="date-secondary">- {story.author} -</p>
                  </div>
                  <div className="story-date">
                    <TimeAgo datetime={story.created_at} locale="ES" />
                  </div>  
                </div>
                <i
                  className="fa fa-trash date-primary"
                  aria-hidden="true"
                  onClick={(() => deleteStory(story._id))}
                ></i>
            </div>
          );
        })}
      </div>
    </>
  );
}
