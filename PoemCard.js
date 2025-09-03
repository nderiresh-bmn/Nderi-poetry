import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  padding: 1.3rem 1.5rem 1rem 1.5rem;
  position: relative;
`;

const Title = styled.h3`
  font-family: "Cinzel Decorative", serif;
  font-variant: small-caps;
  text-transform: lowercase;
  font-size: 1.25em;
  margin: 0 0 0.1em 0;
  color: #7a2234;
`;

const Author = styled.span`
  font-size: 1em;
  font-style: italic;
  color: #444;
`;

const PoemText = styled.pre`
  font-family: "Lora", serif;
  background: none;
  font-size: 1.07em;
  margin: 0.7em 0 0.4em 0;
  white-space: pre-wrap;
`;

const Comments = styled.div`
  margin-top: 1em;
  background: #f7f3f5;
  border-radius: 5px;
  padding: 0.7em 1em;
`;

const Comment = styled.div`
  font-size: 0.95em;
  margin-bottom: 0.3em;
  span {
    font-weight: bold;
    color: #7a2234;
    margin-right: 0.4em;
  }
`;

const CommentForm = styled.form`
  margin-top: 0.7em;
  display: flex;
  gap: 0.5em;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5em;
  border-radius: 3px;
  border: 1px solid #ddd;
  font-size: 1em;
`;

const CommentButton = styled.button`
  background: #7a2234;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.5em 1.1em;
  font-family: "Cinzel Decorative", serif;
  font-size: 1em;
  text-transform: lowercase;
  cursor: pointer;
`;

function PoemCard({ poem, onAddComment }) {
  const [comment, setComment] = useState("");

  function handleComment(e) {
    e.preventDefault();
    if (comment) {
      onAddComment(poem.id, { user: "guest", text: comment });
      setComment("");
    }
  }
  return (
    <Card>
      <Title>{poem.title}</Title>
      <Author>by {poem.author}</Author>
      <PoemText>{poem.content}</PoemText>
      <Comments>
        <b>comments:</b>
        {poem.comments.map((cmt, i) => (
          <Comment key={i}><span>{cmt.user}:</span> {cmt.text}</Comment>
        ))}
        <CommentForm onSubmit={handleComment}>
          <CommentInput
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="write a comment..."
            maxLength={120}
          />
          <CommentButton type="submit">send</CommentButton>
        </CommentForm>
      </Comments>
    </Card>
  );
}

export default PoemCard;
