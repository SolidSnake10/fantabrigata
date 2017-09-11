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

    <q-collapsible icon="fa-futbol-o" :label="getLabelGiornata" style="background: #81C784" class="calendario-giornata">
      <q-card style="background: white">
        <q-card-main>
          <table class="q-table highlight horizontal-separator striped-odd responsive" style="width: 100%">
            <thead>
            </thead>
            <tbody>
            <tr v-for="partita in calendarioGiornata">
              <td class="text-left">{{ partita.home_team }}</td>
              <td class="text-left">{{ partita.away_team }}</td>
              <td class="text-left">{{ partita.date_match | moment("DD-MM-YYYY HH:mm")}}</td>
            </tr>
            </tbody>
          </table>
        </q-card-main>
      </q-card>
    </q-collapsible>

    <q-tabs v-model="moduloSelezionato" color="green-6">
      <q-tab slot="title" :name="modulo" :label="modulo" v-for="modulo in listaModuli" :key="modulo"/>
    </q-tabs>

    <div style="padding: 10px">
      <div class="column">
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
                  filter-placeholder="Filtra per giocatore o squadra"
                  @change="refreshTables()"
                />
              </div>
            </div>
            <div class="row sm-gutter justify-around">
              <div v-for="difensore in schieramento.difensori" :class="difensore.class">
                <q-select
                  filter
                  v-model="formazione[difensore.model]"
                  :float-label="difensore.label"
                  :options="listaDifensori"
                  :display-value="getDescSelect(formazione[difensore.model])"
                  filter-placeholder="Filtra per giocatore o squadra"
                  @change="refreshTables()"
                />
              </div>
            </div>
            <div class="row sm-gutter justify-around">
              <div v-for="centrocampista in schieramento.centrocampisti" :class="centrocampista.class">
                <q-select
                  filter
                  v-model="formazione[centrocampista.model]"
                  :float-label="centrocampista.label"
                  :options="listaCentrocampisti"
                  :display-value="getDescSelect(formazione[centrocampista.model])"
                  filter-placeholder="Filtra per giocatore o squadra"
                  @change="refreshTables()"
                />
              </div>
            </div>
            <div class="row sm-gutter justify-around">
              <div v-for="attaccante in schieramento.attaccanti" :class="attaccante.class">
                <q-select
                  filter
                  v-model="formazione[attaccante.model]"
                  :float-label="attaccante.label"
                  :options="listaAttaccanti"
                  :display-value="getDescSelect(formazione[attaccante.model])"
                  filter-placeholder="Filtra per giocatore o squadra"
                  @change="refreshTables()"
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
                  @change="refreshTables()"
                  filter-placeholder="Filtra per giocatore o squadra"
                />
                <q-btn color="negative" icon="delete" @click="eliminaUltimaRiserva" :disabled="panchina.length === 0">Rimuovi Ultimo</q-btn>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <q-btn @click="salvaFormazione" color="orange-6" style="width: 100%"> Salva Formazione </q-btn>
      <q-btn @click="generaFormazione" color="orange-6" style="width: 100%; margin-top: 10px"> Genera Formazione </q-btn>
      <q-btn @click="confirmResetFormazione" color="red-6" style="width: 100%; margin-top: 10px"> Reset Formazione </q-btn>
    </div>
    <q-modal ref="overviewModal" :content-css="{minWidth: '80vw', minHeight: '95vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="orange-7">
          <q-btn flat @click="$refs.overviewModal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <div class="q-toolbar-title">
            Fanta Guido Style
          </div>
        </q-toolbar>
        <q-toolbar slot="footer" color="orange-7">
        </q-toolbar>
        <div style="margin: 10px">
            <div class="row sm-gutter ">
              <div class="column col-12 col-sm-6">
                <q-input v-for="n in 11" inverted :float-label="n.toString()" :value="getDescGiocatore(formazioneCompleta[n - 1])" :color="n === 8 ? 'warning' : 'primary'"/>
              </div>
              <div class="column col-12 col-sm-6">
                <q-input v-for="n in 9" inverted :float-label="(n + 11).toString()" :value="getDescGiocatore(formazioneCompleta[n + 10])" :color="n + 11 === 20 ? 'warning' : 'primary'"/>
              </div>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-layout>
</template>

<script>
  import { GIOCATORI } from '../assets/json/giocatori'
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
    Dialog,
    QCollapsible
  } from 'quasar'

  let formazioniRef = db.ref('formazioni')
  let calendarioRef = db.ref('calendario')
  let moment = require('moment')

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
      QCardSeparator,
      QModal,
      QModalLayout,
      QCollapsible
    },
    data () {
      return {
        infoGiornata: {},
        calendarioGiornata: [],
        formazioneSalvata: false,
        giornataCorrente: {},
        formazione: {},
        titolari: [],
        panchina: [],
        formazioneCompleta: [],
        listaSquadre: [],
        moduloSelezionato: '',
        listaModuli: ['343', '352', '433', '442', '451', '532', '541'],
        schieramento: {
          difensori: [],
          centrocampisti: [],
          attaccanti: []
        },
        listaPortieri: [],
        listaDifensori: [],
        listaCentrocampisti: [],
        listaAttaccanti: [],
        listaGiocatori: GIOCATORI
      }
    },
    firebase: {
      formazioni: formazioniRef,
      calciatori: db.ref('calciatori')
    },
    computed: {
      getLabelGiornata () {
        return 'Giornata n. ' + this.infoGiornata.n_giornata + ' (' + moment(this.infoGiornata.start_date).format('DD-MM-YYYY, HH:mm:ss') + ')'
      }
    },
    watch: {
      moduloSelezionato () {
        this.changeModulo()
      },
      formazioneSalvata () {
        this.formazione = this.giornataCorrente.schieramento ? this.giornataCorrente.schieramento : {}
        this.panchina = this.giornataCorrente.panchina ? this.giornataCorrente.panchina : []
      }
    },
    created () {
      this.moduloSelezionato = '343'
      this.listaPortieri = this._.filter(GIOCATORI, function (o) {
        return o.ruolo === 'POR'
      })
      this.listaDifensori = this._.filter(GIOCATORI, function (o) {
        return o.ruolo === 'DIF'
      })
      this.listaCentrocampisti = this._.filter(GIOCATORI, function (o) {
        return o.ruolo === 'MED'
      })
      this.listaAttaccanti = this._.filter(GIOCATORI, function (o) {
        return o.ruolo === 'ATT'
      })

      let self = this
      /* Cerco Giornata Corrente e Controllo Formazione Salvata */
      let date = moment(new Date(), 'YYYY-MM-DD hh:mm:ss').format()
      calendarioRef.orderByChild('start_date').startAt(date).limitToFirst(1).on('child_added', function (snapshot) {
        self.infoGiornata = snapshot.val()
        /* Cerco Calendario Gioranta Corrente */
        self.$http.get('http://soccer.sportsopendata.net/v1/leagues/serie-a/seasons/17-18/rounds/round-' + self.infoGiornata.n_giornata)
          .then(function (response) {
            self.calendarioGiornata = response.data.data.rounds[0].matches
          })
          .catch(function (error) {
            console.log(error)
          })
        formazioniRef.orderByChild('giornata').equalTo(self.infoGiornata.n_giornata).on('child_added', function (snapshot2) {
          self.giornataCorrente = snapshot2.val()
          self.giornataCorrente['key'] = snapshot2.key

          self.moduloSelezionato = self.giornataCorrente.modulo
          self.formazioneSalvata = true
        })
      })
    },
    methods: {
      salvaFormazione () {
        let formazione = {
          giornata: this.infoGiornata.n_giornata,
          modulo: this.moduloSelezionato,
          schieramento: JSON.parse(JSON.stringify(this.formazione)),
          panchina: this.panchina
        }
        if (this._.isEmpty(this.giornataCorrente)) {
          formazioniRef.push(formazione).then(() => {
            alert('Formazione Inserita Correttamente')
          })
        }
        else {
          db.ref('formazioni/' + this.giornataCorrente['key']).update(formazione).then(() => {
            alert('Formazione Aggiornata Correttamente')
          })
        }
      },
      changeModulo () {
        console.log('CAMBIO MODULO')
        this.resetSchieramento()
        this.resetFormazione()

        this.$set(this.formazione, 'por-1', undefined)

        var nDif = this.moduloSelezionato.charAt(0)
        var nCen = this.moduloSelezionato.charAt(1)
        var nAtt = this.moduloSelezionato.charAt(2)

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
      generaFormazione () {
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
          this.listaSquadre.push(objGiocatore.squadra)
          if (this.hasDuplicates(this.listaSquadre)) {
            alert('Piu giocatori per la squadra ' + objGiocatore.squadra + ' inseriti')
            return
          }
        }
        this.$refs.overviewModal.open()
      },
      hasDuplicates (a) {
        return this._.uniq(a).length !== a.length
      },
      calcolaClass (n) {
        var diff = 12 / n
        diff = Math.floor(diff)
        // diff--
        return 'col-' + diff
      },
      resetSchieramento () {
        this.schieramento = {
          difensori: [],
          centrocampisti: [],
          attaccanti: []
        }
      },
      resetFormazione () {
        this.panchina = []
        this.formazione = {}
        this.refreshTables()
      },
      confirmResetFormazione () {
        var self = this
        Dialog.create({
          title: 'Conferma',
          message: 'Attenzione perderai tutte le modifiche fatte, continuare?',
          buttons: [
            {
              label: 'No',
              handler () {
                // console.log('Disagreed...')
              }
            },
            {
              label: 'Si',
              handler () {
                self.resetFormazione()
              }
            }
          ]
        })
      },
      getDescSelect (value) {
        var giocatore = {}
        if (this._.isArray(value)) {
          var listaPanchina = ''
          for (var i = 0; i < value.length; i++) {
            giocatore = this.findGiocatore(value[i])
            if (giocatore) {
              listaPanchina += giocatore.label.substring(0, giocatore.label.indexOf('<')) + ' ' + '<b>(' + giocatore.squadra + ')</b>, '
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
              return giocatore.label.substring(0, giocatore.label.indexOf('<')) + '<br> (' + giocatore.squadra + ')'
            }
          }
        }
      },
      findGiocatore (idGiocatore) {
        return this._.find(GIOCATORI, function (o) { return o.value === idGiocatore })
      },
      getDescGiocatore (id) {
        if (id) {
          var giocatore = this.findGiocatore(id).label
          return giocatore.substring(0, giocatore.indexOf('<'))
        }
      },
      refreshTables () {
        // this.cleanDeselected()
        var listSquadreSelezionate = []
        for (var key in this.formazione) {
          if (this.formazione[key]) {
            var giocatore = this.findGiocatore(this.formazione[key])
            if (giocatore) {
              listSquadreSelezionate.push(giocatore.squadra)
            }
          }
        }
        for (var i = 0; i < this.panchina.length; i++) {
          var panchinaro = this.findGiocatore(this.panchina[i])
          if (panchinaro) {
            listSquadreSelezionate.push(panchinaro.squadra)
          }
        }
        var self = this
        this.listaGiocatori = this._.filter(GIOCATORI, function (o) {
          return self._.indexOf(listSquadreSelezionate, o.squadra) === -1
        })
        /*
        this.listaPortieri = this._.filter(this.listaGiocatori, function (o) {
          return o.ruolo === 'P'
        })
        this.listaDifensori = this._.filter(this.listaGiocatori, function (o) {
          return o.ruolo === 'D'
        })
        this.listaCentrocampisti = this._.filter(this.listaGiocatori, function (o) {
          return o.ruolo === 'C'
        })
        this.listaAttaccanti = this._.filter(this.listaGiocatori, function (o) {
          return o.ruolo === 'A'
        })
        */

        // this.listaGiocatori = this._.union(this._.drop(this.listaPortieri), this._.drop(this.listaDifensori), this._.drop(this.listaAttaccanti))
      },
      cleanDeselected () {
        for (var key in this.formazione) {
          if (this.formazione[key] && this.formazione[key] === -1) {
            this.formazione[key] = undefined
          }
        }
      },
      eliminaUltimaRiserva () {
        this.panchina = this._.dropRight(this.panchina)
        this.refreshTables()
      }
    }
  }
</script>

<style lang="stylus">
  .layout-page {
    background #4CAF50
  }
  .calendario-giornata {
    padding 5px 0px
  }

  .calendario-giornata .q-item-label {
    font-size 18px
    font-weight 500
    color white
  }

  .calendario-giornata .q-collapsible-sub-item {
    padding 0px 0px 15px 0px!important
  }
</style>
