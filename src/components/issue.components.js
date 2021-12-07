import React, { useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
import Modal from "./sub-components/modal.component";

export default function IssueSection({ user, repo, repoId }) {
  const repos = gql`
    query {
      repository(name: "${repo}", owner: "${user}") {
        description
        issues(orderBy: { field: CREATED_AT, direction: DESC }, last: 10, states: OPEN) {
          nodes {
            title
            updatedAt
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(repos);

  const issuesList = data
    ? data.repository.issues.nodes.map((issue, i) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#eeee",
            }}
            key={i}
            className="my-3"
          >
            <div>{issue.title}</div>
            <div>{issue.updatedAt}</div>
          </div>
        );
      })
    : null;

  return (
    <>
      <h3 className="my-4">{repo}</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }} className="my-4">
        <div>
          <b>Open Issues</b>
        </div>
        <div>
          <Modal id={repoId} />
        </div>
      </div>

      {issuesList}
    </>
  );
}
