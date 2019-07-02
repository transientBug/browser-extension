enum Things {
  one = "one",
  two = "two"
}

const actionOne = () => ({ type: Things.one } as const);
const actionTwo = () => ({ type: Things.two } as const);

const actions = {
  [Things.one]: actionOne,
  [Things.two]: actionTwo
};

const reducers = {
  [Things.one]: (action: ReturnType<typeof actionOne>) => {},
  [Things.two]: (action: ReturnType<typeof actionTwo>) => {}
};

type ActionReducer<T> = (action: T) => void;

// This works, no compiler errors
const actionReducer = reducers[Things.one];
actionReducer(actionOne());

// This does not work, compiler errors on calling the `actionReducer(action)`
// complaining that the types of actionOne and actionTwo are assignable
const reducer = (action: ReturnType<typeof actionOne | typeof actionTwo>) => {
  const actionReducer = reducers[action.type] as ActionReducer<typeof action>;

  actionReducer(action);
};
