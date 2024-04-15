import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
import React from "react";

const Layout = (props) => {
  return (
    <>
      <MainNav />
      <br />
      <Container>
        {props.children}
      </Container>
      <br />
    </>
  );
};

export default Layout;
