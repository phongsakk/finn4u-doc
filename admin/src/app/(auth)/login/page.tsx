"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'

import Finn4ULogo from "@assets/img/finn4u-logo.png"

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  }

  const set = (props: "email" | "password") => {
    if (props === "email") {
      return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(value);
      }
    } else if (props === "password") {
      return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
      }
    }
    return undefined;
  }

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
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl
                      size='lg' type="email" name="email"
                      placeholder="Enter your email"
                      defaultValue={email} onChange={set("email")}
                    />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl
                      size='lg' type="password" name="password"
                      placeholder="Enter your password"
                      defaultValue={password} onChange={set("password")}
                    />
                    <span className="forgotpass">
                      <Link href="/forget-password">ลืมรหัสผ่าน</Link>
                    </span>
                  </FormGroup>
                  <FormGroup className="text-center mt-3">
                    <Button role="button" type='submit' size='lg' variant='primary'>เข้าสู่ระบบ</Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default page