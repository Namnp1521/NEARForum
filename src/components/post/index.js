import React, { useEffect, useState } from "react";
import AddComment from "../add-comment";
import Comment from "../comment";
import Big from "big.js";
import "./index.css";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();
const DONATE = 0.1;

export default function Post(props) {
  const { data, _updatePosts, user } = props;

  const [showCmt, setShowCmt] = useState(false);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    data && data.likes && setLike(data.likes.includes(user));
  }, [data]);

  const handleDonate = () => {
    if (loading || !user) return;
    setLoading(true);
    window.contract
      .donatePost(
        {
          idPost: data.id,
        },
        BOATLOAD_OF_GAS,
        Big(DONATE)
          .times(10 ** 24)
          .toFixed()
      )
      .then((res) => {
        setLoading(false);
        _updatePosts(res);
      });
  };

  const handleShowCmt = () => {
    setShowCmt(!showCmt);
  };

  const handleLike = () => {
    if (loading || !user) return;
    setLoading(true);
    setLike(!like);
    if (!like) {
      window.contract
        .likePost(
          {
            idPost: data.id,
          },
          BOATLOAD_OF_GAS,
          Big("0")
            .times(10 ** 24)
            .toFixed()
        )
        .then((res) => {
          setLoading(false);
          _updatePosts(res);
        });
    } else {
      window.contract
        .dislikePost(
          {
            idPost: data.id,
          },
          BOATLOAD_OF_GAS,
          Big("0")
            .times(10 ** 24)
            .toFixed()
        )
        .then((res) => {
          setLoading(false);
          _updatePosts(res);
        });
    }
  };

  return (
    <div className="post-wrap">
      <div className="post-header">
        <div className="logo">{data.sender[0]}</div>
        <div>
          <div className="name">{data.sender}</div>
          <div className="time">
            {new Date(data.time / 1000000).toLocaleString()}{" "}
            <span className="material-icons">watch_later</span>
          </div>
        </div>
      </div>
      <div className="content">{data.content}</div>

      <div className="count-wrap">
        {data.likes?.length > 0 ? (
          <span>👍 {data.likes.length}</span>
        ) : (
          <span />
        )}
        <div>
          {data.comments.length > 0 && (
            <span>{data.comments.length} comments</span>
          )}
          {data.donateCount > 0 && (
            <span className="coin">{(data.donateCount * DONATE).toFixed(2)} NEAR</span>
          )}
        </div>
      </div>
      <div className="line" />
      <div className="post-footer">
        <div className="btn" onClick={handleLike}>
          <span className={`material-icons ${like && "like"}`}>thumb_up</span>
          <span className={`${like && "like"}`}>Like</span>
        </div>
        <div className="btn" onClick={handleShowCmt}>
          <span className="material-icons">chat_bubble</span>
          <span>Comment</span>
        </div>
        <div className="btn" onClick={handleDonate}>
          <span className="material-icons">paid</span>
          <span>Donate</span>
        </div>
      </div>
      {showCmt && (
        <>
          <div className="line" />
          {user ? (
            <AddComment idPost={data.id} _updatePosts={_updatePosts} />
          ) : (
            <div className="block" />
          )}
          <div className="comment-list">
            {data.comments.map((c, index) => (
              <Comment key={index} data={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
