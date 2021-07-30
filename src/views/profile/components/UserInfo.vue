<template>
  <div id="user-info">
    <a href="">
      <slot name="user-icon">
        <svg class="avatar">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </slot>

      <div class="login-info">
        <slot name="user-nickname">
          <div>登录注册</div>
        </slot>
        <div class="phone">
          <slot>
            <svg data-v-735ff1be="" fill="#fff" class="phone-icon">
              <use
                data-v-735ff1be=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#mobile"
              ></use>
            </svg>
          </slot>

          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <div class="arrow">
        <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
          <use
            data-v-735ff1be=""
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arrow-right"
          ></use>
        </svg>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
}

#user-info a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

#user-info .avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #fff;
}

#user-info .arrow-svg {
  width: 15px;
  height: 15px;
}

#user-info .login-info {
  color: #fff;
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

#user-info .login-info .phone {
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
}

#user-info .login-info .phone .phone-icon {
  height: 15px;
  width: 15px;
  position: relative;
  top: -1.5px;
}
</style>
