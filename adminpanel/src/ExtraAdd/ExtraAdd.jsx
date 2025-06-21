import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExtraAdd.css';

const ExtraAdd = () => {
  const [extraAdds, setExtraAdds] = useState([]);
  const [extraAddData, setExtraAddData] = useState({ name: '', price: '', image: null });
  const [editingExtraAdd, setEditingExtraAdd] = useState(null);

  // Fetch all extraAdds from the backend
  const fetchExtraAdds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/addExtras');
      setExtraAdds(response.data);
    } catch (error) {
      console.error('Error fetching extra adds:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchExtraAdds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraAddData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setExtraAddData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', extraAddData.name);
    formData.append('price', extraAddData.price);
    if (extraAddData.image) {
      formData.append('image', extraAddData.image);
    }

    try {
      if (editingExtraAdd) {
        await axios.put(`http://localhost:5000/api/addExtras/update/${editingExtraAdd._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/addExtras/add', formData);
      }
      setExtraAddData({ name: '', price: '', image: null });
      setEditingExtraAdd(null);
      fetchExtraAdds();
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addExtras/delete/${id}`);
      fetchExtraAdds();
    } catch (error) {
      console.error('Error deleting extra add:', error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (extraAdd) => {
    setExtraAddData({ name: extraAdd.name, price: extraAdd.price, image: null });
    setEditingExtraAdd(extraAdd);
  };

  return (
    <div className="extraadd">
      <div className="container">
        <h1>Manage Extra Add-ons</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={extraAddData.name}
            onChange={handleChange}
            placeholder="Extra Add-on Name"
            required
          />
          <input
            type="number"
            name="price"
            value={extraAddData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="file"
            onChange={handleFileChange}
            required={!editingExtraAdd} // Only required when adding a new item
          />
          <button type="submit">{editingExtraAdd ? 'Update' : 'Add'} Extra Add-on</button>
        </form>

        <h2>Extra Add-ons List</h2>
        <ul>
          {extraAdds.map((extraAdd) => (
            <li key={extraAdd._id}>
              <img
                src={`http://localhost:5000${extraAdd.image}`}
                alt={extraAdd.name}
                width={50}
                height={50}
              />
              <p>{extraAdd.name} - ₹{extraAdd.price}</p>
              <button onClick={() => handleEdit(extraAdd)}>Edit</button>
              <button onClick={() => handleDelete(extraAdd._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExtraAdd;