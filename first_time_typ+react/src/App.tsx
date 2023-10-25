import React, { useEffect, useState } from 'react'
import data from './value.json'
import './App.css'

function App() {
  // declarer les valeurs principales necessaires
  const dataValue = Object.values(data)
  const dataValueMajFixed = dataValue.map((value:string)=>{return value.toLocaleLowerCase()})
  const [getInput, setInput] = useState<string>("")
  const [getMovies, setMovies] = useState<Array<string>>(dataValue)

  const updateMovies = (input: string) => {
    const newMoviesList = dataValueMajFixed?.filter((value: string)=>{
      return value.startsWith(input.toLocaleLowerCase()) || value.length === 0
    })
    setMovies(newMoviesList)
  }
  const eventUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
    updateMovies(event.target.value)
  }
  return(
    <React.Fragment>
      <input type='text' placeholder='search ...' value={getInput} onChange={eventUpdate}></input>
      {getMovies.map((value: string)=>{
        return (<ul>{value}</ul>)
      })}
    </React.Fragment>
  )

}


export default App
