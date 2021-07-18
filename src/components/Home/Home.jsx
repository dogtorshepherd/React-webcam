import React, { useState, useCallback, useEffect } from "react";
import "./homeStyles.css";
import { WebcamCapture } from "../Webcam/Webcam";
import AsyncCreatableSelect from "react-select/creatable";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import firebase from "../../utils/firebase";
import { longdo, map, LongdoMap } from "../../longdo-map/LongdoMap";

const Home = () => {
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [value, setValue] = useState();
  const [options, setOptions] = useState([
    { value: "bed", label: "เตียง" },
    { value: "med", label: "ยา" },
    { value: "food", label: "อาหาร" },
    { value: "mask", label: "แมส" }
  ]);

  const initMap = () => {
    map.Layers.setBase(longdo.Layers.GRAY);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLat(position.coords.latitude.toFixed(7));
        setLon(position.coords.longitude.toFixed(7));
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  });

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  const loadOptions = (inputValue, callback) =>
    setTimeout(() => {
      callback(
        options.filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 3000);

  const submitForm = () => {
    if (lat && lon && detail && image && value.value) {
      var answer = window.confirm(
        "Save data?" +
          "Form submitted\ndetail : " +
          detail +
          "\nvalue : " +
          value.value +
          "\nimage : " +
          image +
          "\nlat : " +
          lat +
          "\nlon : " +
          lon
      );
      if (answer) {
        const markerRef = firebase.database().ref("Marker");
        markerRef.push({
          type: value.value,
          detail: detail,
          image: image,
          lat: lat,
          lon: lon
        });
      } else {
        //some code
      }
      // console.log(options);
      // alert("Form submitted\ndetail : " + detail + "\nvalue : " + value.value + "\nimage : " + image);
    } else {
      alert("โปรดใส่ข้อมูลให้ครบถ้วน หรือ ไม่สามารถเข้าถึงตำแหน่งได้");
      // navigator.geolocation();
    }
  };

  const mapKey = "7313fc5f380ef258448202c0029934fa";

  return (
    <div className="home-container">
      <div className="container">
        <div className="text">
          <h1 style={{ color: "red" }}>Help me!</h1>
          <form className="form">
            <AsyncCreatableSelect
              placeholder="คุณต้องการ"
              value={value}
              options={options}
              onChange={handleChange}
              onCreateOption={handleCreate}
              cacheOptions
              loadOptions={loadOptions}
            />
            <input
              type="text"
              placeholder="รายละเอียด"
              onChange={(e) => setDetail(e.target.value)}
            />
            <WebcamCapture image={image} setImage={setImage} />
            {/* <h1>lat : {lat}</h1>
            <h1>lon : {lon}</h1> */}
            <button
              type="submit"
              id="login-button"
              onClick={(e) => submitForm(e)}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="App">
          <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
        </div>
      </div>
    </div>
  );
};
export default Home;
