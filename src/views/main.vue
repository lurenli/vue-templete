<template>
    <div>
        <h2>卖弄</h2>
        <div>
            <label class="coverImgWrap" for="upload">
                <i class="el-icon-plus coverIcon" ref="icon"></i>
            </label>

            <input type="file" @change="ChangeFile" id="upload" style="display:none" accept="image/*" />
            <el-dialog title="图片裁剪" :visible.sync="dialogTableVisible" :close-on-click-modal="false" style="text-align:center" width="600px" :modal="false">
                <div class="image-cropper">
                    <div class="cropper">
                        <vueCropper ref="cropper" class="preview" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :canMove="option.canMove" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedNumber="option.fixedNumber">
                        </vueCropper>
                    </div>
                    <div class="preview-box">
                        <div ref="preview" :style="'background:url('+ imgsrc + ') no-repeat center center / cover'"></div>
                    </div>
                    <el-row style="margin-top:12px">
                        <el-col :span="24" style="text-align:right">
                            <el-button type="primary" @click="submit" :loading="loading">确认</el-button>
                            <el-button plain type="primary" @click="cancel" :disabled="loading">取消</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
    components: {
        VueCropper,
    },
    data() {
        return {
            dialogTableVisible: false,
            imgsrc: '',
            option: {
                img: '', // 裁剪图片路径
                info: true,
                size: 1,
                outputType: 'jpg',
                canScale: false,
                autoCrop: true,
                canMove: false,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 431,
                autoCropHeight: 280,
                fixed: true,
                fixedNumber: [118, 74]
            },
            loading: false,
        }
    },
    created(){
        let a = [1,2]
        a.map(item=>{
            console.log(this)
            console.log(item)
        })

        let str = '张三王五计ABUS可控九点sssssss'

        // strContent.charCodeAt(i);
        let exg = new RegExp("[a-zA-z]+")
        // let newstr = ''

        let newstr = str.replace(/[^\x00-\xff]/g,"$&\x01").replace(/.{10}\x01?/g,"$&\n").replace(/\x01/g,"");

        console.log(newstr)
        // for(let i=0,length=str.length;i<length;i++){
        //     if(exg.test(str.charAt(i))){
        //         console.log('英文')
        //         newstr = '\n'
        //     }
        // }

        // localStorage  cookie sessionStorage 

    },
    methods: {
        ChangeFile(e) {
            console.log(e)
            let File = e.target.files[0]
            if (!File) {
                return
            }
            let size = File.size
            // this.imgsrc = File.name
            let type = File.type

            this.dialogTableVisible = true

            let reader = new FileReader()
            let self = this
            reader.onload = (e) => {
                const data = e.target.result
                console.log(data)
                self.option.img = data
                self.imgsrc = data
            }
            // 转化为base64
            reader.readAsDataURL(File)
        },
        submit() {
            const value = this.imgsrc.split('base64,')[1]
            console.log(value)
            this.loading = true
            // picAddBase64API(value).then(res => {
            //     this.urlData = res.data.data.sourceUrl
            //     // 图片结果返回
            //     this.$emit('getImage', { id: res.data.data.id, url: this.imgData, index: this.imageIndex })
            //     this.loading = false
            //     this.show = true
            //     // 更新原始图片信息
            //     if (this.imageIndex === 1) {
            //         this.oldImg1 = this.newImg1
            //     } else if (this.imageIndex === 2) {
            //         this.oldImg2 = this.newImg2
            //     } else {
            //         this.oldImg3 = this.newImg3
            //     }
            //     setTimeout(() => {
            //         this.dialogTableVisible = false
            //     }, 0)
            // }).catch(res => {
            // })
        },
        cancel() {
            this.dialogTableVisible = false
        }
    }
}
</script>
<style  lang="scss" scoped>
.coverImgWrap {
    width: 150px;
    height: 150px;
    border: 1px solid #000;
    display: inline-block;
    line-height: 150px;
    font-size: 20px;
}
.image-cropper {
    .cropper {
        width: 431px;
        height: 280px;
        overflow: hidden;
        margin: 0 auto;
        .preview {
            width: 100%;
            height: 100%;
        }
    }
    .preview-box {
        width: 100%;
        margin: 0 auto;
        background-color: #fff;
        div {
            margin: 15px auto;
            border: 1px dashed #cccccc;
        }
    }
}
</style>