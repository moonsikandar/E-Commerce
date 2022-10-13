import { useLocation } from "react-router";

const Article = () => {
  const { state } = useLocation();

  return (
    <>
      <div key={state.id} style={{ width: "50%", margin: "0 auto" }}>
        <div>
          <img
            src={state.image}
            style={{ width: "10rem", height: "15rem" }}
            alt="pro"
          />
        </div>
        <h3>{state.title}</h3>
        <div style={{ display: "flex", gap: "45px", justifyContent: "center" }}>
          <span>PRICE: ${state.price}</span>
          <span>RATING: {state.rating.rate}</span>
        </div>
        <p>{state.description}</p>
      </div>
    </>
  );
};

export default Article;
