import React from "react";
import { CardTasks } from "./CardTask";

export const Tasks = () => {
  return (
    <>
      <div className="page">
        <div className="header">
          <div className="row">
            <CardTasks />
          </div>
        </div>
      </div>
    </>
  );
};
