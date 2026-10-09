import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBloodRequestModal from '../src/components/CreateBloodRequestModal';
import { getVerifiedBloodBanks } from '../src/services/bloodBankApi';
import { createBloodRequest } from '../src/services/hospitalBloodRequestApi';

// Mock API services
jest.mock('../src/services/bloodBankApi', () => ({
  getVerifiedBloodBanks: jest.fn()
}));

jest.mock('../src/services/hospitalBloodRequestApi', () => ({
  createBloodRequest: jest.fn()
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}));

describe('CreateBloodRequestModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockBloodBanks = [
    { _id: 'bb-1', name: 'Central Blood Bank', city: 'Delhi', state: 'Delhi' },
    { _id: 'bb-2', name: 'City Blood Center', city: 'Mumbai', state: 'Maharashtra' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getVerifiedBloodBanks.mockResolvedValue({
      data: { data: mockBloodBanks }
    });
  });

  const renderModal = (isOpen = true) => {
    return render(
      <CreateBloodRequestModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
        hospitalId="hosp-123"
      />
    );
  };

  it('renders modal when open and displays form after loading', async () => {
    renderModal();

    expect(screen.getByText(/create blood request/i)).toBeInTheDocument();
    
    // Wait for blood banks to load
    await waitFor(() => {
      expect(screen.getByLabelText(/select blood bank/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/blood group/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/units required/i)).toBeInTheDocument();
    expect(screen.getByText(/urgency level/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /(submit request|create request)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModal(false);
    expect(screen.queryByText(/create blood request/i)).not.toBeInTheDocument();
  });

  it('closes modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderModal();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('updates form fields when user types and selects', async () => {
    const user = userEvent.setup();
    renderModal();

    await waitFor(() => {
      expect(screen.getByLabelText(/select blood bank/i)).toBeInTheDocument();
    });

    const bloodBankSelect = screen.getByLabelText(/select blood bank/i);
    const bloodGroupSelect = screen.getByLabelText(/blood group/i);
    const unitsInput = screen.getByLabelText(/units required/i);

    await user.selectOptions(bloodBankSelect, 'bb-1');
    await user.selectOptions(bloodGroupSelect, 'O+');
    await user.type(unitsInput, '3');

    expect(bloodBankSelect).toHaveValue('bb-1');
    expect(bloodGroupSelect).toHaveValue('O+');
    expect(unitsInput).toHaveValue(3);
  });

  it('shows validation error when required fields are missing', async () => {
    const user = userEvent.setup();
    renderModal();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /(submit request|create request)/i })).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /(submit request|create request)/i });
    await user.click(submitButton);

    expect(screen.getByText(/please select a blood bank/i)).toBeInTheDocument();
  });

  it('submits form successfully with valid data', async () => {
    createBloodRequest.mockResolvedValue({
      data: { success: true, message: 'Request created' }
    });

    const user = userEvent.setup();
    renderModal();

    await waitFor(() => {
      expect(screen.getByLabelText(/select blood bank/i)).toBeInTheDocument();
    });

    const bloodBankSelect = screen.getByLabelText(/select blood bank/i);
    const bloodGroupSelect = screen.getByLabelText(/blood group/i);
    const unitsInput = screen.getByLabelText(/units required/i);
    const submitButton = screen.getByRole('button', { name: /(submit request|create request)/i });

    await user.selectOptions(bloodBankSelect, 'bb-1');
    await user.selectOptions(bloodGroupSelect, 'O+');
    await user.type(unitsInput, '3');
    await user.click(submitButton);

    await waitFor(() => {
      expect(createBloodRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          hospitalId: 'hosp-123',
          bloodBankId: 'bb-1',
          bloodGroup: 'O+',
          unitsRequired: 3,
          urgency: 'MEDIUM'
        }),
        null
      );
    });

    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles API error during submission gracefully', async () => {
    createBloodRequest.mockRejectedValue({
      response: { data: { message: 'Failed to create blood request' } }
    });

    const user = userEvent.setup();
    renderModal();

    await waitFor(() => {
      expect(screen.getByLabelText(/select blood bank/i)).toBeInTheDocument();
    });

    const bloodBankSelect = screen.getByLabelText(/select blood bank/i);
    const bloodGroupSelect = screen.getByLabelText(/blood group/i);
    const unitsInput = screen.getByLabelText(/units required/i);
    const submitButton = screen.getByRole('button', { name: /(submit request|create request)/i });

    await user.selectOptions(bloodBankSelect, 'bb-1');
    await user.selectOptions(bloodGroupSelect, 'A+');
    await user.type(unitsInput, '2');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/failed to create blood request/i)).toBeInTheDocument();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('has all required blood group options', async () => {
    renderModal();

    await waitFor(() => {
      expect(screen.getByLabelText(/blood group/i)).toBeInTheDocument();
    });

    const bloodGroupSelect = screen.getByLabelText(/blood group/i);
    const options = Array.from(bloodGroupSelect.options);
    const expectedGroups = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    expect(options.map(option => option.value)).toEqual(expectedGroups);
  });
});
