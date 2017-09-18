<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
    style="background: #4CAF50"
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
        <q-item @click="componenteSelezionato = 'schieraFormazione'">
          <q-item-side icon="assignment" />
          <q-item-main label="Schiera Formazione"/>
        </q-item>
        <q-item @click="componenteSelezionato = 'risultati'">
          <q-item-side icon="list" />
          <q-item-main label="Risultati"/>
        </q-item>
        <q-item @click="componenteSelezionato = 'classifica'">
          <q-item-side icon="list" />
          <q-item-main label="Classifica"/>
        </q-item>
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <keep-alive>
      <component :is="componenteSelezionato"></component>
    </keep-alive>
  </q-layout>
</template>

<script>
  import SchieraFormazione from './SchieraFormazione.vue'
  import Risultati from './Risultati.vue'
  import Classifica from './Classifica.vue'

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
      QCollapsible,
      schieraFormazione: SchieraFormazione,
      risultati: Risultati,
      classifica: Classifica
    },
    data () {
      return {
        componenteSelezionato: 'schieraFormazione'
      }
    }
  }
</script>

<style lang="stylus">
  .layout-page {
    background #4CAF50
  }
</style>
