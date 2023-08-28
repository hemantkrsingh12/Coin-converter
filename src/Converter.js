import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select } from "antd";
import "../src/Converter.css";
import { FaBitcoin } from 'react-icons/fa';


const Converter = () => {
  const [currentArr, setcurrentArr] = useState([]);
  const [inputval, setinputval] = useState("0");
  const [firstSelect, setFirstSelect] = useState("Bitcoin");
  const [secondSelect, setsecondselect] = useState("Ether");
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/exchange_rates"
    );

    let jsondata = await response.json();
    // console.log(jsondata);
    let tempArr = [];
    tempArr = Object.entries(jsondata.rates).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });
    setcurrentArr(tempArr);
  }
  // console.log(currentArr)
  //   console.log(inputval,firstSelect,secondSelect)
  useEffect(() => {
    if (currentArr.length == 0) return;

    const firstSelectrate = currentArr.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondSelectrate = currentArr.find((item) => {
      return item.value === secondSelect;
    }).rate;
    // console.log(firstSelectrate, secondSelectrate);
    const resultdata= (inputval * secondSelectrate) / firstSelectrate;
    setResult(resultdata);
    console.log(result);
  },[inputval,firstSelect,secondSelect]);

  return (
    <div className="container">
   

      <Card
        title={<h1><FaBitcoin />Bitcoin Converter</h1>}
        bordered={false}
        style={{ width: 400 }}
      >
        <Input
          placeholder="Value"
          type="number"
          onChange={(event) => setinputval(event.target.value)}
        />
        <div className="selectdata">
          <Select
            defaultValue="Bitcoin"
            style={{
              width: 150,
            }}
            options={currentArr}
            onChange={(value) => {
              setFirstSelect(value);
            }}
          />
          <Select
            defaultValue="Ether"
            style={{
              width: 150,
            }}
            options={currentArr}
            onChange={(value) => {
              setsecondselect(value);
            }}
          />
        </div>
        <p>{inputval} {firstSelect} = {result} </p>
      </Card>
    </div>
  );
};

export default Converter;
