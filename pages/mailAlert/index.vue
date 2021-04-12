<template>
  <div></div>
</template>

<script>
import api from '~/utils/api';

export default {
  data() {
    const { query } = this.$route;
    return {
      query,
      api,
    };
  },
  mounted() {
    if (this.query && Object.keys(this.query) && Object.keys(this.query)[0]) {
      const key = Object.keys(this.query) && Object.keys(this.query)[0];
      const id = this.query[key];
      this.api.mailControl(id, key).then(() => {
        if (key === 'confirm') {
          alert(this.$t('mail.accept'));
        } else {
          alert(this.$t('mail.cancel'));
        }
      }).catch(() => {
        alert(this.$t('mail.error'));
      });
    } else {
      alert('error: abnormal approach');
    }
  },
};
</script>
