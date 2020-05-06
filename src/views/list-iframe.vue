<template>
    <div class="home">
        111222222222
        <iframe src="../../static/iframe.html" class="mapFrame" ref="mapFrame" frameborder="0"  scrolling="auto" ></iframe>
    </div>
</template>
<script>
export default {
    name: 'ComponentsName',
    data() {
        return {
            url: ''
        }
    },
    mounted() {
        let mapFrame = this.$refs['mapFrame']
        console.log(mapFrame)
        if (mapFrame.attachEvent) {  //兼容浏览器判断
            mapFrame.attachEvent("onload", function () {
                let iframeWin = mapFrame.contentWindow
                iframeWin.postMessage({
                    method: 'getBaseInfo',
                    data: '我是vuex state的数据'
                }, '*')
            })
        } else {
            mapFrame.onload = function () {
                let iframeWin = mapFrame.contentWindow
                iframeWin.postMessage({
                    method: 'getBaseInfo',
                    data: '我是vuex state的数据'
                }, '*')
            }
        }

    },
    methods: {
      
    }
    // watch: {
    //     url(val) {
    //         if (val) {
    //             this.$refs.iframe.contentWindow.location.replace(val)
    //         }
    //     }
    // }
}
</script>
<style scoped>
.mapFrame {
    position: absolute;
    left: 50;
    right: 0;
    top: 500px;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-y: hidden;
}
</style>