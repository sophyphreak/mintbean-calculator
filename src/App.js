import React, { Component } from "react";
import { Container, Row, Col, Form, Label, Input } from "reactstrap";
import "./App.css";

const finalAmountStyle = {
  fontSize: "2em",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billAmount: "",
      numberOfPeople: "",
    };
    this.handleBillChange.bind(this);
    this.handlePeopleChange.bind(this);
  }
  handleBillChange(e) {
    this.setState({ billAmount: e.target.value });
  }
  handlePeopleChange(e) {
    this.setState({ numberOfPeople: e.target.value });
  }
  render() {
    const finalAmount = () =>
      this.state.billAmount / this.state.numberOfPeople || "";
    return (
      <Container>
        <Row>
          <Col xs="0" sm="3" md="3"></Col>
          <Col xs="12" sm="6">
            <br />
            <br />
            <Form>
              <Label>Bill Amount</Label>
              <Input type="text" />
              <br />
              <Label>Number of people</Label>
              <Input type="text" />
              <br />
              <p>Amount each should pay</p>
              <p style={finalAmountStyle}>{finalAmount()}</p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
