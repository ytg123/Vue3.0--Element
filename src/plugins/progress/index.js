import TerryProgress from './progress.vue';

/* istanbul ignore next */
TerryProgress.install = function(Vue) {
  Vue.component(TerryProgress.name, TerryProgress);
};

export default TerryProgress;
