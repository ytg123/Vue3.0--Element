<template>
  <div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script>
	import {
		provide,onMounted,getCurrentInstance
	}  from 'vue'
  export default {
    name: 'TerryBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },
	
	setup(props,ctx){
		const {
			separator,separatorClass
		} = props
		provide('elBreadcrumb',{
			separator,separatorClass
		})
		
		let instance = getCurrentInstance()
		
		onMounted(() => {
			const items = instance.ctx.$el.querySelectorAll('.el-breadcrumb__item');
			if (items.length) {
			  items[items.length - 1].setAttribute('aria-current', 'page');
			}
		})
	}
	
  };
</script>
