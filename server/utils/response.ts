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