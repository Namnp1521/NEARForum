import React, { useState } from "react";
import "./index.css";
import { BOATLOAD_OF_GAS } from '../../utils';

export default function AddComment(props) {
  const { idPost, _updatePosts } = props;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeValue = (e) => {
    setContent(e.target.value);
  };

  const handleComment = () => {
    if (!content || loading) return;
    setLoading(true);
    window.contract
      .addComment(
        {
          content: content,
          idPost: idPost,
        },
        BOATLOAD_OF_GAS
      )
      .then((res) => {
        setContent("");
        setLoading(false);
        _updatePosts(res);
      });
  };

  return (
    <div className="add-cmt-wrap">
      <div className="input-wrap">
        <div className="logo">L</div>
        <textarea
          rows={1}
          onChange={handleChangeValue}
          value={content}
          placeholder="Enter your commment..."
        />
        <div className="btn" onClick={handleComment}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span className="material-icons">send</span>
          )}
        </div>
      </div>
    </div>
  );
}
