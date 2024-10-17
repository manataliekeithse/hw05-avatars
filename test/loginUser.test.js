import bcrypt from "bcrypt";
import { jest } from "@jest/globals";
import { User } from "../models/usersModel";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

describe("Test @POST /api/users/login", () => {
  const mockSignInData = {
    email: "testuser05@example.com",
    password: "TestPassword5!",
  };

  const mockUserId = "mockUserId";

  const mockUserAccount = {
    _id: mockUserId,
    email: mockSignInData.email,

    password: bcrypt.hash(mockSignInData.password, 10),
    subscription: "starter",
  };

  beforeAll(() => {
    jest.spyOn(User, "findOne").mockImplementation(({ email }) => {
      if (email === mockSignInData.email) {
        return Promise.resolve(mockUserAccount);
      }
    });

    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation((password, hashedPassword) => {
        return Promise.resolve(
          password === mockSignInData.password &&
            hashedPassword === mockUserAccount.password
        );
      });

    jest.spyOn(jwt, "sign").mockImplementation(() => "mockJwtToken");

    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementation((id, fieldToBeUpdatedInTheObject) => {
        if (id === mockUserId) {
          return Promise.resolve({
            ...mockSignInData,
            ...fieldToBeUpdatedInTheObject,
          });
        }
      });
  });

  test("Login POST request with correct data", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(mockSignInData);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token", "mockJwtToken");

    const { user } = response.body;

    expect(user).toHaveProperty("email" && "subscription");

    expect(user.email && user.subscription).toEqual(expect.any(String));
  });
});
