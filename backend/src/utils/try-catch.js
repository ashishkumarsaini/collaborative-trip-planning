import { noop } from './fn.js';

export const tryCatchWrapper = (fnName, callback, onError = noop) => {
    try {
        callback();
    }
    catch (error) {
        onError();
        console.log(`🚫 Error in function:${fnName} ${error}`);
    }
};
