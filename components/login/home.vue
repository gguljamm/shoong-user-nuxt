<template>
  <div class="scrollable loginWrapper" :class="$route.path === '/' ? 'main' : ''">
    <div v-if="$route.path === '/'" class="inputEmail">
      <div class="logo"></div>
      <h1>로컬들이 즐기는<br>진짜 맛집, 진짜 볼거리</h1>
      <h2>
        슝은 로컬들이 즐기는 찐맛집과 놀거리, 볼거리들을<br>
        제공하는 서비스입니다.
      </h2>
      <div class="fixBottom">
        <div class="loginBox">
          <input id="emailLogin" type="email" placeholder="이메일을 입력해주세요" v-model="email">
          <button class="submit" @click="submit()">{{ loading ? '로딩중' : '이메일로 시작하기' }}</button>
          <div class="sub">
            <button>비회원 둘러보기</button>
          </div>
        </div>
      </div>
    </div>
    <template v-else-if="$route.path === '/login'">
      <div v-if="step === 'emailVerified'" class="checkEmail">
        <div class="checkImg">
          <div></div>
        </div>
        <h2>이메일 전송완료</h2>
        <div>
          <strong>{{ email }}</strong><br>
          입력하신 이메일로 확인메일을 보냈습니다. 확인 후, 로그인 가능합니다.
        </div>
        <div class="fixBottom">
          <div class="fixedBox">
            <div>메일을 받지 못하신 경우 스팸메일함을 확인해주세요.</div>
            <button @click="emailValid()">OK</button>
          </div>
        </div>
      </div>
      <div v-else-if="step === 'setPassword'" class="setPassword">
        <h3>Set<br> your password</h3>
        <input type="password" v-model="ps" class="ps first" placeholder="6자리 이상 비밀번호">
        <input type="password" v-model="psConfirm" class="ps" placeholder="비밀번호 재입력">
        <div class="fixBottom">
          <div class="fixedBox">
            <button @click="setPassword()">OK</button>
          </div>
        </div>
      </div>
      <div v-else-if="step === 'inputPassword'" class="inputPassword">
        <label for="inputPs">비밀번호 입력</label>
        <input id="inputPs" class="ps" type="password" v-model="password" placeholder="비밀번호를 입력하세요">
        <div class="fixBottom">
          <div class="fixedBox">
            <button @click="submitPs()">OK</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
      email: '',
      loading: false,
      step: 'emailVerified',
      ps: '',
      psConfirm: '',
      password: '',
    };
  },
  methods: {
    submit() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      firebase.auth().signInWithEmailAndPassword(this.email, '000000').then((resp) => {
        this.loading = false;
        console.log(resp);
        if (!resp.user.emailVerified) {
          this.step = 'emailVerified';
        } else {
          this.step = 'setPassword';
        }
        this.$router.push('/login');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          firebase.auth().createUserWithEmailAndPassword(this.email, '000000').then(() => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(() => {
              this.step = 'emailVerified';
              this.loading = false;
              this.$router.push('/login');
            });
          });
        } else if (errorCode === 'auth/wrong-password') {
          this.step = 'inputPassword';
          this.loading = false;
          this.$router.push('/login');
        } else {
          alert(`${errorCode} ${errorMessage}`);
          this.loading = false;
        }
      });
    },
    emailValid() {
      this.$router.back();
    },
    setPassword() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (this.ps === this.psConfirm) {
        if (this.ps === '000000') {
          alert('이 비번으론 안됨');
          return;
        }
        const user = firebase.auth().currentUser;
        console.log(this.ps);
        user.updatePassword(this.ps).then(() => {
          // Update successful.
          this.loading = false;
          const obj = {
            uid: user.uid,
            email: this.email,
          };
          this.$store.commit('setUserId', obj);
          this.$cookies.set('user', obj);
        }).catch((error) => {
          this.loading = false;
          alert(error.message);
        });
      } else {
        alert('비번다름');
      }
    },
    submitPs() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((resp) => {
        this.loading = false;
        const obj = {
          uid: resp.user.uid,
          email: this.email,
        };
        this.$store.commit('setUserId', obj);
        this.$cookies.set('user', obj);
      }).catch((error) => {
        this.loading = false;
        alert(error.message);
      });
    },
  },
  mounted() {
    this.$bodyLock.lock();
  },
};
</script>

<style lang="scss" scoped>
  .loginWrapper{
    position: absolute;
    width: 100%;
    background-color: #f8f9fb;
    &.main{
      background-image: url(~assets/img/main_bg.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .inputEmail{
      min-height: 100%;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, .46), rgba(0, 0, 0, 0));
      .logo{
        width: 102px;
        height: 43px;
        background-image: url(~assets/img/logo-white.png);
        background-size: cover;
        position: absolute;
        top: 44px;
        left: 24px;
        background-repeat: no-repeat;
        background-position: center center;
      }
      h1{
        padding: 0;
        margin: 0;
        font-size: 30px;
        text-align: center;
        padding-top: 132px;
        font-weight: bold;
        line-height: 36px;
        color: #FFF;
      }
      h2{
        padding: 0;
        margin: 0;
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #FFF;
        font-weight: normal;
        line-height: 17px;
      }
      .loginBox{
        .sub{
          button{
            color: #FFF;
          }
        }
      }
    }
    > div{
      padding-left: 24px;
      padding-right: 24px;
    }
    .loginBox{
      width: 100%;
      padding: 0 21px 22px;
      label{
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
      }
      input {
        display: block;
        height: 55px;
        width: 100%;
        border: 1px solid rgb(204, 205, 209);
        background-color: #FFF;
        border-radius: 6px;
        padding: 0 28px;
      }
      button.submit{
        border-radius: 6px;
        width: 100%;
        height: 55px;
        background-color: #ff4208;
        color: #FFF;
        margin-top: 10px;
      }
      .sub{
        margin-top: 21px;
        font-size: 14px;
        text-align: center;
        > button{

        }
      }
    }
    .checkEmail{
      text-align: center;
      .checkImg{
        margin-top: 110px;
        > div{
          margin: 0 auto;
          background-color: #ff4208;
          border-radius: 28px;
          width: 55px;
          height: 55px;
          background-image: url(~assets/img/check.svg);
          background-repeat: no-repeat;
          background-size: 32px;
          background-position: center center;
        }
      }
      h2{
        font-size: 26px;
        margin-top: 16px;
      }
      > div:nth-of-type(2){
        margin-top: 10px;
        font-size: 16px;
        line-height: 24px;
        color: #939499;
        > strong{
          color: #000;
        }
      }
    }
    .fixedBox{
      padding: 0 21px 22px;
      > div{
        margin-bottom: 20px;
        line-height: 18px;
        font-size: 14px;
        color: rgb(147, 148, 153);
        text-align: center;
      }
      > button{
        width: 100%;
        border-radius: 6px;
        font-size: 20px;
        font-weight: bold;
        height: 55px;
        background-color: #ff4208;
        color: #FFF;
      }
    }
    .setPassword{
      h3{
        margin-top: 96px;
        font-size: 30px;
        line-height: 37px;
      }
      .ps{
        width: 100%;
        height: 62px;
        padding: 0 28px;
        border-radius: 6px;
        border: 1px solid #f8f9fb;
        &.first{
          margin-bottom: 10px;
          margin-top: 20px;
        }
      }
    }
    .inputPassword{
      label{
        display: block;
        padding-top: 115px;
        margin-bottom: 8px;
      }
      .ps{
        height: 62px;
        width: 100%;
        border: 1px solid rgb(147, 148, 153);
        border-radius: 10px;
        padding: 0 28px;
      }
    }
  }
</style>
