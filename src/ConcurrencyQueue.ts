type AsyncTask<T> = () => Promise<T>;

export class ConcurrencyQueue {
  private queue: Array<() => Promise<void>> = [];
  private activeCount = 0;

  constructor(private readonly concurrencyLimit: number) {
    if (concurrencyLimit <= 0)
      throw new Error('Concurrency limit must be greater than 0');
  }

  public enqueue<T>(task: AsyncTask<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const run = async () => {
        this.activeCount++;
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err as Error);
        } finally {
          this.activeCount--;
          this.next();
        }
      };

      if (this.activeCount < this.concurrencyLimit) run();
      else this.queue.push(run);
    });
  }

  private next() {
    if (this.queue.length > 0 && this.activeCount < this.concurrencyLimit)
      this.queue.shift()();
  }
}
