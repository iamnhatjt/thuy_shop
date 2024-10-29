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
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    status: 400,
    msg: 'Bad request',
    krMsg: '잘못된 요청',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    status: 401,
    msg: 'Unauthorized',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    status: 403,
    msg: 'Forbidden',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    msg: 'Internal server error',
  },
};
