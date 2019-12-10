import React from "react";
import { FilterAction } from "../State/FilterReducer";
import Button from "@material-ui/core/Button";

const Filter = ({ dispatch }: { dispatch: React.Dispatch<FilterAction> }) => {
  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };
  const handleShowComplete = () => {
    dispatch({ type: "SHOW_COMPLETE" });
  };
  const handleShowIncomplete = () => {
    dispatch({ type: "SHOW_INCOMPLETE" });
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShowAll}>Show All</Button>
      <Button onClick={handleShowComplete}>Show Complete</Button>
      <Button onClick={handleShowIncomplete}>Show Incomplete</Button>
    </>
  );
};

export default Filter;
