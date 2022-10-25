import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { db } from "../firebase/firebaseAuth";
import Comments from "./comments";

const Article = () => {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const { state } = useLocation();
  const curr_user = JSON.parse(localStorage.getItem("user"));
  let user = curr_user.email.substring(0, 6);
  const gettingComments = async () => {
    const res = await getDoc(doc(db, "Comments", `${state.id}`));
    if (res.data()) {
      setItems(res.data().AllComments);
    }
  };

  const changeHandler = (e) => {
    setInputText(e.target.value);
  };
  const listOfItems = async (e) => {
    if (!toggle) {
      items.splice(selectedItemIndex, 1, inputText);
      setToggle(true);
      await setDoc(doc(db, "Comments", `${state.id}`), { AllComments: items });
    } else {
      setItems((olddata) => {
        return [...olddata, inputText];
      });
      await setDoc(doc(db, "Comments", `${state.id}`), { AllComments: [...items, inputText] });
    }
    setInputText("")
  };
  const deleteItem = (id) => {
    console.log("deleted.");
    setItems((olddata) => {
      return olddata.filter((arrvalue, index) => {
        return index !== id;
      });
    });
  };
  const editItem = (text, index) => {
    console.log(index);
    setSelectedItemIndex(index);
    setToggle(false);
    setInputText(text);
    
  };
  useEffect(() => {
    gettingComments();
  }, [items, state]);
  const submitHandler = (e) => {
    e.preventDefault();
  };
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
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="enter your review..."
            value={inputText}
            onChange={changeHandler}
            style={{ width: "50%", padding: "10px" }}
          />

          <button onClick={listOfItems}> {toggle ? "submit" : "Edt"}</button>
        </form>
        <div>
          {items.map((item, index) => {
            return (
              <Comments
                key={index}
                text={item}
                index={index}
                onSelect={deleteItem}
                onEdit={() => editItem(item, index)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Article;
