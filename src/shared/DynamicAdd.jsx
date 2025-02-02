"use client";

import React, { useState } from "react";

const DynamicAdd = ({ setVideoUrls }) => {
  const [fields, setFields] = useState([""]);

  // console.log("fields", fields);
  setVideoUrls(fields);

  // ✅ Add New Input Field
  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  // ✅ Remove Input Field
  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // ✅ Handle Input Change
  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Dynamic Input Fields</h1>

      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={field}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter value ${index + 1}`}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
            disabled={fields.length === 1} // Prevent removing last field
          >
            ✖
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        ➕ Add Field
      </button>
    </div>
  );
};

export default DynamicAdd;
