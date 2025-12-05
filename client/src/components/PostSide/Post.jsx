import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from 'react-redux';
import { likePost, dislikePost } from '../../actions/posts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as liked, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { faHeart as unliked, faMessage } from '@fortawesome/free-regular-svg-icons'

const Post = ({ post }) => {
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch();
  const url = window.location.href + `/${post._id}`;
  
  // State to manage whether the description is fully expanded
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [ isLiked, setIsLiked ] = useState(false);
  
  // Determine if media exists
  const hasMedia = post?.imageUrl || post?.videoUrl;

  // Truncation logic
  const MAX_LINES = 4;
  const truncateText = (text, maxLines) => {
    if (!text) return "";
    // Estimate line count by counting the number of newline characters,
    // or by checking the total length as a fallback for general wrapping.
    const lines = text.split('\n');
    if (lines.length > maxLines) {
        return lines.slice(0, maxLines).join('\n') + '...';
    }
    
    // Fallback based on character count for non-newline wrapping (e.g., about 200 chars for 4 lines)
    if (text.length > 200) {
        return text.substring(0, 200) + '...';
    }

    return text;
  };

  const truncatedDesc = truncateText(post?.desc, MAX_LINES);
  const showViewButton = post?.desc?.length > truncatedDesc.length || isExpanded;


  useEffect( () => {
    if(post.likes.includes( User?.result._id )){
    setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post.likes, User]);
  

  const handleLike = () => {
    if( User === null ){
      alert("Login or SignUp to continue!!!");
    } else {
      dispatch(likePost(post._id, User?.result._id))
    }
  }

  const handleDislike = () => {
    if( User === null ){
      alert("Login or SignUp to continue!!!");
    } else {
      dispatch(dislikePost(post._id, User?.result._id))
    }
  }

  const handleShare = () => {
    copy(url)
    alert( `${url} - Copied URL to clipboard!`)
  }

  const handleToggleExpand = (e) => {
      e.preventDefault(); // Prevent Link navigation if button is wrapped in a Link
      setIsExpanded(prev => !prev);
  }

  return (
    <div className='post-container'>
      <div className='post-heading'>
        <Avatar backgroundColor="orange" px='8px' py="3px">{ post?.name.charAt(0).toUpperCase()} </Avatar>
        <Link to={`/Users/${post.userId}`}>
          <span>{post?.name} </span>
        </Link>
      </div>

      {/* Render media only if it exists */}
      { hasMedia && (
        post?.videoUrl ?
        <video src={post?.videoUrl} controls /> :
        <img src={post?.imageUrl} alt="somepicture" />
      )}
      
      { hasMedia && (
        <div className='post-options'>
          { isLiked ? 
            <FontAwesomeIcon icon={liked} onClick={handleDislike} size='2xl'/> :
            <FontAwesomeIcon icon={unliked} onClick={handleLike} size='2xl'/>
          }
          <FontAwesomeIcon icon={faMessage} size='2xl'/>
          <FontAwesomeIcon icon={faShareNodes} onClick={handleShare} size='2xl' />
        </div>
      )}

      { hasMedia && <span className='post-likes'>{post?.likes.length} likes</span> }
      
      {/* Display truncated or full description */}
      <h3 className='post-description'> 
        {isExpanded ? post?.desc : truncatedDesc} 
      </h3>
      
      {/* Conditionally display the View Post/Show Less button */}
      { showViewButton && (
        <button 
          className='post-view' 
          onClick={handleToggleExpand}
        >
          {isExpanded ? 'Show Less' : 'View Full Post'}
        </button>
      )}
      
      {/* Original link to the single post page (kept for navigation consistency) */}
      {!isExpanded && (
        <Link to={url}>
          <button className='post-view' style={{ marginTop: showViewButton ? '5px' : '15px' }}>
            Go to Post Page
          </button>
        </Link>
      )}
    </div>
  )
}

export default Post