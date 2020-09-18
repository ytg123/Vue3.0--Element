import { ref } from 'vue'
export const  useDe = () => {
	  const num = ref(100)
	  
	  const defn = () => {
		  num.value--
	  }
	  
	  return {
		  num,
		  defn
	  }
	  
  }