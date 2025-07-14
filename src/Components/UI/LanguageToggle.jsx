import React from "react";
import { Button, Segmented, Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

// Helper for smooth transitions
const smoothTransition = "transition-all duration-300 ease-in-out";

const LanguageToggle = ({ language, onLanguageChange, variant = "button" }) => {
  const handleLanguageChange = (value) => {
    const lang = value === "bn" ? "bn" : "en";
    onLanguageChange(lang === "bn");
  };

  // Modern Button Toggle - smoother, more rounded, subtle shadow
  const ButtonToggle = () => (
    <div
      className={`flex items-center bg-white rounded-full shadow-md border border-gray-100 px-2 py-1 gap-1 ${smoothTransition}`}
    >
      <Button
        type={language === "en" ? "primary" : "text"}
        size="small"
        onClick={() => handleLanguageChange("en")}
        className={`
          rounded-full font-semibold
          ${
            language === "en"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:text-primary bg-transparent"
          }
          ${smoothTransition}
        `}
        style={{ minWidth: 40 }}
      >
        EN
      </Button>
      <Button
        type={language === "bn" ? "primary" : "text"}
        size="small"
        onClick={() => handleLanguageChange("bn")}
        className={`
          rounded-full font-semibold
          ${
            language === "bn"
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:text-primary bg-transparent"
          }
          ${smoothTransition}
        `}
        style={{ minWidth: 40 }}
      >
        বাংলা
      </Button>
    </div>
  );

  // Segmented Control - softer shadow, rounded
  const SegmentedToggle = () => (
    <Segmented
      value={language === "bn" ? "bn" : "en"}
      onChange={handleLanguageChange}
      options={[
        { label: "EN", value: "en" },
        { label: "বাংলা", value: "bn" },
      ]}
      className="bg-white shadow-md rounded-full border-none"
      style={{
        borderRadius: 9999,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
        padding: 2,
        minWidth: 100,
        ...{ transition: "all 0.3s cubic-bezier(.4,0,.2,1)" },
      }}
    />
  );

  // Dropdown Selector - rounded, subtle shadow
  const DropdownToggle = () => (
    <Select
      value={language === "bn" ? "bn" : "en"}
      onChange={handleLanguageChange}
      style={{
        width: 110,
        borderRadius: 9999,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
        background: "#fff",
        ...{ transition: "all 0.3s cubic-bezier(.4,0,.2,1)" },
      }}
      dropdownStyle={{ borderRadius: 12 }}
      suffixIcon={<GlobalOutlined />}
      options={[
        { label: "English", value: "en" },
        { label: "বাংলা", value: "bn" },
      ]}
    />
  );

  // Icon Toggle - more padding, shadow, smooth color
  const IconToggle = () => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`
          p-2 rounded-full font-semibold
          ${
            language === "en"
              ? "bg-primary text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
          }
          ${smoothTransition}
        `}
        title="English"
        style={{ minWidth: 40 }}
      >
        <span className="text-sm font-semibold">EN</span>
      </button>
      <button
        onClick={() => handleLanguageChange("bn")}
        className={`
          p-2 rounded-full font-semibold
          ${
            language === "bn"
              ? "bg-primary text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
          }
          ${smoothTransition}
        `}
        title="বাংলা"
        style={{ minWidth: 40 }}
      >
        <span className="text-sm font-semibold">বাং</span>
      </button>
    </div>
  );

  // Slider Toggle (Custom) - animated pill slider
  const SliderToggle = () => (
    <div className="relative w-24 h-9 select-none">
      <div
        className="absolute inset-0 flex items-center bg-gray-200 rounded-full px-1 py-1 shadow-inner"
        style={{ height: 36 }}
      >
        <div
          className={`absolute top-1 left-1 w-10 h-7 rounded-full bg-white shadow-md ${smoothTransition}`}
          style={{
            transform: language === "en" ? "translateX(0)" : "translateX(44px)",
          }}
        />
        <button
          onClick={() => handleLanguageChange("en")}
          className={`relative z-10 w-10 h-7 rounded-full flex items-center justify-center font-semibold
            ${
              language === "en"
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }
            ${smoothTransition}
          `}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("bn")}
          className={`relative z-10 w-10 h-7 rounded-full flex items-center justify-center font-semibold
            ${
              language === "bn"
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            }
            ${smoothTransition}
          `}
        >
          বাংলা
        </button>
      </div>
    </div>
  );

  // Pill Toggle - animated, smooth, pill-shaped
  const PillToggle = () => (
    <div className="relative w-24 h-8 select-none">
      <div className="absolute inset-0 bg-gray-100 rounded-full shadow-inner" />
      <div
        className={`absolute top-1 w-10 h-6 bg-white rounded-full shadow-md ${smoothTransition}`}
        style={{
          left: language === "en" ? 4 : undefined,
          right: language === "bn" ? 4 : undefined,
        }}
      />
      <div className="relative flex justify-between items-center h-full px-3 z-10">
        <button
          onClick={() => handleLanguageChange("en")}
          className={`text-xs font-semibold focus:outline-none
            ${
              language === "en"
                ? "text-primary scale-110"
                : "text-gray-500 hover:text-primary"
            }
            ${smoothTransition}
          `}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("bn")}
          className={`text-xs font-semibold focus:outline-none
            ${
              language === "bn"
                ? "text-primary scale-110"
                : "text-gray-500 hover:text-primary"
            }
            ${smoothTransition}
          `}
        >
          বাংলা
        </button>
      </div>
    </div>
  );

  const toggleComponents = {
    button: ButtonToggle,
    segmented: SegmentedToggle,
    dropdown: DropdownToggle,
    icon: IconToggle,
    slider: SliderToggle,
    pill: PillToggle,
  };

  const ToggleComponent = toggleComponents[variant] || ButtonToggle;

  return <ToggleComponent />;
};

export default LanguageToggle;
