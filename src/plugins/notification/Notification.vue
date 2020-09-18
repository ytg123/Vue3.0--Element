<template>
	<transition name="el-notification-fade">
		<div
			:class="['el-notification', customClass, horizontalClass]"
			v-show="visible"
			:style="positionStyle"
			@mouseenter="clearTimer()"
			@mouseleave="startTimer()"
			@click="click"
			role="alert"
		>
			<i class="el-notification__icon" :class="[typeClass, iconClass]" v-if="type || iconClass"></i>
			<div class="el-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
				<h2 class="el-notification__title" v-text="title"></h2>
				<div class="el-notification__content" v-show="message">
					<slot>
						<p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
						<p v-else v-html="message"></p>
					</slot>
				</div>
				<div class="el-notification__closeBtn el-icon-close" v-if="showClose" @click.stop="close"></div>
			</div>
		</div>
	</transition>
</template>

<script type="text/babel">
import {
	ref,computed,watch,onMounted,onBeforeUnmount,
	getCurrentInstance
} from 'vue'
 let typeMap = {
   success: 'success',
   info: 'info',
   warning: 'warning',
   error: 'error'
 };

 export default {
name: 'TerryNotification',
props: {
	customClass: { type: String, default: '' },
	dangerouslyUseHTMLString: { type: Boolean, default: false },
	duration: { type: Number, default: 4500 },
	iconClass: { type: String, default: '' },
	id: { type: String, default: '' },
	verticalOffset: { type: Number, default: 0 },
	message: { type: String, default: '' },
	position: {
	  type: String,
	  default: 'top-right'
	},
	onClose: null,
	onClick: null,
	showClose: { type: Boolean, default: true },
	title: { type: String, default: '' },
	type: { type: String, default: '' }
},
setup(props){
	const visible = ref(true)
	const closed = ref(false)
	const timer  = ref(null)

	const {
		onClick,onClose,duration,type,position,verticalOffset
	} = props
	
	//watch
	watch(() => closed.value, newVal => {
		if (newVal) {
		  visible.value = false;
		  instance.ctx.$el.addEventListener('transitionend', destroyElement);
		}
	})
	
	//methods
	let instance = getCurrentInstance()

	const  destroyElement = () => {
		instance.ctx.$el.removeEventListener('transitionend', destroyElement);
		instance.ctx.$destroy(true);
		instance.ctx.$el.parentNode.removeChild(instance.ctx.$el);
	}

	const click = () => {
		if (typeof onClick === 'function') {
		  onClick();
		}
	}

	const close = () => {
	  closed.value = true;
	  if (typeof onClose === 'function') {
	    onClose();
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
	  if (e.keyCode === 46 || e.keyCode === 8) {
	    clearTimer(); // detele 取消倒计时
	  } else if (e.keyCode === 27) { // esc关闭消息
	    if (!closed.value) {
	      close();
	    }
	  } else {
	    startTimer(); // 恢复倒计时
	  }
	}

	//computed

	const typeClass = computed(() => {
		return type && typeMap[type] ? `el-icon-${ typeMap[type] }` : '';
	})

	const horizontalClass = computed(() => {
		return position.indexOf('right') > -1 ? 'right' : 'left';
	})

	const verticalProperty = computed(() => {
		return /^top-/.test(position) ? 'top' : 'bottom';
	})

	const positionStyle = computed(() => {
	  return {
	    [verticalProperty.value]: `${ verticalOffset }px`
	  };
	})
	onMounted(() => {
		if (duration > 0) {
		  timer.value = setTimeout(() => {
		    if (!closed.value) {
		      close();
		    }
		  }, duration);
		}
		document.addEventListener('keydown', keydown);
	})
	//组件卸载之前
	onBeforeUnmount(() => {
		document.removeEventListener('keydown', keydown);
	})

	return {
		typeClass,
	  horizontalClass,
	  verticalProperty,
	  positionStyle,
	  visible,
	  closed,
	  timer,
	  click,
	  clearTimer,
	  startTimer,
	  close
	}
}

 };
</script>
