import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskList from '../TaskList/TaskList';

describe('TaskList Component', () => {
  const tasks = ['Tasks 1', 'Tasks 2', 'Tasks 3'];
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  test('should render the correct number of tasks', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getAllByText(/Tasks/).length).toBe(tasks.length);
  });

  test('should call onEdit function with the correct index when edit button is clicked', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    const editButtons = screen.getAllByTestId('editBtn');
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(0);

    fireEvent.click(editButtons[1]);
    expect(onEdit).toHaveBeenCalledWith(1);
  });

  test('should call onDelete function with the correct index when delete button is clicked', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    const deleteButtons = screen.getAllByTestId('deleteBtn');
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(0);

    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('should display the correct task names', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    tasks.forEach(task => {
      expect(screen.getByText(task)).toBeInTheDocument();
    });
  });

  test('should display the correct actions for each task', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    tasks.forEach((_, index) => {
      expect(screen.getAllByTestId('editBtn')[index]).toBeInTheDocument();
      expect(screen.getAllByTestId('deleteBtn')[index]).toBeInTheDocument();
    });
  });
});
