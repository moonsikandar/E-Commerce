import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD, View } from "../action/action";
import { db } from "../firebase/firebaseAuth";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Product = ({ products, selectedProducts }) => {
  const [queryy, setQueryy] = useState("");

  const [likes, setLikes] = useState([]);

  const [currentUser, setCurrentUser] = useState();

  //--- getting login user detail from local storage-----
  useEffect(() => {
    const curr_user = JSON.parse(localStorage.getItem("user"));
    if (curr_user) {
      setCurrentUser(curr_user);
      getLikesArticles(curr_user)
        .then((arr) => {
          setLikes(arr);
        })
        .catch((err) => {
          console.log("Fetching: ", err);
        });
    }
  }, []);
  //------getting likes array from firebase---------- 
  const getLikesArticles = async (user) => {
    const res = await getDoc(doc(db, "Articles", user.uid));
    return res.data() ? res.data().Likes : [];
  };
// -----onclick data ading and delelting from firebase array (likes) ----
  const likePostDataHandler = async (article) => {

    const res = await getDoc(doc(db, "Articles", currentUser.uid));

    if (res.data()) {
      const likes = res.data().Likes;
      let likesCopy = [...likes];
      if (likesCopy.includes(article.id)) {
        //----removing------
        likesCopy = likesCopy.filter((item) => item !== article.id);
        setDoc(
          doc(db, "Articles", currentUser.uid),
          { Likes: [...likesCopy] },
          { merge: true }
        );
        setLikes(likesCopy);
      } else {
        //----adding------
        setDoc(
          doc(db, "Articles", currentUser.uid),
          { Likes: [...likesCopy, article.id] },
          { merge: true }
        );
        setLikes([...likesCopy, article.id]);
      }
    } else {
      await setDoc(doc(db, "Articles", currentUser.uid), {
        Likes: [article.id],
      });
    }
  };
//----- checking if paticular id is in likes array then color will be red -----
  const getLikesStatus = (id) => {
    const index = likes.findIndex((item) => item == id);
    return index >= 0 ? true : false;
  };


  const viewData = (e) => {
    dispatch(View(e));
  };

  const getData = useSelector((state) => state.product.search);

  const dispatch = useDispatch();
  const sendData = (e) => {
    const newitem = e;
    dispatch(ADD(newitem));
  };

  useEffect(() => {
    setQueryy(getData);
  }, [getData]);

  var filterItems = [...products];

  if (queryy.length > 0) {
    filterItems = filterItems.filter((e) => {
      return e.title.toLowerCase().includes(queryy) || e.id === queryy;
    });
  }

  return (
    <>
      {filterItems?.map((e) => {
        return (
          <Card key={e.id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={e.image}
              alt=" "
              style={{ width: "11rem", height: "15rem", margin: "0 auto" }}
            />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
              <Button variant="primary mb-3" onClick={() => sendData(e)}>
                Add to Cart
              </Button>
              <br></br>
              <Link state={e} to={`/specific/${e.id}`}>
                <Button variant="primary" onClick={() => viewData(e)}>
                  View in Detail
                </Button>{" "}
              </Link>

              <button
                className="heart_btn"
                onClick={() => likePostDataHandler(e)}
              >
                {getLikesStatus(e.id) ? (
                  <AiFillHeart style={{ color: "red" }} />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default Product;
