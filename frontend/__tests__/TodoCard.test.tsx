import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../src/components/TodoCard';
import { Todo } from '@/types/general'; 

describe('TodoCard', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'This is a test todo',
    completed: false,
  };

  const mockOnClick = jest.fn();

  it('renders the todo title and description', () => {
    render(<TodoCard todo={mockTodo} onClick={mockOnClick} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('This is a test todo')).toBeInTheDocument();
  });

  it('renders the correct status (Pending)', () => {
    render(<TodoCard todo={mockTodo} onClick={mockOnClick} />);

    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders the correct status (Completed)', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoCard todo={completedTodo} onClick={mockOnClick} />);

    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('calls onClick when the card is clicked', () => {
    render(<TodoCard todo={mockTodo} onClick={mockOnClick} />);

    const card = screen.getByTestId('todo-card');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockTodo);
  });
});