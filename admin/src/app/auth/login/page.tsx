"use client";
import Image from "next/image";
import { signIn, SignInOptions } from "next-auth/react";
import React from "react";
import Link from "next/link";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

import Finn4ULogo from "@assets/img/finn4u-logo.png";
import { AlertPrimary } from "@component/alert/SwalAlert";
import { redirect } from "next/navigation";

const page = () => {
  const formAction = async (formData: FormData) => {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.url) {
      redirect("/");
    } else {
      AlertPrimary("Invalid email or password.", "error");
    }
  };

  return (
    <main className="d-flex w-100 login">
      <Container className="d-flex flex-column">
        <Row className="vh-100">
          <Col sm={10} md={8} lg={6} className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <Image src={Finn4ULogo} alt="Finn4U Logo" className="w-50" />
              </div>

              <div className="m-sm-4">
                <Form action={formAction}>
                  <FormGroup className="mb-3">
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl
                      size="lg"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl
                      size="lg"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                    <span className="forgotpass">
                      <Link href="/forget-password">ลืมรหัสผ่าน</Link>
                    </span>
                  </FormGroup>
                  <FormGroup className="text-center mt-3">
                    <Button
                      role="button"
                      type="submit"
                      size="lg"
                      variant="primary"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default page;
