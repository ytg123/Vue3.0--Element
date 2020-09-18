import TerryLink from './main.vue';

/* istanbul ignore next */
TerryLink.install = function(Vue) {
  Vue.component(TerryLink.name, TerryLink);
};

export default TerryLink;
