import gql from 'graphql-tag';

export const PERSON = gql`query FetchPerson($personId: ID!){
  person(id: $personId) {
    name
    height
    mass
  }
}`;

export const SEARCHBGG = gql`query BGGSearch($bggSearchTerm: String!){
  bgg_search_and_get(search:$bggSearchTerm){
    name
  }
}`;