<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'el-message',
        type && !iconClass ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
      :style="positionStyle"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      role="alert">
      <i :class="iconClass" v-if="iconClass"></i>
      <i :class="typeClass" v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
      <i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
	import { ref , toRefs, reactive,computed , watch, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
  const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
	name:'TerryMessage',
	props:{
		id:{
			type:String,
			default:''
		},
		message:{
			type:String,
			default:''
		},
		duration:{
			type:Number,
			default:3000
		},
		type:{
			type:String,
			default:'info'
		},
		iconClass:{
			type:String,
			default:''
		},
		customClass:{
			type:String,
			default:''
		},
		onClose: {
			type:Function,
			default:() => {}
		},
		showClose: {
			type:Boolean,
			default:false
		},
		verticalOffset: {
			type:Number,
			default:20
		},
		dangerouslyUseHTMLString: {
			type:Boolean,
			default:false
		},
		center:{
			type:Boolean,
			default:false
		},
	},
	setup(props){
		const  visible = ref(true)
		const  closed = ref(false)
		const  timer = ref(null)
		
		const {
			type,iconClass,
			verticalOffset,onClose,
			duration,center,showClose,
			customClass,dangerouslyUseHTMLString,
			message
		} = props
		
		const state = reactive({
			type,
			iconClass,
			duration,
			center,
			showClose,
			customClass,
			dangerouslyUseHTMLString,
			message
		})
		
		//computed
		const typeClass = computed(() => {
			return type && !iconClass
			  ? `el-message__icon el-icon-${ typeMap[type] }`
			  : '';
		})
		
		const positionStyle = computed(() => {
			return {
			  'top': `${ verticalOffset }px`
			};
		})
		
		//watch
		watch(() => closed.value,(newVal) => {
			if (newVal) {
			  visible.value = false;
			}
		})
		
		const instance = getCurrentInstance()
		
		//methods
		const handleAfterLeave = () => {
			// console.log(instance.ctx);
			// instance.ctx.$destroy(true)
			instance.ctx.$el.parentNode.removeChild(instance.ctx.$el)
		}
		
		const close = () => {
			closed.value = true
			if (typeof onClose === 'function') {
			  onClose(this);
			}
		}
		
		const clearTimer = () => {
		  clearTimeout(timer.value);
		}
		
		const startTimer = () => {
			if (duration > 0) {
			  timer.value = setTimeout(() => {
				if (!closed.value) {
				  close();
				}
			  }, duration);
			}
		}
		
		const keydown = (e) => {
		  if (e.keyCode === 27) { // esc关闭消息
		    if (!closed.value) {
		      close();
		    }
		  }
		}
		
		onMounted(() => {
			startTimer();
			document.addEventListener('keydown', keydown)
		})
		
		onBeforeUnmount(() => {
			document.removeEventListener('keydown', keydown)
		})
		
		return {
			handleAfterLeave,
			typeClass,
			positionStyle,
			close,
			clearTimer,
			startTimer,
			visible,
			...toRefs(state)
		}
	}
	
  };
</script>
