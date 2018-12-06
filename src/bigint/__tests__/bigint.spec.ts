jest.mock('../../environment.ts', () => ({
  __DEV__: true,
  __PROD__: false,
}));

describe(`BigInt`, () => {
  describe(`parse`, () => {
    it(`should work`, () => {
      expect(true).toBe(true);
    });
  });

  describe(`serialize`, () => {
    it(`should work`, () => {
      expect(true).toBe(true);
    });
  });

  describe(`parseValue`, () => {
    it(`should work`, () => {
      expect(true).toBe(true);
    });
  });
});
