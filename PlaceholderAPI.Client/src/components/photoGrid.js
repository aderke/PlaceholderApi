import React from 'react';
import styles from './photoGrid.module.css';

export default function photoGrid(props) {
  const { photos } = props;
  
    if (!photos || photos.length === 0) 
      return <p>No photos</p>;
    
    return (
      <div className={styles.container}>
          <div className={styles.grid}>
              {photos.map((photo, index) => {              
                  return (
                    <div key={photo.id} ref={photos.length === index + 1 ? props.lastElementRef : null} className={styles.cell}>
                        <img src={photo.thumbnailUrl} alt={photo.title} className={styles.responsiveImage}/>
                        <div className={styles.title}>{photo.title} </div> 
                    </div>)            
              })}
          </div>
      </div>
    );
};