import React from "react";
import { Card, Col, Form as BootForm, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

type Props = {
  questions: any[];
  result: any;
};

const Form = (props: Props) => {
  const { questions } = props;
  const { handleSubmit, control } = useForm();
  const submitResult = (data: any, e: any) => {
    e.target.reset();
    props.result(data);
  };
  return (
    <form onSubmit={handleSubmit(submitResult)}>
      <Row>
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
                  <BootForm.Label>{question.question}</BootForm.Label>
                  {question.type === "Long Text" && (
                    <Controller
                      as={
                        <BootForm.Control
                          as="textarea"
                          rows={3}
                          name={"input-" + index}
                        />
                      }
                      name={"input-" + index}
                      control={control}
                    />
                  )}
                  {question.type === "Short Text" && (
                    <Controller
                      as={
                        <BootForm.Control type="text" name={"input-" + index} />
                      }
                      name={"input-" + index}
                      control={control}
                    />
                  )}
                  {question.type === "Dropdown" && question.options && (
                    <Controller
                      as={
                        <BootForm.Control as="select">
                          <option value="" selected={true}></option>
                          {question.options.map((option: string, i: number) => {
                            return (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            );
                          })}
                        </BootForm.Control>
                      }
                      name={"input-" + index}
                      control={control}
                    />
                  )}
                  {question.type === "Checkbox" &&
                    question.options!.map((option: string, i: number) => {
                      return (
                        <Controller
                          as={
                            <BootForm.Check
                              value={option}
                              key={i}
                              type="checkbox"
                              name={`input-ch-${index}-${i}`}
                              label={option}
                            />
                          }
                          key={i}
                          valueName={option}
                          name={`input-ch-${index}-${i}`}
                          control={control}
                        />
                      );
                    })}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col md="8" className="mt-5 mx-auto">
          <input className="btn btn-primary" type="submit" value="Submiit" />
        </Col>
      </Row>
    </form>
  );
};

export default Form;
