import React, { useState, useEffect } from 'react';

const PetProfile = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', species: '', breed: '', age: '', medicalHistory: '' });

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets');
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPet),
      });
      fetchPets();
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div>
      <h2>My Pets</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newPet.name} onChange={handleChange} required />
        <input name="species" placeholder="Species" value={newPet.species} onChange={handleChange} required />
        <input name="breed" placeholder="Breed" value={newPet.breed} onChange={handleChange} />
        <input name="age" placeholder="Age" value={newPet.age} onChange={handleChange} />
        <textarea name="medicalHistory" placeholder="Medical History" value={newPet.medicalHistory} onChange={handleChange}></textarea>
        <button type="submit">Add Pet</button>
      </form>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{`${pet.name} (${pet.species})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetProfile;