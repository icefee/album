import { h, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import * as map from '../../tools/map/baidu'

export default defineComponent({
    render() {
        return(
            <div id="map" />
        )
    },
    setup() {
        const router = useRouter();
        onMounted(async function() {
            map.init('map', {
                lng: 116.413387,
                lat: 39.910924,
                zoom: 12
            })
        })
    }
})
