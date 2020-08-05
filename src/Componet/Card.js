import React from "react";

const Card = ({ item }) => {
  const handleError = (event) =>
    (event.target.src =
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/1/1120blue_1.jpg");
  return (
    <div className="card" key={item.title + item.sku}>
      <img
        src={item.imageUrl}
        alt={item.sku}
        onError={handleError}
        className="card-img"
      />
      <div className="container">
        <h4>
          <b>{item.title}</b>
        </h4>
        <p>{item.subTitle}</p>
        {item.sizeVariation.map((size, i) => (
          <span key={size.key}>
            {size.title}
            {i !== item.sizeVariation.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
