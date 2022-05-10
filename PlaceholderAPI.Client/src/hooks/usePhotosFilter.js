import { useEffect, useState } from 'react';
import axios from 'axios';
import * as constants from '../constants';

export default function usePhotosFilter(query, from, sort) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPhotos([]);
  }, [query, sort])

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: 'GET',
      url: constants.API_PAGE_FILTERED,
      params: { 
        query: query, 
        from: from, 
        sort: sort,
        itemsPerPage: from === 0 ? constants.INITIAL_PHOTOS_QTY : constants.LOAD_PHOTOS_QTY
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setPhotos(prev => {
        return [...prev, ...res.data.photos]
      })
      setHasMore(res.data.photos.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) 
        return;
      setError(true);
    })
    return () => cancel();
  }, [query, from, sort]);

  return { loading, error, photos, hasMore }
}