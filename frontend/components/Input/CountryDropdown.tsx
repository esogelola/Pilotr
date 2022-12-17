// Country Dropdown component
import React, { useState } from "react";

interface CountryDropdownProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Country {
  name: string;
  alpha2Code: string;
}

export default function CountryDropdown(
  props: any,
  { name, value, onChange }: CountryDropdownProps
) {
  const [countries, setCountries] = useState([]);

  React.useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.error("Failed to fetch");
        setCountries([]);
      });
  }, []);

  return (
    <select {...props} name={name} value={value} onChange={onChange}>
      {countries.map((country: Country) => (
        <option key={country.alpha2Code} value={country.alpha2Code}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
