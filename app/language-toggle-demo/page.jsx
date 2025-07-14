"use client";

import React, { useState, useEffect } from "react";
import LanguageToggle from "@/src/Components/UI/LanguageToggle";
import { Card, Typography, Space, Divider } from "antd";

const { Title, Text } = Typography;

const LanguageToggleDemo = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);

  const toggleLanguage = (checked) => {
    const lang = checked ? "bn" : "en";
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.location.reload();
  };

  const variants = [
    {
      name: "Button Toggle",
      variant: "button",
      description: "Modern button-style toggle with hover effects",
    },
    {
      name: "Segmented Control",
      variant: "segmented",
      description: "Ant Design segmented control style",
    },
    {
      name: "Dropdown Selector",
      variant: "dropdown",
      description: "Dropdown with globe icon",
    },
    {
      name: "Icon Toggle",
      variant: "icon",
      description: "Circular icon buttons with tooltips",
    },
    {
      name: "Slider Toggle",
      variant: "slider",
      description: "Custom slider with smooth animations",
    },
    {
      name: "Pill Toggle",
      variant: "pill",
      description: "Pill-shaped toggle with sliding indicator",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Title level={1} className="text-primary">
            Language Toggle Options
          </Title>
          <Text className="text-lg text-gray-600">
            Choose your preferred language toggle style for the Blood Bank
            Management System
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {variants.map(({ name, variant, description }) => (
            <Card
              key={variant}
              title={name}
              className="shadow-sm hover:shadow-md transition-shadow"
              extra={
                <LanguageToggle
                  language={language}
                  onLanguageChange={toggleLanguage}
                  variant={variant}
                />
              }
            >
              <Text className="text-gray-600">{description}</Text>
              <Divider />
              <div className="flex justify-center">
                <LanguageToggle
                  language={language}
                  onLanguageChange={toggleLanguage}
                  variant={variant}
                />
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary to-blue-600 text-white">
          <Title level={3} className="text-white mb-4">
            Current Selection
          </Title>
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-white text-lg">
                Current Language:{" "}
                <strong>{language === "en" ? "English" : "বাংলা"}</strong>
              </Text>
              <br />
              <Text className="text-white opacity-90">
                To use any of these toggles, simply replace the variant prop in
                the Navbar component.
              </Text>
            </div>
            <LanguageToggle
              language={language}
              onLanguageChange={toggleLanguage}
              variant="pill"
            />
          </div>
        </Card>

        <Card className="mt-6">
          <Title level={4}>Implementation Guide</Title>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
            <Text>
              {`// In Navbar.jsx, replace the Switch component with:
<LanguageToggle
  language={language}
  onLanguageChange={toggleLanguage}
  variant="pill" // Change this to any variant: "button", "segmented", "dropdown", "icon", "slider", "pill"
/>`}
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LanguageToggleDemo;
