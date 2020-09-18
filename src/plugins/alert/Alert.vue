<template>
	<transition name="el-alert-fade">
		<div class="el-alert" :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" v-show="visible" role="alert">
			<i class="el-alert__icon" :class="[iconClass, isBigIcon]" v-if="showIcon"></i>
			<div class="el-alert__content">
				<span class="el-alert__title" :class="[isBoldTitle]" v-if="title || $slots.title">
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="el-alert__description" v-if="$slots.default && !description"><slot></slot></p>
				<p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
				<i class="el-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{ closeText }}</i>
			</div>
		</div>
	</transition>
</template>

<script type="text/babel">
import { ref, computed, toRefs, getCurrentInstance } from 'vue';
const TYPE_CLASSES_MAP = {
	success: 'el-icon-success',
	warning: 'el-icon-warning',
	error: 'el-icon-error'
};
export default {
	name: 'TerryAlert',

	props: {
		title: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'info'
		},
		closable: {
			type: Boolean,
			default: true
		},
		closeText: {
			type: String,
			default: ''
		},
		showIcon: Boolean,
		center: Boolean,
		effect: {
			type: String,
			default: 'light',
			validator: function(value) {
				return ['light', 'dark'].indexOf(value) !== -1;
			}
		}
	},
	emits: ['close'],
	setup(props, { emit }) {
		const visible = ref(true);
		const { type, description, title } = toRefs(props);
		const typeClass = useTypeClass(type);

		const iconClass = useIconClass(type);

		const isBigIcon = useIsBigIcon(description);

		const isBoldTitle = useIsBoldTitle(description);

		const close = () => {
			visible.value = false;
			emit('close');
		};
		return {
			visible,
			typeClass,
			iconClass,
			isBigIcon,
			isBoldTitle,
			close,
			type,
			description,
			title
		};
	}
};
const useTypeClass = type => {
	const typeClass = computed(() => {
		return `el-alert--${type.value}`;
	});

	return typeClass;
};
const useIconClass = type => {
	const iconClass = computed(() => {
		return TYPE_CLASSES_MAP[type.value] || 'el-icon-info';
	});
	return iconClass;
};
const useIsBigIcon = description => {
	const isBigIcon = computed(() => {
		return description.value || getCurrentInstance().slots.default ? 'is-big' : '';
	});

	return {
		isBigIcon
	};
};

const useIsBoldTitle = () => {
	const isBoldTitle = computed(() => {
		return description.value || getCurrentInstance().slots.default ? 'is-bold' : '';
	});
	return {
		isBoldTitle
	};
};
</script>
