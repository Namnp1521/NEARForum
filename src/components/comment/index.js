import React, { useEffect, useState } from "react";
import { login, logout } from "../../utils";
import "./index.css";

export default function Comment(props) {
  const { data } = props;

  return (
    <div className="comment-wrap">
      <div className="logo">L</div>
      <div className="detail-wrap">
        <div className="name">{data.sender}</div>
        <div className="detail">{data.content}</div>
      </div>
    </div>
  );
}
