import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./global.css";

import Title from "./components/title";
import Post from "./components/post";
import AddPost from "./components/add-post";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      setUser(window.accountId);
    }

    window.contract.showAllPosts().then((posts) => {
      console.log("posts", posts);
      setPosts(posts.reverse());
    });
  }, []);

  const _updatePosts = (post) => {
    const findIndex = posts.findIndex((el) => post.id === el.id);
    if (findIndex !== -1) {
      const tmpPosts = [...posts];
      tmpPosts[findIndex] = post;
      setPosts(tmpPosts);
    }
  };

  return (
    <>
      <Title />
      <div className="body">
        {user && <AddPost setPost={setPosts} user={user} />}
        {posts.length === 0 && (
          <div className="not-found">
            <span className="material-icons">travel_explore</span>
            <span>No Posts Yet</span>
          </div>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            data={post}
            user={user}
            _updatePosts={_updatePosts}
          />
        ))}
        <span className="footer">LOTUSTAR.NEAR©2021</span>
      </div>
    </>
  );
}
