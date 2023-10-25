import React, { useEffect, useState } from 'react'
import ApiRequest from './requestApi'
import './App.css'
import { Pokedex } from './json_export'
import { Pokedex2, EffectChange } from './jsonExport2'
function App() {
  const [getData, setData] = useState<Pokedex | null>(null)
  useEffect(()=>{
    const fetchData = async () => {
      const response = await ApiRequest("https://pokeapi.co/api/v2/ability/?limit=100&offset=100")
      setData(response)
    }
    fetchData()
  }
  ,[])

  const [getValue, setValue] = useState<number>(0)

  const switchPokedex = () => {
    if (typeof getData?.results.length != 'undefined' ){
      if (getValue < getData?.results.length - 1){
        setValue(getValue + 1)
      }else{
        setValue(0)
      }
    }
    
  }
  const [getDataUrl, setDataUrl] = useState<Pokedex2>()
  const [getDataUrl1, setDataUrl1] = useState<EffectChange>()
  useEffect(()=>{
    const fetchData = async () => {
      if (typeof getData?.results[getValue].url != 'undefined'){
        const responseUrl = await ApiRequest(getData?.results[getValue].url)
        setDataUrl(responseUrl)
        setDataUrl1(responseUrl)
      }
    }
    fetchData()
  }
  ,[getData?.results[getValue].url])

  const [getlang, setlang] = useState<string>("")
  useEffect(()=>{
    getDataUrl1?.effect_entries.map((entry) => {
      if (entry.language.name == "en"){
        setlang(entry.effect)
      }
    });
  }
  ,[getData?.results[getValue].url])
  
  return(
    <React.Fragment>
    <button onClick={switchPokedex}>
      {"Next"}
    </button>
    <h1>Actual pokedex : <span id='colored-text-pokemon'>{getData?.results[getValue].name}</span></h1>
    <h1 id="detail"></h1> 
    <h3>Pokemon Id: {getDataUrl?.id}</h3>
    <h3>effect : {getlang}</h3>  
    </React.Fragment>
  )

}

export default App
