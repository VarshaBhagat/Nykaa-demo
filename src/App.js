import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { ReactComponent as Arrow } from "./img/arrow.svg";
import Card from "./Componet/Card";
import logo from "./img/nykaa_logo.svg";
import "./App.css";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [postData, setPostData] = useState(0);
  const [pageCount, setPageCount] = useState(10);
  const perPage = 15;
  const [err, setErr] = useState(null);
  const [data, setData] = useState(0);
  const [showWidget, setShowWidget] = useState(false);

  const handleSearch = (e) => {
    if (e.target.value) {
      const filtered = data.filter(
        (item) =>
          item.title.toUpperCase().indexOf(e.target.value.toUpperCase()) === 0
      );
      setPostData(filtered.map((item) => <Card item={item} />));
    } else {
      receivedData();
    }
  };

  const receivedData = useCallback(() => {
    fetch("http://localhost:3002/data/")
      .then((res) => res.json())
      .then((data) => {
        const slice = data.slice(offset, offset + perPage);
        setData(slice);
        const postData = slice.map((item) => <Card item={item} />);
        setPageCount(Math.ceil(data.length / perPage));
        setPostData(postData);
      })
      .catch((err) => setErr("" + err));
  }, [offset]);

  const handlePageClick = useCallback(
    (e) => {
      const selectedPage = e.selected;
      const offset = selectedPage * perPage;
      setPageCount(Math.ceil(postData.length / perPage));
      setPostData(postData);
      setOffset(offset);
      receivedData();
    },
    [postData, receivedData]
  );

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    console.log(document.body.scrollTop, document.documentElement.scrollTop);
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowWidget(true);
    } else {
      setShowWidget(false);
    }
  }
  useEffect(() => {
    receivedData();
  }, [receivedData]);

  return (
    <div className="App">
      <img src={logo} className="logo" alt="logo" />
      <hr className="hr" />
      <input
        className="input-box"
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />

      {!data.length && !err && <h2 className="loader">Loading...</h2>}
      {!!data.length && (
        <>
          <div className="card-container">{postData}</div>
          <div className="card-container">
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
          {showWidget && (
            <div className="arrow">
              <Arrow onClick={topFunction} />
            </div>
          )}
        </>
      )}
      <div className="card-container">{err && <p>{err}</p>}</div>
    </div>
  );
};

export default App;
