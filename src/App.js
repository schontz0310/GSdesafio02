import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data)
    })  
  },[])



  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "novo projeto " + Math.floor(Math.random() * 256),
      url: "url- " + Math.floor(Math.random() * 256),
      techs:[
        "tech " + Math.floor(Math.random() * 256),
        "tech " + Math.floor(Math.random() * 256),
        "tech " + Math.floor(Math.random() * 256),
      ]
    })

    const repository = response.data

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const updateRepositories = repositories.filter(repository => repository.id !== id )
    setRepositories(updateRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
