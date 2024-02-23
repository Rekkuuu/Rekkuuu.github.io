"use strict";
const cache = {};
const c = (selector, root = document) => {
  var _a;
  let el = (_a = cache[selector]) !== null && _a !== void 0 ? _a : (cache[selector] = root.getElementById(selector));
  if (el) return el;
  // console.error(`${selector} doesn't exist`);
  return $("none");
};
const $ = (x) => document.getElementById(x);
const $b = (x) => $(x);
const $i = (x) => $(x);
const $q = (x) => document.querySelectorAll(x);

const clamp = (min, num, max) => Math.max(min, Math.min(num, max));
const show = (el, condition) => {
  if (Array.isArray(el)) el.forEach((el) => (el.style.display = condition ? "" : "none"));
  else el.style.display = condition ? "" : "none";
  return condition;
};

const min = (...x) => Math.min(...x);
const max = (...x) => Math.max(...x);
const round = (x) => Math.round(x);

const toggleClass = (el, _class, condition) => {
  let op = condition ? "add" : "remove";
  if (Array.isArray(el)) el.forEach((el) => el.classList[op](_class));
  else el.classList[op](_class);
  return condition;
};
const toggleBetweenClasses = (el, _class1, _class2, condition) => {
  let op1 = condition ? "add" : "remove";
  let op2 = !condition ? "add" : "remove";
  if (Array.isArray(el)) el.forEach((el) => (el.classList[op1](_class1), el.classList[op2](_class2)));
  else el.classList[op1](_class1), el.classList[op2](_class2);
  return condition;
};
