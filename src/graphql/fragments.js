import gql from "graphql-tag";

export const searchRepositoryDetailsFragment = gql`
  fragment SearchRepositoryDetails on Repository {
    id
    name
    url
    nameWithOwner
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
    id
    author {
      login
    }
    bodyText
    repository {
      name
      url
    }
    number
    createdAt
    updatedAt
    url
    closedAt
    resourcePath
    state
    title
  }
`;

export const searchPullRequestDetailsFragment = gql`
  fragment SearchPullRequestDetails on PullRequest {
    title
    url
  }
`;

export const searchUserDetailsFragment = gql`
  fragment SearchUserDetails on User {
    id
    name
    url
    login
    bio
    location
    email
    avatarUrl
    followers {
      totalCount
    }
    organizations(first: 10) {
      nodes {
        ... on Organization {
          name
        }
      }
    }
  }
`;

export const searchOrganizationDetailsFragment = gql`
  fragment SearchOrganizationDetails on Organization {
    name
    login
    description
    avatarUrl
  }
`;
