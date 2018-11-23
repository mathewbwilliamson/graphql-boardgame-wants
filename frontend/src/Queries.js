import gql from 'graphql-tag';

export const PERSON = gql`query FetchPerson($personId: ID!){
  person(id: $personId) {
    name
    height
    mass
  }
}`;

export const SEARCHBGG = gql`query BGGSearch($bggSearchTerm: String!){
  bgg_search(search:$bggSearchTerm){
    name
    objectId
  }
}`;

export const GETBOARDGAMEFROMBGG = gql`query getBoardgameFromBGG($id: Int!){
  getBoardgameFromBGG(id:$id){
    name
  }
}

`

// export const GETBOARDGAMEFROMBGG = gql`
//   query getBoardgameFromBGG( $boardgameId: Int!) {
//     getBoardgameFromBGG(id:$boardgameId){
//       name
//       description
//       objectId
//       minPlayers
//       maxPlayers
//       playingTime
//       yearPublished
//       image
//       thumbnail
//       boardgameMechanic
//       usersRated
//       averageRating
//       numOfWeights
//       averageWeight
//       bggLink
//     }
//   }
// `;