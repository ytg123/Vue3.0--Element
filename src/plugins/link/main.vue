<template>
  <a
    :class="[
      'el-link',
      type ? `el-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >

    <i :class="icon" v-if="icon"></i>

    <span v-if="$slots.default" class="el-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon"><slot v-if="$slots.icon" name="icon"></slot></template>
  </a>
</template>

<script>
import { toRefs , computed } from 'vue'
export default {
  name: 'TerryLink',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: {
		type:String,
		default:''
	},
    icon: String
  },
  emits:['click'],
  setup(props,{ emit }){
	  const {
		disabled ,href,type,underline,icon
	  } = toRefs(props)
	  
	  const handleClick = (event) => {
		  if (!disabled.value) {
		    if (!href.value) {
		      emit('click', event);
		    }
		  }
	  }
	 return {
		 disabled,
		 handleClick,
		 href,
		 type,
		 underline,
		 icon
	 } 
  }
};
</script>
