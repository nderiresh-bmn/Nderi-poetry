import React from "react";
import styled from "styled-components";

const Box = styled.footer`
  margin-top: 2rem;
  background: #edecec;
  padding: 1.3em 0 1em 0;
  text-align: center;
  font-size: 1em;
  color: #7a2234;
  font-family: "Lora", serif;
  letter-spacing: 0.7px;
  border-top: 1px solid #e7e7e7;
`;

const Link = styled.a`
  color: #7a2234;
  text-decoration: underline dotted;
`;

function Footer() {
  return (
    <Box>
      contact: <Link href="mailto:ireribrian015@gmail.com">ireribrian015@gmail.com</Link> &nbsp;
      | phone: <Link href="tel:0791012180">0791012180</Link>
      <br />
      <span style={{ fontSize: "0.92em", color: "#888" }}>
        © {new Date().getFullYear()} marble grey poetry
      </span>
    </Box>
  );
}

export default Footer;
