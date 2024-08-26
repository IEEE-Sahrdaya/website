"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { auth } from "../../utils/firebase";
import { handleLogin } from "../../utils/FirebaseFunctions";
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #0077be;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #0077be;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

export default function SignIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    document.title = "Sign in | IEEE Sahrdaya SB"
    auth.onAuthStateChanged((user) => {
      if (user) {
        return router.push("/dashboard");
      }
    });
  }, [router]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email: Email, password: Password })
      .then((user) => {
        router.push("/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <Head>
        <title>Sign in - IEEE SAHRDAYA SB</title>
        <meta name="description" content="Sign in to IEEE SAHRDAYA SB" />
      </Head>
      <Navbar />
      <Container>
        <ToastContainer />

        <Title>Sign in</Title>
        <Subtitle>
          Societies can login to this application and edit website content
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
          />
          <Input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">SIGN IN</Button>
        </Form>
      </Container>
    </>
  );
}
