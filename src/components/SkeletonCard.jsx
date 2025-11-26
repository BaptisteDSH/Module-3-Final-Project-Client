import React from "react";

// Small presentational skeleton used while data is loading.
const SkeletonCard = () => {
  return (
    <section className="card-container skeleton-card" aria-hidden>
      <div className="skeleton-img" />
      <div className="card-p-container">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
        <div className="skeleton-meta">
          <div className="skeleton-line tiny" />
          <div className="skeleton-line tiny" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonCard;
