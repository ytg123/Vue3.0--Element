<template>
	<div class="home">
		<div class="reflect">你看到倒影了么？</div>
		<terry-badge  type="warning" :value="20">
			<terry-button @click="_click" size="small">默认按钮</terry-button>
		</terry-badge>
		<terry-button-group>
		  <terry-button type="primary">上一页</terry-button>
		  <terry-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></terry-button>
		</terry-button-group>
		<terry-alert title="成功提示的文案" type="success" show-icon center></terry-alert>
		<terry-alert title="消息提示的文案" type="info" description="文字说明文字说明文字说明文字说明文字说明文字说明"></terry-alert>
		<terry-alert title="警告提示的文案" type="warning" effect="dark"></terry-alert>
		<terry-alert title="错误提示的文案" type="error" close-text="知道了"></terry-alert>

		<terry-link href="https://element.eleme.io" target="_blank">默认链接</terry-link>
		<terry-link type="primary" @click="_link">主要链接</terry-link>
		<terry-link type="success">成功链接</terry-link>
		<terry-link type="warning">警告链接</terry-link>
		<terry-link type="danger">危险链接</terry-link>
		<terry-link type="info">信息链接</terry-link>
		<terry-link :underline="false">无下划线</terry-link>
		<terry-link icon="el-icon-edit">编辑</terry-link>
		
		<terry-progress :percentage="50"></terry-progress>
		<terry-progress :percentage="100" :format="format"></terry-progress>
		<terry-progress :percentage="100" status="success"></terry-progress>
		<terry-progress :percentage="100" status="warning"></terry-progress>
		<terry-progress :percentage="50" status="exception"></terry-progress>
		<terry-progress :text-inside="true" :stroke-width="16" :percentage="70"></terry-progress>
		<terry-progress :percentage="20" color="#666"></terry-progress>
		
		<terry-progress type="circle" :percentage="0"></terry-progress>
		<terry-progress type="circle" :percentage="25"></terry-progress>
		<terry-progress type="circle" :percentage="100" status="success"></terry-progress>
		<terry-progress type="circle" :percentage="70" status="warning"></terry-progress>
		<terry-progress type="circle" :percentage="50" status="exception"></terry-progress>
		
		<terry-progress type="dashboard" :percentage="10" :color="colors"></terry-progress>
		
		<terry-tag>标签一</terry-tag>
		<terry-tag type="success">标签二</terry-tag>
		<terry-tag type="info" effect="light">标签三</terry-tag>
		<terry-tag type="warning" size="small">标签四</terry-tag>
		<terry-tag type="danger" effect="dark">标签五</terry-tag>
		
		<terry-tag
		  v-for="(tag,i) in tags"
		  :key="tag.name"
		  closable
		  :type="tag.type"
		   @close="_close(i)"
		   @click="_self(tag)">
		  {{tag.name}}
		 
		</terry-tag>
		
		 <div  v-for="size in sizeList" :key="size">
		  <terry-avatar :size="size" :src="circleUrl"></terry-avatar>
		</div>
		
		<div>
		  <terry-avatar icon="el-icon-user-solid"></terry-avatar>
		</div>
		<div>
		  <terry-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></terry-avatar>
		</div>
		<div>
		  <terry-avatar> user </terry-avatar>
		</div>
		<terry-avatar :size="60" src="https://empty" @error="errorHandler">
		  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
		</terry-avatar>
		
		 <div class="block" v-for="fit in fits" :key="fit">
			<span class="title">{{ fit }}</span>
			<terry-avatar shape="square" :size="100" :fit="fit" :src="url"></terry-avatar>
		</div>
		
		<span style="text-size-adjust:none;-webkit-text-stroke: 1px transparent">北京你好</span>
		
		<terry-backtop target=".home" :bottom="100">top</terry-backtop>
		
		
		<!-- <terry-breadcrumb separator=">">
		  <terry-breadcrumb-item :to="{ path: '/' }">首页</terry-breadcrumb-item>
		  <terry-breadcrumb-item><a href="/">活动管理</a></terry-breadcrumb-item>
		  <terry-breadcrumb-item>活动列表</terry-breadcrumb-item>
		  <terry-breadcrumb-item>活动详情</terry-breadcrumb-item>
		</terry-breadcrumb> -->
		
	</div>
</template>

<script>
	import { ref,getCurrentInstance , h} from 'vue'
	import TerryNotification from '../plugins/notification/index.js'
	import TerryMessage from '../plugins/message/index.js'
export default {
	name: 'Home',
	setup() {
		const _click = () => {
			// TerryNotification({
			//   title: '提示',
			//   type: 'warning',
			//   dangerouslyUseHTMLString: true,
			//   message: '<strong>这是 <i>HTML</i> 片段</strong>',
			//   duration: 0,
			//   position:'top-left',
			//   offset: 100,
			//   // showClose: false
			// });
			// TerryMessage({
			// 	message:'这是一条信息',
			// 	type: 'warning',
			// 	center: true,
			// 	duration:200
			// })
			// TerryMessage.error('操作有误')
			// TerryMessage({
			// 	dangerouslyUseHTMLString: true,
			// 	message: '<strong>这是 <i>HTML</i> 片段</strong>',
			// 	// showClose:true
			// })
			TerryMessage({
				message: h('p', null, [
					h('span', null, '内容可以是 '),
					h('i', { style: 'color: teal' }, 'VNode')
				])
			})
		};
		
		const _link = () => {
			alert('link');
		}
		const  format = (percentage) =>  {
			return percentage === 100 ? '满' : `${percentage}%`;
		}
		
		const colors = ref([
			{color: '#f56c6c', percentage: 20},
		   {color: '#e6a23c', percentage: 40},
		   {color: '#5cb87a', percentage: 60},
		   {color: '#1989fa', percentage: 80},
		   {color: '#6f7ad3', percentage: 100}
        ])
		
		const tags = ref([
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]) 
		
		const _close = (i) => {
			tags.value.splice(i,1)
		}
		const _self = (tag) => {
			alert(tag.name)
		}
		
		const circleUrl =  ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
		const sizeList = ref(["large", "medium", "small"])
		
		const errorHandler = () => {
			return true
		}
		const fits = ref(['fill', 'contain', 'cover', 'none', 'scale-down'])
		const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
		
		const instance = getCurrentInstance()
		console.log(instance);
		
		return {
			_click,
			_link,
			format,
			colors,
			tags,
			_close,
			_self,
			circleUrl,
			sizeList,
			errorHandler,
			fits,
			url
		};
	}
};
</script>

<style lang="scss" scoped>
	.home{
		width: 100%;
		height: 3000px;
		overflow: auto;
		.block{
			display: flex;
		}
		.reflect{
		  width:950px;
		  margin:0 auto;
		  -webkit-box-reflect:below -15px -webkit-linear-gradient(transparent,transparent 50%,rgba(255,255,255,.3));
		  font:bold 100px/1.231 georgia,sans-serif;
		  text-transform:uppercase;
		  -webkit-text-stroke: 1px transparent
		}
	}
</style>
