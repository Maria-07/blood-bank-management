import { Select } from "antd";
import { useEffect, useState } from "react";

const CustomSearchOption = ({ item, option, resetTrigger }) => {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(undefined);

  useEffect(() => {
    const uniqueArray = [...new Set(item)];
    if (uniqueArray) setItems(uniqueArray);
  }, [item]);

  useEffect(() => {
    if (resetTrigger) {
      setSelectedValue(undefined);
    }
  }, [resetTrigger]);

  const onSearch = (value) => {};

  const onChange = (value, data) => {
    setSelectedValue(value);
    option(data); // Pass the full selected object to the parent
  };

  return (
    <div>
      <Select
        showSearch
        size="small"
        style={{ width: "100%" }}
        onChange={onChange}
        onSearch={onSearch}
        allowClear
        value={selectedValue}
        options={items.map((item) => ({
          label: item.label,
          value: item.label,
          key: item.value,
          ...item, // Spread other properties like startAge, endAge, etc.
        }))}
      />
    </div>
  );
};

export default CustomSearchOption;
