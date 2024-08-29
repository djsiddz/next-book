# Components Tests

## Testing References

- [Practical Guide to Testing - Next.js | React | Jest | React Testing Library (RTL)](https://www.youtube.com/watch?v=pnLC-9waA44)

## Introduction

A simple guide on how the tests are written and organized.

This `components/__tests__` directory contains Unit tests, that will test the individual components in isolation.

More specifically, the components folder contains two sub-folders - `native` and `ui`.

Since the `ui` folder contains the components directly from shadcn UI, I am not going to test them.

The `native` folder contains components composed to handle native app related functionality. So these are the ones I will be writing tests for.

## Native Components - Unit Testing

I'm currently adding unit tests, that will test **Render** and **Behavior** of the components.
