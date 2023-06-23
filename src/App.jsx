import React, { useEffect, useState } from 'react';
import './app.css';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${currentPage}`)
      .then((response) => {
        setData(response.data.data);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let filteredData = data.filter((x) => x.first_name.toString().toLowerCase().includes(search)
  );
  let cancle = () => {
    setSearch('')
  }
  return (
    <div>
      <div id='search'>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <span onClick={cancle}>x</span>
      </div>

      <div id='container'>

        {filteredData.map((user) => (
          <div key={user.id} id='card'>
            <legend>{user.id}</legend>
            <img src={user.avatar} alt='' />
            <div>
              <p>{user.first_name}</p>
            </div>
          </div>
        ))}
      </div>
      <div id='btn'>
        <button onClick={prev} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={next} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
