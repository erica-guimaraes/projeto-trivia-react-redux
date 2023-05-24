import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';

const initialStepLogin = () => {
  const nameInput = screen.getByRole('textbox', { name: /nome/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const playButton = screen.getByRole('button', { name: /play/i });

  userEvent.type(nameInput, 'qualquer nome');
  userEvent.type(emailInput, 'email@email.com');
  userEvent.click(playButton);
};

describe('Check the login page', () => {
  it('Checks if there are inputs and buttons on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const nomeLabelText = screen.getByText(/nome/i);
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailLabelText = screen.getByText(/email/i);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const playButton = screen.getByRole('button', { name: /play/i });
    const configButton = screen.getByRole('button', { name: /configurações/i });

    expect(nomeLabelText).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailLabelText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(configButton).toBeInTheDocument();
  });

  it('Checks if typing the name and email is redirected to the game page and also if a fetch call occurs', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    const { history } = renderWithRouterAndRedux(<App />);
    initialStepLogin();

    const initialPointsText = await screen.findByText(/0 pontos/i);
    expect(initialPointsText).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/trivia');

    expect(spyFetch).toHaveBeenCalled();
  });

  it('Checks if clicking on the configuration button is correctly redirected.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configButton = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(configButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });
});
