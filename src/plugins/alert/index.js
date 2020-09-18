import TerryAlert from './Alert.vue';

/* istanbul ignore next */
TerryAlert.install = function(Vue) {
  Vue.component(TerryAlert.name, TerryAlert);
};

export default TerryAlert;
