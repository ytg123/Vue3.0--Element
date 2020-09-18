<template>
	<transition name="el-fade-in">
		<div
			v-if="visible"
			@click.stop="handleClick"
			:style="{
				right: styleRight,
				bottom: styleBottom
			}"
			class="el-backtop"
		>
			<slot></slot>
		</div>
	</transition>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { ref, toRefs,computed, onMounted, onBeforeUnmount } from 'vue';
const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2);

export default {
	name: 'TerryBacktop',

	props: {
		visibilityHeight: {
			type: Number,
			default: 200
		},
		target: {
			type:String,
			default:''
		},
		right: {
			type: Number,
			default: 40
		},
		bottom: {
			type: Number,
			default: 40
		}
	},

	emits: ['click'],
	setup(props, { emit }) {
		const { right, bottom, target, visibilityHeight } = toRefs(props);
		const el = ref(null);
		const container = ref(null);
		const visible = ref(false);

		//computed
		const styleBottom = computed(() => {
			return `${bottom.value}px`;
		});

		const styleRight = computed(() => {
			return `${right.value}px`;
		});

		const onScroll = () => {
			const scrollTop = el.value.scrollTop;
			visible.value = scrollTop >= visibilityHeight.value;
		};

		let throttledScrollHandler

		const handleClick = e => {
			scrollToTop();
			emit('click', e);
		};

		const init = () => {
			
			container.value = document;
			el.value = document.documentElement;
			if (target.value) {
				el.value = document.querySelector(target.value);
				if (!el.value) {
					throw new Error(`target is not existed: ${target.value}`);
				}
				container.value = el.value;
			}
		};

		const scrollToTop = () => {
			const ell = el.value;
			const beginTime = Date.now();
			const beginValue = ell.scrollTop;
			const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
			const frameFunc = () => {
				const progress = (Date.now() - beginTime) / 500;
				if (progress < 1) {
					ell.scrollTop = beginValue * (1 - easeInOutCubic(progress));
					rAF(frameFunc);
				} else {
					ell.scrollTop = 0;
				}
			};
			rAF(frameFunc);
		};
		onMounted(() => {
			init();
			throttledScrollHandler = throttle(300, onScroll);
			container.value.addEventListener('scroll', throttledScrollHandler);
		});

		onBeforeUnmount(() => {
			container.value.removeEventListener('scroll', throttledScrollHandler);
		});

		return {
			styleBottom,
			styleRight,
			handleClick,
			visible
		};
	}
};
</script>
