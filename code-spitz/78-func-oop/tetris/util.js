export const prop = (target, v) => Object.assign(target, v);

export const el = el => document.createElement(el);

export const back = (s, v) => (s.backgroundColor = v);
