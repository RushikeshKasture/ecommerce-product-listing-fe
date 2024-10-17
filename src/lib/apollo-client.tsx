"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  // local GraphQL server URL
  // uri: "http://localhost:4000",
  uri: "https://e-commerce-product-listing-eta.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export const ApolloWrapper = ({ children }: ApolloWrapperProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
