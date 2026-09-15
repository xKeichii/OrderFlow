import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Task } from 'src/types';

import taskService from 'src/api/tasks';

import Main from './';

vi.mock('src/api/tasks', () => ({
  default: {
    find: vi.fn(),
    remove: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Main', () => {
  it('displays the number of tasks', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        name: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        dueTo: '2026-09-20',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Task 2',
        description: 'Description 2',
        status: 'todo',
        dueTo: '2026-09-21',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: 'Task 3',
        description: 'Description 3',
        status: 'todo',
        dueTo: '2026-09-22',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(taskService.find).mockResolvedValue(tasks);

    render(<Main />);

    await waitFor(() => {
      expect(
        screen.getByText('Currently you have 3 tasks')
      ).toBeInTheDocument();
    });
  });
  it('displays singular "task" when there is one task', async () => {
    const tasks: Task[] = [
      {
        id: '1',
        name: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        dueTo: '2026-09-20',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(taskService.find).mockResolvedValue(tasks);

    render(<Main />);

    await waitFor(() => {
      expect(
        screen.getByText('Currently you have 1 task')
      ).toBeInTheDocument();
    });
  });
});