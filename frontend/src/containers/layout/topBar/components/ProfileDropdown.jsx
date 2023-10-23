import React, { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { EMAIL } from "../../../../utils/constants";
import userProfile from "../../../../shared/images/userProfile.png";
import * as FiIcon from "react-icons/fi";
import { DropItem } from "./DropItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkUserPermission,
  logout,
} from "../../../../redux/actions/authActions";

export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState({});
  const [isDrop, setIsDrop] = useState(false);

  const handleDropdown = () => {
    setIsDrop((prev) => !prev);
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(EMAIL));
    const names = local ? local?.split(".") : "";
    setUserName(names);
  }, []);

  useEffect(() => {
    dispatch(checkUserPermission());
  }, [dispatch]);

  return (
    <>
      <div className="dropdown-profile">
        <UncontrolledDropdown
          direction="start"
          isOpen={isDrop}
          toggle={handleDropdown}
          // onClick={handleDropdown}
          className="ms-sm-3 header-item topbar-user"
        >
          <DropdownToggle tag="button" type="button" className="btn">
            <span className="d-flex align-items-center">
              <img
                onClick={() => {
                  if (isDrop) {
                    setIsDrop(false);
                  }
                }}
                className="rounded-circle header-profile-user"
                src={userProfile}
                alt="user Profile img"
              />
              <span
                style={{ cursor: "default" }}
                className="text-start ms-xl-2"
              >
                <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-white">
                  {userName[0]}
                </span>
                <span className="d-none d-xl-block ms-1 fs-12 ">
                  {userName[1]}
                </span>
              </span>
            </span>
          </DropdownToggle>
          <DropdownMenu className="drop-menu">
            <DropItem />
            <DropdownItem text>
              <div onClick={() => dispatch(logout())}>
                <FiIcon.FiLogOut />
                <span className="drop-item-text">Sair</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};
