type stateType = {[key: string]: any};

interface actionType {
  type: string;
  payload: stateType;
}

export default (state: stateType = {}, {type, payload}: actionType) => {
  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  if (requestState === 'FAIL') {
    const {data, message} = payload || {};
    return {...state, [requestName]: message || data || ''};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {[requestName]: data, ...rest} = state;
  return rest;
};
