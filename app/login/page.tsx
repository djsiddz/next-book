"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function Login() {
  const router = useRouter();

  function handleSubmit() {
    console.log("Submit needs to be handled. Soon!");
    router.push("/dashboard");
  }
  return (
    <>
      <div className={styles.introHeaderContainer}>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email address</label>
                <input type="email" placeholder="Enter email" />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" placeholder="Enter password" />
              </div>
              <button type="submit" onClick={() => handleSubmit()}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
