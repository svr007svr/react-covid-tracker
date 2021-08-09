import React from 'react';
import './table.css';

function Table({countries}) {
  return (
    <div className="table">

      {countries.map (country => (
        <tr>
          <td><img src={country.countryInfo.flag} alt="flag" /></td>
          <td>{country.country}</td>
          <td>{country.cases}</td>

        </tr>
      ))}

    </div>
  );
}

export default Table;
