import React, { useState, useRef, useCallback } from 'react';
import usePhotosFilter from './hooks/usePhotosFilter';
import PhotoGrid from './components/photoGrid';
import withGridLoading from './components/withGridLoading';
import * as constants from './constants';
import './App.css';

export default function App() {
  const WithLoading = withGridLoading(PhotoGrid);
  const [query, setQuery] = useState('');  
  const [sort, setSort] = useState('');
  const [from, setFrom] = useState(0);
  const {
    photos,
    hasMore,
    loading,
    error
  } = usePhotosFilter(query, from, sort);
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) 
      return;
    if (observer.current) 
      observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setFrom(prevFrom => from === 0 ? prevFrom + constants.INITIAL_PHOTOS_QTY : prevFrom + constants.LOAD_PHOTOS_QTY);
      }
    })
    if (node) 
      observer.current.observe(node);
  }, [loading, hasMore])

  const handleSearch = e => {
    setQuery(e.target.value);
    setFrom(0);
  }

  const handleSort = e => {
    setSort(e.target.value);
    setFrom(0);
  }

  return (
    <div className='App'>
      <div className='sticky'>
        <h4>My Photos</h4>          
          <input type="text" value={query} onChange={handleSearch} placeholder="Search..."></input>          
            <select value={sort} onChange={handleSort}>
              <option value="" disabled defaultValue>Sort By...</option>
              <option value="asc">Title ASC</option>
              <option value="desc">Title DESC</option>
            </select>
      </div>
      <div>
         <WithLoading isLoading={loading} isError={error} photos={photos} lastElementRef={lastElementRef} />  
      </div>
      <footer>       
      </footer>
    </div>
  );
}