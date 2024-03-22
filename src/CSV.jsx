import  { useState } from 'react';
import Papa from 'papaparse';

const CSVComponent = () => {
  const [jsonData, setJsonData] = useState(null);

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

  return (
    <div>
      <form action="">
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
      <input type="file" accept=".csv" onChange={handleFileUpload} className="form-control"  id="formFile"></input>
      <button type="submit" className=" m-2 btn btn-primary">Submit</button>

      {/* Display the parsed JSON data */}
      </form>
    </div>
  );
};

export default CSVComponent;
