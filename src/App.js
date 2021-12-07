import { useState } from "react";
import { useQuery, gql, graphql } from "@apollo/client";
import GithubUsers from "./components/users.components";
import Repository from "./components/repo.component";
import IssueSection from "./components/issue.components";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [render, setRender] = useState(false);
  const [user, setUser] = useState("");
  const [isIssueOpen, setIssueOpen] = useState(false);
  const [repo, setRepo] = useState({ id: "", name: "" });

  let query = `query {
    search(query: "${search}", type: USER, first: 5) {
      userCount
      nodes {
        ... on User {
          id
          email
          avatarUrl
          name
          bio
          login
        }
      }
    }
  }`;

  var users = gql`
    ${query}
  `;

  const { loading, error, data } = useQuery(users);

  const issueHandler = (repo, id) => {
    setIssueOpen(true);
    setRepo({ id: id, name: repo });
  };

  const handleSearch = () => {
    setIssueOpen(false);
  };

  const setUserEmail = (user) => {
    setUser(user);
    setIssueOpen(false);
  };

  const handleIssueandRepos = () => {
    return isIssueOpen ? (
      <IssueSection user={user} repo={repo.name} repoId={repo.id} />
    ) : (
      <Repository user={user} issueHandler={issueHandler} />
    );
  };

  return (
    <div className="container">
      <div className="search__section">
        <input
          type="text"
          placeholder="Search Users"
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mx-2 my-3 center search_bar"
        />
        <button className="btn search_btn btn-primary " onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      <GithubUsers users={data ? data.search.nodes : []} setUserEmail={setUserEmail} />
      {handleIssueandRepos()}
    </div>
  );
}

export default App;
