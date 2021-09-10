import { h, defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from '../../store/couter'
import { NButton } from 'naive-ui'

export default defineComponent({
    computed: {
        ...mapState(useCounterStore, ['count', 'double']),
    },
    methods: {
        ...mapActions(useCounterStore, ['increment'])
    },
    render() {
        return (
            <div>
                <div>Home { this.count } { this.double }</div>
                <div>
                    <NButton type="info" on-click={this.increment}>
                        {
                            () => 'increment'
                        }
                    </NButton>
                </div>
            </div >
        )
    }
})
