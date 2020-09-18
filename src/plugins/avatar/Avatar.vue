<template>
	<span :class='avatarClass' :style='sizeStyle'>
		<img
		  v-if="isImageExist && src"
		  :src='src'
		  @error="handleError"
		  :alt='alt'
		  :srcSet='srcSet'
		  :style="{'object-fit': fit}"/>
		  <i v-if="icon" :class="icon" />
		  <slot></slot>
	</span>
</template>

<script>
	import { ref , toRefs, computed } from 'vue'
export default {
  name: 'TerryAvatar',

  props: {
    size: {
      type: [Number, String],
	  default:'',
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val);
        }
        return typeof val === 'number';
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    icon: {
		type:String,
		default:''
	},
    src: {
		type:String,
		default:''
	},
    alt: {
		type:String,
		default:''
	},
    srcSet: {
		type:String,
		default:''
	},
    error: {
		type:Function,
		default: () => {}
	},
    fit: {
      type: String,
      default: 'cover'
    }
  },
  setup(props){
	  const isImageExist = ref(true)
	  
	  const {
		size, icon, shape ,error, src, alt, srcSet, fit
	  } = toRefs(props)
	  
	  const avatarClass = computed(() =>{
		  let classList = ['el-avatar'];
		  
		  if (size.value && typeof size.value === 'string') {
		    classList.push(`el-avatar--${size.value}`);
		  }
		  
		  if (icon.value) {
		    classList.push('el-avatar--icon');
		  }
		  
		  if (shape.value) {
		    classList.push(`el-avatar--${shape.value}`);
		  }
		  
		  return classList.join(' ');
	  })
	  
	  const sizeStyle = typeof size.value === 'number' ? {
	    height: `${size.value}px`,
	    width: `${size.value}px`,
	    lineHeight: `${size.value}px`
	  } : {};
	  
	  const handleError = () => {
		  const errorFlag = error.value ? error.value() : undefined;
		  if (errorFlag !== false) {
		    isImageExist.value = false;
		  }
	  }
 	  
	  return {
		  isImageExist,
		  handleError,
		  avatarClass,
		  sizeStyle,
		  src,
		  alt, 
		  srcSet, 
		  fit,
		  icon
	  }
  }
	

};
</script>
