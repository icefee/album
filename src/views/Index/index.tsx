import { h, ref, Ref, Transition, resolveDynamicComponent, defineComponent, computed } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { useStore } from 'vuex'
import { NIcon, NLayout, NLayoutSider, NMenu, MenuOption, NDropdown, NButton, NDrawer, NDrawerContent, NModal } from 'naive-ui'
import { Home, People, PersonOutline, ChevronDown, LockClosedOutline, ExitOutline, Map } from '@vicons/ionicons5'
import './style.css'

const menuOptions: MenuOption[] = [
    {
        label: '主页',
        key: 'home',
        to: '/home',
        icon: () => <NIcon><Home /></NIcon>
    },
    {
        label: '地图',
        key: 'map',
        to: '/map',
        icon: () =>　<NIcon><Map /></NIcon>
    },
    {
        label: '用户',
        key: 'user',
        to: '/home/user',
        icon: () => <NIcon><People /></NIcon>
    }
];

export default defineComponent({
    setup() {
        const collapsed: Ref<boolean> = ref(false);
        const store = useStore();
        return {
            collapsed,
            showDrawer: ref(false),
            showModal: ref(false),
            menuOptions,
            username: computed(() => store.state.username),
            renderMenuLabel(option: MenuOption) {
                if ('to' in option) {
                    return (
                        <RouterLink to={{ name: option.key } as { name: string }}>
                            {option.label}
                        </RouterLink>
                    )
                }
                return option.label
            },
        }
    },
    methods: {
        handleMenuSelect(key: string) {
            const callMap: any = {
                exit: () => this.$router.replace('/'),
                detail: () => this.showDrawer = true,
                mod_pwd: () => this.showModal = true,
            }
            callMap[key]?.call();
        }
    },
    render() {
        return (
            <div class="view index">
                <div class="layout-top">
                    <div class="logo">
                        <img width={25} src="https://www.naiveui.com/assets/naivelogo.93278402.svg" />
                    </div>
                    <NDropdown
                        options={
                            [
                                {
                                    label: '修改密码',
                                    key: 'mod_pwd',
                                    icon: () => <NIcon><LockClosedOutline /></NIcon>,
                                },
                                {
                                    label: '个人资料',
                                    key: 'detail',
                                    icon: () => <NIcon><PersonOutline /></NIcon>,
                                },
                                {
                                    type: 'divider',
                                    key: 'd1'
                                },
                                {
                                    label: '退出',
                                    key: 'exit',
                                    icon: () => <NIcon><ExitOutline /></NIcon>,
                                },
                            ]
                        }
                        placement="bottom-start"
                        trigger="click"
                        on-select={this.handleMenuSelect}
                    >
                        <NButton text>
                            <span>{ this.username }</span>
                            <NIcon>
                                <ChevronDown />
                            </NIcon>
                        </NButton>
                    </NDropdown>
                </div>
                <NLayout style={{ height: '100%' }} has-sider>
                    <NLayoutSider
                        bordered
                        collapse-mode="width"
                        collapsed-width={64}
                        width={200}
                        collapsed={this.collapsed}
                        show-trigger
                        on-collapse={() => this.collapsed = true}
                        on-expand={() => this.collapsed = false}
                    >
                        <NMenu
                            collapsed={this.collapsed}
                            collapsed-width={64}
                            collapsed-icon-size={22}
                            options={this.menuOptions}
                            default-value={this.$route.name}
                            render-label={this.renderMenuLabel}
                        />
                    </NLayoutSider>
                    <NLayout>
                        <div class="child-router">
                            <RouterView class="view child-view">
                                {
                                    ({ Component, route }: { Component?: any, route: any }) => (
                                        <Transition>
                                            {
                                                () => resolveDynamicComponent(Component)
                                            }
                                        </Transition>
                                    )
                                }
                            </RouterView>
                        </div>
                    </NLayout>
                </NLayout>
                <NDrawer show={this.showDrawer} onUpdateShow={(_show: boolean) => this.showDrawer = _show} width={500} placement="right">
                    <NDrawerContent title={ this.username } closable>
                        《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
                    </NDrawerContent>
                </NDrawer>
                <NModal
                    show={this.showModal}
                    onUpdateShow={(_show: boolean) => this.showModal = _show}
                    preset="dialog"
                    title="修改密码"
                    content="你确认"
                    positive-text="确认"
                    negative-text="算了"
                />
            </div >
        )
    }
})
