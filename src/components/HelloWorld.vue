<template>
  <h1>{{ msg }}</h1>
  <button @click="_add">count is: {{ count }}</button>
  <button @click="defn">num is: {{ num }}</button>
  北京姑娘
  <button @click="_goHome">home</button>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex' 
import { useDe } from '../common/index.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
	 const msg = ref('')
	 msg.value = '哈哈哈哈哈'
	 
	 const count = ref(0)
	 
	 const router = useRouter()
	 const store = useStore()
	 const _add = () => {
		 count.value++
		 store.commit('setTestA',`海南玉山${count.value}`)
		msg.value = store.state.test.a
	 }
	 const {
		 num,defn
	 } = useDe()
	 const _goHome = () => {
		router.push({
			path:'/Home'
		})
		
	 }
	 
	 return {
		 msg,
		 count,
		 _add,
		 num,
		 defn,
		 _goHome
	 }
  }
  
  
  
}
</script>

<style lang="scss" scoped>
	h1{
		color: #f50;
	}
</style>
