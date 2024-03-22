import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVComponent = ({isSubmit}) => {
  const [jsonData, setJsonData] = useState({});

  // Example: Parse a local CSV file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

   
        Papa.parse(file, {
            header: true, // Assumes the first row contains column headers
            complete: (result) => {
              // Modify the "Type" column
              const modifiedData = result.data.map((row) => ({
                  ...row,
                  Name: row.Name.toUpperCase(),
                }));
        
                setJsonData(modifiedData);
              },
            });
     
  };


   const SubmitHandler = (e) =>{
         e.preventDefault();
          console.log(e);
   }

  return (
    <div>
      <form onSubmit={SubmitHandler}>
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
      <input type="file" accept=".csv" onChange={handleFileUpload} className="form-control"  id="formFile"></input>
      <button type="submit" className=" m-2 btn btn-primary">Submit</button>

      {/* Display the parsed JSON data */}
      </form>
     {
  jsonData && Object.keys(jsonData).map((key) => (
    <pre className="border border-dark-subtle" key={key}>
      {typeof jsonData[key] === 'object' ? JSON.stringify(jsonData[key], null, 2) : jsonData[key]}
    </pre>
  ))
}
 

    </div>
  );
};

export default CSVComponent;
