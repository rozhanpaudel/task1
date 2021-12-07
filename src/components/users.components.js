import React, { useState } from "react";
import "./user.component.css";

export default function GithubUsers({ users, setUserEmail }) {
  const activeStyles = {
    borderBottom: "2px solid blue",
  };

  return (
    <div>
      <h3>Users</h3>
      <div className="user--flex">
        {users.map((user, index) => {
          return (
            <div
              className="user--card text-center"
              key={index}
              style={activeStyles}
              onClick={() => setUserEmail(user.login ? user.login : "NA")}
            >
              <div className="user__block">
                <div className="user__icon">
                  <img src={user.avatarUrl}></img>
                </div>
              </div>
              <div className="user__name"> {user.login ? user.login : "NA"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
