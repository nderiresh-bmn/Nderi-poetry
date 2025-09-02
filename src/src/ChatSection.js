import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Box = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(122,34,52,0.07);
  padding: 1rem 1rem 0.8rem 1rem;
  margin-bottom: 2rem;
  min-height: 260px;
  display: flex;
  flex-direction: column;
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 220px;
  margin-bottom: 0.8em;
  font-size: 1em;
`;

const Message = styled.div`
  margin-bottom: 0.6em;
  span {
    font-weight: bold;
    color: #7a2234;
    margin-right: 0.5em;
  }
`;

const ChatForm = styled.form`
  display: flex;
  gap: 0.5em;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5em;
  border-radius: 3px;
  border: 1px solid #ddd;
  font-size: 1em;
`;

const ChatButton = styled.button`
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

function ChatSection({ chat, onSend }) {
  const [msg, setMsg] = useState("");
  const listRef = useRef();
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [chat]);
  function handleSend(e) {
    e.preventDefault();
    if (msg.trim()) {
      onSend({ user: "admin", text: msg });
      setMsg("");
    }
  }
  return (
    <Box>
      <b style={{
        fontFamily: "'Cinzel Decorative', serif",
        color: "#7a2234",
        textTransform: "lowercase",
        fontSize: "1.12em"
      }}>chat with poets</b>
      <ChatList ref={listRef}>
        {chat.map((m, i) => (
          <Message key={i}><span>{m.user}:</span>{m.text}</Message>
        ))}
      </ChatList>
      <ChatForm onSubmit={handleSend}>
        <ChatInput
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="write a message..."
          maxLength={120}
        />
        <ChatButton type="submit">send</ChatButton>
      </ChatForm>
    </Box>
  );
}

export default ChatSection;
