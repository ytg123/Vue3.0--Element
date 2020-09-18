<template>
  <div class="el-badge">
    <slot></slot>
    <transition name="el-zoom-in-center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="el-badge__content"
        :class="[
          'el-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]">
      </sup>
    </transition>
  </div>
</template>

<script>
	import { toRefs,computed } from 'vue'
export default {
  name: 'TerryBadge',

  props: {
    value: {
		type:[String, Number],
		default:''
	},
    max: {
		type:Number,
		default:100
	},
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      validator(val) {
        return ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1;
      }
    }
  },
	
  setup(props){
	  const {
		 isDot ,value:vl,max
	  } = toRefs(props)
	  
	  const { value:content } = useContent(isDot,vl,max)
	  return {
		  content
	  }
  }
};
const useContent = (isDot,vl,max) => {
	const value = computed(() => {
	  if(isDot.value) return;
	  const val = vl.value;
	  const nmax = max.value;
	  
	  if (typeof val === 'number' && typeof nmax === 'number') {
		return nmax < val ? `${nmax}+` : val;
	  }
	  
	  return val;
	})
	
	return {
		value
	}
}
</script>
