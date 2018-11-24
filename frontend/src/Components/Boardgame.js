import React from 'react';
import {GETBOARDGAMEFROMBGG } from '../Queries';
import { Query } from 'react-apollo';

export default function Boardgame(props) {
  console.log('props are', props)
  const boardgameId = Number(props.boardgameId);
  console.log('boardgameId is ', boardgameId)
  return (
    <Query query={GETBOARDGAMEFROMBGG} variables={{id:boardgameId}}>
      {({ loading, error, data })=>{
        console.log('the error is', error)
        if(loading) return <div>Loading...</div>
        if(error) {
          console.log('The id is ', boardgameId)
          return <div>Error</div>}
        console.log(error)
        console.log('data is ', data)
        return <div key={data.getBoardgameFromBGG.name}>
              <p>Name: {data.getBoardgameFromBGG.name}</p>
              <p>Playing Time: {data.getBoardgameFromBGG.playingTime}</p>
              <p>BoardGameId: {boardgameId}</p>
              <hr />
              </div>
      }}
    </Query>
     
  )
}
