import React, { useState, useEffect } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
function Repository({ user, issueHandler }) {
  const repos = gql`
    query {
      user(login: "${user ? user : ""}") {
        id
        avatarUrl
        email
        name
        repositories(first: 5, privacy: PUBLIC, orderBy: { field: CREATED_AT, direction: DESC }) {
          edges {
            node {
              id
              description
              name
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(repos);

  return (
    <div>
      <h3 className="my-4 ">Respositories</h3>

      {data
        ? data.user.repositories.edges.map((repo, i) => {
            return (
              <div
                style={{ display: "flex", justifyContent: "space-between", background: "#eee" }}
                className="my-4 "
                key={i}
                onClick={() => issueHandler(repo.node.name, repo.node.id)}
              >
                <div>
                  <b>{repo.node.name}</b>
                </div>
                <div>
                  <b>{repo.node.description}</b>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Repository;
