import React from "react";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

const item = [
  {
    uid: "Perfil",
    header: true,
    title: "Perfil",
    propText: false,
  },
  {
    uid: "divider",
    divider: true,
    propText: false,
    header: false,
  },
];

export const DropItem = () => {
  return (
    <>
      {item.map((item) => (
        <DropdownItem
          key={item.uid}
          header={item.header}
          divider={item.divider ? item.divider : false}
          text={item.propText}
        >
          <Link to={item.path}>
            <span>{item.icon}</span>
            <span className="drop-item-text">{item.title}</span>
          </Link>
        </DropdownItem>
      ))}
    </>
  );
};
