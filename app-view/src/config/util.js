
import Vue from 'vue';

export function heightPoint(point) {
  const height = Vue.prototype.minHeight;
  return `${eval(height / 100 * point)}px`;
}







  
