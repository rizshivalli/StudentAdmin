import {AxiosResponse} from 'axios';

interface responseError extends AxiosResponse, Error {
  data:
    | {
        api_error?: string;
        error?: string;
        status_code?: number;
        error_code?: string;
      }
    | string;
}
export const getErrorMessage = (
  error: responseError,
  errorheader: string = '',
) => {
  const {data, message} = error || {};
  if (typeof data === 'string') {
    const FINAL_ERROR = data || message;
    console.log('ERROR', errorheader, FINAL_ERROR);
    return FINAL_ERROR;
  } else {
    const {error: error1 = '', api_error: error2 = ''} = data || {};
    const API_ERROR = error2 || error1;
    const FINAL_ERROR = API_ERROR || message;
    console.log('ERROR', errorheader, FINAL_ERROR);
    return FINAL_ERROR;
  }
};
