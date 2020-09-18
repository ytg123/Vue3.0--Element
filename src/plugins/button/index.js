import TerryButton from './button.vue';

/* istanbul ignore next */
TerryButton.install = function(Vue) {
  Vue.component(TerryButton.name, TerryButton);
};

export default TerryButton;
