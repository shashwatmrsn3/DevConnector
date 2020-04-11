import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLike,removeLike,deletePost} from '../../actions/post';

const PostItem = ({auth,deletePost,showActions,addLike,removeLike,post:{_id,text,name,avatar,user,likes,comments,date}}) => {
    return (
        <div className="post bg-white p-1 my-1" key={_id}>
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format = 'YYY/MM/DD'>{date}</Moment>
            </p>
            {showActions && (
                <Fragment>
                  <button type="button" onClick={e=>addLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button type="button" onClick = {e=>removeLike(_id)}className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{comments.length}</span>
            </Link>
            {!auth.loading && user === auth.user._id && (
                <button      
                type="button"
                className="btn btn-danger" onClick={e=>deletePost(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
                </Fragment>
            )
            }
            
            
            
          </div>
        </div>

    );
    
  
}

PostItem.defaultProps={
  showActions:true
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        
    }
}
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem);