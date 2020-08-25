import React from "react";
import { useState, useEffect } from 'react'

import api from './services/api.js'

import "./styles.css";

export default function App() {

  const [myRepositories, setMyRepositories] = useState([])

  async function handleAddRepository() {
    const data = {
      title: "Desafio ReactJS",
	    url: "https://github.com/MarcosPotato/GoStack-Node-Challenge.git",
	    techs: ["Node.js","ReactJS"]
    }

    api.post('/repositories', data)
      .then(response => {
        setMyRepositories([...myRepositories, response.data])
      })
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`)
      setMyRepositories(myRepositories.filter(repository => repository.id !== id))
    } catch(err){
      alert(`Não foi possível deletar o repositorio ${err}`)
    }

  }

  useEffect(() => {
    api.get('/repositories')
      .then(response => setMyRepositories(response.data))
      .catch(err => alert(err))
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          (myRepositories.map(repository => (
            <>
              <li key={ repository.id }>
                { repository.title }
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </>
          )))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
