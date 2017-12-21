export default {
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('@/modules/bpm/home').default
        },
        {
            path: '/index',
            name: 'Index',
            redirect: '/index/flow',
            component: require('@/modules/bpm/index').default,
            children: [
                {
                    path: 'flow',
                    name: 'appBpmFlow',
                    components: {
                        default: require('@/modules/bpm/index/flow').default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                },
                {
                    path: 'draft',
                    name: 'appBpmDraft',
                    components: {
                        default: require('@/modules/bpm/index/draft').default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                },
                {
                    path: 'history',
                    name: 'appBpmHistory',
                    components: {
                        default: require('@/modules/bpm/index/history').default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                },
                {
                    path: 'message',
                    name: 'appBpmMessage',
                    components: {
                        default: require('@/modules/bpm/index/message').default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                },
                {
                    path: 'options',
                    name: 'appBpmOptions',
                    components: {
                        default: require('@/modules/bpm/index/options').default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                },
                {
                    path: 'statistics',
                    name: 'appBpmStatistics',
                    components: {
                        default: require('@/modules/bpm/index/statistics')
                            .default,
                        asiderMenu: require('@/modules/bpm/index/asider-menu')
                            .default
                    }
                }
            ]
        },
        {
            path: '/picker',
            name: 'BpmPickerDemo',
            component: require('@/modules/bpm/picker-demo').default
        }
    ]
};
