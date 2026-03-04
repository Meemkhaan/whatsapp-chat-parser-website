/**
 * Allows non-React code (e.g. utils) to show errors via toast.
 * Toast component registers its setState on mount; falls back to alert otherwise.
 */
export const defaultErrorHandler = (msg: string) => {
  // eslint-disable-next-line no-alert
  if (typeof window !== 'undefined') alert(msg);
};
let errorHandler: (message: string) => void = defaultErrorHandler;

export function setErrorHandler(handler: (message: string) => void): void {
  errorHandler = handler;
}

export function notifyError(message: string): void {
  errorHandler(message);
}
