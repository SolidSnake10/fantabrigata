<template>
  <div>
    <q-card class="card-risultati" color="white">
      <q-card-title>
        <q-select
          v-model="classificaSelezionata"
          float-label="Scegli classifica"
          @change="cambiaClassifica"
          :options="[
            {
              label: 'Campionato',
              value: '1'
            },
            {
              label: 'Coppa',
              value: '2'
            }
          ]"
        />
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <table class="q-table highlight horizontal-separator striped-odd responsive" style="width: 100%" v-if="classificaSelezionata === '1'">
          <thead>
          <tr>
            <th class="text-left">Posizione</th>
            <th class="text-left">Squadra</th>
            <th class="text-left">Punti</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="squadra in classificaCampionato">
            <td class="text-left">{{ squadra.posizione }}</td>
            <td class="text-left">{{ squadra.squadra}}</td>
            <td class="text-left">{{ squadra.punteggio }}</td>
          </tr>
          </tbody>
        </table>
        <table class="q-table highlight horizontal-separator striped-odd responsive" style="width: 100%" v-if="classificaSelezionata === '2'">
          <thead>
          <tr>
            <th class="text-left">Posizione</th>
            <th class="text-left">Squadra</th>
            <th class="text-left">Punti</th>
            <th class="text-left">GS</th>
            <th class="text-left">GF</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="squadra in classificaCoppa">
            <td class="text-left">{{ squadra.posizione }}</td>
            <td class="text-left">{{ squadra.squadra}}</td>
            <td class="text-left">{{ squadra.punteggio }}</td>
            <td class="text-left">{{ squadra.gf }}</td>
            <td class="text-left">{{ squadra.gs }}</td>
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

  let classificaRef = db.ref('classifica')
  let classificaCoppaRef = db.ref('classifica-coppa')

  export default {
    name: 'classifica',
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
        classificaCampionato: [],
        classificaCoppa: [],
        classificaSelezionata: '1'
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
      classificaRef.on('child_added', function (snapshot) {
        self.classificaCampionato.push(snapshot.val())
      })
      classificaCoppaRef.on('child_added', function (snapshot) {
        self.classificaCoppa.push(snapshot.val())
      })
    },
    methods: {
      cambiaClassifica () {
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card-risultati {
    color: black!important
  }
</style>
