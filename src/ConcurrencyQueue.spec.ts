import { ConcurrencyQueue } from './ConcurrencyQueue';

jest.useFakeTimers();

const createTask = (id: number, delay: number, tracker: number[]) => {
  return () =>
    new Promise<number>((resolve) => {
      tracker.push(id);
      setTimeout(() => resolve(id), delay);
    });
};

test('should not exceed concurrency limit', async () => {
  const tracker: number[] = [];
  const queue = new ConcurrencyQueue(2);

  const tasks = [1, 2, 3, 4].map((i) =>
    queue.enqueue(createTask(i, 1000, tracker)),
  );

  jest.advanceTimersByTime(0);
  expect(tracker).toEqual([1, 2]);

  jest.advanceTimersByTime(1000);
  await Promise.resolve();
  jest.advanceTimersByTime(0);
  expect(tracker).toEqual([1, 2, 3, 4]);

  jest.advanceTimersByTime(1000);
  await Promise.all(tasks);
});

test('should process tasks in FIFO order', async () => {
  const tracker: number[] = [];
  const queue = new ConcurrencyQueue(1);

  const tasks = [
    queue.enqueue(createTask(1, 100, tracker)),
    queue.enqueue(createTask(2, 100, tracker)),
    queue.enqueue(createTask(3, 100, tracker)),
  ];

  jest.advanceTimersByTime(0);
  expect(tracker).toEqual([1]);

  jest.advanceTimersByTime(100);
  await Promise.resolve();
  expect(tracker).toEqual([1, 2]);

  jest.advanceTimersByTime(100);
  await Promise.resolve();
  expect(tracker).toEqual([1, 2, 3]);

  jest.advanceTimersByTime(100);
  await Promise.all(tasks);
});

test('should start new task after one finishes', async () => {
  const tracker: number[] = [];
  const queue = new ConcurrencyQueue(2);

  const tasks = [
    queue.enqueue(createTask(1, 50, tracker)),
    queue.enqueue(createTask(2, 50, tracker)),
    queue.enqueue(createTask(3, 50, tracker)),
  ];

  jest.advanceTimersByTime(0);
  expect(tracker).toEqual([1, 2]);

  jest.advanceTimersByTime(50);
  await Promise.resolve();
  expect(tracker).toEqual([1, 2, 3]);

  jest.advanceTimersByTime(50);
  await Promise.all(tasks);
});
