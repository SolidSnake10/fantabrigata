<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" color="orange-7">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Fanta Brigata
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item>
          <q-item-side icon="assignment" />
          <q-item-main label="Schiera Formazione"/>
        </q-item>
        <q-item>
          <q-item-side icon="list" />
          <q-item-main label="Lista Giocatori"/>
        </q-item>
        <q-item>
          <q-item-side icon="assessment" />
          <q-item-main label="Statistiche.."/>
        </q-item>
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->

    <q-tabs v-model="moduloSelezionato" color="green-6">
      <q-tab slot="title" :name="modulo" :label="modulo" v-for="modulo in listaModuli" :key="modulo" @select="changeModulo"/>
    </q-tabs>

    <div class="layout-padding">
      <div class="column justify-center">
        <q-card class="bg-light">
          <q-card-title class="bg-orange-7">
            <q-icon name="directions run" style="font-size: 1.5rem"></q-icon>
            Titolari
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="row justify-center">
              <div class="col-6">
                <q-select
                  filter
                  v-model="formazione['por-1']"
                  float-label="Portiere"
                  :options="listaPortieri"
                  :display-value="getDescSelect(formazione['por-1'])"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div v-for="difensore in schieramento.difensori" :class="difensore.class">
                <q-select
                  filter
                  v-model="formazione[difensore.model]"
                  :float-label="difensore.label"
                  :options="listaDifensori"
                  :display-value="getDescSelect(formazione[difensore.model])"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div v-for="centrocampista in schieramento.centrocampisti" :class="centrocampista.class">
                <q-select
                  filter
                  v-model="formazione[centrocampista.model]"
                  :float-label="centrocampista.label"
                  :options="listaCentrocampisti"
                  :display-value="getDescSelect(formazione[centrocampista.model])"
                />
              </div>
            </div>
            <div class="row justify-around">
              <div v-for="attaccante in schieramento.attaccanti" :class="attaccante.class">
                <q-select
                  filter
                  v-model="formazione[attaccante.model]"
                  :float-label="attaccante.label"
                  :options="listaAttaccanti"
                  :display-value="getDescSelect(formazione[attaccante.model])"
                />
              </div>
            </div>
          </q-card-main>
        </q-card>

        <q-card class="bg-light">
          <q-card-title class="bg-orange-7">
            <q-icon name="event seat" style="font-size: 1.5rem"></q-icon>
            Panchina
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="row justify-center">
              <div class="col-12">
                <q-select
                  multiple
                  filter
                  v-model="panchina"
                  float-label="Panchina"
                  :options="listaGiocatori"
                  :display-value="getDescSelect(panchina)"
                />
              </div>
            </div>
          </q-card-main>
        </q-card>
        <q-btn @click="checkFormazione" color="orange-6" class="pull-right" style="margin-top: 20px; margin-right: 5px; margin-left: 5px"> Controlla Formazione </q-btn>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import { PORTIERI } from '../assets/json/portieri'
  import { DIFENSORI } from '../assets/json/difensori'
  import { CENTROCAMPISTI } from '../assets/json/centrocampisti'
  import { ATTACCANTI } from '../assets/json/attaccanti'
  import { GIOCATORI } from '../assets/json/giocatori'

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
    QCardSeparator
  } from 'quasar'

  export default {
    name: 'index',
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
      QCardSeparator
    },
    data () {
      return {
        formazione: {},
        titolari: [],
        panchina: [],
        formazioneCompleta: [],
        listaSquadre: [],
        moduloSelezionato: '343',
        listaModuli: ['343', '352', '433', '442', '451', '532', '541'],
        schieramento: {
          difensori: [],
          centrocampisti: [],
          attaccanti: []
        },
        listaPortieri: PORTIERI,
        listaDifensori: DIFENSORI,
        listaCentrocampisti: CENTROCAMPISTI,
        listaAttaccanti: ATTACCANTI,
        listaGiocatori: GIOCATORI
      }
    },
    computed: {
    },
    methods: {
      createList () {

      },
      changeModulo () {
        this.resetSchieramento()

        this.$set(this.formazione, 'por-1', undefined)

        var nDif = this.moduloSelezionato.charAt(0)
        var nCen = this.moduloSelezionato.charAt(1)
        var nAtt = this.moduloSelezionato.charAt(2)
        console.log(this.moduloSelezionato, nDif, nCen, nAtt)

        // difensori
        for (var i = 0; i < nDif; i++) {
          var difensore = {}
          difensore.class = this.calcolaClass(nDif)
          difensore.model = 'dif-' + (i + 1)
          difensore.label = 'Difensore ' + (i + 1)
          this.schieramento.difensori.push(difensore)
          this.$set(this.formazione, difensore.model, undefined)
        }

        // centrocampisti
        for (i = 0; i < nCen; i++) {
          var centrocampista = {}
          centrocampista.class = this.calcolaClass(nCen)
          centrocampista.model = 'cen-' + (i + 1)
          if ((Number(nDif) + Number(i) + Number(2)) === 8) {
            centrocampista.label = '(C) Centrocampista ' + (i + 1)
          }
          else {
            centrocampista.label = 'Centrocampista ' + (i + 1)
          }
          this.schieramento.centrocampisti.push(centrocampista)
          this.$set(this.formazione, centrocampista.model, undefined)
        }

        // Attaccanti
        for (i = 0; i < nAtt; i++) {
          var attaccante = {}
          attaccante.class = this.calcolaClass(nAtt)
          attaccante.model = 'att-' + (i + 1)
          attaccante.label = 'Attaccante ' + (i + 1)
          this.schieramento.attaccanti.push(attaccante)
          this.$set(this.formazione, attaccante.model, undefined)
        }
      },
      checkFormazione () {
        this.titolari = []
        this.listaSquadre = []
        for (var key in this.formazione) {
          if (!this.formazione[key]) {
            alert('Titolari mancanti')
            return
          }
          else {
            this.titolari.push(this.formazione[key])
          }
        }

        this.formazioneCompleta = this._.concat(this.titolari, this.panchina)
        if (this.hasDuplicates(this.formazioneCompleta)) {
          alert('Attenzione Giocatori Duplicati')
          return
        }
        if (this.panchina.length < 9) {
          alert((9 - this.panchina.length) + ' panchinari mancanti')
          return
        }
        else if (this.panchina.length > 9) {
          alert('Troppi panchinari inseriti')
          return
        }

        for (var i = 0; i < this.formazioneCompleta.length; i++) {
          var objGiocatore = this.findGiocatore(this.formazioneCompleta[i])
          this.listaSquadre.push(objGiocatore.sublabel)
          if (this.hasDuplicates(this.listaSquadre)) {
            alert('Piu giocatori per la squadra ' + objGiocatore.sublabel + ' inseriti')
            return
          }
        }
      },
      hasDuplicates (a) {
        return this._.uniq(a).length !== a.length
      },
      calcolaClass (n) {
        var diff = 12 / n
        diff = Math.floor(diff)
        diff--
        return 'col-' + diff
      },
      resetSchieramento () {
        this.schieramento = {
          difensori: [],
          centrocampisti: [],
          attaccanti: []
        }
        this.panchina = []
      },
      getDescSelect (value) {
        var giocatore = undefined
        if (this._.isArray(value)) {
          var listaPanchina = ''
          for (var i = 0; i < value.length; i++) {
            giocatore = this.findGiocatore(value[i])
            if (giocatore) {
              listaPanchina += giocatore.label + ' ' + '<b>(' + giocatore.sublabel + ')</b>, '
            }
          }
          if (listaPanchina.length > 0) {
            listaPanchina = listaPanchina.substring(0, listaPanchina.length - 2)
          }
          return listaPanchina
        }
        else {
          if (value) {
            giocatore = this.findGiocatore(value)
            if (giocatore) {
              return giocatore.label + '<br> (' + giocatore.sublabel + ')'
            }
          }
        }
      },
      findGiocatore (idGiocatore) {
        return this._.find(this.listaGiocatori, function (o) { return o.value === idGiocatore })
      }
    }
  }
</script>

<style lang="stylus">
  .layout-page {
    background #4CAF50
  }
</style>
