<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button class="update-button" @click="sendMessage">Обновить</button>
    <v-select v-model="selected" :options="options"></v-select>

    <ul class="news-container">
      <li v-for="(article, index) in news" :key="index">
        {{article.title}}
      </li>
    </ul>
  </div>
</template>

<script>
  //import axios from 'axios'
  import io from 'socket.io-client';

export default {
  name: 'Parser',
  props: {
    msg: String
  },
  data () {
    return {
      news: null,
      selected: {label: 'Выберите источник', value: null},
      message: "test",
      messages: [],
      options: [
        {label: 'VC.RU', value: 'https://vc.ru'},
        {label: 'Kommersant.ru', value: 'https://www.kommersant.ru'}
      ],
      socket : io('localhost:3000') // web-dev-additional.herokuapp.com
    }
  },

  mounted() {
      this.socket.on('MESSAGE', (data) => {
        //console.log('Updated');
        if(data.err !== undefined)
        {
          alert(data.err)
        }
        else
        {
          this.news = data.articles;
        }
      });
  },

  watch: {
    selected: {

      handler() {

        this.news = [];
        this.socket.emit('SEND_MESSAGE', {
          resource: this.selected.value
        });
        /*axios.post('/api/news', {
          newsResource: val.value
        })
                .then(res => {
                  this.news = res.data.articles
                })
                .catch(err => {
                  alert('Ошибка: ' + err.message);
                })*/
      }
    }
  },

  methods: {
    sendMessage() {
      this.news = [];
      if(this.selected.value !== null)
      {
        this.socket.emit('SEND_MESSAGE', {
          resource: this.selected.value
        });
      }
      else
      {
        alert('Выберите источник')
      }
    }
  }

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  text-align: left;
}
a {
  color: #42b983;
}
.update-button {
  margin-bottom: 10px;
}
</style>
