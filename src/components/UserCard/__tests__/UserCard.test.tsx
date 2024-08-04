import { Store, UnknownAction } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { UserType } from "@/types/user";

import UserCard from "../UserCard";

const mockStore = configureStore([]);
const user: UserType = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

describe("UserCard", () => {
  let store:
    | MockStoreEnhanced<unknown, object>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      global: {
        showDetails: false,
        incorrectAttempts: 0,
      },
    });
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <UserCard user={user} />
      </Provider>
    );

  test("renders user card with initial state", () => {
    renderComponent();
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.queryByText("Sincere@april.biz")).not.toBeInTheDocument();
    expect(screen.queryByText("1-770-736-8031 x56442")).not.toBeInTheDocument();
  });

  test("shows puzzle when 'View full contact details' button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("View full contact details"));
    expect(screen.getByText(/=\s?/)).toBeInTheDocument();
  });

  test("solves puzzle correctly", () => {
    renderComponent();
    fireEvent.click(screen.getByText("View full contact details"));

    const puzzleText = screen.getByText(/(\d+)\s\+\s(\d+)\s=/)?.textContent;
    const [leftSide, rightSide] = puzzleText?.match(/\d+/g)?.map(Number) || [];
    const answer = leftSide + rightSide;

    fireEvent.change(screen.getByTestId("puzzle-answer"), {
      target: { value: answer.toString() },
    });
    fireEvent.click(screen.getByText("Submit"));

    const actions = (store as MockStoreEnhanced<unknown, object>).getActions();

    expect(actions).toContainEqual({
      type: "global/setGlobal",
      payload: { showDetails: true, incorrectAttempts: 0 },
    });
  });

  test("handles incorrect puzzle answer", () => {
    renderComponent();
    fireEvent.click(screen.getByText("View full contact details"));

    fireEvent.change(screen.getByTestId("puzzle-answer"), {
      target: { value: "999" },
    });
    fireEvent.click(screen.getByText("Submit"));

    const actions = (store as MockStoreEnhanced<unknown, object>).getActions();

    expect(actions).toContainEqual({
      type: "global/setGlobal",
      payload: { showDetails: false, incorrectAttempts: 1 },
    });
  });
});
