export const successResponse = {
    success: true,
    message: 'Operation successful',
    data: {},
    timestamp: new Date().toISOString(),
}
export const errorResponse = {
    success: false,
    message: 'Something went wrong',
    error: {},
    timestamp: new Date().toISOString(),
}
export const status = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}