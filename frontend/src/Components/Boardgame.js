import React from 'react';

export default function Boardgame(props) {
  console.log('props are', props)
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>ID: {props.boardgameId}</p>
    </div> 
  )
}