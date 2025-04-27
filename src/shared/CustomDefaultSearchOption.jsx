import { Select } from "antd";
import { useEffect, useState } from "react";

const CustomDefaultSearchOption = ({ item, option, dValue }) => {
  const [items, setItems] = useState([]);
  //

  useEffect(() => {
    const uniqueArray = [...new Set(item)];
    if (uniqueArray) {
      setItems(uniqueArray);
    }
  }, [item]);

  const onSearch = (value) => {};

  const onChange = (value) => {
    option(value);
  };

  return (
    <div>
      {" "}
      <Select
        showSearch
        style={{
          width: "100%",
        }}
        defaultValue={dValue}
        onChange={onChange}
        onSearch={onSearch}
        options={items.map((item) => ({
          label: item,
          value: item,
        }))}
      />
    </div>
  );
};

export default CustomDefaultSearchOption;
