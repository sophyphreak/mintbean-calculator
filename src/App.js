import React, { Component } from "react";
import { Container, Row, Col, Form, Label, Input } from "reactstrap";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container>
        <Form>
          <Label>Bill Amount</Label>
          <Input type="text" />
        </Form>
      </Container>
    );
  }
}

export default App;
