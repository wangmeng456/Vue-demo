<!--
    vue缩略图、预览
-->
<template lang="pug">
.photoinfo-container
  .thumbs
    vue-preview.imgPrev(:slides="list", @close="handleClose")
</template>

<script>
export default {
  name: "drawPreview",
  data() {
    return {
      // src 缩略图点开后图片
      // msrc 缩略图图片
      // w 缩略图点开后宽度
      // h 缩略图点开后高度
      list: [
        {
          src:
            "https://wx2.sinaimg.cn/mw690/6c9bafd5gy1gj4iceql29j21aw0v9ncg.jpg",
          msrc:
            "https://wx2.sinaimg.cn/mw690/6c9bafd5gy1gj4iceql29j21aw0v9ncg.jpg",
          w: 600,
          h: 400,
        },
        {
          src:
            "https://wx3.sinaimg.cn/mw690/58f5f506ly1gj4xg2w13lj24452bdb2n.jpg",
          msrc:
            "https://wx3.sinaimg.cn/mw690/58f5f506ly1gj4xg2w13lj24452bdb2n.jpg",
          w: 600,
          h: 400,
        },
        {
          src:
            "https://wx4.sinaimg.cn/mw690/6c9bafd5gy1gj452gtc7bj223u35sx6r.jpg",
          msrc:
            "https://wx4.sinaimg.cn/mw690/6c9bafd5gy1gj452gtc7bj223u35sx6r.jpg",
          w: 600,
          h: 400,
        },
      ],
    };
  },
  methods: {
    handleClose() {
      console.log("close-event");
    },
  },
};
</script>

<style lang="scss">
.photoinfo-container {
  .thumbs {
    .imgPrev {
      .my-gallery {
        figure {
          display: inline-block;
          margin: 8px;
        }
        img {
          width: 80px;
          height: 60px;
        }
      }
    }
  }
}
</style>