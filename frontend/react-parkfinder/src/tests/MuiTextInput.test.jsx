import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiTextInput from "../components/MuiTextInput";

describe("TextInput Tests", () => {
  it("test using placeholder text", async () => {
    render(<MuiTextInput />);

    const input = await screen.findByPlaceholderText("Enter name");
    await userEvent.type(input, "Jay");
    expect(input).toHaveValue("Jay");
  });


});