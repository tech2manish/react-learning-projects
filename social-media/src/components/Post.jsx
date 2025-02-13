import { useContext } from "react";
import styles from "./Post.module.css";
import { MdDelete } from "react-icons/md";
import { PostList as PostListData } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListData);
  return (
    <div className={`card ${styles.postCard}`}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <MdDelete onClick={() => deletePost(post.id)} />
          </span>
        </h5>
        <p className="card-text">{post.content}</p>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`badge rounded-pill text-bg-primary ${styles.hashtag}`}
          >
            {tag}
          </span>
        ))}
        <div className={`alert alert-success ${styles.reactions}`} role="alert">
          This post has been liked by {post.reactions} users.
        </div>
      </div>
    </div>
  );
};

export default Post;
