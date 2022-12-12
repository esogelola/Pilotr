import React, { useState } from "react";
import "./Input.css"



export const FileDropdown = () => {
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

  // Handler for when a file is selected
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null | undefined = event.target.files?.item(0);
    setSelectedFile(file);
  };

  return (
    <div className="relative inline-block w-64">
      <label
        htmlFor="file-dropdown"
        className="cursor-pointer block py-2 px-4 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
      >
        {selectedFile ? selectedFile.name : "Choose a file"}
      </label>
      <input
        id="file-dropdown"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}

