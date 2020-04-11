import React,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

import {getPost, getPosts} from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost,post:{post,loading},match}) => {
    
    useEffect(()=>{
        getPost(match.params.id);     
    },[getPost]);
    return ( loading || post === null ? <Spinner/> : <Fragment><PostItem post={post} showActions={false}/>
    <CommentForm postId = {post._id}/>
    <div className='comments'>
        {post.comments.map(comment => (
            <CommentItem key = {comment._id} comment = {comment} postId = {post._id}/>
        ))}
    </div>
    </Fragment>);
}

const mapStateToProps = (state) =>{
    return {
        post:state.post
    }
}
export default connect(mapStateToProps,{getPost})(Post);