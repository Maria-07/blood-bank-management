"use client";
import Complain from "@/src/Components/UI/Admin/Contacts/Complain";
import Contact from "@/src/Components/UI/Admin/Contacts/Contact";
import Suggestion from "@/src/Components/UI/Admin/Contacts/Suggestion";
import { useTranslation } from "@/src/Hook/useTranslation";
import { Tabs } from "antd";
import React from "react";

const ContactPage = () => {
  const { t } = useTranslation();
  const tabItems = [
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary">
          {t("contactTabs.contact")}
        </h1>
      ),
      key: 1,
      children: <Contact></Contact>,
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary">
          {t("contactTabs.suggestion")}
        </h1>
      ),
      key: 2,
      children: <Suggestion></Suggestion>,
    },
    {
      label: (
        <h1 className="text-dark text-base hover:text-primary">
          {t("contactTabs.complain")}
        </h1>
      ),
      key: 3,
      children: <Complain></Complain>,
    },
  ];
  return (
    <div>
      <div className="my-5">
        <Tabs type="card" items={tabItems} />
      </div>
    </div>
  );
};

export default ContactPage;
