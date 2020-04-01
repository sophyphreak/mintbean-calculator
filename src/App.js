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
  Button,
} from "reactstrap";
import roundTo from "round-to";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedVersion: false,
      billAmount: "",
      numberOfPeople: "",
      firstPayPercent: "",
      firstPersonAmount: 0,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.handleBillChange = this.handleBillChange.bind(this);
    this.handlePeopleChange = this.handlePeopleChange.bind(this);
    this.handleFirstPayPercentChange = this.handleFirstPayPercentChange.bind(
      this
    );
  }
  toggleAdvanced() {
    const advancedVersion = !this.state.advancedVersion;
    this.setState({ advancedVersion });
  }
  handleBillChange(e) {
    const billAmount = e.target.value;
    if (billAmount === "" || /^\d*\.?\d{0,2}$/.test(billAmount)) {
      const firstPayAmount = roundTo(
        this.state.firstPayPercent * 0.01 * this.state.billAmount,
        2
      );
      this.setState({ billAmount, firstPayAmount });
    }
  }
  handlePeopleChange(e) {
    const numberOfPeople = e.target.value;
    if (numberOfPeople === "" || /^\d+$/.test(numberOfPeople)) {
      this.setState({ numberOfPeople });
    }
  }
  handleFirstPayPercentChange(e) {
    const firstPayPercent = e.target.value;
    if (firstPayPercent === "" || /^\d{0,2}$/.test(firstPayPercent)) {
      const firstPayAmount = roundTo(
        firstPayPercent * 0.01 * this.state.billAmount,
        2
      );
      this.setState({ firstPayPercent, firstPayAmount });
    }
  }
  render() {
    const calculateFinalAmount = () => {
      if (!this.state.advancedVersion) {
        return (
          "$" + roundTo(this.state.billAmount / this.state.numberOfPeople, 2)
        );
      }
      return (
        "$" +
        roundTo(
          (this.state.billAmount - this.state.firstPayAmount) /
            (this.state.numberOfPeople - 1),
          2
        )
      );
    };
    return (
      <div>
        <Container>
          <Row>
            <Col xs="0" sm="3" md="3"></Col>
            <Col xs="12" sm="6">
              <h1>Bill Splitter</h1>
              <h4>created by Andrew Horn</h4>
              <br />
              <br />
              <Button color="primary" onClick={this.toggleAdvanced}>
                {this.state.advancedVersion
                  ? "Advanced Version"
                  : "Basic Version"}
              </Button>
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
                {this.state.advancedVersion && (
                  <div>
                    <Label>Percent 1st person pays</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        value={this.state.firstPayPercent}
                        onChange={this.handleFirstPayPercentChange}
                      />
                      <InputGroupAddon addonType="append">%</InputGroupAddon>
                    </InputGroup>
                  </div>
                )}
                <br />
                <br />
                <br />
                {this.state.billAmount &&
                  this.state.numberOfPeople &&
                  (!this.state.advancedVersion ||
                    this.state.firstPayPercent) && (
                    <div>
                      {this.state.advancedVersion && (
                        <div>
                          <p>First person should pay</p>
                          <p className="final-amount">
                            {"$" + this.state.firstPayAmount}
                          </p>
                          <br />
                        </div>
                      )}
                      <p>
                        Each {this.state.advancedVersion && "other person"}{" "}
                        should pay
                      </p>
                      <p className="final-amount">{calculateFinalAmount()}</p>
                    </div>
                  )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
