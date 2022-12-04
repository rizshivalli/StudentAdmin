type stateType = {[key: string]: any};

export default (state: stateType = {}, {type}: {type: string}) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  if (requestState === 'REQUEST') {
    return {...state, [requestName]: true};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {[requestName]: data, ...rest} = state;
  return rest;
};
