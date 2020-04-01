import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import roundTo from "round-to";
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
    this.handleBillChange = this.handleBillChange.bind(this);
    this.handlePeopleChange = this.handlePeopleChange.bind(this);
  }
  handleBillChange(e) {
    this.setState({ billAmount: e.target.value });
  }
  handlePeopleChange(e) {
    this.setState({ numberOfPeople: e.target.value });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col xs="0" sm="3" md="3"></Col>
          <Col xs="12" sm="6">
            <br />
            <br />
            <Form>
              <Label>Bill Amount</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="text"
                  value={this.state.billAmount}
                  onChange={this.handleBillChange}
                />
              </InputGroup>
              <br />
              <Label>Number of people</Label>
              <Input
                type="text"
                value={this.state.numberOfPeople}
                onChange={this.handlePeopleChange}
              />
              <br />
              <p>Amount each should pay</p>
              <p style={finalAmountStyle}>
                $
                {roundTo(
                  this.state.billAmount / this.state.numberOfPeople,
                  2
                ) || ""}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
