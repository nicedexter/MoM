import React from "react";
import { FilterAction } from "./FilterReducer";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin-bottom: 16px;
`;

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
    <FilterContainer>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </FilterContainer>
  );
};

export default Filter;
