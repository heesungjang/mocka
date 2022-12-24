export const callAll = (...fns: any) => fns.forEach((fn: any) => fn && fn());
