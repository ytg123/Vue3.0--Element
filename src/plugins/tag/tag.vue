<template>
	<span
		v-if='disableTransitions'
		:class="classes"
		:style="{ backgroundColor: color }" 
		@click='handleClick'>
		<slot></slot>
		<i v-if="closable" class="el-tag__close el-icon-close" @click='handleClose'></i>
	</span>
	<transition v-else name="el-zoom-in-center">
		<span
			:class="classes"
			:style="{ backgroundColor: color }" 
			@click='handleClick'>
			<slot></slot>
			<i v-if="closable" class="el-tag__close el-icon-close" @click='handleClose'></i>
		</span>
	</transition>
</template>
<script>
	import { toRefs,computed,getCurrentInstance } from 'vue'
  export default {
    name: 'TerryTag',
    props: {
      text: {
		  type:String,
		  default:''
	  },
      closable: Boolean,
      type: {
		  type:String,
		  default:''
	  },
      hit: Boolean,
      disableTransitions: Boolean,
      color: {
		  type:String,
		  default:''
	  },
      size: {
		  type:String,
		  default:''
	  },
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1;
        }
      }
    },
	emits:['close','click'],
	setup(props,{ emit }){
		const {
			size,closable,disableTransitions,type,effect,hit
		} = toRefs(props)
		const handleClose = (event) => {
			event.stopPropagation();
			emit('close', event);
		}
		
		const handleClick = (event) => {
			emit('click', event);
		}
		
		const tagSize = useTagSize(size)
		const classes = useClasses(type,tagSize,effect,hit)
		
		return {
			tagSize,
			handleClose,
			handleClick,
			classes
		}
	}
  };
  const useTagSize = (size) => {
	  const tagSize = computed(() => {
		  return size.value || (getCurrentInstance().proxy.$ELEMENT || {}).size;
	  })
	  return tagSize
  }
  
  const useClasses = (type,tagSize,effect,hit) => {
	const classes = computed(() => {
		return [
			'el-tag',
			type.value ? `el-tag--${type.value}` : '',
			tagSize.value ? `el-tag--${tagSize.value}` : '',
			effect.value ? `el-tag--${effect.value}` : '',
			hit.value && 'is-hit'
		];
	})
	return classes
  }
</script>
