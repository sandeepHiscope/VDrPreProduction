import React, { useRef, useEffect, useState } from "react";
import "./ScrollingCardsContainer.css";
import doctorCategories from "../data/doctorCategories";

export default function ScrollingCardsContainer() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const getCardFullWidth = () => {
    return cardRef.current?.getBoundingClientRect().width || 0;
  };

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear previous interval
    autoScrollInterval.current = setInterval(() => {
      if (!isHovering && containerRef.current && cardRef.current) {
        const container = containerRef.current;
        const cardWidth = getCardFullWidth();

        // Reset if near end
        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth - cardWidth
        ) {
          container.scrollTo({ left: 0, behavior: "auto" });
        } else {
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 1000);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const scroll = (direction) => {
    if (!containerRef.current || !cardRef.current) return;
    const cardWidth = getCardFullWidth();
    containerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="scrollingCardsContainer">
      <button className="scroll-btn left" onClick={() => scroll("left")}>◀</button>
      <div
        className="cards-container"
        ref={containerRef}
        onMouseEnter={() => {
          setIsHovering(true);
          stopAutoScroll();
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          startAutoScroll();
        }}
      >
        {doctorCategories.map((product, index) => (
          <div
            className="scrollingcard"
            key={index}
            ref={index === 0 ? cardRef : null}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="card-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>▶</button>
    </div>
  );
}
