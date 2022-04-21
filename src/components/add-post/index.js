import React, { useState } from "react";
import "./index.css";
import { BOATLOAD_OF_GAS } from '../../utils';

export default function AddPost(props) {
  const { setPost, user } = props;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (e) => {
    setContent(e.target.value);
  };

  const handlePost = () => {
    if (!content || loading) return;
    setLoading(true);
    window.contract
      .addPost(
        {
          content: content,
        },
        BOATLOAD_OF_GAS
      )
      .then(() => {
        setContent("");
        setLoading(false);
        window.contract.showAllPosts().then((posts) => {
          setPost(posts.reverse());
        });
      });
  };

  return (
    <div className="add-wrap">
      <div className="input-wrap">
        <div className="logo">{user[0]}</div>
        <textarea
          rows={content.split("\n").length - 1}
          onChange={handleChangeValue}
          value={content}
          placeholder="How do you feel today?"
        />
      </div>
      <div className="btn-wrap">
        <div />
        <div
          className={`btn ${loading && " btn-loading"}`}
          onClick={handlePost}
        >
          {loading ? <div className="loader"></div> : "Post"}
        </div>
      </div>
    </div>
  );
}
