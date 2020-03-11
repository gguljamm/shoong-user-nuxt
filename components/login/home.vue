<template>
  <div class="scrollable loginWrapper">
    <div v-if="$route.path === '/'">
      <h1>로컬들이 즐기는<br>진짜 맛집, 진짜 볼거리</h1>
      <h2>
        슝은 로컬들이 즐기는 찐맛집과 놀거리, 볼거리들을<br>
        제공하는 서비스입니다.
      </h2>
      <div class="loginBox">
        <label for="emailLogin">이메일</label>
        <input id="emailLogin" type="email" placeholder="이메일을 입력해주세요" v-model="email">
        <button class="submit" @click="submit()">{{ loading ? '로딩중' : '이메일로 시작하기' }}</button>
        <div class="sub">
          <button>비회원 둘러보기</button>
        </div>
      </div>
    </div>
    <template v-else-if="$route.path === '/login'">
      <div v-if="step === 'emailVerified'">

        <div class="fixedBox">
          <button @click="emailValid()">OK</button>
        </div>
      </div>
      <div v-else-if="step === 'setPassword'">
        <input type="password" v-model="ps" class="ps first" placeholder="6자리 이상 비밀번호">
        <input type="password" v-model="psConfirm" class="ps" placeholder="비밀번호 재입력">
        <div class="fixedBox">
          <button @click="setPassword()">OK</button>
        </div>
      </div>
      <div v-else-if="step === 'inputPassword'" class="inputPassword">
        <label for="inputPs">비밀번호 입력</label>
        <input id="inputPs" class="ps" type="password" v-model="password" placeholder="비밀번호를 입력하세요">
        <div class="fixedBox">
          <button @click="submitPs()">OK</button>
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
      if (this.ps === this.psConfirm) {
        if (this.ps === '000000') {
          alert('이 비번으론 안됨');
          return;
        }
        const user = firebase.auth().currentUser;
        console.log(this.ps);
        user.updatePassword(this.ps).then(() => {
          // Update successful.
          const obj = {
            uid: user.uid,
          };
          this.$store.commit('setUserId', obj);
          this.$cookies.set('user', obj);
        }).catch((error) => {
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
        console.log(resp);
        const obj = {
          uid: resp.user.uid,
        };
        this.$store.commit('setUserId', obj);
        this.$cookies.set('user', obj);
      }).catch((error) => {
        alert(error.message);
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
  .loginWrapper{
    position: absolute;
    width: 100%;
    background-color: rgb(248, 249, 251);
    > div{
      padding-left: 24px;
      padding-right: 24px;
    }
    h1{
      padding: 0;
      margin: 0;
      font-size: 30px;
      text-align: center;
      padding-top: 132px;
      font-weight: normal;
      line-height: 36px;
    }
    h2{
      padding: 0;
      margin: 0;
      margin-top: 14px;
      text-align: center;
      font-size: 14px;
      color: rgb(147, 148, 153);
      font-weight: normal;
      line-height: 17px;
    }
    .loginBox{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 30px 35px;
      label{
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
      }
      input {
        display: block;
        height: 62px;
        width: 100%;
        border: 1px solid rgb(0, 102, 245);
        background-color: #FFF;
        border-radius: 10px;
        padding: 0 28px;
      }
      button.submit{
        border-radius: 31px;
        width: 100%;
        height: 62px;
        background-color: #ff4208;
        color: #FFF;
        margin-top: 14px;
      }
      .sub{
        margin-top: 14px;
        font-size: 14px;
        text-align: center;
        > button{

        }
      }
    }
    .fixedBox{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 21px 22px;
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
    .ps{
      width: 100%;
      height: 62px;
      padding: 0 28px;
      border-radius: 10px;
      border: 1px solid rgb(147, 148, 153);
      &.first{
        margin-bottom: 14px;
        margin-top: 77px;
      }
    }
  }
  .inputPassword{
    label{
      display: block;
      padding-top: 115px;
      margin-bottom: 8px;
    }
  }
  @media screen and (max-height: 540px) {
    .loginWrapper .loginBox{
      position: relative;
      padding-top: 40px;
    }
  }
</style>
