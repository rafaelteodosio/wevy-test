import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm/TaskForm';

describe('TaskForm Component', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('should render TaskForm with empty input by default', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} />);
    expect(screen.getByLabelText(/task/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('should render TaskForm with filled input when editingTask is provided', () => {
    const editingTask = 'Test Task';
    render(<TaskForm onSubmit={onSubmit} editingTask={editingTask} />);
    expect(screen.getByLabelText(/task/i)).toHaveValue(editingTask);
    expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
  });

  test('should call onSubmit with task value when form is submitted', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} />);

    const input = screen.getByLabelText(/task/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(onSubmit).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });

  test('should show error message when trying to submit an empty task', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} />);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByText(/a task não pode estar vazia/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should clear error message after successful submission', () => {
    render(<TaskForm onSubmit={onSubmit} editingTask={null} />);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(screen.getByText(/a task não pode estar vazia/i)).toBeInTheDocument();

    const input = screen.getByLabelText(/task/i);
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.queryByText(/a task não pode estar vazia/i)).not.toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });
});