import React, { Component } from "react";
import {
  Tabs as BootStrapTabs,
  Tab,
  Container,
  Card,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  Row,
  Button
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import MyForm from "../Form";
import Response from "../Response";

type Props = {};
type State = {
  questions: Question[];
  response: Response[];
  activeKey: string;
  show: boolean;
};

type Response = {
  question: string;
  answer: string | string[];
};

type Question = {
  question: string;
  type: string;
  options?: string[];
};

class Tabs extends Component<Props, State> {
  state = {
    questions: [
      {
        question: "What is your name?",
        type: "Short Text"
      },
      {
        question: "Add Your Title here?",
        type: "Dropdown",
        options: ["Male", "Female"]
      }
    ],
    response: [],
    activeKey: "home",
    show: true
  };

  addNew = (event: any) => {
    const questions: Question[] = this.state.questions;
    questions.push({
      question: "Add Your Title here?",
      type: "Short Text",
      options: [""]
    });
    this.setState({
      questions
    });
  };

  changeQuestionType = (type: string, index: number) => {
    const questions: Question[] = this.state.questions;
    questions[index].type = type;
    if (["Checkbox", "Dropdown"].indexOf(type) > -1) {
      if (!questions[index].options || questions[index].options!.length === 0) {
        questions[index].options = [""];
      }
    } else {
      questions[index].options = [];
    }
    this.setState({
      questions
    });
  };

  deleteQuestion = (index: number) => {
    const { questions } = this.state;
    questions.splice(index, 1);
    this.setState({
      questions
    });
  };

  addOption = (qIndex: number) => {
    const { questions } = this.state;
    questions[qIndex].options!.push("");
    this.setState({
      questions
    });
  };

  deleteOption = (qIndex: number, oIndex: number) => {
    const questions: Question[] = this.state.questions;
    questions[qIndex].options!.splice(oIndex, 1);
    this.setState({
      questions
    });
  };

  changeInQuestion = (qIndex: number, event: any) => {
    const { questions } = this.state;
    questions[qIndex].question = event.target.value;
    this.setState({
      questions
    });
  };

  changeInOption = (qIndex: number, oIndex: number, event: any) => {
    const questions: Question[] = this.state.questions;
    questions[qIndex].options![oIndex] = event.target.value;
    this.setState({
      questions
    });
  };

  getResponse = (data: any) => {
    const questions: Question[] = this.state.questions;
    let response: any[] = this.state.response;
    this.setState({
      show: false
    });
    let answers: Response[] = questions.map((question, i) => {
      let array: string[] = [];
      if (question.type === "Checkbox") {
        question.options!.forEach((option, OI) => {
          if (data["input-ch-" + i + "-" + OI]) {
            array.push(data["input-ch-" + i + "-" + OI]);
          }
        });
        return {
          question: question.question,
          answer: array
        };
      }
      return {
        question: question.question,
        answer: data["input-" + i]
      };
    });
    response.push(answers);
    this.setState({
      questions,
      response,
      activeKey: "response",
      show: true
    });
  };

  changeTab = (k: string) => {
    this.setState({
      activeKey: k
    });
  };

  render() {
    let { questions, activeKey, response, show } = this.state;
    return (
      <>
        <Container className="my-4">
          <BootStrapTabs
            activeKey={activeKey}
            transition={false}
            id="noanim-tab-example"
            onSelect={this.changeTab}
          >
            <Tab eventKey="home" title="Questions" key="1">
              <Col md="8" className="mt-5 mx-auto">
                <Card className="card-border">
                  <Card.Body>
                    <h3>Response</h3>
                  </Card.Body>
                </Card>
              </Col>
              {questions.map((question, index) => {
                return (
                  <Col md="8" className="mt-2 mx-auto" key={index}>
                    <Card>
                      <Card.Body>
                        <Row className="mb-2">
                          <Col md={8}>
                            <Form.Control
                              type="email"
                              placeholder="Enter Question"
                              value={question.question}
                              onChange={e => this.changeInQuestion(index, e)}
                            />
                          </Col>
                          <Col md={4}>
                            <DropdownButton
                              className="w-100"
                              id="dropdown-basic-button"
                              title={question.type}
                            >
                              <Dropdown.Item
                                onClick={() =>
                                  this.changeQuestionType("Short Text", index)
                                }
                              >
                                Short Text
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  this.changeQuestionType("Long Text", index)
                                }
                              >
                                Long Text
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  this.changeQuestionType("Checkbox", index)
                                }
                              >
                                Checkbox
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  this.changeQuestionType("Dropdown", index)
                                }
                              >
                                Dropdown
                              </Dropdown.Item>
                            </DropdownButton>
                          </Col>
                        </Row>
                        <Row>
                          {question.options &&
                            !!question.options.length &&
                            ["Checkbox", "Dropdown"].indexOf(question.type) >
                              -1 && (
                              <>
                                <Col md={12} className="mb-2">
                                  <strong>
                                    Please add options for checkbox and dropdown
                                  </strong>
                                </Col>
                                {question.options.map((option, i) => {
                                  return (
                                    <>
                                      <Col md={9} className="mb-2" key={i}>
                                        <Form.Control
                                          type="text"
                                          placeholder="Option title"
                                          value={option}
                                          onChange={event =>
                                            this.changeInOption(index, i, event)
                                          }
                                        />
                                      </Col>
                                      {question.options.length > 1 && (
                                        <Col md={1} className="mb-2">
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              this.deleteOption(index, i)
                                            }
                                          >
                                            <FaTrash />
                                          </Button>
                                        </Col>
                                      )}
                                      {question.options.length - 1 === i && (
                                        <Col md={1} className="mb-2">
                                          <Button
                                            variant="secondary"
                                            onClick={() =>
                                              this.addOption(index)
                                            }
                                          >
                                            <FaPlus />
                                          </Button>
                                        </Col>
                                      )}
                                    </>
                                  );
                                })}
                              </>
                            )}
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => this.deleteQuestion(index)}
                              disabled={questions.length === 1}
                            >
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}

              <Col md="8" className="mt-2 mx-auto">
                <Card>
                  <Card.Body className="text-center">
                    <h1 onClick={this.addNew} className="pointer">
                      +
                    </h1>
                  </Card.Body>
                </Card>
              </Col>
            </Tab>
            <Tab eventKey="preview" title="Preview" key="2">
              {show && (
                <MyForm questions={questions} result={this.getResponse} />
              )}
            </Tab>
            <Tab eventKey="response" title="Response" key="3">
              <Response response={response} />
            </Tab>
          </BootStrapTabs>
        </Container>
      </>
    );
  }
}

export default Tabs;
