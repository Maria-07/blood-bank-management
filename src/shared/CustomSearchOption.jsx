import { Select } from "antd";
import { useEffect, useState } from "react";

const CustomSearchOption = ({ item, option }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const uniqueArray = [...new Set(item)];
    if (uniqueArray) setItems(uniqueArray);
  }, [item]);

  const onSearch = (value) => {};

  const onChange = (value, data) => {
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
