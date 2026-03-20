import React from 'react';

const FeaturedContent = () => {
  return (
    <div 
      className="featured-content animate-fade-in"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, var(--bg-primary) 100%), url('/img/f-1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img className="featured-title" src="/img/f-t-1.png" alt="Featured Title" />
      <p className="featured-desc glass">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolor
        deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, 
        laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.
      </p>
      <button className="featured-button">WATCH TRAILER</button>
    </div>
  );
};

export default FeaturedContent;
