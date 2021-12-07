import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

export default function Modal({ id }) {
  let title, body;

  const CREATE_ISSUE = gql`
    mutation create_issue($repositoryId: String, $title: String, $body: String) {
      __typename
      createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
        issue {
          id
        }
      }
    }
  `;

  const [createIssue, { data, loading, error }] = useMutation(CREATE_ISSUE);

  return (
    <div>
      <>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          New Issue
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Issue
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    createIssue({
                      variables: {
                        repositoryId: id,
                        title: title.value,
                        body: body.value,
                      },
                    });
                    title.value = "";
                    body.value = "";
                    alert("Issue Added");
                  }}
                >
                  <input
                    ref={(node) => {
                      title = node;
                    }}
                    placeholder="Title"
                    className="form-control my-3"
                  />
                  <textarea
                    class="form-control my-3"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description"
                    required={true}
                    ref={(node) => {
                      body = node;
                    }}
                  />
                  <button type="submit" className="btn btn-success">
                    Add Todo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
