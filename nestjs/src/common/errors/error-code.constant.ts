export interface ErrorCode {
  readonly code: string;
  readonly msg: string;
  readonly status: number;
}

export const ErrorCodes = {
  OK: {
    code: 'OK',
    status: 200,
    msg: 'Successfully',
  },
};
