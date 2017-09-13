<template>
  <div>
    <q-card class="card-risultati" color="white">
      <q-card-title>
        <q-select
          v-model="giornataSelezionata"
          float-label="Giornata"
          @change="cambiaGiornata"
          :options="[
            {
              label: 'Giornata 1',
              value: '1'
            },
            {
              label: 'Giornata 2',
              value: '2'
            },
            {
              label: 'Giornata 3',
              value: '3'
            },
            {
              label: 'Giornata 4',
              value: '4'
            }
          ]"
        />
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <table class="q-table highlight horizontal-separator striped-odd responsive" style="width: 100%" v-if="listaVotiPanchina.length > 0">
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
          <tr v-for="giocatore in listaVotiTitolari">
            <td class="text-left">{{ giocatore.Giocatore }}</td>
            <td class="text-left">{{ giocatore.G.toString().substring(0,3) }}</td>
            <td class="text-left">{{ giocatore.Amm }}</td>
            <td class="text-left">{{ giocatore.Esp }}</td>
            <td class="text-left">{{ giocatore.GF }}</td>
            <td class="text-left">{{ giocatore.GS }}</td>
            <td class="text-left">{{ giocatore.Aut }}</td>
          </tr>
          <tr style="background: #ff9800">
            <th class="text-center" colspan="7">Panchina</th>
          </tr>
          <tr v-for="giocatore in listaVotiPanchina">
            <td class="text-left">{{ giocatore.Giocatore }}</td>
            <td class="text-left">{{ giocatore.G.toString().substring(0,3) }}</td>
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
        listaVotiTitolari: [],
        listaVotiPanchina: [],
        giornataSelezionata: '3'
      }
    },
    firebase: {
    },
    computed: {
    },
    watch: {
    },
    created () {
      let self = this
      let date = moment(new Date(), 'YYYY-MM-DD hh:mm:ss').format()
      calendarioRef.orderByChild('start_date').startAt(date).limitToFirst(1).on('child_added', function (snapshot) {
        self.giornataSelezionata = (snapshot.val().n_giornata - 1).toString()
        self.cambiaGiornata()
        console.log(self.giornataSelezionata)
      })
    },
    methods: {
      cambiaGiornata () {
        this.listaVotiTitolari = []
        this.listaVotiPanchina = []
        this.getVotiByGiornata()
      },
      async getVotiByGiornata (giornata) {
        let self = this
        await formazioniRef.orderByChild('giornata').equalTo(this.giornataSelezionata).on('child_added', async function (snapshot) {
          let modulo = snapshot.val().modulo
          let dif = modulo.charAt(0)
          let cen = modulo.charAt(1)
          let att = modulo.charAt(2)
          await votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().schieramento['por-1']).on('child_added', function (snapshot2) {
            self.listaVotiTitolari.push(snapshot2.val())
          })
          for (let i = 0; i < dif; i++) {
            await votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().schieramento['dif-' + (i + 1)]).on('child_added', function (snapshot2) {
              self.listaVotiTitolari.push(snapshot2.val())
            })
          }
          for (let i = 0; i < cen; i++) {
            await votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().schieramento['cen-' + (i + 1)]).on('child_added', function (snapshot2) {
              self.listaVotiTitolari.push(snapshot2.val())
            })
          }
          for (let i = 0; i < att; i++) {
            await votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().schieramento['att-' + (i + 1)]).on('child_added', function (snapshot2) {
              self.listaVotiTitolari.push(snapshot2.val())
            })
          }
          for (let panchinaro in snapshot.val().panchina) {
            await votiRef.child('giornata-' + self.giornataSelezionata).orderByChild('ID').equalTo(snapshot.val().panchina[panchinaro]).on('child_added', function (snapshot2) {
              self.listaVotiPanchina.push(snapshot2.val())
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
