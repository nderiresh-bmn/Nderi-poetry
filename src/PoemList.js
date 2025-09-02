import React from "react";
import styled from "styled-components";
import PoemCard from "./PoemCard";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

function PoemList({ poems, onAddComment }) {
  return (
    <List>
      {poems.slice(1).map(poem => (
        <PoemCard key={poem.id} poem={poem} onAddComment={onAddComment} />
      ))}
    </List>
  );
}

export default PoemList;
