<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>


<script>
  import { toRefs,computed,inject,unref,getCurrentInstance } from 'vue'
  export default {
    name: 'TerryButton',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
		  type:String,
		  default:''
	  },
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },
	emits: ['click'],
	setup(props,{ emit }){
		
		const {
			size,disabled
		} = toRefs(props)
		
		const buttonSize = useButtonSize(size)
		const buttonDisabled = useButtonDisabled(disabled)
		
		const handleClick = (evt) => {
			emit('click', evt);
		}
		
		return {
			buttonSize,
			buttonDisabled,
			handleClick
		}
	}
	
  };
  const useButtonSize = (size) => {
	  const _elFormItem = inject('elFormItem',{})
	  
	  const elFormItemSize = computed(() => {
		  return unref(_elFormItem.elFormItemSize)
	  })
	  const buttonSize = computed(() => {
		  return (
			size.value || elFormItemSize.value || (getCurrentInstance().proxy.$ELEMENT || {}).size
		  )
	  })
	  
	  return buttonSize
  }
  
  const useButtonDisabled = (disabled) => {
	const elForm = inject('elForm',{})
	  
	const buttonDisabled = computed(() => {
		return (
			disabled.value || unref(elForm.disabled)
		)
	})
	
	return buttonDisabled
  }
  
</script>
