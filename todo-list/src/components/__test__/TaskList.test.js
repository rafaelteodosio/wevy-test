import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskList from '../TaskList/TaskList';

describe('TaskList Component', () => {
  const tasks = [{ title: 'Tasks 1', id: 1 }, { title: 'Tasks 2', id: 2 }, { title: 'Tasks 3', id: 3 }];
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  test('should render the correct number of tasks', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getAllByText(/Tasks/).length).toBe(tasks.length);
  });

  test('should call onEdit function edit button is clicked', async () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    const editButtons = screen.getAllByTestId('editBtn');
    fireEvent.click(editButtons[0]);
    const textField = screen.getAllByTestId('editField');
    const inputField = textField[0].childNodes[0].childNodes[0];
    await fireEvent.change(inputField, { target: { value: 'Edited Task' } });
    const checkButton = screen.getAllByTestId('checkBtn');
    fireEvent.click(checkButton[0]);
    expect(onEdit).toHaveBeenCalledWith({ "id": 1, "title": "Edited Task" });
  });

  test('should call onDelete function when delete button is clicked', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    const deleteButtons = screen.getAllByTestId('deleteBtn');
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(1);

    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
  });

  test('should display the correct task names', () => {
    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);
    tasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
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
