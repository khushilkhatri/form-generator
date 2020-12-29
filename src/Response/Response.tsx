import React from "react";
import { Card, Col, Form } from "react-bootstrap";

type Props = {
  response: any[];
};

const Response = (props: Props) => {
  let { response } = props;
  return (
    <>
      {response.map(res => (
        <Col md="8" className="mt-4 mx-auto">
          <Card className="card-border-left">
            <Card.Body>
              {res.map((r: any) => {
                return (
                  <Col md={12} className="py-1">
                    <Form.Label>
                      <strong>{r.question}</strong>
                    </Form.Label>
                    <br />
                    <Form.Label>{r.answer}</Form.Label>
                  </Col>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default Response;
