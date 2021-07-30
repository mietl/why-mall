<template>
  <div>
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div v-if="commentsInfo.length !== 0" class="comment-info">
      <div v-for="(comment, index) in commentsInfo" :key="index">
        <div class="user-info">
          <img :src="comment.user.avatar" alt="" />
          <span>{{ comment.user.uname }}</span>
        </div>

        <div class="info-detail">
          <p>{{ comment.content }}</p>
          <div class="info-other">
            <span class="date"> {{ comment.created | formatDate }}</span>
            <span>{{ comment.style }}</span>
          </div>
          <div class="info-imgs">
            <img
              :src="item"
              alt=""
              v-for="(item, indey) in comment.images"
              :key="indey"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="empty">暂无评论😢 ,快来抢沙发吧!</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentsInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    formatDate(val) {
      const date = new Date(val * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  border-bottom: 5px solid #f2f5f8;
  color: #333;
}

.info-header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 15px;
}

.header-title {
  font-size: 15px;
}
.header-more {
  font-size: 14px;
  margin-right: 10px;
}

.user-info {
  padding: 10px 0 5px;
}

.user-info img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  vertical-align: middle;
}

.user-info span {
  font-size: 15px;
  margin-left: 10px;
  vertical-align: middle;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-detail .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}

.empty{
  text-align:center;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
}
</style>
