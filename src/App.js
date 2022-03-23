/**
 * Presentation Layer or Front-End of our application, import a csv file and display on
 * a dynamic table for crud operations.
 */

import React, { useState } from "react";
import './App.css';

function App() {
  
  //1 -->Hold data from csv file
  //This is a hook, they let you use state and other React features without writing a class.
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  
  //2 --> Read file using file reader
  const fileReader = new FileReader();

  //3 --> Form elements change
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  //4 --> convert file that was read as a plain text type into an Array of Object
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  //5 --> Display data to a table
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        <input className='btn btn-contact'
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button className='btn btn-edit'
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />

      <table className='styled-table'>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
