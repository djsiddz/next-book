"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../page.module.css";

export default function Login() {
  const router = useRouter();

  function handleSubmit() {
    console.log("Submit needs to be handled. Soon!");
    router.push("/dashboard");
  }
  return (
    <>
      <Container fluid className={styles.introHeaderContainer}>
        <header className="py-3 mb-4 border-bottom">
          <Link
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none fs-4"
          >
            <i className="bi bi-bookmark-heart"></i>&nbsp;
            <span className="">Next Book</span>
          </Link>
        </header>
        <div className="p-5 mb-4 rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Hello there!</h1>
            <p className="col-md-8 fs-4">First tell us who you are!</p>
            <Row>
              <Col md={4}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}
