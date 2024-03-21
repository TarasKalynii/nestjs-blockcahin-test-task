export type MockType<T> = {
  [P in keyof T]: jest.Mock<T[P] extends (...args: any[]) => infer U ? U : any>;
};
