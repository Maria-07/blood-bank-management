import { useEffect, useState } from "react";

const { MdDeleteOutline } = require("react-icons/md");

const DynamicAdd = ({ setVideoUrls, resetTrigger }) => {
  const [fields, setFields] = useState([""]);

  // ✅ Reset fields when resetTrigger changes
  useEffect(() => {
    setFields([""]);
  }, [resetTrigger]);

  setVideoUrls(fields);

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  return (
    <div className="">
      <h1 className="input-title">Campaign&apos;s youtube links</h1>

      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-1 mb-3">
          <input
            type="text"
            value={field}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter campaign's youtube video link ${index + 1}`}
            className="modal-input-field w-full"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="bg-primary text-white text-lg px-3 py-2 rounded"
            disabled={fields.length === 1} // Prevent removing last field
          >
            <MdDeleteOutline />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="input-button mt-1 mb-3"
      >
        ➕ Add More Link
      </button>
    </div>
  );
};

export default DynamicAdd;
