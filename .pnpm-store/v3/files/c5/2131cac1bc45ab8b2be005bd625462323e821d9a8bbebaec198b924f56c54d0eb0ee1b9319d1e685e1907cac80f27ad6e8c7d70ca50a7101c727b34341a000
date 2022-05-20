export const createCounter = (callback) => {
    const dispatch = (index, input) => {
        const next = (nextInput = input) => dispatch(index + 1, nextInput);
        return callback(index, input, next);
    };
    const start = (input) => {
        return dispatch(0, input);
    };
    return {
        start,
        dispatch,
    };
};
//# sourceMappingURL=counter.js.map