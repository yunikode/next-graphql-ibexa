const POST_GRAPHQL_FIELDS = `
  title
  body {
    html5
  }
  _location {
    urlAliases {
      path
    }
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(`https://ibexa-monty.ddev.site/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { tags: ["posts"] },
  }).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.content?.blogPage;
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.content?.blogPages?.edges;
}

export async function getAllPosts(): Promise<any[]> {
  const entries = await fetchGraphQL(
    `
  

query GetAllPosts {
  content {
    blogPages {
      edges {
        node {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }
  }
}`
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(path: string): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      content {
        blogPage (urlAlias: "/blog-posts/${path}") {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return {
    post: extractPost(entry),
  };
}
