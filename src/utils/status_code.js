const STATUS_CODES = {
  SUCCESS: {
    code: 200,
    message: 'Success.',
    description: 'Request successful.'
  },
  CREATED: {
    code: 201,
    message: 'Resource created.',
    description: 'New resource created successfully.'
  },
  NO_CONTENT: {
    code: 204,
    message: 'Success, no content to return.',
    description: 'Request successful but no content to return.'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Invalid client input.',
    description: 'Client sent invalid data.'
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Authentication required.',
    description: 'User not authenticated.'
  },
  FORBIDDEN: {
    code: 403,
    message: "Client is authenticated but doesn't have permission.",
    description: 'User lacks permission to access resource.'
  },
  NOT_FOUND: {
    code: 404,
    message: 'Resource not found.',
    description: 'Requested resource does not exist.'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Server-side error.',
    description: 'Unexpected error on the server.'
  }
};

export default STATUS_CODES;