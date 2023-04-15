"use client";
// explicit mention this component to run as client side component so that react bootstrap can work
import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
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
          <h1 className="display-5 fw-bold">Keep track of your Books.</h1>
          <p className="col-md-8 fs-4">
            No matter where and how you like to read them.
          </p>
          <Link className="btn btn-primary btn-lg" href="/login">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
