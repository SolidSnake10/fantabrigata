<template>
  <div>
    <q-card class="card-risultati" color="white">
      <q-card-title>
        <q-select
          v-model="giornataSelezionata"
          float-label="Giornata"
          @change="cambiaGiornata"
          :options="[
              {'value':'1','label':'Giornata 1'},
              {'value':'2','label':'Giornata 2'},
              {'value':'3','label':'Giornata 3'},
              {'value':'4','label':'Giornata 4'},
              {'value':'5','label':'Giornata 5'},
              {'value':'6','label':'Giornata 6'},
              {'value':'7','label':'Giornata 7'},
              {'value':'8','label':'Giornata 8'},
              {'value':'9','label':'Giornata 9'},
              {'value':'10','label':'Giornata 10'},
              {'value':'11','label':'Giornata 11'},
              {'value':'12','label':'Giornata 12'},
              {'value':'13','label':'Giornata 13'},
              {'value':'14','label':'Giornata 14'},
              {'value':'15','label':'Giornata 15'},
              {'value':'16','label':'Giornata 16'},
              {'value':'17','label':'Giornata 17'},
              {'value':'18','label':'Giornata 18'},
              {'value':'19','label':'Giornata 19'},
              {'value':'20','label':'Giornata 20'},
              {'value':'21','label':'Giornata 21'},
              {'value':'22','label':'Giornata 22'},
              {'value':'23','label':'Giornata 23'},
              {'value':'24','label':'Giornata 24'},
              {'value':'25','label':'Giornata 25'},
              {'value':'26','label':'Giornata 26'},
              {'value':'27','label':'Giornata 27'},
              {'value':'28','label':'Giornata 28'},
              {'value':'29','label':'Giornata 29'},
              {'value':'30','label':'Giornata 30'},
              {'value':'31','label':'Giornata 31'},
              {'value':'32','label':'Giornata 32'},
              {'value':'33','label':'Giornata 33'},
              {'value':'34','label':'Giornata 34'},
              {'value':'35','label':'Giornata 35'},
              {'value':'36','label':'Giornata 36'},
              {'value':'37','label':'Giornata 37'},
              {'value':'38','label':'Giornata 38'},
              {'value':'39','label':'Giornata 39'},
              {'value':'40','label':'Giornata 40'}
            ]"
        />
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <table class="q-table highlight horizontal-separator striped-odd responsive" style="width: 100%">
          <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">Voto</th>
            <th class="text-left">Amm</th>
            <th class="text-left">Esp</th>
            <th class="text-left">Gol Fatti</th>
            <th class="text-left">Gol Subiti</th>
            <th class="text-left">Aut</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="listaVotiTitolari['por-1']">
            <td class="text-left">{{ listaVotiTitolari['por-1'].Giocatore }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].G ? listaVotiTitolari['por-1'].G.toString().substring(0,3) : '' }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].Amm }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].Esp }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].GF }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].GS }}</td>
            <td class="text-left">{{ listaVotiTitolari['por-1'].Aut }}</td>
          </tr>
          <tr v-for="n in nDif" v-if="listaVotiTitolari['dif-' + n]">
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].Giocatore }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].G ? listaVotiTitolari['dif-' + n].G.toString().substring(0,3) : '' }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].Amm }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].Esp }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].GF }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].GS }}</td>
            <td class="text-left">{{ listaVotiTitolari['dif-' + n].Aut }}</td>
          </tr>
          <tr v-for="n in nCen" v-if="listaVotiTitolari['cen-' + n]">
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].Giocatore }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].G ? listaVotiTitolari['cen-' + n].G.toString().substring(0,3) : '' }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].Amm }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].Esp }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].GF }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].GS }}</td>
            <td class="text-left">{{ listaVotiTitolari['cen-' + n].Aut }}</td>
          </tr>
          <tr v-for="n in nAtt" v-if="listaVotiTitolari['att-' + n]">
            <td class="text-left">{{ listaVotiTitolari['att-' + n].Giocatore }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].G ? listaVotiTitolari['att-' + n].G.toString().substring(0,3) : '' }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].Amm }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].Esp }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].GF }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].GS }}</td>
            <td class="text-left">{{ listaVotiTitolari['att-' + n].Aut }}</td>
          </tr>
          <tr style="background: #ff9800">
            <th class="text-center" colspan="7">Panchina</th>
          </tr>
          <tr v-for="giocatore in listaVotiPanchina" v-if="listaVotiPanchina.length > 0">
            <td class="text-left">{{ giocatore.Giocatore }}</td>
            <td class="text-left">{{ giocatore.G ? giocatore.G.toString().substring(0,3) : '' }}</td>
            <td class="text-left">{{ giocatore.Amm }}</td>
            <td class="text-left">{{ giocatore.Esp }}</td>
            <td class="text-left">{{ giocatore.GF }}</td>
            <td class="text-left">{{ giocatore.GS }}</td>
            <td class="text-left">{{ giocatore.Aut }}</td>
          </tr>
          </tbody>
        </table>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { db } from '../firebaseConfig'

  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QTabs,
    QTab,
    QTabPane,
    QInput,
    QSelect,
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QModal,
    QModalLayout,
    QCollapsible
  } from 'quasar'

  let formazioniRef = db.ref('formazioni')
  let votiRef = db.ref('voti')
  let calendarioRef = db.ref('calendario')
  let giocatoriRef = db.ref('giocatori')
  let moment = require('moment')

  export default {
    name: 'risultati',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QTabs,
      QTab,
      QTabPane,
      QInput,
      QSelect,
      QCard,
      QCardMain,
      QCardTitle,
      QCardSeparator,
      QModal,
      QModalLayout,
      QCollapsible
    },
    data () {
      return {
        listaVotiTitolari: {},
        listaVotiPanchina: [],
        giornataSelezionata: '3',
        nDif: 0,
        nCen: 0,
        nAtt: 0
      }
    },
    firebase: {
    },
    computed: {
    },
    watch: {
    },
    beforeCreate () {
      let self = this
      let date = moment(new Date(), 'YYYY-MM-DD hh:mm:ss').format()
      calendarioRef.orderByChild('start_date').startAt(date).limitToFirst(1).on('child_added', function (snapshot) {
        self.giornataSelezionata = (snapshot.val().n_giornata - 1).toString()
        self.cambiaGiornata()
      })
    },
    methods: {
      cambiaGiornata () {
        this.listaVotiTitolari = {}
        this.listaVotiPanchina = []
        this.getVotiByGiornata()
      },
      getGiocatore (snapshot, item) {
        let self = this
        giocatoriRef.orderByChild('value').equalTo(snapshot.val().schieramento[item]).on('child_added', function (snapshot3) {
          self.$set(self.listaVotiTitolari, item, {
            Giocatore: snapshot3.val().nome,
            G: '-',
            Amm: '-',
            Esp: '-',
            GF: '-',
            GS: '-',
            Aut: '-'
          })
        })
      },
      getVoto (snapshot, item) {
        let self = this
        votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().schieramento[item]).on('value', function (snapshot2) {
          if (snapshot2.val()) {
            snapshot2.forEach(function (child) {
              self.$set(self.listaVotiTitolari, item, child.val())
            })
          }
          else {
            self.getGiocatore(snapshot, item)
          }
        })
      },
      getVotiByGiornata (giornata) {
        let self = this
        formazioniRef.orderByChild('giornata').equalTo(this.giornataSelezionata).on('child_added', function (snapshot) {
          let modulo = snapshot.val().modulo
          self.nDif = Number(modulo.charAt(0))
          self.nCen = Number(modulo.charAt(1))
          self.nAtt = Number(modulo.charAt(2))

          self.getVoto(snapshot, 'por-1')
          for (let i = 0; i < self.nDif; i++) {
            self.getVoto(snapshot, 'dif-' + (i + 1))
          }
          for (let i = 0; i < self.nCen; i++) {
            self.getVoto(snapshot, 'cen-' + (i + 1))
          }
          for (let i = 0; i < self.nAtt; i++) {
            self.getVoto(snapshot, 'att-' + (i + 1))
          }
          for (let panchinaro in snapshot.val().panchina) {
            votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().panchina[panchinaro]).on('value', function (snapshot2) {
              if (snapshot2.val()) {
                snapshot2.forEach(function (child) {
                  self.listaVotiPanchina.push(child.val())
                })
              }
              else {
                giocatoriRef.orderByChild('value').equalTo(snapshot.val().panchina[panchinaro]).on('child_added', function (snapshot3) {
                  self.listaVotiPanchina.push({
                    Giocatore: snapshot3.val().nome,
                    G: '-',
                    Amm: '-',
                    Esp: '-',
                    GF: '-',
                    GS: '-',
                    Aut: '-'
                  })
                })
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card-risultati {
    color: black!important
  }
</style>
