import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...newPostList];
  } else if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, title, content, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        userId: userId,
        title: title,
        content: content,
        reactions: reactions,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: 2,
    title: "Trip to Goa",
    content:
      "Hey everyone! I'm heading to Goa for a fun vacation. Excited for the beaches and parties! Can't wait to relax and explore.",
    reactions: 5,
    userId: "user-12",
    tags: ["vacation", "Goa", "beach", "travel"],
  },
  {
    id: 3,
    title: "Exploring Delhi",
    content:
      "Hello folks! Visiting Delhi this weekend to explore its rich culture and delicious street food. Any recommendations?",
    reactions: 3,
    userId: "user-15",
    tags: ["Delhi", "travel", "food", "exploration"],
  },
];
export default PostListProvider;
