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
        console.log(error)
        if(loading) return <div>Loading...</div>
        if(error) return <div>Error</div>
        console.log(error)
        console.log('data is ', data)
        return <div key={data.getBoardgameFromBGG.objectId}>
              <p>{data.getBoardgameFromBGG.name}</p>
              <p>{data.getBoardgameFromBGG.objectId}</p>
              </div>
      }}
    </Query>
     
  )
}
