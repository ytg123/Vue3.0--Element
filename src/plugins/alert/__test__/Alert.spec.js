import TerryAlert  from '../Alert.vue';
import { mount } from '@vue/test-utils';

describe('Alert.vue', () => {
  describe('props', () => {
    it('title', () => {
      const wrapper = mount(TerryAlert, {
        props: {
          title: 'test title'
        }
      })
      const wrapperSlot = mount(TerryAlert, {
        slots: {
          title: () => {
            return 'title slot'
          }
        }
      })

      expect(wrapper.find('span').text()).toBe('test title')
      expect(wrapperSlot.find('span').text()).toBe('title slot')
    })

    // it('description', () => {
    //   const wrapper = mount(TerryAlert, {
    //     props: {
    //       description: 'test description'
    //     }
    //   })
    //   const wrapperSlot = mount(TerryAlert, {
    //     slots: {
    //       default: () => {
    //         return 'description slot'
    //       }
    //     }
    //   })

    //   expect(wrapper.find('.el-alert__description').text()).toBe(
    //     'test description'
    //   )
    //   expect(wrapperSlot.find('.el-alert__description').text()).toBe(
    //     'description slot'
    //   )
    // })

    // it('type', () => {
    //   const wrapperInfo = mount(TerryAlert, {
    //     props: {
    //       type: 'info'
    //     }
    //   })
    //   const wrapperSuccess = mount(TerryAlert, {
    //     props: {
    //       type: 'success'
    //     }
    //   })
    //   const wrapperWarning = mount(TerryAlert, {
    //     props: {
    //       type: 'warning'
    //     }
    //   })
    //   const wrapperError = mount(TerryAlert, {
    //     props: {
    //       type: 'error'
    //     }
    //   })

    //   expect(wrapperInfo.classes()).toContain('el-alert--info')
    //   expect(wrapperSuccess.classes()).toContain('el-alert--success')
    //   expect(wrapperWarning.classes()).toContain('el-alert--warning')
    //   expect(wrapperError.classes()).toContain('el-alert--error')
    // })

    // it('closable', () => {
    //   const wrapperTrue = mount(TerryAlert, {
    //     props: {
    //       closable: true
    //     }
    //   })
    //   const wrapperTrueWithText = mount(TerryAlert, {
    //     props: {
    //       closable: true,
    //       closeText: '知道了'
    //     }
    //   })
    //   const wrapperFalse = mount(TerryAlert, {
    //     props: {
    //       closable: false
    //     }
    //   })

    //   expect(wrapperTrue.find('.el-alert__closebtn').attributes('style')).toBe(
    //     undefined
    //   )
    //   expect(wrapperTrueWithText.find('.el-alert__closebtn').text()).toContain(
    //     '知道了'
    //   )
    //   expect(wrapperFalse.find('.el-alert__closebtn').attributes('style')).toBe(
    //     'display: none;'
    //   )
    // })

    // it('showIcon', () => {
    //   const wrapperTrue = mount(TerryAlert, {
    //     props: {
    //       showIcon: true
    //     }
    //   })
    //   const wrapperFalse = mount(TerryAlert, {
    //     props: {
    //       showIcon: false
    //     }
    //   })

    //   expect(wrapperTrue.find('.el-alert__icon').exists()).toBe(true)
    //   expect(wrapperFalse.find('.el-alert__icon').exists()).toBe(false)
    // })

    // it('center', () => {
    //   const wrapperTrue = mount(TerryAlert, {
    //     props: {
    //       center: true
    //     }
    //   })
    //   const wrapperFalse = mount(TerryAlert, {
    //     props: {
    //       center: false
    //     }
    //   })

    //   expect(wrapperTrue.classes('is-center')).toBe(true)
    //   expect(wrapperFalse.classes('is-center')).toBe(false)
    // })

    // it('effect', () => {
    //   const wrapperLight = mount(TerryAlert, {
    //     props: {
    //       effect: 'light'
    //     }
    //   })
    //   const wrapperDark = mount(TerryAlert, {
    //     props: {
    //       effect: 'dark'
    //     }
    //   })

    //   expect(wrapperLight.classes('is-light')).toBe(true)
    //   expect(wrapperDark.classes('is-dark')).toBe(true)
    // })
  })

  describe('event', () => {
    it('close', () => {
      const wrapper = mount(TerryAlert)
      wrapper.find('.el-alert__closebtn').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })
})