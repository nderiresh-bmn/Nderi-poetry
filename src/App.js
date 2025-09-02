import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import PoemForm from "./PoemForm";
import PoemList from "./PoemList";
import ChatSection from "./ChatSection";
import Footer from "./Footer";

const GlobalStyle = createGlobalStyle`
  body {
    background: #f7f7f7;
    color: #1a1a1a;
    font-family: "Lora", serif;
  }
`;

const Header = styled.header`
  background: #7a2234;
  color: #fff;
  padding: 2rem 1rem 1rem 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-family: "Cinzel Decorative", serif;
  font-variant: small-caps;
  letter-spacing: 2px;
  font-size: 2.5rem;
  margin-bottom: 0.2em;
  text-transform: lowercase;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  letter-spacing: 0.7px;
`;

const Main = styled.main`
  max-width: 1000px;
  margin: 2rem auto 0 auto;
  display: flex;
  gap: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Left = styled.section`
  flex: 2;
  min-width: 0;
`;

const Right = styled.aside`
  flex: 1;
  min-width: 320px;
`;

const Highlight = styled.div`
  background: #fff4f6;
  border-left: 6px solid #7a2234;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px 0 rgba(122,34,52,0.08);
`;

function App() {
  // Demo poem data (id, title, author, content, comments)
  const [poems, setPoems] = useState([
    {
      id: 1,
      title: "the echo of marble",
      author: "brian",
      content: "Silent halls where whispers roam,\nGrey veins trace the poet's home...",
      comments: [
        { user: "guest", text: "Beautiful imagery!" }
      ],
      likes: 3,
      date: "2025-08-29"
    }
  ]);
  // Demo poem of the week (first poem, or you can select by logic)
  const poemOfWeek = poems[0];

  // Chat messages (mock local)
  const [chat, setChat] = useState([
    { user: "admin", text: "Welcome to Marble Grey Poetry!" }
  ]);

  // Add new poem
  const addPoem = (poem) => {
    setPoems([
      { ...poem, id: Date.now(), comments: [], likes: 0, date: new Date().toISOString().slice(0,10) },
      ...poems
    ]);
  };

  // Add comment to poem
  const addComment = (poemId, comment) => {
    setPoems(poems.map(p =>
      p.id === poemId ? { ...p, comments: [...p.comments, comment] } : p
    ));
  };

  // Add chat message
  const addChat = (msg) => setChat([...chat, msg]);

  return (
    <>
      <GlobalStyle />
      <Header>
        <Title>marble grey poetry</Title>
        <SubTitle>
          share your words in the calm echo of marble and crimson
        </SubTitle>
      </Header>
      <Main>
        <Left>
          <Highlight>
            <h2 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "1.4rem",
              textTransform: "lowercase",
              margin: "0 0 0.4em 0"
            }}>poem of the week</h2>
            <strong style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "1.2rem",
              textTransform: "lowercase"
            }}>{poemOfWeek.title}</strong>
            <span style={{marginLeft:8, fontStyle:"italic"}}>
              by {poemOfWeek.author}
            </span>
            <pre style={{
              background: "none",
              fontFamily: "inherit",
              fontSize: "1.05em",
              padding: 0,
              margin: "0.7em 0 0 0",
              whiteSpace: "pre-wrap"
            }}>{poemOfWeek.content}</pre>
          </Highlight>
          <PoemForm onAdd={addPoem} />
          <PoemList poems={poems} onAddComment={addComment} />
        </Left>
        <Right>
          <ChatSection chat={chat} onSend={addChat} />
        </Right>
      </Main>
      <Footer />
    </>
  );
}

export default App;
