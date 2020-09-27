import gql from "graphql-tag";

export const searchRepositoryDetailsFragment = gql`
  fragment SearchRepositoryDetails on Repository {
    name
    description
    stargazerCount
    primaryLanguage {
      color
      name
    }
    licenseInfo {
      name
    }
    updatedAt
  }
`;

export const searchIssueDetailsFragment = gql`
  fragment SearchIssueDetails on Issue {
    author {
      login
    }
    bodyText
    repository {
      name
    }
    createdAt
    updatedAt
    url
    closedAt
    resourcePath
    state
    title
  }
`;

export const searchUserDetailsFragment = gql`
  fragment SearchUserDetails on User {
    name
    login
    bio
    location
    email
    avatarUrl
    organizations(first: 10) {
      nodes {
        ... on Organization {
          name
        }
      }
    }
  }
`;
