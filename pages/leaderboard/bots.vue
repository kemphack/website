<template>
  <section class="leaderboard page-wrap">
    <v-container>
      <div class="header">
        <AntHivePageHeader
          :title="$t('leaderboard.title')"
          :tooltip-text="$t('leaderboard.description')"
        />
      </div>
      <AntHiveButton
        :to="localePath('/leaderboard/bots')"
        class="button"
        tile
        color="white"
      ><span class="primary--text">{{ $t('leaderboard.bots') }}</span></AntHiveButton>
      <AntHiveButton
        :to="localePath('/leaderboard/users')"
        class="button"
        tile
        color="#cdcad5"
      >{{ $t('leaderboard.users') }}</AntHiveButton>
      <div class="overflow-hidden">
        <client-only>
          <v-data-table
            :headers="headers"
            :items="bots"
            disable-pagination
            sort-by="mmr"
            sort-desc
            hide-default-footer
            class="table"
          >
            <template v-slot:[`item.avatar`]="{ item }">
              <v-avatar
                tile
                width="120px"
                height="120px">
                <v-img :src="getAvatar(item.avatar, 240)" />
              </v-avatar>
            </template>
            <template v-slot:[`item.err`]="{ item }">
              {{ item.err }}%
            </template>
            <template v-slot:[`item.score`]="{ item }">
              {{ getNumberTruncated(item.score) }}
            </template>
            <template v-slot:[`item.art`]="{ item }">
              {{ item.art / 1000 }} ms
            </template>
            <template v-slot:[`item.lang`]="{ item }">
              <v-avatar tile size="40">
                <v-img :src="getLangImg(item.lang)" />
              </v-avatar>
            </template>
            <template v-slot:[`item.author`]="{ item }">
              <nuxt-link
                :to="localePath(`/users?username=${item.username}`)"
                class="information-user"
                @click.native="$gtag('event', 'leaderboard_to_author')">
                <v-avatar class="ml-1" tile size="30">
                  <v-img :src="getAvatar(item.userAvatar, 60)" />
                </v-avatar>
                {{ item.username }}
              </nuxt-link>
            </template>
          </v-data-table>
        </client-only>
        <infinite-scroll :enough="enoughLoadLeaders" @load-more="fetchBots" />
        <template v-if="!bots.length">
          <v-skeleton-loader
            v-for="skeleton in 8"
            :key="skeleton + 'skeleton'"
            tile
            width="100%"
            height="120px"
            class="skeleton"
            elevation="2"
            type="list-item-avatar-three-line"
          />
        </template>
      </div>
    </v-container>
  </section>
</template>

<script>
import langs from '@/static/langs/data.json'
import { getBotsLeaderboard } from '@/services/Bot'
import AntHiveIcon from '@/components/AntHiveIcon'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'
import AntHivePageHeader from '@/components/AntHivePageHeader'

export default {
  head() {
    return {
      title: this.$t('leaderboard.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('leaderboard.meta.description')
        }
      ]
    }
  },
  name: 'Leaderboard',
  components: {
    AntHiveIcon,
    AntHivePageHeader
  },
  mixins: [Image, Truncate],
  data() {
    return {
      langs: [],
      bots: [],
      headers: [
        { text: '', value: 'avatar', sortable: false },
        { text: this.$t('leaderboard.language'), value: 'lang' },
        { text: this.$t('leaderboard.name'), value: 'displayName' },
        { text: this.$t('leaderboard.version'), value: 'v' },
        { text: this.$t('leaderboard.mmr'), value: 'mmr' },
        { text: this.$t('leaderboard.wins'), value: 'wins' },
        { text: this.$t('leaderboard.losses'), value: 'losses' },
        { text: this.$t('leaderboard.score'), value: 'score' },
        { text: this.$t('leaderboard.art'), value: 'art' },
        { text: this.$t('leaderboard.errors'), value: 'err' },
        { text: this.$t('leaderboard.author'), value: 'author' }
      ],
      enoughLoadLeaders: false,
      pageSize: 40,
      searchParams: {}
    }
  },
  computed: {
    getLangs() {
      return langs
    }
  },
  fetch() {
    if (process.server) {
      this.fetchBots()
    }
  },
  mounted() {
    this.searchParams = { p: 0, pp: this.pageSize }
    this.fetchBots()
    this.$gtag('event', 'leaderboard_bots')
  },
  methods: {
    async fetchBots() {
      this.enoughLoadLeaders = true
      const bots = await getBotsLeaderboard(this.searchParams)
      if (bots.length) {
        this.searchParams.p += 1
        this.bots = this.bots.concat(bots)
        this.enoughLoadLeaders = false
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/style/global.scss';
.table {
  .text-start.sortable {
    font-weight: $font-weight-bold;
    font-size: $font-small;
  }
  .text-start.active {
    font-weight: $font-weight-bolder;
    color: $violet!important;
    &.asc::after {
      content: '⬇'
    }
    &.desc::after {
      content: '⬆'
    }
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.leaderboard {
  padding: 40px 0;
  .header {
    display: flex;
    margin-bottom: 38px;
  }
  .table {
    margin-left: -16px!important;

  }
  .skeleton {
    background-color: $white;
    padding-top: 20px;
  }
}
</style>
