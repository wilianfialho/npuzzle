import React from 'react'
import { useParams, Link } from 'react-router-dom'

function CharacterDetail() {
  let { characterId } = useParams();

  return <div>
    <h1>Character detail</h1>
    <strong>Character name: </strong> {characterId}
    <Link to="/character">Go back</Link>
  </div>
}

export default CharacterDetail