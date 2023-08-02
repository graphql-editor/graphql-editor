export const VeryLongSchema = `
type Query {
  _schemaVersion: String!
  collections: CollectionQuery
  integrations: IntegrationQuery
  environment: EnvironmentQuery
}

type Mutation {
  collections: CollectionMutation
  integrations: IntegrationMutation
  processes: ProcessesExecutors!
  environment: EnvironmentMutation
}

type Subscription {
  """
  
  
  @Action
  """
  collections_station(mutateTypes: [CollectionMutateType!], filters: CollectionStationFilters): CollectionStationDiff!

  """
  
  
  @Action
  """
  collections_broadcaster(mutateTypes: [CollectionMutateType!], filters: CollectionBroadcasterFilters): CollectionBroadcasterDiff!

  """
  
  
  @Action
  """
  collections_presenter(mutateTypes: [CollectionMutateType!], filters: CollectionPresenterFilters): CollectionPresenterDiff!

  """
  
  
  @Action
  """
  collections_program(mutateTypes: [CollectionMutateType!], filters: CollectionProgramFilters): CollectionProgramDiff!

  """
  
  
  @Action
  """
  collections_item(mutateTypes: [CollectionMutateType!], filters: CollectionItemFilters): CollectionItemDiff!

  """
  
  
  @Action
  """
  collections_profile(mutateTypes: [CollectionMutateType!], filters: CollectionProfileFilters): CollectionProfileDiff!

  """
  
  
  @Action
  """
  collections_contest(mutateTypes: [CollectionMutateType!], filters: CollectionContestFilters): CollectionContestDiff!

  """
  
  
  @Action
  """
  collections_contact(mutateTypes: [CollectionMutateType!], filters: CollectionContactFilters): CollectionContactDiff!

  """
  
  
  @Action
  """
  collections_article(mutateTypes: [CollectionMutateType!], filters: CollectionArticleFilters): CollectionArticleDiff!

  """
  
  
  @Action
  """
  collections_broadcast(mutateTypes: [CollectionMutateType!], filters: CollectionBroadcastFilters): CollectionBroadcastDiff!

  """
  
  
  @Action
  """
  collections_fragment(mutateTypes: [CollectionMutateType!], filters: CollectionFragmentFilters): CollectionFragmentDiff!

  """
  
  
  @Action
  """
  collections_repetition(mutateTypes: [CollectionMutateType!], filters: CollectionRepetitionFilters): CollectionRepetitionDiff!

  """
  
  
  @Action
  """
  collections_imagefile(mutateTypes: [CollectionMutateType!], filters: CollectionImagefileFilters): CollectionImagefileDiff!

  """
  
  
  @Action
  """
  collections_audiofile(mutateTypes: [CollectionMutateType!], filters: CollectionAudiofileFilters): CollectionAudiofileDiff!

  """
  
  
  @Action
  """
  collections_videofile(mutateTypes: [CollectionMutateType!], filters: CollectionVideofileFilters): CollectionVideofileDiff!

  """
  
  
  @Action
  """
  collections_pdffile(mutateTypes: [CollectionMutateType!], filters: CollectionPdffileFilters): CollectionPdffileDiff!

  """
  
  
  @Action
  """
  collections_tweet(mutateTypes: [CollectionMutateType!], filters: CollectionTweetFilters): CollectionTweetDiff!

  """
  
  
  @Action
  """
  collections_twitter_accounts(mutateTypes: [CollectionMutateType!], filters: CollectionTwitter_accountsFilters): CollectionTwitter_accountsDiff!

  """
  
  
  @Action
  """
  collections_prize(mutateTypes: [CollectionMutateType!], filters: CollectionPrizeFilters): CollectionPrizeDiff!

  """
  
  
  @Action
  """
  collections_message(mutateTypes: [CollectionMutateType!], filters: CollectionMessageFilters): CollectionMessageDiff!

  """
  
  
  @Action
  """
  collections_calllog(mutateTypes: [CollectionMutateType!], filters: CollectionCalllogFilters): CollectionCalllogDiff!

  """
  
  
  @Action
  """
  collections_podcast(mutateTypes: [CollectionMutateType!], filters: CollectionPodcastFilters): CollectionPodcastDiff!

  """
  
  
  @Action
  """
  collections_podcast_episode(mutateTypes: [CollectionMutateType!], filters: CollectionPodcast_episodeFilters): CollectionPodcast_episodeDiff!

  """
  
  
  @Action
  """
  collections_clock(mutateTypes: [CollectionMutateType!], filters: CollectionClockFilters): CollectionClockDiff!

  """
  
  
  @Action
  """
  collections_block(mutateTypes: [CollectionMutateType!], filters: CollectionBlockFilters): CollectionBlockDiff!

  """
  
  
  @Action
  """
  collections_media(mutateTypes: [CollectionMutateType!], filters: CollectionMediaFilters): CollectionMediaDiff!
  integrations_mqtt_integration_mqtt_integration_portal_clocks: MqttIntegrationMqttIntegrationPortal_clocksResponse!

  """
  
  
  @Action
  """
  environment_groups(mutateTypes: [EnvironmentMutateType!], filters: EnvironmentGroupsFilter): EnvironmentGroupDiff!

  """
  
  
  @Action
  """
  environment_roles(mutateTypes: [EnvironmentMutateType!], filters: EnvironmentRolesFilter): EnvironmentRoleDiff!

  """
  
  
  @Action
  """
  environment_users(mutateTypes: [EnvironmentMutateType!], filters: EnvironmentUsersFilter): EnvironmentUserDiff!
}

type CollectionStationQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionStation!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_station_StationSortFieldsType!]
    filters: CollectionStationFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStationPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionStationPaginator!
}

type CollectionStation {
  _id: ID!
  name: String
  _relation_image_data: ID
  description: String
  tagline: String
  planning_roleId: ID
  live_roleId: ID
  arla_audio_channel: Int
  arla_video_channel: Int
  profiles_delete_after_days: Int
  _relation_embedded_stations_data: [ID!]
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  image(keyPath: String): String
  programs(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_program_ProgramSortFieldsType!]
    filters: CollectionProgramFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgramPaginator
  embedded_stations(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_station_StationSortFieldsType!]
    filters: CollectionStationFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStationPaginator
}

"""
A date time string and string will be convert to zulu time (UTC). The allowed datetime formats is: [RFC 2822](https://tools.ietf.org/html/rfc2822#page-14) or [ISO 8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15).
"""
scalar DateTime

"""Control what the query should do with trashed objects."""
enum CollectionTrashedPolicy {
  """Return objects that are not in the trash."""
  WITHOUT_TRASHED

  """Return objects no matter if they are in the trash or not."""
  WITH_TRASHED

  """Return objects that are in the trash."""
  ONLY_TRASHED
}

type CollectionStationPaginator {
  aggregate_arla_audio_channel: CollectionPaginatorAggegrate!
  aggregate_arla_video_channel: CollectionPaginatorAggegrate!
  aggregate_profiles_delete_after_days: CollectionPaginatorAggegrate!
  totalCount: Int!
  edges: [CollectionStationPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPaginatorAggegrate {
  avg: Float
  max: Float
  min: Float
  sum: Float
}

type CollectionStationPaginatorEdge {
  cursor: String
  node: CollectionStation
}

type CollectionPaginatorPageInfo {
  endCursor: String
  startCursor: String
  hasNextPage: Boolean!
  hasPrevPage: Boolean!
}

input CollectionSortConfig_station_StationSortFieldsType {
  field: CollectionStationSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionStationSortFields {
  _id
  _createdAt
  _updatedAt
  name
  _relation_image_data
  description
  tagline
  planning_roleId
  live_roleId
  arla_audio_channel
  arla_video_channel
  profiles_delete_after_days
  _relation_embedded_stations_data
}

enum CollectionPaginateSortDirection {
  DESC
  ASC
}

input CollectionStationFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  name: CollectionStringFilter
  _relation_image_data: CollectionIdFilter
  description: CollectionStringFilter
  tagline: CollectionStringFilter
  planning_roleId: CollectionIdFilter
  live_roleId: CollectionIdFilter
  _relation_embedded_stations_data: CollectionIdFilter
  _and: [CollectionStationFilters!]
  _or: [CollectionStationFilters!]
}

input CollectionMongoIdFilter {
  """Matches values that are equal to a specified value."""
  eq: ID

  """Matches all values that are not equal to a specified value."""
  ne: ID

  """Matches values that are greater than a specified value."""
  gt: ID

  """Matches values that are greater than or equal to a specified value."""
  gte: ID

  """Matches values that are less than a specified value."""
  lt: ID

  """Matches values that are less than or equal to a specified value."""
  lte: ID

  """Matches any of the values specified in an array."""
  in: [ID]

  """Matches none of the values specified in an array."""
  nin: [ID]
}

input CollectionDateTimeFilter {
  """Matches values that are equal to a specified value."""
  eq: DateTime

  """Matches all values that are not equal to a specified value."""
  ne: DateTime

  """Matches values that are greater than a specified value."""
  gt: DateTime

  """Matches values that are greater than or equal to a specified value."""
  gte: DateTime

  """Matches values that are less than a specified value."""
  lt: DateTime

  """Matches values that are less than or equal to a specified value."""
  lte: DateTime

  """Matches any of the values specified in an array."""
  in: [DateTime]

  """Matches none of the values specified in an array."""
  nin: [DateTime]
}

input CollectionStringFilter {
  """Matches values that are equal to a specified value."""
  eq: String

  """Matches all values that are not equal to a specified value."""
  ne: String

  """Matches values that are greater than a specified value."""
  gt: String

  """Matches values that are greater than or equal to a specified value."""
  gte: String

  """Matches values that are less than a specified value."""
  lt: String

  """Matches values that are less than or equal to a specified value."""
  lte: String

  """Matches any of the values specified in an array."""
  in: [String]

  """Matches none of the values specified in an array."""
  nin: [String]

  """Matches values compared to a regex"""
  regex: Regex
}

"""
Regex type in the graphql.
Validates if there is an valid regex inserted.
Internally the [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) regex is being used.
The value must be represented as a string.

# Examples
* To match all the \`foo\` insensitive you can insert \`"/foo/i"\`
* To match all the \`bar\` globally and case insensitive you can insert \`"/bar/gi"\`
"""
scalar Regex

input CollectionIdFilter {
  """Matches values that are equal to a specified value."""
  eq: ID

  """Matches all values that are not equal to a specified value."""
  ne: ID

  """Matches values that are greater than a specified value."""
  gt: ID

  """Matches values that are greater than or equal to a specified value."""
  gte: ID

  """Matches values that are less than a specified value."""
  lt: ID

  """Matches values that are less than or equal to a specified value."""
  lte: ID

  """Matches any of the values specified in an array."""
  in: [ID]

  """Matches none of the values specified in an array."""
  nin: [ID]
}

type CollectionStationMutation {
  """
  
  
  @Action
  """
  create(station: CollectionStationCreate!): CollectionStation

  """
  
  
  @Action
  """
  update(id: ID!, station: CollectionStationUpdate!): CollectionStation

  """
  
  
  @Action
  """
  upsert(id: ID, station: CollectionStationUpsert!): CollectionStation

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionStation

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionStation
}

input CollectionStationCreate {
  name: String
  _relation_image_data: ID
  description: String
  tagline: String
  planning_roleId: ID
  live_roleId: ID
  arla_audio_channel: Int
  arla_video_channel: Int
  profiles_delete_after_days: Int
  _relation_embedded_stations_data: [ID!]
}

input CollectionStationUpdate {
  name: String
  _relation_image_data: ID
  description: String
  tagline: String
  planning_roleId: ID
  live_roleId: ID
  arla_audio_channel: Int
  arla_video_channel: Int
  profiles_delete_after_days: Int
  _relation_embedded_stations_data: [ID!]
}

input CollectionStationUpsert {
  name: String
  _relation_image_data: ID
  description: String
  tagline: String
  planning_roleId: ID
  live_roleId: ID
  arla_audio_channel: Int
  arla_video_channel: Int
  profiles_delete_after_days: Int
  _relation_embedded_stations_data: [ID!]
}

type CollectionStationDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionStation
  newDocument: CollectionStation
}

enum CollectionMutateType {
  CREATE
  UPDATE
  DELETE
  RESTORE
}

type CollectionBroadcasterQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcaster

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionBroadcaster!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_broadcaster_BroadcasterSortFieldsType!]
    filters: CollectionBroadcasterFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcasterPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionBroadcasterPaginator!
}

type CollectionBroadcaster {
  _id: ID!
  title: String
  identifier: String
  description: String
  _relation_logo_data: ID
  _relation_visualradioLogo_data: ID
  groupId: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  logo(keyPath: String): String
  visualradioLogo(keyPath: String): String
}

type CollectionBroadcasterPaginator {
  totalCount: Int!
  edges: [CollectionBroadcasterPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionBroadcasterPaginatorEdge {
  cursor: String
  node: CollectionBroadcaster
}

input CollectionSortConfig_broadcaster_BroadcasterSortFieldsType {
  field: CollectionBroadcasterSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionBroadcasterSortFields {
  _id
  _createdAt
  _updatedAt
  title
  identifier
  description
  _relation_logo_data
  _relation_visualradioLogo_data
  groupId
}

input CollectionBroadcasterFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  identifier: CollectionStringFilter
  description: CollectionStringFilter
  _relation_logo_data: CollectionIdFilter
  _relation_visualradioLogo_data: CollectionIdFilter
  groupId: CollectionStringFilter
  _and: [CollectionBroadcasterFilters!]
  _or: [CollectionBroadcasterFilters!]
}

type CollectionBroadcasterMutation {
  """
  
  
  @Action
  """
  create(broadcaster: CollectionBroadcasterCreate!): CollectionBroadcaster

  """
  
  
  @Action
  """
  update(id: ID!, broadcaster: CollectionBroadcasterUpdate!): CollectionBroadcaster

  """
  
  
  @Action
  """
  upsert(id: ID, broadcaster: CollectionBroadcasterUpsert!): CollectionBroadcaster

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionBroadcaster

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionBroadcaster
}

input CollectionBroadcasterCreate {
  title: String
  identifier: String
  description: String
  _relation_logo_data: ID
  _relation_visualradioLogo_data: ID
  groupId: String
}

input CollectionBroadcasterUpdate {
  title: String
  identifier: String
  description: String
  _relation_logo_data: ID
  _relation_visualradioLogo_data: ID
  groupId: String
}

input CollectionBroadcasterUpsert {
  title: String
  identifier: String
  description: String
  _relation_logo_data: ID
  _relation_visualradioLogo_data: ID
  groupId: String
}

type CollectionBroadcasterDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionBroadcaster
  newDocument: CollectionBroadcaster
}

type CollectionPresenterQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPresenter

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionPresenter!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_presenter_PresenterSortFieldsType!]
    filters: CollectionPresenterFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPresenterPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionPresenterPaginator!
}

type CollectionPresenter {
  _id: ID!
  name: String
  _relation_image_data: ID
  introduction: String
  biografy: String
  contact: CollectionPresenter_contact
  socials: CollectionPresenter_socials
  _relation_broadcaster_data: ID
  _relation_station_data: ID
  publish_on_website: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  broadcaster(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcaster
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionPresenter_contact {
  email: String
}

type CollectionPresenter_socials {
  twitter: String
  facebook: String
  youtube: String
  instagram: String
  spotify: String
}

type CollectionPresenterPaginator {
  totalCount: Int!
  edges: [CollectionPresenterPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPresenterPaginatorEdge {
  cursor: String
  node: CollectionPresenter
}

input CollectionSortConfig_presenter_PresenterSortFieldsType {
  field: CollectionPresenterSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionPresenterSortFields {
  _id
  _createdAt
  _updatedAt
  name
  _relation_image_data
  introduction
  biografy
  contact
  socials
  _relation_broadcaster_data
  _relation_station_data
  publish_on_website
}

input CollectionPresenterFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  name: CollectionStringFilter
  _relation_image_data: CollectionIdFilter
  introduction: CollectionStringFilter
  biografy: CollectionStringFilter
  _relation_broadcaster_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionPresenterFilters!]
  _or: [CollectionPresenterFilters!]
}

type CollectionPresenterMutation {
  """
  
  
  @Action
  """
  create(presenter: CollectionPresenterCreate!): CollectionPresenter

  """
  
  
  @Action
  """
  update(id: ID!, presenter: CollectionPresenterUpdate!): CollectionPresenter

  """
  
  
  @Action
  """
  upsert(id: ID, presenter: CollectionPresenterUpsert!): CollectionPresenter

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionPresenter

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionPresenter
}

input CollectionPresenterCreate {
  name: String
  _relation_image_data: ID
  introduction: String
  biografy: String
  contact: CollectionPresenterInput_contact
  socials: CollectionPresenterInput_socials
  _relation_broadcaster_data: ID
  _relation_station_data: ID
  publish_on_website: Boolean
}

input CollectionPresenterInput_contact {
  email: String
}

input CollectionPresenterInput_socials {
  twitter: String
  facebook: String
  youtube: String
  instagram: String
  spotify: String
}

input CollectionPresenterUpdate {
  name: String
  _relation_image_data: ID
  introduction: String
  biografy: String
  contact: CollectionPresenterInput_contact
  socials: CollectionPresenterInput_socials
  _relation_broadcaster_data: ID
  _relation_station_data: ID
  publish_on_website: Boolean
}

input CollectionPresenterUpsert {
  name: String
  _relation_image_data: ID
  introduction: String
  biografy: String
  contact: CollectionPresenterInput_contact
  socials: CollectionPresenterInput_socials
  _relation_broadcaster_data: ID
  _relation_station_data: ID
  publish_on_website: Boolean
}

type CollectionPresenterDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionPresenter
  newDocument: CollectionPresenter
}

type CollectionProgramQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgram

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionProgram!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_program_ProgramSortFieldsType!]
    filters: CollectionProgramFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgramPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionProgramPaginator!
}

type CollectionProgram {
  _id: ID!
  title: String
  _relation_presenters_data: [ID!]
  _relation_image_data: ID
  introduction: String
  description: String
  contact: CollectionProgram_contact
  SRID: String
  _relation_station_data: ID
  _relation_broadcasters_data: [ID!]
  show_in_overviews: Boolean
  on_demand: Boolean
  publish_as_podcast: Boolean
  publish_as_live: Boolean
  status: CollectionProgram_status
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  presenters(ids: [ID!]): [CollectionPresenter]
  broadcasts(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_broadcast_BroadcastSortFieldsType!]
    filters: CollectionBroadcastFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcastPaginator
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  broadcasters(ids: [ID!]): [CollectionBroadcaster]
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionProgram_contact {
  email: String
  phone: String
  webpage: String
  socials: CollectionProgram_contact_socials
}

type CollectionProgram_contact_socials {
  twitter: String
  instagram: String
  spotify: String
  facebook: String
  youtube: String
}

enum CollectionProgram_status {
  draft
  published
  archived
}

type CollectionProgramPaginator {
  totalCount: Int!
  edges: [CollectionProgramPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionProgramPaginatorEdge {
  cursor: String
  node: CollectionProgram
}

input CollectionSortConfig_program_ProgramSortFieldsType {
  field: CollectionProgramSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionProgramSortFields {
  _id
  _createdAt
  _updatedAt
  title
  _relation_presenters_data
  _relation_image_data
  introduction
  description
  contact
  SRID
  _relation_station_data
  _relation_broadcasters_data
  show_in_overviews
  on_demand
  publish_as_podcast
  publish_as_live
  status
}

input CollectionProgramFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  _relation_presenters_data: CollectionIdFilter
  _relation_image_data: CollectionIdFilter
  introduction: CollectionStringFilter
  description: CollectionStringFilter
  SRID: CollectionStringFilter
  _relation_station_data: CollectionIdFilter
  _relation_broadcasters_data: CollectionIdFilter
  status: CollectionProgram_statusEnumFilter
  _and: [CollectionProgramFilters!]
  _or: [CollectionProgramFilters!]
}

input CollectionProgram_statusEnumFilter {
  """Matches values that are equal to a specified value."""
  eq: CollectionProgram_status

  """Matches all values that are not equal to a specified value."""
  ne: CollectionProgram_status

  """Matches values that are greater than a specified value."""
  gt: CollectionProgram_status

  """Matches values that are greater than or equal to a specified value."""
  gte: CollectionProgram_status

  """Matches values that are less than a specified value."""
  lt: CollectionProgram_status

  """Matches values that are less than or equal to a specified value."""
  lte: CollectionProgram_status

  """Matches any of the values specified in an array."""
  in: [CollectionProgram_status]

  """Matches none of the values specified in an array."""
  nin: [CollectionProgram_status]
}

type CollectionProgramMutation {
  """
  
  
  @Action
  """
  create(program: CollectionProgramCreate!): CollectionProgram

  """
  
  
  @Action
  """
  update(id: ID!, program: CollectionProgramUpdate!): CollectionProgram

  """
  
  
  @Action
  """
  upsert(id: ID, program: CollectionProgramUpsert!): CollectionProgram

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionProgram

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionProgram
}

input CollectionProgramCreate {
  title: String
  _relation_presenters_data: [ID!]
  _relation_image_data: ID
  introduction: String
  description: String
  contact: CollectionProgramInput_contact
  SRID: String
  _relation_station_data: ID
  _relation_broadcasters_data: [ID!]
  show_in_overviews: Boolean
  on_demand: Boolean
  publish_as_podcast: Boolean
  publish_as_live: Boolean
  status: CollectionProgram_status
}

input CollectionProgramInput_contact {
  email: String
  phone: String
  webpage: String
  socials: CollectionProgramInput_contact_socials
}

input CollectionProgramInput_contact_socials {
  twitter: String
  instagram: String
  spotify: String
  facebook: String
  youtube: String
}

input CollectionProgramUpdate {
  title: String
  _relation_presenters_data: [ID!]
  _relation_image_data: ID
  introduction: String
  description: String
  contact: CollectionProgramInput_contact
  SRID: String
  _relation_station_data: ID
  _relation_broadcasters_data: [ID!]
  show_in_overviews: Boolean
  on_demand: Boolean
  publish_as_podcast: Boolean
  publish_as_live: Boolean
  status: CollectionProgram_status
}

input CollectionProgramUpsert {
  title: String
  _relation_presenters_data: [ID!]
  _relation_image_data: ID
  introduction: String
  description: String
  contact: CollectionProgramInput_contact
  SRID: String
  _relation_station_data: ID
  _relation_broadcasters_data: [ID!]
  show_in_overviews: Boolean
  on_demand: Boolean
  publish_as_podcast: Boolean
  publish_as_live: Boolean
  status: CollectionProgram_status
}

type CollectionProgramDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionProgram
  newDocument: CollectionProgram
}

type CollectionItemQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionItem

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionItem!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_item_ItemSortFieldsType!]
    filters: CollectionItemFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionItemPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionItemPaginator!
}

type CollectionItem {
  _id: ID!
  title: String
  MMID: String
  artist: String
  _relation_contact_data: ID
  description: String
  prevId: ID
  planned_start: DateTime
  actual_start: DateTime
  duration: Int
  body: String
  notes: String
  _relation_podcastEpisode_data: ID
  _relation_broadcast_data: ID
  _relation_prize_data: ID
  type: CollectionItem_type
  _relation_image_data: ID
  _relation_video_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  broadcast(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcast
  podcastEpisode(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcast_episode
  contact(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContact
  prize(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPrize
}

enum CollectionItem_type {
  song
  track
  jingle
  talk
  message
  contest
  contact
  visual_radio
  video_asset
}

type CollectionItemPaginator {
  aggregate_duration: CollectionPaginatorAggegrate!
  totalCount: Int!
  edges: [CollectionItemPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionItemPaginatorEdge {
  cursor: String
  node: CollectionItem
}

input CollectionSortConfig_item_ItemSortFieldsType {
  field: CollectionItemSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionItemSortFields {
  _id
  _createdAt
  _updatedAt
  title
  MMID
  artist
  _relation_contact_data
  description
  prevId
  planned_start
  actual_start
  duration
  body
  notes
  _relation_podcastEpisode_data
  _relation_broadcast_data
  _relation_prize_data
  type
  _relation_image_data
  _relation_video_data
}

input CollectionItemFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  MMID: CollectionStringFilter
  artist: CollectionStringFilter
  _relation_contact_data: CollectionIdFilter
  description: CollectionStringFilter
  prevId: CollectionIdFilter
  planned_start: CollectionDateTimeFilter
  duration: CollectionIntegerFilter
  body: CollectionStringFilter
  notes: CollectionStringFilter
  _relation_podcastEpisode_data: CollectionIdFilter
  _relation_broadcast_data: CollectionIdFilter
  _relation_prize_data: CollectionIdFilter
  type: CollectionItem_typeEnumFilter
  _relation_image_data: CollectionIdFilter
  _relation_video_data: CollectionIdFilter
  _and: [CollectionItemFilters!]
  _or: [CollectionItemFilters!]
}

input CollectionIntegerFilter {
  """Matches values that are equal to a specified value."""
  eq: Int

  """Matches all values that are not equal to a specified value."""
  ne: Int

  """Matches values that are greater than a specified value."""
  gt: Int

  """Matches values that are greater than or equal to a specified value."""
  gte: Int

  """Matches values that are less than a specified value."""
  lt: Int

  """Matches values that are less than or equal to a specified value."""
  lte: Int

  """Matches any of the values specified in an array."""
  in: [Int]

  """Matches none of the values specified in an array."""
  nin: [Int]
}

input CollectionItem_typeEnumFilter {
  """Matches values that are equal to a specified value."""
  eq: CollectionItem_type

  """Matches all values that are not equal to a specified value."""
  ne: CollectionItem_type

  """Matches values that are greater than a specified value."""
  gt: CollectionItem_type

  """Matches values that are greater than or equal to a specified value."""
  gte: CollectionItem_type

  """Matches values that are less than a specified value."""
  lt: CollectionItem_type

  """Matches values that are less than or equal to a specified value."""
  lte: CollectionItem_type

  """Matches any of the values specified in an array."""
  in: [CollectionItem_type]

  """Matches none of the values specified in an array."""
  nin: [CollectionItem_type]
}

type CollectionItemMutation {
  """
  
  
  @Action
  """
  create(item: CollectionItemCreate!): CollectionItem

  """
  
  
  @Action
  """
  update(id: ID!, item: CollectionItemUpdate!): CollectionItem

  """
  
  
  @Action
  """
  upsert(id: ID, item: CollectionItemUpsert!): CollectionItem

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionItem

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionItem
}

input CollectionItemCreate {
  title: String
  MMID: String
  artist: String
  _relation_contact_data: ID
  description: String
  prevId: ID
  planned_start: DateTime
  actual_start: DateTime
  duration: Int
  body: String
  notes: String
  _relation_podcastEpisode_data: ID
  _relation_broadcast_data: ID
  _relation_prize_data: ID
  type: CollectionItem_type
  _relation_image_data: ID
  _relation_video_data: ID
}

input CollectionItemUpdate {
  title: String
  MMID: String
  artist: String
  _relation_contact_data: ID
  description: String
  prevId: ID
  planned_start: DateTime
  actual_start: DateTime
  duration: Int
  body: String
  notes: String
  _relation_podcastEpisode_data: ID
  _relation_broadcast_data: ID
  _relation_prize_data: ID
  type: CollectionItem_type
  _relation_image_data: ID
  _relation_video_data: ID
}

input CollectionItemUpsert {
  title: String
  MMID: String
  artist: String
  _relation_contact_data: ID
  description: String
  prevId: ID
  planned_start: DateTime
  actual_start: DateTime
  duration: Int
  body: String
  notes: String
  _relation_podcastEpisode_data: ID
  _relation_broadcast_data: ID
  _relation_prize_data: ID
  type: CollectionItem_type
  _relation_image_data: ID
  _relation_video_data: ID
}

type CollectionItemDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionItem
  newDocument: CollectionItem
}

type CollectionProfileQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProfile

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionProfile!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_profile_ProfileSortFieldsType!]
    filters: CollectionProfileFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProfilePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionProfilePaginator!
}

type CollectionProfile {
  _id: ID!
  npoId: String
  firstName: String
  lastName: String
  address: String
  postalcode: String
  city: String
  email: String
  phone: String
  _relation_prizes_data: [ID!]
  excluded_until: DateTime
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  messages(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_message_MessageSortFieldsType!]
    filters: CollectionMessageFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMessagePaginator
  prizes(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_prize_PrizeSortFieldsType!]
    filters: CollectionPrizeFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPrizePaginator
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionProfilePaginator {
  totalCount: Int!
  edges: [CollectionProfilePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionProfilePaginatorEdge {
  cursor: String
  node: CollectionProfile
}

input CollectionSortConfig_profile_ProfileSortFieldsType {
  field: CollectionProfileSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionProfileSortFields {
  _id
  _createdAt
  _updatedAt
  npoId
  firstName
  lastName
  address
  postalcode
  city
  email
  phone
  _relation_prizes_data
  excluded_until
  _relation_station_data
}

input CollectionProfileFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  npoId: CollectionStringFilter
  firstName: CollectionStringFilter
  lastName: CollectionStringFilter
  address: CollectionStringFilter
  postalcode: CollectionStringFilter
  city: CollectionStringFilter
  email: CollectionStringFilter
  phone: CollectionStringFilter
  _relation_prizes_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionProfileFilters!]
  _or: [CollectionProfileFilters!]
}

type CollectionProfileMutation {
  """
  
  
  @Action
  """
  create(profile: CollectionProfileCreate!): CollectionProfile

  """
  
  
  @Action
  """
  update(id: ID!, profile: CollectionProfileUpdate!): CollectionProfile

  """
  
  
  @Action
  """
  upsert(id: ID, profile: CollectionProfileUpsert!): CollectionProfile

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionProfile

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionProfile
}

input CollectionProfileCreate {
  npoId: String
  firstName: String
  lastName: String
  address: String
  postalcode: String
  city: String
  email: String
  phone: String
  _relation_prizes_data: [ID!]
  excluded_until: DateTime
  _relation_station_data: ID
}

input CollectionProfileUpdate {
  npoId: String
  firstName: String
  lastName: String
  address: String
  postalcode: String
  city: String
  email: String
  phone: String
  _relation_prizes_data: [ID!]
  excluded_until: DateTime
  _relation_station_data: ID
}

input CollectionProfileUpsert {
  npoId: String
  firstName: String
  lastName: String
  address: String
  postalcode: String
  city: String
  email: String
  phone: String
  _relation_prizes_data: [ID!]
  excluded_until: DateTime
  _relation_station_data: ID
}

type CollectionProfileDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionProfile
  newDocument: CollectionProfile
}

type CollectionContestQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContest

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionContest!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_contest_ContestSortFieldsType!]
    filters: CollectionContestFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContestPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionContestPaginator!
}

type CollectionContest {
  _id: ID!
  title: String
  _relation_programs_data: [ID!]
  description: String
  start: DateTime
  stop: DateTime
  text_for_winners: String
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  programs(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_program_ProgramSortFieldsType!]
    filters: CollectionProgramFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgramPaginator
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionContestPaginator {
  totalCount: Int!
  edges: [CollectionContestPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionContestPaginatorEdge {
  cursor: String
  node: CollectionContest
}

input CollectionSortConfig_contest_ContestSortFieldsType {
  field: CollectionContestSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionContestSortFields {
  _id
  _createdAt
  _updatedAt
  title
  _relation_programs_data
  description
  start
  stop
  text_for_winners
  _relation_station_data
}

input CollectionContestFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  _relation_programs_data: CollectionIdFilter
  description: CollectionStringFilter
  start: CollectionDateTimeFilter
  stop: CollectionDateTimeFilter
  text_for_winners: CollectionStringFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionContestFilters!]
  _or: [CollectionContestFilters!]
}

type CollectionContestMutation {
  """
  
  
  @Action
  """
  create(contest: CollectionContestCreate!): CollectionContest

  """
  
  
  @Action
  """
  update(id: ID!, contest: CollectionContestUpdate!): CollectionContest

  """
  
  
  @Action
  """
  upsert(id: ID, contest: CollectionContestUpsert!): CollectionContest

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionContest

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionContest
}

input CollectionContestCreate {
  title: String
  _relation_programs_data: [ID!]
  description: String
  start: DateTime
  stop: DateTime
  text_for_winners: String
  _relation_station_data: ID
}

input CollectionContestUpdate {
  title: String
  _relation_programs_data: [ID!]
  description: String
  start: DateTime
  stop: DateTime
  text_for_winners: String
  _relation_station_data: ID
}

input CollectionContestUpsert {
  title: String
  _relation_programs_data: [ID!]
  description: String
  start: DateTime
  stop: DateTime
  text_for_winners: String
  _relation_station_data: ID
}

type CollectionContestDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionContest
  newDocument: CollectionContest
}

type CollectionContactQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContact

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionContact!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_contact_ContactSortFieldsType!]
    filters: CollectionContactFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContactPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionContactPaginator!
}

type CollectionContact {
  _id: ID!
  firstName: String
  lastName: String
  expertise: String
  description: String
  _relation_image_data: ID
  caption: String
  contact: CollectionContact_contact
  socials: CollectionContact_socials
  id: String
  _relation_broadcaster_data: ID
  _relation_program_data: ID
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  broadcaster(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcaster
  program(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgram
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionContact_contact {
  telephone: String
  email: String
}

type CollectionContact_socials {
  facebook: String
  twitter: String
  instagram: String
  youtube: String
  spotify: String
  linkedin: String
}

type CollectionContactPaginator {
  totalCount: Int!
  edges: [CollectionContactPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionContactPaginatorEdge {
  cursor: String
  node: CollectionContact
}

input CollectionSortConfig_contact_ContactSortFieldsType {
  field: CollectionContactSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionContactSortFields {
  _id
  _createdAt
  _updatedAt
  firstName
  lastName
  expertise
  description
  _relation_image_data
  caption
  contact
  socials
  id
  _relation_broadcaster_data
  _relation_program_data
  _relation_station_data
}

input CollectionContactFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  firstName: CollectionStringFilter
  lastName: CollectionStringFilter
  expertise: CollectionStringFilter
  description: CollectionStringFilter
  _relation_image_data: CollectionIdFilter
  caption: CollectionStringFilter
  id: CollectionStringFilter
  _relation_broadcaster_data: CollectionIdFilter
  _relation_program_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionContactFilters!]
  _or: [CollectionContactFilters!]
}

type CollectionContactMutation {
  """
  
  
  @Action
  """
  create(contact: CollectionContactCreate!): CollectionContact

  """
  
  
  @Action
  """
  update(id: ID!, contact: CollectionContactUpdate!): CollectionContact

  """
  
  
  @Action
  """
  upsert(id: ID, contact: CollectionContactUpsert!): CollectionContact

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionContact

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionContact
}

input CollectionContactCreate {
  firstName: String
  lastName: String
  expertise: String
  description: String
  _relation_image_data: ID
  caption: String
  contact: CollectionContactInput_contact
  socials: CollectionContactInput_socials
  id: String
  _relation_broadcaster_data: ID
  _relation_program_data: ID
  _relation_station_data: ID
}

input CollectionContactInput_contact {
  telephone: String
  email: String
}

input CollectionContactInput_socials {
  facebook: String
  twitter: String
  instagram: String
  youtube: String
  spotify: String
  linkedin: String
}

input CollectionContactUpdate {
  firstName: String
  lastName: String
  expertise: String
  description: String
  _relation_image_data: ID
  caption: String
  contact: CollectionContactInput_contact
  socials: CollectionContactInput_socials
  id: String
  _relation_broadcaster_data: ID
  _relation_program_data: ID
  _relation_station_data: ID
}

input CollectionContactUpsert {
  firstName: String
  lastName: String
  expertise: String
  description: String
  _relation_image_data: ID
  caption: String
  contact: CollectionContactInput_contact
  socials: CollectionContactInput_socials
  id: String
  _relation_broadcaster_data: ID
  _relation_program_data: ID
  _relation_station_data: ID
}

type CollectionContactDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionContact
  newDocument: CollectionContact
}

type CollectionArticleQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionArticle

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionArticle!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_article_ArticleSortFieldsType!]
    filters: CollectionArticleFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionArticlePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionArticlePaginator!
}

type CollectionArticle {
  _id: ID!
  title: String
  content: String
  _relation_cover_image_data: ID
  PRID: String
  publication_date: DateTime
  unpublication_date: DateTime
  creator: String
  published: Boolean
  _relation_station_data: ID
  _relation_program_data: ID
  _relation_broadcast_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  program(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgram
  broadcast(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcast
  cover_image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionArticlePaginator {
  totalCount: Int!
  edges: [CollectionArticlePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionArticlePaginatorEdge {
  cursor: String
  node: CollectionArticle
}

input CollectionSortConfig_article_ArticleSortFieldsType {
  field: CollectionArticleSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionArticleSortFields {
  _id
  _createdAt
  _updatedAt
  title
  content
  _relation_cover_image_data
  PRID
  publication_date
  unpublication_date
  creator
  published
  _relation_station_data
  _relation_program_data
  _relation_broadcast_data
}

input CollectionArticleFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  _relation_cover_image_data: CollectionIdFilter
  PRID: CollectionStringFilter
  publication_date: CollectionDateTimeFilter
  unpublication_date: CollectionDateTimeFilter
  creator: CollectionStringFilter
  published: CollectionBooleanFilter
  _relation_station_data: CollectionIdFilter
  _relation_program_data: CollectionIdFilter
  _relation_broadcast_data: CollectionIdFilter
  _and: [CollectionArticleFilters!]
  _or: [CollectionArticleFilters!]
}

input CollectionBooleanFilter {
  """Matches values that are equal to a specified value."""
  eq: Boolean

  """Matches all values that are not equal to a specified value."""
  ne: Boolean

  """Matches values that are greater than a specified value."""
  gt: Boolean

  """Matches values that are greater than or equal to a specified value."""
  gte: Boolean

  """Matches values that are less than a specified value."""
  lt: Boolean

  """Matches values that are less than or equal to a specified value."""
  lte: Boolean

  """Matches any of the values specified in an array."""
  in: [Boolean]

  """Matches none of the values specified in an array."""
  nin: [Boolean]
}

type CollectionArticleMutation {
  """
  
  
  @Action
  """
  create(article: CollectionArticleCreate!): CollectionArticle

  """
  
  
  @Action
  """
  update(id: ID!, article: CollectionArticleUpdate!): CollectionArticle

  """
  
  
  @Action
  """
  upsert(id: ID, article: CollectionArticleUpsert!): CollectionArticle

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionArticle

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionArticle
}

input CollectionArticleCreate {
  title: String
  content: String
  _relation_cover_image_data: ID
  PRID: String
  publication_date: DateTime
  unpublication_date: DateTime
  creator: String
  published: Boolean
  _relation_station_data: ID
  _relation_program_data: ID
  _relation_broadcast_data: ID
}

input CollectionArticleUpdate {
  title: String
  content: String
  _relation_cover_image_data: ID
  PRID: String
  publication_date: DateTime
  unpublication_date: DateTime
  creator: String
  published: Boolean
  _relation_station_data: ID
  _relation_program_data: ID
  _relation_broadcast_data: ID
}

input CollectionArticleUpsert {
  title: String
  content: String
  _relation_cover_image_data: ID
  PRID: String
  publication_date: DateTime
  unpublication_date: DateTime
  creator: String
  published: Boolean
  _relation_station_data: ID
  _relation_program_data: ID
  _relation_broadcast_data: ID
}

type CollectionArticleDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionArticle
  newDocument: CollectionArticle
}

type CollectionBroadcastQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcast

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionBroadcast!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_broadcast_BroadcastSortFieldsType!]
    filters: CollectionBroadcastFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcastPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionBroadcastPaginator!
}

type CollectionBroadcast {
  _id: ID!
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: CollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  program(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProgram
  presenters(ids: [ID!]): [CollectionPresenter]
  repetition(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionRepetition
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  broadcasters(ids: [ID!]): [CollectionBroadcaster]
  embedded_broadcasts(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_broadcast_BroadcastSortFieldsType!]
    filters: CollectionBroadcastFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcastPaginator
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
  clocks(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_clock_ClockSortFieldsType!]
    filters: CollectionClockFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionClockPaginator
}

enum CollectionBroadcast_nibg_status {
  todo
  processing
  processed
  failed
}

type CollectionBroadcastPaginator {
  totalCount: Int!
  edges: [CollectionBroadcastPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionBroadcastPaginatorEdge {
  cursor: String
  node: CollectionBroadcast
}

input CollectionSortConfig_broadcast_BroadcastSortFieldsType {
  field: CollectionBroadcastSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionBroadcastSortFields {
  _id
  _createdAt
  _updatedAt
  title
  _relation_program_data
  _relation_repetition_data
  start
  stop
  PRID
  description
  introduction
  _relation_image_data
  _relation_broadcasters_data
  _relation_presenters_data
  _relation_station_data
  nibg_status
  publish_as_podcast
  publish_as_ondemand
  _relation_clocks_data
  embedded_station_id
}

input CollectionBroadcastFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  _relation_program_data: CollectionIdFilter
  _relation_repetition_data: CollectionIdFilter
  start: CollectionDateTimeFilter
  stop: CollectionDateTimeFilter
  PRID: CollectionStringFilter
  description: CollectionStringFilter
  introduction: CollectionStringFilter
  _relation_image_data: CollectionIdFilter
  _relation_broadcasters_data: CollectionIdFilter
  _relation_presenters_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _relation_clocks_data: CollectionIdFilter
  embedded_station_id: CollectionIdFilter
  _and: [CollectionBroadcastFilters!]
  _or: [CollectionBroadcastFilters!]
}

type CollectionBroadcastMutation {
  """
  
  
  @Action
  """
  create(broadcast: CollectionBroadcastCreate!): CollectionBroadcast

  """
  
  
  @Action
  """
  update(id: ID!, broadcast: CollectionBroadcastUpdate!): CollectionBroadcast

  """
  
  
  @Action
  """
  upsert(id: ID, broadcast: CollectionBroadcastUpsert!): CollectionBroadcast

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionBroadcast

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionBroadcast
}

input CollectionBroadcastCreate {
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: CollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
}

input CollectionBroadcastUpdate {
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: CollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
}

input CollectionBroadcastUpsert {
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: CollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
}

type CollectionBroadcastDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionBroadcast
  newDocument: CollectionBroadcast
}

type CollectionFragmentQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionFragment

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionFragment!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_fragment_FragmentSortFieldsType!]
    filters: CollectionFragmentFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionFragmentPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionFragmentPaginator!
}

type CollectionFragment {
  _id: ID!
  title: String
  start: DateTime
  stop: DateTime
  video: Boolean
  audio: Boolean
  _relation_station_data: ID
  broadcastDate: DateTime
  _relation_broadcast_data: ID
  MID: String
  _relation_thumbnail_data: ID
  link: String
  prerollId: Int
  postrollId: Int
  thumbnailUrl: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  broadcast(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcast
  thumbnail(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionFragmentPaginator {
  aggregate_prerollId: CollectionPaginatorAggegrate!
  aggregate_postrollId: CollectionPaginatorAggegrate!
  totalCount: Int!
  edges: [CollectionFragmentPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionFragmentPaginatorEdge {
  cursor: String
  node: CollectionFragment
}

input CollectionSortConfig_fragment_FragmentSortFieldsType {
  field: CollectionFragmentSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionFragmentSortFields {
  _id
  _createdAt
  _updatedAt
  title
  start
  stop
  video
  audio
  _relation_station_data
  broadcastDate
  _relation_broadcast_data
  MID
  _relation_thumbnail_data
  link
  prerollId
  postrollId
  thumbnailUrl
}

input CollectionFragmentFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  _relation_station_data: CollectionIdFilter
  _relation_broadcast_data: CollectionIdFilter
  MID: CollectionStringFilter
  _relation_thumbnail_data: CollectionIdFilter
  _and: [CollectionFragmentFilters!]
  _or: [CollectionFragmentFilters!]
}

type CollectionFragmentMutation {
  """
  
  
  @Action
  """
  create(fragment: CollectionFragmentCreate!): CollectionFragment

  """
  
  
  @Action
  """
  update(id: ID!, fragment: CollectionFragmentUpdate!): CollectionFragment

  """
  
  
  @Action
  """
  upsert(id: ID, fragment: CollectionFragmentUpsert!): CollectionFragment

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionFragment

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionFragment
}

input CollectionFragmentCreate {
  title: String
  start: DateTime
  stop: DateTime
  video: Boolean
  audio: Boolean
  _relation_station_data: ID
  broadcastDate: DateTime
  _relation_broadcast_data: ID
  MID: String
  _relation_thumbnail_data: ID
  link: String
  prerollId: Int
  postrollId: Int
  thumbnailUrl: String
}

input CollectionFragmentUpdate {
  title: String
  start: DateTime
  stop: DateTime
  video: Boolean
  audio: Boolean
  _relation_station_data: ID
  broadcastDate: DateTime
  _relation_broadcast_data: ID
  MID: String
  _relation_thumbnail_data: ID
  link: String
  prerollId: Int
  postrollId: Int
  thumbnailUrl: String
}

input CollectionFragmentUpsert {
  title: String
  start: DateTime
  stop: DateTime
  video: Boolean
  audio: Boolean
  _relation_station_data: ID
  broadcastDate: DateTime
  _relation_broadcast_data: ID
  MID: String
  _relation_thumbnail_data: ID
  link: String
  prerollId: Int
  postrollId: Int
  thumbnailUrl: String
}

type CollectionFragmentDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionFragment
  newDocument: CollectionFragment
}

type CollectionRepetitionQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionRepetition

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionRepetition!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_repetition_RepetitionSortFieldsType!]
    filters: CollectionRepetitionFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionRepetitionPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionRepetitionPaginator!
}

type CollectionRepetition {
  _id: ID!
  interval: CollectionRepetition_interval
  days: [Int!]
  start: DateTime
  stop: DateTime
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
}

enum CollectionRepetition_interval {
  weekly
  biweekly
}

type CollectionRepetitionPaginator {
  totalCount: Int!
  edges: [CollectionRepetitionPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionRepetitionPaginatorEdge {
  cursor: String
  node: CollectionRepetition
}

input CollectionSortConfig_repetition_RepetitionSortFieldsType {
  field: CollectionRepetitionSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionRepetitionSortFields {
  _id
  _createdAt
  _updatedAt
  interval
  days
  start
  stop
}

input CollectionRepetitionFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _and: [CollectionRepetitionFilters!]
  _or: [CollectionRepetitionFilters!]
}

type CollectionRepetitionMutation {
  """
  
  
  @Action
  """
  create(repetition: CollectionRepetitionCreate!): CollectionRepetition

  """
  
  
  @Action
  """
  update(id: ID!, repetition: CollectionRepetitionUpdate!): CollectionRepetition

  """
  
  
  @Action
  """
  upsert(id: ID, repetition: CollectionRepetitionUpsert!): CollectionRepetition

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionRepetition

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionRepetition
}

input CollectionRepetitionCreate {
  interval: CollectionRepetition_interval
  days: [Int!]
  start: DateTime
  stop: DateTime
}

input CollectionRepetitionUpdate {
  interval: CollectionRepetition_interval
  days: [Int!]
  start: DateTime
  stop: DateTime
}

input CollectionRepetitionUpsert {
  interval: CollectionRepetition_interval
  days: [Int!]
  start: DateTime
  stop: DateTime
}

type CollectionRepetitionDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionRepetition
  newDocument: CollectionRepetition
}

type CollectionImagefileQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImagefile

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionImagefile!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_imagefile_ImagefileSortFieldsType!]
    filters: CollectionImagefileFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImagefilePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionImagefilePaginator!
}

type CollectionImagefile {
  _id: ID!
  file_name: String
  description: String
  source: String
  cutouts: String
  _relation_location_data: ID
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  location(keyPath: String): String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionImagefilePaginator {
  totalCount: Int!
  edges: [CollectionImagefilePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionImagefilePaginatorEdge {
  cursor: String
  node: CollectionImagefile
}

input CollectionSortConfig_imagefile_ImagefileSortFieldsType {
  field: CollectionImagefileSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionImagefileSortFields {
  _id
  _createdAt
  _updatedAt
  file_name
  description
  source
  cutouts
  _relation_location_data
  _relation_station_data
}

input CollectionImagefileFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  file_name: CollectionStringFilter
  _relation_location_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionImagefileFilters!]
  _or: [CollectionImagefileFilters!]
}

type CollectionImagefileMutation {
  """
  
  
  @Action
  """
  create(imagefile: CollectionImagefileCreate!): CollectionImagefile

  """
  
  
  @Action
  """
  update(id: ID!, imagefile: CollectionImagefileUpdate!): CollectionImagefile

  """
  
  
  @Action
  """
  upsert(id: ID, imagefile: CollectionImagefileUpsert!): CollectionImagefile

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionImagefile

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionImagefile
}

input CollectionImagefileCreate {
  file_name: String
  description: String
  source: String
  cutouts: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionImagefileUpdate {
  file_name: String
  description: String
  source: String
  cutouts: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionImagefileUpsert {
  file_name: String
  description: String
  source: String
  cutouts: String
  _relation_location_data: ID
  _relation_station_data: ID
}

type CollectionImagefileDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionImagefile
  newDocument: CollectionImagefile
}

type CollectionAudiofileQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionAudiofile

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionAudiofile!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_audiofile_AudiofileSortFieldsType!]
    filters: CollectionAudiofileFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionAudiofilePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionAudiofilePaginator!
}

type CollectionAudiofile {
  _id: ID!
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  location(keyPath: String): String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionAudiofilePaginator {
  totalCount: Int!
  edges: [CollectionAudiofilePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionAudiofilePaginatorEdge {
  cursor: String
  node: CollectionAudiofile
}

input CollectionSortConfig_audiofile_AudiofileSortFieldsType {
  field: CollectionAudiofileSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionAudiofileSortFields {
  _id
  _createdAt
  _updatedAt
  file_name
  description
  source
  _relation_location_data
  _relation_station_data
}

input CollectionAudiofileFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  file_name: CollectionStringFilter
  _relation_location_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionAudiofileFilters!]
  _or: [CollectionAudiofileFilters!]
}

type CollectionAudiofileMutation {
  """
  
  
  @Action
  """
  create(audiofile: CollectionAudiofileCreate!): CollectionAudiofile

  """
  
  
  @Action
  """
  update(id: ID!, audiofile: CollectionAudiofileUpdate!): CollectionAudiofile

  """
  
  
  @Action
  """
  upsert(id: ID, audiofile: CollectionAudiofileUpsert!): CollectionAudiofile

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionAudiofile

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionAudiofile
}

input CollectionAudiofileCreate {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionAudiofileUpdate {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionAudiofileUpsert {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

type CollectionAudiofileDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionAudiofile
  newDocument: CollectionAudiofile
}

type CollectionVideofileQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionVideofile

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionVideofile!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_videofile_VideofileSortFieldsType!]
    filters: CollectionVideofileFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionVideofilePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionVideofilePaginator!
}

type CollectionVideofile {
  _id: ID!
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_thumbnail_location_data: ID
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  location(keyPath: String): String
  thumbnail_location(keyPath: String): String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionVideofilePaginator {
  totalCount: Int!
  edges: [CollectionVideofilePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionVideofilePaginatorEdge {
  cursor: String
  node: CollectionVideofile
}

input CollectionSortConfig_videofile_VideofileSortFieldsType {
  field: CollectionVideofileSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionVideofileSortFields {
  _id
  _createdAt
  _updatedAt
  file_name
  description
  source
  _relation_location_data
  _relation_thumbnail_location_data
  _relation_station_data
}

input CollectionVideofileFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  file_name: CollectionStringFilter
  _relation_location_data: CollectionIdFilter
  _relation_thumbnail_location_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionVideofileFilters!]
  _or: [CollectionVideofileFilters!]
}

type CollectionVideofileMutation {
  """
  
  
  @Action
  """
  create(videofile: CollectionVideofileCreate!): CollectionVideofile

  """
  
  
  @Action
  """
  update(id: ID!, videofile: CollectionVideofileUpdate!): CollectionVideofile

  """
  
  
  @Action
  """
  upsert(id: ID, videofile: CollectionVideofileUpsert!): CollectionVideofile

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionVideofile

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionVideofile
}

input CollectionVideofileCreate {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_thumbnail_location_data: ID
  _relation_station_data: ID
}

input CollectionVideofileUpdate {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_thumbnail_location_data: ID
  _relation_station_data: ID
}

input CollectionVideofileUpsert {
  file_name: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_thumbnail_location_data: ID
  _relation_station_data: ID
}

type CollectionVideofileDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionVideofile
  newDocument: CollectionVideofile
}

type CollectionPdffileQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPdffile

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionPdffile!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_pdffile_PdffileSortFieldsType!]
    filters: CollectionPdffileFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPdffilePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionPdffilePaginator!
}

type CollectionPdffile {
  _id: ID!
  file_name: String
  title: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  location(keyPath: String): String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionPdffilePaginator {
  totalCount: Int!
  edges: [CollectionPdffilePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPdffilePaginatorEdge {
  cursor: String
  node: CollectionPdffile
}

input CollectionSortConfig_pdffile_PdffileSortFieldsType {
  field: CollectionPdffileSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionPdffileSortFields {
  _id
  _createdAt
  _updatedAt
  file_name
  title
  description
  source
  _relation_location_data
  _relation_station_data
}

input CollectionPdffileFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  file_name: CollectionStringFilter
  _relation_location_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionPdffileFilters!]
  _or: [CollectionPdffileFilters!]
}

type CollectionPdffileMutation {
  """
  
  
  @Action
  """
  create(pdffile: CollectionPdffileCreate!): CollectionPdffile

  """
  
  
  @Action
  """
  update(id: ID!, pdffile: CollectionPdffileUpdate!): CollectionPdffile

  """
  
  
  @Action
  """
  upsert(id: ID, pdffile: CollectionPdffileUpsert!): CollectionPdffile

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionPdffile

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionPdffile
}

input CollectionPdffileCreate {
  file_name: String
  title: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionPdffileUpdate {
  file_name: String
  title: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

input CollectionPdffileUpsert {
  file_name: String
  title: String
  description: String
  source: String
  _relation_location_data: ID
  _relation_station_data: ID
}

type CollectionPdffileDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionPdffile
  newDocument: CollectionPdffile
}

type CollectionTweetQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionTweet

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionTweet!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_tweet_TweetSortFieldsType!]
    filters: CollectionTweetFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionTweetPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionTweetPaginator!
}

type CollectionTweet {
  _id: ID!
  _relation_account_data: ID
  body: String
  link: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  account(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionTwitter_accounts
}

type CollectionTweetPaginator {
  totalCount: Int!
  edges: [CollectionTweetPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionTweetPaginatorEdge {
  cursor: String
  node: CollectionTweet
}

input CollectionSortConfig_tweet_TweetSortFieldsType {
  field: CollectionTweetSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionTweetSortFields {
  _id
  _createdAt
  _updatedAt
  _relation_account_data
  body
  link
}

input CollectionTweetFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _relation_account_data: CollectionIdFilter
  _and: [CollectionTweetFilters!]
  _or: [CollectionTweetFilters!]
}

type CollectionTweetMutation {
  """
  
  
  @Action
  """
  create(tweet: CollectionTweetCreate!): CollectionTweet

  """
  
  
  @Action
  """
  update(id: ID!, tweet: CollectionTweetUpdate!): CollectionTweet

  """
  
  
  @Action
  """
  upsert(id: ID, tweet: CollectionTweetUpsert!): CollectionTweet

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionTweet

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionTweet
}

input CollectionTweetCreate {
  _relation_account_data: ID
  body: String
  link: String
}

input CollectionTweetUpdate {
  _relation_account_data: ID
  body: String
  link: String
}

input CollectionTweetUpsert {
  _relation_account_data: ID
  body: String
  link: String
}

type CollectionTweetDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionTweet
  newDocument: CollectionTweet
}

type CollectionTwitter_accountsQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionTwitter_accounts

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionTwitter_accounts!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_twitter_accounts_Twitter_accountsSortFieldsType!]
    filters: CollectionTwitter_accountsFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionTwitter_accountsPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionTwitter_accountsPaginator!
}

type CollectionTwitter_accounts {
  _id: ID!
  handle: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
}

type CollectionTwitter_accountsPaginator {
  totalCount: Int!
  edges: [CollectionTwitter_accountsPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionTwitter_accountsPaginatorEdge {
  cursor: String
  node: CollectionTwitter_accounts
}

input CollectionSortConfig_twitter_accounts_Twitter_accountsSortFieldsType {
  field: CollectionTwitter_accountsSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionTwitter_accountsSortFields {
  _id
  _createdAt
  _updatedAt
  handle
}

input CollectionTwitter_accountsFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _and: [CollectionTwitter_accountsFilters!]
  _or: [CollectionTwitter_accountsFilters!]
}

type CollectionTwitter_accountsMutation {
  """
  
  
  @Action
  """
  create(twitter_accounts: CollectionTwitter_accountsCreate!): CollectionTwitter_accounts

  """
  
  
  @Action
  """
  update(id: ID!, twitter_accounts: CollectionTwitter_accountsUpdate!): CollectionTwitter_accounts

  """
  
  
  @Action
  """
  upsert(id: ID, twitter_accounts: CollectionTwitter_accountsUpsert!): CollectionTwitter_accounts

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionTwitter_accounts

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionTwitter_accounts
}

input CollectionTwitter_accountsCreate {
  handle: String
}

input CollectionTwitter_accountsUpdate {
  handle: String
}

input CollectionTwitter_accountsUpsert {
  handle: String
}

type CollectionTwitter_accountsDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionTwitter_accounts
  newDocument: CollectionTwitter_accounts
}

type CollectionPrizeQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPrize

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionPrize!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_prize_PrizeSortFieldsType!]
    filters: CollectionPrizeFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPrizePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionPrizePaginator!
}

type CollectionPrize {
  _id: ID!
  name: String
  description: String
  amount: Int
  _relation_station_data: ID
  _relation_contest_data: ID
  _relation_supplier_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  contest(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContest
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  supplier(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionContact
}

type CollectionPrizePaginator {
  aggregate_amount: CollectionPaginatorAggegrate!
  totalCount: Int!
  edges: [CollectionPrizePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPrizePaginatorEdge {
  cursor: String
  node: CollectionPrize
}

input CollectionSortConfig_prize_PrizeSortFieldsType {
  field: CollectionPrizeSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionPrizeSortFields {
  _id
  _createdAt
  _updatedAt
  name
  description
  amount
  _relation_station_data
  _relation_contest_data
  _relation_supplier_data
}

input CollectionPrizeFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  name: CollectionStringFilter
  description: CollectionStringFilter
  _relation_station_data: CollectionIdFilter
  _relation_contest_data: CollectionIdFilter
  _relation_supplier_data: CollectionIdFilter
  _and: [CollectionPrizeFilters!]
  _or: [CollectionPrizeFilters!]
}

type CollectionPrizeMutation {
  """
  
  
  @Action
  """
  create(prize: CollectionPrizeCreate!): CollectionPrize

  """
  
  
  @Action
  """
  update(id: ID!, prize: CollectionPrizeUpdate!): CollectionPrize

  """
  
  
  @Action
  """
  upsert(id: ID, prize: CollectionPrizeUpsert!): CollectionPrize

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionPrize

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionPrize
}

input CollectionPrizeCreate {
  name: String
  description: String
  amount: Int
  _relation_station_data: ID
  _relation_contest_data: ID
  _relation_supplier_data: ID
}

input CollectionPrizeUpdate {
  name: String
  description: String
  amount: Int
  _relation_station_data: ID
  _relation_contest_data: ID
  _relation_supplier_data: ID
}

input CollectionPrizeUpsert {
  name: String
  description: String
  amount: Int
  _relation_station_data: ID
  _relation_contest_data: ID
  _relation_supplier_data: ID
}

type CollectionPrizeDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionPrize
  newDocument: CollectionPrize
}

type CollectionMessageQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMessage

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionMessage!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_message_MessageSortFieldsType!]
    filters: CollectionMessageFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMessagePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionMessagePaginator!
}

type CollectionMessage {
  _id: ID!
  _relation_profile_data: ID
  body: String
  _relation_station_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  profile(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProfile
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionMessagePaginator {
  totalCount: Int!
  edges: [CollectionMessagePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionMessagePaginatorEdge {
  cursor: String
  node: CollectionMessage
}

input CollectionSortConfig_message_MessageSortFieldsType {
  field: CollectionMessageSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionMessageSortFields {
  _id
  _createdAt
  _updatedAt
  _relation_profile_data
  body
  _relation_station_data
}

input CollectionMessageFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _relation_profile_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionMessageFilters!]
  _or: [CollectionMessageFilters!]
}

type CollectionMessageMutation {
  """
  
  
  @Action
  """
  create(message: CollectionMessageCreate!): CollectionMessage

  """
  
  
  @Action
  """
  update(id: ID!, message: CollectionMessageUpdate!): CollectionMessage

  """
  
  
  @Action
  """
  upsert(id: ID, message: CollectionMessageUpsert!): CollectionMessage

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionMessage

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionMessage
}

input CollectionMessageCreate {
  _relation_profile_data: ID
  body: String
  _relation_station_data: ID
}

input CollectionMessageUpdate {
  _relation_profile_data: ID
  body: String
  _relation_station_data: ID
}

input CollectionMessageUpsert {
  _relation_profile_data: ID
  body: String
  _relation_station_data: ID
}

type CollectionMessageDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionMessage
  newDocument: CollectionMessage
}

type CollectionCalllogQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionCalllog

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionCalllog!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_calllog_CalllogSortFieldsType!]
    filters: CollectionCalllogFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionCalllogPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionCalllogPaginator!
}

type CollectionCalllog {
  _id: ID!
  date: DateTime
  direction: CollectionCalllog_direction
  _relation_profile_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  profile(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionProfile
}

enum CollectionCalllog_direction {
  inbound
  outbound
}

type CollectionCalllogPaginator {
  totalCount: Int!
  edges: [CollectionCalllogPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionCalllogPaginatorEdge {
  cursor: String
  node: CollectionCalllog
}

input CollectionSortConfig_calllog_CalllogSortFieldsType {
  field: CollectionCalllogSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionCalllogSortFields {
  _id
  _createdAt
  _updatedAt
  date
  direction
  _relation_profile_data
}

input CollectionCalllogFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _relation_profile_data: CollectionIdFilter
  _and: [CollectionCalllogFilters!]
  _or: [CollectionCalllogFilters!]
}

type CollectionCalllogMutation {
  """
  
  
  @Action
  """
  create(calllog: CollectionCalllogCreate!): CollectionCalllog

  """
  
  
  @Action
  """
  update(id: ID!, calllog: CollectionCalllogUpdate!): CollectionCalllog

  """
  
  
  @Action
  """
  upsert(id: ID, calllog: CollectionCalllogUpsert!): CollectionCalllog

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionCalllog

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionCalllog
}

input CollectionCalllogCreate {
  date: DateTime
  direction: CollectionCalllog_direction
  _relation_profile_data: ID
}

input CollectionCalllogUpdate {
  date: DateTime
  direction: CollectionCalllog_direction
  _relation_profile_data: ID
}

input CollectionCalllogUpsert {
  date: DateTime
  direction: CollectionCalllog_direction
  _relation_profile_data: ID
}

type CollectionCalllogDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionCalllog
  newDocument: CollectionCalllog
}

type CollectionPodcastQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcast

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionPodcast!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_podcast_PodcastSortFieldsType!]
    filters: CollectionPodcastFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcastPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionPodcastPaginator!
}

type CollectionPodcast {
  _id: ID!
  title: String
  introduction: String
  description: String
  _relation_image_data: ID
  _relation_broadcaster_data: ID
  _relation_presenter_data: ID
  _relation_station_data: ID
  users: [ID!]
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  presenter(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPresenter
  broadcaster(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcaster
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
}

type CollectionPodcastPaginator {
  totalCount: Int!
  edges: [CollectionPodcastPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPodcastPaginatorEdge {
  cursor: String
  node: CollectionPodcast
}

input CollectionSortConfig_podcast_PodcastSortFieldsType {
  field: CollectionPodcastSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionPodcastSortFields {
  _id
  _createdAt
  _updatedAt
  title
  introduction
  description
  _relation_image_data
  _relation_broadcaster_data
  _relation_presenter_data
  _relation_station_data
  users
}

input CollectionPodcastFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  introduction: CollectionStringFilter
  description: CollectionStringFilter
  _relation_image_data: CollectionIdFilter
  _relation_broadcaster_data: CollectionIdFilter
  _relation_presenter_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _and: [CollectionPodcastFilters!]
  _or: [CollectionPodcastFilters!]
}

type CollectionPodcastMutation {
  """
  
  
  @Action
  """
  create(podcast: CollectionPodcastCreate!): CollectionPodcast

  """
  
  
  @Action
  """
  update(id: ID!, podcast: CollectionPodcastUpdate!): CollectionPodcast

  """
  
  
  @Action
  """
  upsert(id: ID, podcast: CollectionPodcastUpsert!): CollectionPodcast

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionPodcast

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionPodcast
}

input CollectionPodcastCreate {
  title: String
  introduction: String
  description: String
  _relation_image_data: ID
  _relation_broadcaster_data: ID
  _relation_presenter_data: ID
  _relation_station_data: ID
  users: [ID!]
}

input CollectionPodcastUpdate {
  title: String
  introduction: String
  description: String
  _relation_image_data: ID
  _relation_broadcaster_data: ID
  _relation_presenter_data: ID
  _relation_station_data: ID
  users: [ID!]
}

input CollectionPodcastUpsert {
  title: String
  introduction: String
  description: String
  _relation_image_data: ID
  _relation_broadcaster_data: ID
  _relation_presenter_data: ID
  _relation_station_data: ID
  users: [ID!]
}

type CollectionPodcastDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionPodcast
  newDocument: CollectionPodcast
}

type CollectionPodcast_episodeQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcast_episode

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionPodcast_episode!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_podcast_episode_Podcast_episodeSortFieldsType!]
    filters: CollectionPodcast_episodeFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcast_episodePaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionPodcast_episodePaginator!
}

type CollectionPodcast_episode {
  _id: ID!
  title: String
  description: String
  _relation_presenter_data: ID
  _relation_broadcaster_data: ID
  _relation_audio_data: ID
  _relation_podcast_data: ID
  _relation_station_data: ID
  _relation_image_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  podcast(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPodcast
  presenter(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPresenter
  broadcaster(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcaster
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  image(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia
  audio(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMedia
}

type CollectionPodcast_episodePaginator {
  totalCount: Int!
  edges: [CollectionPodcast_episodePaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionPodcast_episodePaginatorEdge {
  cursor: String
  node: CollectionPodcast_episode
}

input CollectionSortConfig_podcast_episode_Podcast_episodeSortFieldsType {
  field: CollectionPodcast_episodeSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionPodcast_episodeSortFields {
  _id
  _createdAt
  _updatedAt
  title
  description
  _relation_presenter_data
  _relation_broadcaster_data
  _relation_audio_data
  _relation_podcast_data
  _relation_station_data
  _relation_image_data
}

input CollectionPodcast_episodeFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  title: CollectionStringFilter
  description: CollectionStringFilter
  _relation_presenter_data: CollectionIdFilter
  _relation_broadcaster_data: CollectionIdFilter
  _relation_audio_data: CollectionIdFilter
  _relation_podcast_data: CollectionIdFilter
  _relation_station_data: CollectionIdFilter
  _relation_image_data: CollectionIdFilter
  _and: [CollectionPodcast_episodeFilters!]
  _or: [CollectionPodcast_episodeFilters!]
}

type CollectionPodcast_episodeMutation {
  """
  
  
  @Action
  """
  create(podcast_episode: CollectionPodcast_episodeCreate!): CollectionPodcast_episode

  """
  
  
  @Action
  """
  update(id: ID!, podcast_episode: CollectionPodcast_episodeUpdate!): CollectionPodcast_episode

  """
  
  
  @Action
  """
  upsert(id: ID, podcast_episode: CollectionPodcast_episodeUpsert!): CollectionPodcast_episode

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionPodcast_episode

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionPodcast_episode
}

input CollectionPodcast_episodeCreate {
  title: String
  description: String
  _relation_presenter_data: ID
  _relation_broadcaster_data: ID
  _relation_audio_data: ID
  _relation_podcast_data: ID
  _relation_station_data: ID
  _relation_image_data: ID
}

input CollectionPodcast_episodeUpdate {
  title: String
  description: String
  _relation_presenter_data: ID
  _relation_broadcaster_data: ID
  _relation_audio_data: ID
  _relation_podcast_data: ID
  _relation_station_data: ID
  _relation_image_data: ID
}

input CollectionPodcast_episodeUpsert {
  title: String
  description: String
  _relation_presenter_data: ID
  _relation_broadcaster_data: ID
  _relation_audio_data: ID
  _relation_podcast_data: ID
  _relation_station_data: ID
  _relation_image_data: ID
}

type CollectionPodcast_episodeDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionPodcast_episode
  newDocument: CollectionPodcast_episode
}

type CollectionClockQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionClock

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionClock!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_clock_ClockSortFieldsType!]
    filters: CollectionClockFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionClockPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionClockPaginator!
}

type CollectionClock {
  _id: ID!
  clock_id: String
  name: String
  _relation_station_data: ID
  start: DateTime
  stop: DateTime
  _relation_broadcast_data: ID
  last_modified: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
  broadcast(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_broadcast_BroadcastSortFieldsType!]
    filters: CollectionBroadcastFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcastPaginator
  blocks(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_block_BlockSortFieldsType!]
    filters: CollectionBlockFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBlockPaginator
}

type CollectionClockPaginator {
  totalCount: Int!
  edges: [CollectionClockPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionClockPaginatorEdge {
  cursor: String
  node: CollectionClock
}

input CollectionSortConfig_clock_ClockSortFieldsType {
  field: CollectionClockSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionClockSortFields {
  _id
  _createdAt
  _updatedAt
  clock_id
  name
  _relation_station_data
  start
  stop
  _relation_broadcast_data
  last_modified
}

input CollectionClockFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  clock_id: CollectionStringFilter
  _relation_station_data: CollectionIdFilter
  start: CollectionDateTimeFilter
  stop: CollectionDateTimeFilter
  _relation_broadcast_data: CollectionIdFilter
  _and: [CollectionClockFilters!]
  _or: [CollectionClockFilters!]
}

type CollectionClockMutation {
  """
  
  
  @Action
  """
  create(clock: CollectionClockCreate!): CollectionClock

  """
  
  
  @Action
  """
  update(id: ID!, clock: CollectionClockUpdate!): CollectionClock

  """
  
  
  @Action
  """
  upsert(id: ID, clock: CollectionClockUpsert!): CollectionClock

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionClock

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionClock
}

input CollectionClockCreate {
  clock_id: String
  name: String
  _relation_station_data: ID
  start: DateTime
  stop: DateTime
  _relation_broadcast_data: ID
  last_modified: String
}

input CollectionClockUpdate {
  clock_id: String
  name: String
  _relation_station_data: ID
  start: DateTime
  stop: DateTime
  _relation_broadcast_data: ID
  last_modified: String
}

input CollectionClockUpsert {
  clock_id: String
  name: String
  _relation_station_data: ID
  start: DateTime
  stop: DateTime
  _relation_broadcast_data: ID
  last_modified: String
}

type CollectionClockDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionClock
  newDocument: CollectionClock
}

type CollectionBlockQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBlock

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionBlock!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_block_BlockSortFieldsType!]
    filters: CollectionBlockFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBlockPaginator!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionBlockPaginator!
}

type CollectionBlock {
  _id: ID!
  block_id: String
  name: String
  start: DateTime
  duration: String
  type: CollectionBlock_type
  items: [CollectionBlock_items!]
  _relation_clock_data: ID
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  clock(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionClock
}

enum CollectionBlock_type {
  news
  commercial
  broadcast
}

type CollectionBlock_items {
  item_id: String
  name: String
  start: DateTime
  duration: String
}

type CollectionBlockPaginator {
  totalCount: Int!
  edges: [CollectionBlockPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionBlockPaginatorEdge {
  cursor: String
  node: CollectionBlock
}

input CollectionSortConfig_block_BlockSortFieldsType {
  field: CollectionBlockSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionBlockSortFields {
  _id
  _createdAt
  _updatedAt
  block_id
  name
  start
  duration
  type
  items
  _relation_clock_data
}

input CollectionBlockFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  block_id: CollectionStringFilter
  name: CollectionStringFilter
  type: CollectionBlock_typeEnumFilter
  _relation_clock_data: CollectionIdFilter
  _and: [CollectionBlockFilters!]
  _or: [CollectionBlockFilters!]
}

input CollectionBlock_typeEnumFilter {
  """Matches values that are equal to a specified value."""
  eq: CollectionBlock_type

  """Matches all values that are not equal to a specified value."""
  ne: CollectionBlock_type

  """Matches values that are greater than a specified value."""
  gt: CollectionBlock_type

  """Matches values that are greater than or equal to a specified value."""
  gte: CollectionBlock_type

  """Matches values that are less than a specified value."""
  lt: CollectionBlock_type

  """Matches values that are less than or equal to a specified value."""
  lte: CollectionBlock_type

  """Matches any of the values specified in an array."""
  in: [CollectionBlock_type]

  """Matches none of the values specified in an array."""
  nin: [CollectionBlock_type]
}

type CollectionBlockMutation {
  """
  
  
  @Action
  """
  create(block: CollectionBlockCreate!): CollectionBlock

  """
  
  
  @Action
  """
  update(id: ID!, block: CollectionBlockUpdate!): CollectionBlock

  """
  
  
  @Action
  """
  upsert(id: ID, block: CollectionBlockUpsert!): CollectionBlock

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionBlock

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionBlock
}

input CollectionBlockCreate {
  block_id: String
  name: String
  start: DateTime
  duration: String
  type: CollectionBlock_type
  items: [CollectionBlockInput_items!]
  _relation_clock_data: ID
}

input CollectionBlockInput_items {
  item_id: String
  name: String
  start: DateTime
  duration: String
}

input CollectionBlockUpdate {
  block_id: String
  name: String
  start: DateTime
  duration: String
  type: CollectionBlock_type
  items: [CollectionBlockInput_items!]
  _relation_clock_data: ID
}

input CollectionBlockUpsert {
  block_id: String
  name: String
  start: DateTime
  duration: String
  type: CollectionBlock_type
  items: [CollectionBlockInput_items!]
  _relation_clock_data: ID
}

type CollectionBlockDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionBlock
  newDocument: CollectionBlock
}

type CollectionMediaQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMedia

  """
  
  
  @Action
  """
  findMany(ids: [ID!]!): [CollectionMedia!]!

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [CollectionSortConfig_media_MediaSortFieldsType!]
    filters: CollectionMediaFilters

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionMediaPaginator!

  """
  
  
  @Action
  """
  find_BroadcastAudio(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionBroadcastAudioMedia

  """
  
  
  @Action
  """
  findMany_BroadcastAudio(ids: [ID!]!): [CollectionBroadcastAudioMedia!]!

  """
  
  
  @Action
  """
  find_AudioFragment(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionAudioFragmentMedia

  """
  
  
  @Action
  """
  findMany_AudioFragment(ids: [ID!]!): [CollectionAudioFragmentMedia!]!

  """
  
  
  @Action
  """
  find_VideoFragment(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionVideoFragmentMedia

  """
  
  
  @Action
  """
  findMany_VideoFragment(ids: [ID!]!): [CollectionVideoFragmentMedia!]!

  """
  
  
  @Action
  """
  find_AudioUpload(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionAudioUploadMedia

  """
  
  
  @Action
  """
  findMany_AudioUpload(ids: [ID!]!): [CollectionAudioUploadMedia!]!

  """
  
  
  @Action
  """
  find_VideoUpload(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionVideoUploadMedia

  """
  
  
  @Action
  """
  findMany_VideoUpload(ids: [ID!]!): [CollectionVideoUploadMedia!]!

  """
  
  
  @Action
  """
  find_Image(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionImageMedia

  """
  
  
  @Action
  """
  findMany_Image(ids: [ID!]!): [CollectionImageMedia!]!

  """
  
  
  @Action
  """
  find_PdfFile(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionPdfFileMedia

  """
  
  
  @Action
  """
  findMany_PdfFile(ids: [ID!]!): [CollectionPdfFileMedia!]!

  """
  
  
  @Action
  """
  documentReferences(id: ID!, limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): CollectionMediaPaginator!
}

interface CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

enum CollectionMediaType {
  BroadcastAudio
  AudioFragment
  VideoFragment
  AudioUpload
  VideoUpload
  Image
  PdfFile
}

type CollectionMediaPaginator {
  totalCount: Int!
  edges: [CollectionMediaPaginatorEdge!]!
  pageInfo: CollectionPaginatorPageInfo!
}

type CollectionMediaPaginatorEdge {
  cursor: String
  node: CollectionMedia
}

input CollectionSortConfig_media_MediaSortFieldsType {
  field: CollectionMediaSortFields!
  direction: CollectionPaginateSortDirection
}

enum CollectionMediaSortFields {
  _id
  _createdAt
  _updatedAt
  _relation_station_data
  title
  description
  tags
  MID
  published
}

input CollectionMediaFilters {
  _id: CollectionMongoIdFilter
  _createdAt: CollectionDateTimeFilter
  _updatedAt: CollectionDateTimeFilter
  _relation_station_data: CollectionIdFilter
  title: CollectionStringFilter
  description: CollectionStringFilter
  tags: CollectionStringFilter
  MID: CollectionIdFilter
  _type: CollectionMediaTypeEnumFilter
  _and: [CollectionMediaFilters!]
  _or: [CollectionMediaFilters!]
}

input CollectionMediaTypeEnumFilter {
  """Matches values that are equal to a specified value."""
  eq: CollectionMediaType

  """Matches all values that are not equal to a specified value."""
  ne: CollectionMediaType

  """Matches values that are greater than a specified value."""
  gt: CollectionMediaType

  """Matches values that are greater than or equal to a specified value."""
  gte: CollectionMediaType

  """Matches values that are less than a specified value."""
  lt: CollectionMediaType

  """Matches values that are less than or equal to a specified value."""
  lte: CollectionMediaType

  """Matches any of the values specified in an array."""
  in: [CollectionMediaType]

  """Matches none of the values specified in an array."""
  nin: [CollectionMediaType]
}

type CollectionBroadcastAudioMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageStreamingCDN: String
  duration: Int
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionAudioFragmentMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionVideoFragmentMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionAudioUploadMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionVideoUploadMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionImageMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageBunnyCDN: String
  source: String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionPdfFileMedia implements CollectionMedia {
  _id: ID!
  _type: CollectionMediaType!
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
  storageBunnyCDN: String
  source: String
  station(
    id: ID

    """Control what the query should do with trashed objects."""
    trashedPolicy: CollectionTrashedPolicy = WITHOUT_TRASHED
  ): CollectionStation
}

type CollectionMediaMutation {
  """
  
  
  @Action
  """
  create_BroadcastAudio(media: CollectionBroadcastAudioMediaCreate!): CollectionBroadcastAudioMedia

  """
  
  
  @Action
  """
  update_BroadcastAudio(id: ID!, media: CollectionBroadcastAudioMediaUpdate!): CollectionBroadcastAudioMedia

  """
  
  
  @Action
  """
  upsert_BroadcastAudio(id: ID, media: CollectionBroadcastAudioMediaUpsert!): CollectionBroadcastAudioMedia

  """
  
  
  @Action
  """
  create_AudioFragment(media: CollectionAudioFragmentMediaCreate!): CollectionAudioFragmentMedia

  """
  
  
  @Action
  """
  update_AudioFragment(id: ID!, media: CollectionAudioFragmentMediaUpdate!): CollectionAudioFragmentMedia

  """
  
  
  @Action
  """
  upsert_AudioFragment(id: ID, media: CollectionAudioFragmentMediaUpsert!): CollectionAudioFragmentMedia

  """
  
  
  @Action
  """
  create_VideoFragment(media: CollectionVideoFragmentMediaCreate!): CollectionVideoFragmentMedia

  """
  
  
  @Action
  """
  update_VideoFragment(id: ID!, media: CollectionVideoFragmentMediaUpdate!): CollectionVideoFragmentMedia

  """
  
  
  @Action
  """
  upsert_VideoFragment(id: ID, media: CollectionVideoFragmentMediaUpsert!): CollectionVideoFragmentMedia

  """
  
  
  @Action
  """
  create_AudioUpload(media: CollectionAudioUploadMediaCreate!): CollectionAudioUploadMedia

  """
  
  
  @Action
  """
  update_AudioUpload(id: ID!, media: CollectionAudioUploadMediaUpdate!): CollectionAudioUploadMedia

  """
  
  
  @Action
  """
  upsert_AudioUpload(id: ID, media: CollectionAudioUploadMediaUpsert!): CollectionAudioUploadMedia

  """
  
  
  @Action
  """
  create_VideoUpload(media: CollectionVideoUploadMediaCreate!): CollectionVideoUploadMedia

  """
  
  
  @Action
  """
  update_VideoUpload(id: ID!, media: CollectionVideoUploadMediaUpdate!): CollectionVideoUploadMedia

  """
  
  
  @Action
  """
  upsert_VideoUpload(id: ID, media: CollectionVideoUploadMediaUpsert!): CollectionVideoUploadMedia

  """
  
  
  @Action
  """
  create_Image(media: CollectionImageMediaCreate!): CollectionImageMedia

  """
  
  
  @Action
  """
  update_Image(id: ID!, media: CollectionImageMediaUpdate!): CollectionImageMedia

  """
  
  
  @Action
  """
  upsert_Image(id: ID, media: CollectionImageMediaUpsert!): CollectionImageMedia

  """
  
  
  @Action
  """
  create_PdfFile(media: CollectionPdfFileMediaCreate!): CollectionPdfFileMedia

  """
  
  
  @Action
  """
  update_PdfFile(id: ID!, media: CollectionPdfFileMediaUpdate!): CollectionPdfFileMedia

  """
  
  
  @Action
  """
  upsert_PdfFile(id: ID, media: CollectionPdfFileMediaUpsert!): CollectionPdfFileMedia

  """
  
  
  @Action
  """
  delete(id: ID!): CollectionMedia

  """
  
  
  @Action
  """
  restore(id: ID!): CollectionMedia
}

input CollectionBroadcastAudioMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageStreamingCDN: String
  duration: Int
}

input CollectionBroadcastAudioMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageStreamingCDN: String
  duration: Int
}

input CollectionBroadcastAudioMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageStreamingCDN: String
  duration: Int
}

input CollectionAudioFragmentMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionAudioFragmentMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionAudioFragmentMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionVideoFragmentMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionVideoFragmentMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionVideoFragmentMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  start: DateTime
  stop: DateTime
  duration: Int
  preRollId: String
  postRollId: String
  thumbnailUrl: String
}

input CollectionAudioUploadMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionAudioUploadMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionAudioUploadMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionVideoUploadMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionVideoUploadMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionVideoUploadMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageS3Bucket: String
  storageStreamingCDN: String
  source: String
  duration: Int
}

input CollectionImageMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

input CollectionImageMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

input CollectionImageMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

input CollectionPdfFileMediaCreate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

input CollectionPdfFileMediaUpdate {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

input CollectionPdfFileMediaUpsert {
  _relation_station_data: ID
  title: String
  description: String
  tags: [String!]
  MID: ID
  published: Boolean
  storageBunnyCDN: String
  source: String
}

type CollectionMediaDiff {
  id: ID!
  mutateType: CollectionMutateType
  oldDocument: CollectionMedia
  newDocument: CollectionMedia
}

"""The \`Upload\` scalar type represents a file upload."""
scalar Upload

type CollectionQuery {
  station: CollectionStationQuery
  broadcaster: CollectionBroadcasterQuery
  presenter: CollectionPresenterQuery
  program: CollectionProgramQuery
  item: CollectionItemQuery
  profile: CollectionProfileQuery
  contest: CollectionContestQuery
  contact: CollectionContactQuery
  article: CollectionArticleQuery
  broadcast: CollectionBroadcastQuery
  fragment: CollectionFragmentQuery
  repetition: CollectionRepetitionQuery
  imagefile: CollectionImagefileQuery
  audiofile: CollectionAudiofileQuery
  videofile: CollectionVideofileQuery
  pdffile: CollectionPdffileQuery
  tweet: CollectionTweetQuery
  twitter_accounts: CollectionTwitter_accountsQuery
  prize: CollectionPrizeQuery
  message: CollectionMessageQuery
  calllog: CollectionCalllogQuery
  podcast: CollectionPodcastQuery
  podcast_episode: CollectionPodcast_episodeQuery
  clock: CollectionClockQuery
  block: CollectionBlockQuery
  media: CollectionMediaQuery
}

type CollectionMutation {
  station: CollectionStationMutation
  broadcaster: CollectionBroadcasterMutation
  presenter: CollectionPresenterMutation
  program: CollectionProgramMutation
  item: CollectionItemMutation
  profile: CollectionProfileMutation
  contest: CollectionContestMutation
  contact: CollectionContactMutation
  article: CollectionArticleMutation
  broadcast: CollectionBroadcastMutation
  fragment: CollectionFragmentMutation
  repetition: CollectionRepetitionMutation
  imagefile: CollectionImagefileMutation
  audiofile: CollectionAudiofileMutation
  videofile: CollectionVideofileMutation
  pdffile: CollectionPdffileMutation
  tweet: CollectionTweetMutation
  twitter_accounts: CollectionTwitter_accountsMutation
  prize: CollectionPrizeMutation
  message: CollectionMessageMutation
  calllog: CollectionCalllogMutation
  podcast: CollectionPodcastMutation
  podcast_episode: CollectionPodcast_episodeMutation
  clock: CollectionClockMutation
  block: CollectionBlockMutation
  media: CollectionMediaMutation
}

type PluxboxAwsS3BucketgraphqlAWSUploadedFiles {
  IsTruncated: Boolean
  Marker: String
  NextMarker: String
  Contents: [PluxboxAwsS3BucketgraphqlAWSUploadedFileContent]
  Name: String
  Prefix: String
  Delimeter: String
  MaxKeys: Int
  EncodingType: String
}

type PluxboxAwsS3BucketgraphqlAWSUploadedFileContent {
  Key: String
  LastModified: String
  ETag: String
  Size: Int
  StorageClass: String
  Owner: PluxboxAwsS3BucketgraphqlAWSUploadedContentOwner
  MaxKeys: Int
  EncodingType: String
}

type PluxboxAwsS3BucketgraphqlAWSUploadedContentOwner {
  DisplayName: String
  ID: String
}

type PluxboxAwsS3BucketgraphqlAWSUploadFile {
  ETag: String
  Location: String
  Key: String
  Bucket: String
}

type PluxboxAwsS3Buckets3BucketQuery {
  listObjects(Bucket: String, Delimiter: String, EncodingType: String, Prefix: String, Marker: String, MaxKeys: Int, ExpectedBucketOwner: String, RequestPayer: String): PluxboxAwsS3BucketgraphqlAWSUploadedFiles
  downloadFile(keyPath: String!): String
}

type PluxboxAwsS3Buckets3BucketMutation {
  uploadFile(file: Upload!, path: String, keyName: String): PluxboxAwsS3BucketgraphqlAWSUploadFile
  deleteFile(keyName: String!, Bucket: String): String
}

type ArlaArlaIntegrationgraphqlChannel {
  id: Int
  name: String
  displayName: String
  flavour: String
}

type ArlaArlaIntegrationgraphqlPreviewPlaylist {
  hls: String
  dash: String
}

type ArlaArlaIntegrationgraphqlRoll {
  id: Int
  channel_id: Int
  name: String
  asset_type: String
  asset_url: String
  poster_url: String
}

type ArlaArlaIntegrationgraphqlThumbnail {
  timestamp: String
  jpg_url: String
  jpg_hd_url: String
}

type ArlaArlaIntegrationarlaQuery {
  listAvailableVideoChannels: [ArlaArlaIntegrationgraphqlChannel]
  listAvailableAudioChannels: [ArlaArlaIntegrationgraphqlChannel]
  previewVideoPlaylist(
    """known from querying the channels"""
    channelId: Int!

    """timestamp in seconds UTC"""
    start: Int!

    """timestamp in seconds UTC"""
    end: Int!
  ): ArlaArlaIntegrationgraphqlPreviewPlaylist
  previewAudioPlaylist(
    """known from querying the channels"""
    channelId: Int!

    """timestamp in seconds UTC"""
    start: Int!

    """timestamp in seconds UTC"""
    end: Int!
  ): String
  rolls(
    """Filter for channel_id"""
    channelId: Int
  ): [ArlaArlaIntegrationgraphqlRoll]
  thumbnails(
    """valid id (off/api/v1/browse/visualradio/channels)"""
    channelId: Int!

    """timestamp in UTC"""
    start: String!

    """timestamp in UTC"""
    end: String!
  ): [ArlaArlaIntegrationgraphqlThumbnail]
}

type MmiIdGeneratorMmiIdGeneratorgraphqlMMIID {
  id: String
}

type MmiIdGeneratorMmiIdGeneratorMMIIDGeneratorQuery {
  IDGenerator: MmiIdGeneratorMmiIdGeneratorgraphqlMMIID
}

type ThesaurusThesaurusgraphqlPersonNames {
  start: Int
  rows: Int
  numFound: Int
  results: [ThesaurusThesaurusgraphqlPersonNameResults]
}

type ThesaurusThesaurusgraphqlPersonNameResults {
  prefLabels: [ThesaurusThesaurusgraphqlPrefLabel]
}

type ThesaurusThesaurusgraphqlPrefLabel {
  text: String
  lang: String
}

enum ThesaurusThesaurusgraphqlScheme {
  Persoonsnamen
  Namen
  GeografischeNamen
  Onderwerpen
  OnderwerpenBenG
  Classificatie
}

type ThesaurusThesaurusthesaurusQuery {
  autocomplete(
    """Search query"""
    text: String!
    scheme: ThesaurusThesaurusgraphqlScheme!
  ): ThesaurusThesaurusgraphqlPersonNames
}

input RadiomanagerComponentEpgRepetitionsBroadcast {
  customIdField: ID
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: RadiomanagerComponentEpgRepetitionsCollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
}

enum RadiomanagerComponentEpgRepetitionsCollectionBroadcast_nibg_status {
  todo
  processing
  processed
  failed
}

input RadiomanagerComponentEpgRepetitionsRepetition {
  repetitionId: ID
  interval: RadiomanagerComponentEpgRepetitionsCollectionRepetition_interval
  days: [Int!]
  start: DateTime
  stop: DateTime
}

enum RadiomanagerComponentEpgRepetitionsCollectionRepetition_interval {
  weekly
  biweekly
}

input RadiomanagerComponentEpgRepetitionsupdateRepetitionDateRange {
  title: String
  _relation_program_data: ID
  _relation_repetition_data: ID
  start: DateTime
  stop: DateTime
  PRID: String
  description: String
  introduction: String
  _relation_image_data: ID
  _relation_broadcasters_data: [ID!]
  _relation_presenters_data: [ID!]
  _relation_station_data: ID
  nibg_status: RadiomanagerComponentEpgRepetitionsCollectionBroadcast_nibg_status
  publish_as_podcast: Boolean
  publish_as_ondemand: Boolean
  _relation_clocks_data: ID
  embedded_station_id: ID
}

type RadiomanagerComponentEpgRepetitionsMutation {
  upsertRepetition(broadcast: RadiomanagerComponentEpgRepetitionsBroadcast, repetition: RadiomanagerComponentEpgRepetitionsRepetition): String
  updateRepetitionDateRange(broadcast: RadiomanagerComponentEpgRepetitionsupdateRepetitionDateRange, repetitionId: ID, rangeStart: String, rangeStop: String): String
  deleteRepetition(repetitionId: ID): String
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistBlocksOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistBlocks {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/blocks"
  """
  next_page_url: String

  """
  Example: "/api/v2/blocks"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/blocks"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistBlocks {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/blocks"
  """
  next_page_url: String

  """
  Example: "/api/v2/blocks"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/blocks"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput]
}

"""
The \`Bigint\` scalar type represents non-fractional signed whole numeric values. Bigint can represent values between -(2^53) + 1 and 2^53 - 1. 
"""
scalar Bigint
type PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockResult & PluxboxRadiomanagerPluxboxRadiomanagerBlock_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations {
  """
  ID of the current Block.
  
  Example: 1
  """
  id: Bigint!

  """
  Currently assigned Broadcast connected to the current Block, identified by the Broadcast ID.
  
  Example: 1
  """
  broadcast_id: Bigint!

  """
  Start of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  End of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """
  Time of the creation of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Time of the last update of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Moment when the Block got deleted (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
  items: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_itemsOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_programOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockResult implements PluxboxRadiomanagerPluxboxRadiomanagerBlock_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations {
  """
  ID of the current Block.
  
  Example: 1
  """
  id: Bigint!

  """
  Currently assigned Broadcast connected to the current Block, identified by the Broadcast ID.
  
  Example: 1
  """
  broadcast_id: Bigint!

  """
  Start of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  End of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """
  Time of the creation of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Time of the last update of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Moment when the Block got deleted (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
  items: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_itemsOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_programOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlock_schemas_components {
  """
  ID of the current Block.
  
  Example: 1
  """
  id: Bigint!

  """
  Currently assigned Broadcast connected to the current Block, identified by the Broadcast ID.
  
  Example: 1
  """
  broadcast_id: Bigint!

  """
  Start of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  End of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """
  Time of the creation of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Time of the last update of the Block (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Moment when the Block got deleted (formatted as a DateTime object), saved with an TimeZone.
  
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations {
  items: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_itemsOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_programOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?block_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?block_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items_params {
  """
  Example: "1"
  """
  block_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_items_params {
  """
  Example: "1"
  """
  block_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcastOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts/1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts/1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_broadcast_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_programOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBlockRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistBlocks_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcasts {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/broadcasts"
  """
  next_page_url: String

  """
  Example: "/api/v2/broadcasts"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/broadcasts"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcasts {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/broadcasts"
  """
  next_page_url: String

  """
  Example: "/api/v2/broadcasts"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/broadcasts"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResult & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerBroadcast & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
  genre: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tagsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presentersOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_groupOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResult implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerBroadcast & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
  genre: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tagsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presentersOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_groupOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastOutputOnly {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcast {
  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
}

scalar Record

enum PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type {
  """value: 1 week"""
  _1_week

  """value: 2 week"""
  _2_week

  """value: 4 week"""
  _4_week

  """value: 1 month"""
  _1_month
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations {
  genre: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tagsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presentersOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_groupOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genreOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre {
  """
  Example: "https://radiomanager.io/api/v2/genres/1"
  """
  href: String

  """
  Example: "Genre"
  """
  model: String

  """
  Example: "getGenreById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre {
  """
  Example: "https://radiomanager.io/api/v2/genres/1"
  """
  href: String

  """
  Example: "Genre"
  """
  model: String

  """
  Example: "getGenreById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_genre_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?broadcast_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?broadcast_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_items_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocksOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?broadcast_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?broadcast_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_blocks_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_programOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?broadcast_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?broadcast_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_tags_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presentersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?broadcast_id=1"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?broadcast_id=1"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_presenters_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_groupOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group {
  """
  Example: "https://radiomanager.io/api/v2/groups/1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "getGroupById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group {
  """
  Example: "https://radiomanager.io/api/v2/groups/1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "getGroupById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastRelations_group_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcasts_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_componentsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_components {
  days: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGDay_schemas_componentsOutput]!

  """
  Example: "https://radiomanager.io/api/v1/broadcasts/epg?date=2016-01-12&withunpublished=false"
  """
  next_page_url: String!

  """
  Example: "https://radiomanager.io/api/v1/broadcasts/epg?date=2016-01-10&withunpublished=false"
  """
  prev_page_url: String!
}
interface PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_components {
  days: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGDay_schemas_componentsOutput]!

  """
  Example: "https://radiomanager.io/api/v1/broadcasts/epg?date=2016-01-12&withunpublished=false"
  """
  next_page_url: String!

  """
  Example: "https://radiomanager.io/api/v1/broadcasts/epg?date=2016-01-10&withunpublished=false"
  """
  prev_page_url: String!
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGDay_schemas_componentsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGDay_schemas_components {
  """
  Example: "2016-01-11"
  """
  day: String
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGResultOutput]!
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGDay_schemas_components {
  """
  Example: "2016-01-11"
  """
  day: String
  results: [PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGResultOutput]!
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGResult & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerBroadcast & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tagsOutput
  presenters: [PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResultOutput]
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGResult implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerBroadcast & PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tagsOutput
  presenters: [PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResultOutput]
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations {
  items: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocksOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_programOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tagsOutput
  presenters: [PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResultOutput]
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_typeOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?broadcast_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?broadcast_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_items_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocksOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?broadcast_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?broadcast_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_blocks_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_programOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/programs/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ProgramById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?broadcast_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?broadcast_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_tags_params {
  """
  Example: "1"
  """
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResult & PluxboxRadiomanagerPluxboxRadiomanagerPresenter_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenterOutputOnly_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String

  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterEPGResult implements PluxboxRadiomanagerPluxboxRadiomanagerPresenter_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenterOutputOnly_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String

  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenter_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerBroadcastEPGRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerprintBroadcastByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerprintBroadcastById {
  """
  Example: "<html>The Rundown of the broadcast</html>"
  """
  html: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerprintBroadcastById {
  """
  Example: "<html>The Rundown of the broadcast</html>"
  """
  html: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistCampaignsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistCampaigns {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/campaigns"
  """
  next_page_url: String

  """
  Example: "/api/v2/campaigns"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/campaigns"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerCampaignResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistCampaigns {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/campaigns"
  """
  next_page_url: String

  """
  Example: "/api/v2/campaigns"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/campaigns"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerCampaignResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignResult & PluxboxRadiomanagerPluxboxRadiomanagerCampaignOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerCampaign_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  item: PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItemOutput
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """Example: true"""
  recommended: Boolean

  """
  Example: "<div class=\\'rm-content\\'></div>\\n"
  """
  description: String
  items: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignResult implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerCampaign_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  item: PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItemOutput
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """Example: true"""
  recommended: Boolean

  """
  Example: "<div class=\\'rm-content\\'></div>\\n"
  """
  description: String
  items: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  item: PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItemOutput
  _external_station_id: Bigint
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItemOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItem & PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItem_0_ {
  """Example: 14"""
  model_type_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: false"""
  static_start: Boolean
  _deltas: Record
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItem implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItem_0_ {
  """Example: 14"""
  model_type_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: false"""
  static_start: Boolean
  _deltas: Record
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignTemplateItem_0_ {
  """Example: 14"""
  model_type_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: false"""
  static_start: Boolean
  _deltas: Record
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaign_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String!

  """Example: true"""
  recommended: Boolean

  """
  Example: "<div class=\\'rm-content\\'></div>\\n"
  """
  description: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations {
  items: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_typeOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?campaign_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?campaign_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items_params {
  """
  Example: "1"
  """
  campaign_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_items_params {
  """
  Example: "1"
  """
  campaign_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerCampaignRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistCampaigns_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistContactsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistContacts {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/contacts"
  """
  next_page_url: String

  """
  Example: "/api/v2/contacts"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/contacts"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerContactResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistContacts {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/contacts"
  """
  next_page_url: String

  """
  Example: "/api/v2/contacts"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/contacts"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerContactResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactResult & PluxboxRadiomanagerPluxboxRadiomanagerContactOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerContact_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerContactRelations {
  """Example: 1"""
  id: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "info@example.com"
  """
  email: String

  """
  Example: "Foo"
  """
  firstname: String!

  """
  Example: "Bar"
  """
  lastname: String!

  """
  Example: "035-12345678910"
  """
  phone: String
  tags: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tagsOutput!
  items: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactResult implements PluxboxRadiomanagerPluxboxRadiomanagerContactOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerContact_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerContactRelations {
  """Example: 1"""
  id: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "info@example.com"
  """
  email: String

  """
  Example: "Foo"
  """
  firstname: String!

  """
  Example: "Bar"
  """
  lastname: String!

  """
  Example: "035-12345678910"
  """
  phone: String
  tags: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tagsOutput!
  items: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_typeOutput
}

"""Contact"""
interface PluxboxRadiomanagerPluxboxRadiomanagerContactOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint
}

"""Contact"""
interface PluxboxRadiomanagerPluxboxRadiomanagerContact_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "info@example.com"
  """
  email: String

  """
  Example: "Foo"
  """
  firstname: String!

  """
  Example: "Bar"
  """
  lastname: String!

  """
  Example: "035-12345678910"
  """
  phone: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations {
  tags: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tagsOutput!
  items: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_itemsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_typeOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?contact_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?contact_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags_params {
  """
  Example: "1"
  """
  contact_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_tags_params {
  """
  Example: "1"
  """
  contact_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?contact_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?contact_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items_params {
  """
  Example: "1"
  """
  contact_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_items_params {
  """
  Example: "1"
  """
  contact_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerContactRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistContacts_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistGenresOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistGenres {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/genres"
  """
  next_page_url: String

  """
  Example: "/api/v2/genres"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/genres"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerGenreResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistGenres {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/genres"
  """
  next_page_url: String

  """
  Example: "/api/v2/genres"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/genres"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerGenreResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerGenreResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGenreResult & PluxboxRadiomanagerPluxboxRadiomanagerGenre_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations & PluxboxRadiomanagerPluxboxRadiomanagerGenreOutputOnly {
  """Example: 2617"""
  id: Bigint!

  """
  Example: "urn:tva:metadata:cs:ContentCS:2013:3.1.1.1.3"
  """
  urn: String

  """Example: 2614"""
  parent_id: Bigint

  """
  Example: "Chat"
  """
  name: String!
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programsOutput
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreResult implements PluxboxRadiomanagerPluxboxRadiomanagerGenre_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations & PluxboxRadiomanagerPluxboxRadiomanagerGenreOutputOnly {
  """Example: 2617"""
  id: Bigint!

  """
  Example: "urn:tva:metadata:cs:ContentCS:2013:3.1.1.1.3"
  """
  urn: String

  """Example: 2614"""
  parent_id: Bigint

  """
  Example: "Chat"
  """
  name: String!
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programsOutput
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenre_schemas_components {
  """Example: 2617"""
  id: Bigint!

  """
  Example: "urn:tva:metadata:cs:ContentCS:2013:3.1.1.1.3"
  """
  urn: String

  """Example: 2614"""
  parent_id: Bigint

  """
  Example: "Chat"
  """
  name: String!
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations {
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?genre_id=1"
  """
  href: String

  """
  Example: "Broadcasts"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?genre_id=1"
  """
  href: String

  """
  Example: "Broadcasts"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts_params {
  """
  Example: "1"
  """
  genre_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_broadcasts_params {
  """
  Example: "1"
  """
  genre_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?genre_id=1"
  """
  href: String

  """
  Example: "Programs"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?genre_id=1"
  """
  href: String

  """
  Example: "Programs"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs_params {
  """
  Example: "1"
  """
  genre_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreRelations_programs_params {
  """
  Example: "1"
  """
  genre_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGenreOutputOnly {
  _external_station_id: Bigint
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistGenres_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistGroupsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistGroups {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/groups"
  """
  next_page_url: String

  """
  Example: "/api/v2/groups"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/groups"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerGroupResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistGroups {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/groups"
  """
  next_page_url: String

  """
  Example: "/api/v2/groups"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/groups"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerGroupResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupResult & PluxboxRadiomanagerPluxboxRadiomanagerGroupOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerGroup & PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!

  """
  Example: "Foo"
  """
  title: String
  users: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_usersOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupResult implements PluxboxRadiomanagerPluxboxRadiomanagerGroupOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerGroup & PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!

  """
  Example: "Foo"
  """
  title: String
  users: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_usersOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroup {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "Foo"
  """
  title: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components {
  users: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_usersOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_usersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users {
  """
  Example: "https://radiomanager.io/api/v2/users?group_id=1"
  """
  href: String

  """
  Example: "User"
  """
  model: String

  """
  Example: "listUsers"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users {
  """
  Example: "https://radiomanager.io/api/v2/users?group_id=1"
  """
  href: String

  """
  Example: "User"
  """
  model: String

  """
  Example: "listUsers"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users_params {
  """
  Example: "1"
  """
  group_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_users_params {
  """
  Example: "1"
  """
  group_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?group_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "ListBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?group_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "ListBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  group_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  group_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?group_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ListPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?group_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "ListPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs_params {
  """
  Example: "1"
  """
  group_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerGroupRelations_schemas_components_programs_params {
  """
  Example: "1"
  """
  group_id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistGroups_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistItemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistItems {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/items"
  """
  next_page_url: String

  """
  Example: "/api/v2/items"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistItems {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/items"
  """
  next_page_url: String

  """
  Example: "/api/v2/items"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemResult & PluxboxRadiomanagerPluxboxRadiomanagerItemOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerItem & PluxboxRadiomanagerPluxboxRadiomanagerItem_0_ & PluxboxRadiomanagerPluxboxRadiomanagerItemRelations {
  """Example: 1"""
  id: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  updated_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  created_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  deleted_at: String

  """Example: 1"""
  data_modified: Bigint

  """Example: 0"""
  order: Bigint

  """Example: 1"""
  templateblock_id: Bigint

  """Example: 1"""
  templateitem_id: Bigint
  _external_station_id: Bigint

  """Example: 14"""
  model_type_id: Bigint!

  """Example: 1"""
  block_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """
  Example: "scheduled"
  """
  status: PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status

  """Example: 0"""
  import: Bigint

  """Example: 1"""
  campaign_id: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: 0"""
  station_draft_id: Bigint

  """Example: 0"""
  program_draft_id: Bigint

  """Example: 0"""
  user_draft_id: Bigint

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String
  block: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_blockOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_programOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contactsOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tagsOutput
  campaign: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaignOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemResult implements PluxboxRadiomanagerPluxboxRadiomanagerItemOutputOnly & PluxboxRadiomanagerPluxboxRadiomanagerItem & PluxboxRadiomanagerPluxboxRadiomanagerItem_0_ & PluxboxRadiomanagerPluxboxRadiomanagerItemRelations {
  """Example: 1"""
  id: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  updated_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  created_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  deleted_at: String

  """Example: 1"""
  data_modified: Bigint

  """Example: 0"""
  order: Bigint

  """Example: 1"""
  templateblock_id: Bigint

  """Example: 1"""
  templateitem_id: Bigint
  _external_station_id: Bigint

  """Example: 14"""
  model_type_id: Bigint!

  """Example: 1"""
  block_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """
  Example: "scheduled"
  """
  status: PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status

  """Example: 0"""
  import: Bigint

  """Example: 1"""
  campaign_id: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: 0"""
  station_draft_id: Bigint

  """Example: 0"""
  program_draft_id: Bigint

  """Example: 0"""
  user_draft_id: Bigint

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String
  block: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_blockOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_programOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contactsOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tagsOutput
  campaign: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaignOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemOutputOnly {
  """Example: 1"""
  id: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  updated_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  created_at: String

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  deleted_at: String

  """Example: 1"""
  data_modified: Bigint

  """Example: 0"""
  order: Bigint

  """Example: 1"""
  templateblock_id: Bigint

  """Example: 1"""
  templateitem_id: Bigint
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItem implements PluxboxRadiomanagerPluxboxRadiomanagerItem_0_ {
  """Example: 14"""
  model_type_id: Bigint!

  """Example: 1"""
  block_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """
  Example: "scheduled"
  """
  status: PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status

  """Example: 0"""
  import: Bigint

  """Example: 1"""
  campaign_id: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: 0"""
  station_draft_id: Bigint

  """Example: 0"""
  program_draft_id: Bigint

  """Example: 0"""
  user_draft_id: Bigint

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItem_0_ {
  """Example: 14"""
  model_type_id: Bigint!

  """Example: 1"""
  block_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """
  Example: "scheduled"
  """
  status: PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status

  """Example: 0"""
  import: Bigint

  """Example: 1"""
  campaign_id: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: 0"""
  station_draft_id: Bigint

  """Example: 0"""
  program_draft_id: Bigint

  """Example: 0"""
  user_draft_id: Bigint

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String
}

enum PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status {
  """value: scheduled"""
  scheduled

  """value: playing"""
  playing

  """value: played"""
  played
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations {
  block: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_blockOutput
  broadcast: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcastOutput
  program: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_programOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contactsOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tagsOutput
  campaign: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaignOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_typeOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_blockOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block {
  """
  Example: "https://radiomanager.io/api/v2/blocks/1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block {
  """
  Example: "https://radiomanager.io/api/v2/blocks/1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_block_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcastOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts/1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts/1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_broadcast_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_programOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/program/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program {
  """
  Example: "https://radiomanager.io/api/v2/program/1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_program_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contactsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?item_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?item_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts_params {
  """
  Example: "1"
  """
  item_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_contacts_params {
  """
  Example: "1"
  """
  item_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?item_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?item_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags_params {
  """
  Example: "1"
  """
  item_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_tags_params {
  """
  Example: "1"
  """
  item_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaignOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign {
  """
  Example: "https://radiomanager.io/api/v2/campaigns/1"
  """
  href: String

  """
  Example: "Campaign"
  """
  model: String

  """
  Example: "listCampaigns"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign {
  """
  Example: "https://radiomanager.io/api/v2/campaigns/1"
  """
  href: String

  """
  Example: "Campaign"
  """
  model: String

  """
  Example: "listCampaigns"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_campaign_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerItemRelations_model_type_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistItems_status {
  """value: scheduled"""
  scheduled

  """value: playing"""
  playing

  """value: played"""
  played
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistItems_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypesOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/model_types"
  """
  next_page_url: String

  """
  Example: "/api/v2/model_types"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/model_types"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/model_types"
  """
  next_page_url: String

  """
  Example: "/api/v2/model_types"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/model_types"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResult & PluxboxRadiomanagerPluxboxRadiomanagerModelType & PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations & PluxboxRadiomanagerPluxboxRadiomanagerModelTypeOutputOnly {
  """Example: 1"""
  id: Bigint!

  """
  Example: "FooBar"
  """
  name: String

  """
  Example: "program"
  """
  model: PluxboxRadiomanagerPluxboxRadiomanagerModelType_model

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String
  options: PluxboxRadiomanagerPluxboxRadiomanagerModelType_optionsOutput

  """Example: 0"""
  order: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  campaigns: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaignsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contactsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presentersOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_itemsOutput
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResult implements PluxboxRadiomanagerPluxboxRadiomanagerModelType & PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations & PluxboxRadiomanagerPluxboxRadiomanagerModelTypeOutputOnly {
  """Example: 1"""
  id: Bigint!

  """
  Example: "FooBar"
  """
  name: String

  """
  Example: "program"
  """
  model: PluxboxRadiomanagerPluxboxRadiomanagerModelType_model

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String
  options: PluxboxRadiomanagerPluxboxRadiomanagerModelType_optionsOutput

  """Example: 0"""
  order: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  campaigns: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaignsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contactsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presentersOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_itemsOutput
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelType {
  """Example: 1"""
  id: Bigint!

  """
  Example: "FooBar"
  """
  name: String

  """
  Example: "program"
  """
  model: PluxboxRadiomanagerPluxboxRadiomanagerModelType_model

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String
  options: PluxboxRadiomanagerPluxboxRadiomanagerModelType_optionsOutput

  """Example: 0"""
  order: Bigint

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
}

enum PluxboxRadiomanagerPluxboxRadiomanagerModelType_model {
  """value: broadcast"""
  broadcast

  """value: program"""
  program

  """value: item"""
  item

  """value: campaign"""
  campaign

  """value: presenter"""
  presenter

  """value: contact"""
  contact

  """value: external"""
  external
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelType_optionsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelType_options {
  """
  Example: "#FFFFFF"
  """
  color: String

  """Example: true"""
  subBroadcast: Boolean
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelType_options {
  """
  Example: "#FFFFFF"
  """
  color: String

  """Example: true"""
  subBroadcast: Boolean
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations {
  campaigns: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaignsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contactsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presentersOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_itemsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaignsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns {
  """
  Example: "https://radiomanager.io/api/v2/campaigns/model_type_id=1"
  """
  href: String

  """
  Example: "Campaign"
  """
  model: String

  """
  Example: "getCampaignList"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns {
  """
  Example: "https://radiomanager.io/api/v2/campaigns/model_type_id=1"
  """
  href: String

  """
  Example: "Campaign"
  """
  model: String

  """
  Example: "getCampaignList"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_campaigns_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?model_type_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?model_type_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_broadcasts_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?model_type_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?model_type_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_programs_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contactsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?model_type_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?model_type_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_contacts_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presentersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?model_type_id"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?model_type_id"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_presenters_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?model_type_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?model_type_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeRelations_items_params {
  """
  Example: "1"
  """
  model_type_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerModelTypeOutputOnly {
  _external_station_id: Bigint
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes_model {
  """value: broadcast"""
  broadcast

  """value: program"""
  program

  """value: item"""
  item

  """value: campaign"""
  campaign

  """value: presenter"""
  presenter

  """value: contact"""
  contact

  """value: external"""
  external
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}

enum PluxboxRadiomanagerPluxboxRadiomanagergetModelTypeById_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistPresentersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistPresenters {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/presenters"
  """
  next_page_url: String

  """
  Example: "/api/v2/presenters"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/presenters"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerPresenterResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistPresenters {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/presenters"
  """
  next_page_url: String

  """
  Example: "/api/v2/presenters"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/presenters"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerPresenterResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterResult & PluxboxRadiomanagerPluxboxRadiomanagerPresenterOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenter_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String
  programs: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcastsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterResult implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenter_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String!
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String
  programs: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcastsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_typeOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components {
  programs: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programsOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcastsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_typeOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/programs?presenter_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/programs?presenter_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs_params {
  """
  Example: "1"
  """
  presenter_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_programs_params {
  """
  Example: "1"
  """
  presenter_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/broadcasts?presenter_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "ListBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/broadcasts?presenter_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "ListBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  presenter_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  presenter_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type {
  """
  Example: "https://radiomanager.pluxbox.com/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerPresenterRelations_schemas_components_model_type_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistPresenters_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistProgramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistPrograms {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/programs"
  """
  next_page_url: String

  """
  Example: "/api/v2/programs"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/programs"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerProgramResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistPrograms {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/programs"
  """
  next_page_url: String

  """
  Example: "/api/v2/programs"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/programs"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerProgramResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramResult & PluxboxRadiomanagerPluxboxRadiomanagerProgramOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerProgram_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String!

  """Example: false"""
  disabled: Boolean

  """Example: 1"""
  genre_id: Bigint

  """Example: 1"""
  group_id: Bigint

  """
  Example: ""
  """
  description: String

  """
  Example: "Foo"
  """
  short_name: String

  """
  Example: "FooBar"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: false"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: 1"""
  pty_code_id: Bigint
  genre: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocksOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcastsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presentersOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tagsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_groupOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramResult implements PluxboxRadiomanagerPluxboxRadiomanagerProgramOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerProgram_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String!

  """Example: false"""
  disabled: Boolean

  """Example: 1"""
  genre_id: Bigint

  """Example: 1"""
  group_id: Bigint

  """
  Example: ""
  """
  description: String

  """
  Example: "Foo"
  """
  short_name: String

  """
  Example: "FooBar"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: false"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: 1"""
  pty_code_id: Bigint
  genre: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocksOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcastsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presentersOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tagsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_groupOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgram_schemas_components {
  """Example: 1"""
  model_type_id: Bigint!
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String!

  """Example: false"""
  disabled: Boolean

  """Example: 1"""
  genre_id: Bigint

  """Example: 1"""
  group_id: Bigint

  """
  Example: ""
  """
  description: String

  """
  Example: "Foo"
  """
  short_name: String

  """
  Example: "FooBar"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: false"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: 1"""
  pty_code_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components {
  genre: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genreOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_itemsOutput
  blocks: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocksOutput
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcastsOutput
  presenters: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presentersOutput
  tags: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tagsOutput
  model_type: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_typeOutput
  group: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_groupOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genreOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre {
  """
  Example: "https://radiomanager.io/api/v2/genres/1"
  """
  href: String

  """
  Example: "Genre"
  """
  model: String

  """
  Example: "getGenreById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre {
  """
  Example: "https://radiomanager.io/api/v2/genres/1"
  """
  href: String

  """
  Example: "Genre"
  """
  model: String

  """
  Example: "getGenreById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_genre_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items {
  """
  Example: "https://radiomanager.io/api/v2/items?program_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items {
  """
  Example: "https://radiomanager.io/api/v2/items?program_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items_params {
  """
  Example: "1"
  """
  program_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_items_params {
  """
  Example: "1"
  """
  program_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocksOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?program_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks {
  """
  Example: "https://radiomanager.io/api/v2/blocks?program_id=1"
  """
  href: String

  """
  Example: "Block"
  """
  model: String

  """
  Example: "getBlockById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks_params {
  """
  Example: "1"
  """
  program_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_blocks_params {
  """
  Example: "1"
  """
  program_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?program_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?program_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  program_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_broadcasts_params {
  """
  Example: "1"
  """
  program_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presentersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?program_id=1"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters {
  """
  Example: "https://radiomanager.io/api/v2/presenters?program_id=1"
  """
  href: String

  """
  Example: "Presenter"
  """
  model: String

  """
  Example: "listPresenters"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters_params {
  """
  Example: "1"
  """
  program_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_presenters_params {
  """
  Example: "1"
  """
  program_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?program_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags {
  """
  Example: "https://radiomanager.io/api/v2/tags?program_id=1"
  """
  href: String

  """
  Example: "Tag"
  """
  model: String

  """
  Example: "listTags"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags_params {
  """
  Example: "1"
  """
  program_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_tags_params {
  """
  Example: "1"
  """
  program_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_typeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type {
  """
  Example: "https://radiomanager.io/api/v2/model_types/1"
  """
  href: String

  """
  Example: "ModelType"
  """
  model: String

  """
  Example: "getModelTypeById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_model_type_params {
  """
  Example: "1"
  """
  id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_groupOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group {
  """
  Example: "https://radiomanager.io/api/v2/groups/1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "getGroupById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group {
  """
  Example: "https://radiomanager.io/api/v2/groups/1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "getGroupById"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group_params {
  """
  Example: "1"
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerProgramRelations_schemas_components_group_params {
  """
  Example: "1"
  """
  id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistPrograms_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerStationResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerStationResult {
  station: PluxboxRadiomanagerPluxboxRadiomanagerStationResult_stationOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerStationResult {
  station: PluxboxRadiomanagerPluxboxRadiomanagerStationResult_stationOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerStationResult_stationOutput implements PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station {
  """
  Example: "1"
  """
  id: Int

  """
  Example: "stationname"
  """
  name: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "stationname"
  """
  system_name: String

  """
  Example: "stationname"
  """
  short_name: String

  """
  Example: "stationname"
  """
  medium_name: String

  """
  Example: "none"
  """
  website: String

  """
  Example: "station@name.com"
  """
  email: String
  keywords: [String]

  """
  Example: "description"
  """
  description: String

  """
  Example: "00313552222222"
  """
  sms: String

  """
  Example: "00313552222222"
  """
  telephone: String

  """
  Example: "3571"
  """
  genre_id: Int

  """
  Example: "Dutch"
  """
  language: String

  """
  Example: "true"
  """
  active: Boolean

  """
  Example: "none"
  """
  logo_rectangle: String

  """
  Example: "none"
  """
  logo_128x128: String

  """
  Example: "none"
  """
  logo_320x320: String

  """
  Example: "none"
  """
  logo_600x600: String

  """
  Example: "none"
  """
  pay_off: String

  """
  Example: "10"
  """
  pty_code: Int

  """
  Example: "rds"
  """
  pty_type: String

  """
  Example: "none"
  """
  station_key: String

  """
  Example: "Europe/Amsterdam"
  """
  timezone: String

  """
  Example: "my organisation"
  """
  metadataradio_organisation: String

  """
  Example: "1"
  """
  metadataradio_station_id: String
  start_days: PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station_start_daysOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station {
  """
  Example: "1"
  """
  id: Int

  """
  Example: "stationname"
  """
  name: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "stationname"
  """
  system_name: String

  """
  Example: "stationname"
  """
  short_name: String

  """
  Example: "stationname"
  """
  medium_name: String

  """
  Example: "none"
  """
  website: String

  """
  Example: "station@name.com"
  """
  email: String
  keywords: [String]

  """
  Example: "description"
  """
  description: String

  """
  Example: "00313552222222"
  """
  sms: String

  """
  Example: "00313552222222"
  """
  telephone: String

  """
  Example: "3571"
  """
  genre_id: Int

  """
  Example: "Dutch"
  """
  language: String

  """
  Example: "true"
  """
  active: Boolean

  """
  Example: "none"
  """
  logo_rectangle: String

  """
  Example: "none"
  """
  logo_128x128: String

  """
  Example: "none"
  """
  logo_320x320: String

  """
  Example: "none"
  """
  logo_600x600: String

  """
  Example: "none"
  """
  pay_off: String

  """
  Example: "10"
  """
  pty_code: Int

  """
  Example: "rds"
  """
  pty_type: String

  """
  Example: "none"
  """
  station_key: String

  """
  Example: "Europe/Amsterdam"
  """
  timezone: String

  """
  Example: "my organisation"
  """
  metadataradio_organisation: String

  """
  Example: "1"
  """
  metadataradio_station_id: String
  start_days: PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station_start_daysOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station_start_daysOutput implements PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station_start_days {
  """
  Example: "6:00"
  """
  monday: String

  """
  Example: "6:00"
  """
  tuesday: String

  """
  Example: "6:00"
  """
  wednesday: String

  """
  Example: "6:00"
  """
  thursday: String

  """
  Example: "6:00"
  """
  friday: String

  """
  Example: "6:00"
  """
  saturday: String

  """
  Example: "6:00"
  """
  sunday: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerStationResult_station_start_days {
  """
  Example: "6:00"
  """
  monday: String

  """
  Example: "6:00"
  """
  tuesday: String

  """
  Example: "6:00"
  """
  wednesday: String

  """
  Example: "6:00"
  """
  thursday: String

  """
  Example: "6:00"
  """
  friday: String

  """
  Example: "6:00"
  """
  saturday: String

  """
  Example: "6:00"
  """
  sunday: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistTagsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistTags {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/tags"
  """
  next_page_url: String

  """
  Example: "/api/v2/tags"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerTagResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistTags {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/tags"
  """
  next_page_url: String

  """
  Example: "/api/v2/tags"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerTagResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagResult & PluxboxRadiomanagerPluxboxRadiomanagerTagOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerTag_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerTagRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """
  Example: "FooBar"
  """
  name: String!
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contactsOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_itemsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagResult implements PluxboxRadiomanagerPluxboxRadiomanagerTagOutputOnly_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerTag_schemas_components & PluxboxRadiomanagerPluxboxRadiomanagerTagRelations {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint

  """
  Example: "FooBar"
  """
  name: String!
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contactsOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_itemsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagOutputOnly_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  deleted_at: String
  _external_station_id: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTag_schemas_components {
  """
  Example: "FooBar"
  """
  name: String!
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations {
  broadcasts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcastsOutput
  programs: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programsOutput
  contacts: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contactsOutput
  items: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_itemsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcastsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?tag_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts {
  """
  Example: "https://radiomanager.io/api/v2/broadcasts?tag_id=1"
  """
  href: String

  """
  Example: "Broadcast"
  """
  model: String

  """
  Example: "listBroadcasts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts_params {
  """
  Example: "1"
  """
  tag_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_broadcasts_params {
  """
  Example: "1"
  """
  tag_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?tag_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs {
  """
  Example: "https://radiomanager.io/api/v2/programs?tag_id=1"
  """
  href: String

  """
  Example: "Program"
  """
  model: String

  """
  Example: "listPrograms"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs_params {
  """
  Example: "1"
  """
  tag_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_programs_params {
  """
  Example: "1"
  """
  tag_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contactsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?tag_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts {
  """
  Example: "https://radiomanager.io/api/v2/contacts?tag_id=1"
  """
  href: String

  """
  Example: "Contact"
  """
  model: String

  """
  Example: "listContacts"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts_params {
  """
  Example: "1"
  """
  tag_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_contacts_params {
  """
  Example: "1"
  """
  tag_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_itemsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?tag_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items {
  """
  Example: "https://radiomanager.io/api/v2/items?tag_id=1"
  """
  href: String

  """
  Example: "Item"
  """
  model: String

  """
  Example: "listItems"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items_params {
  """
  Example: "1"
  """
  tag_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTagRelations_items_params {
  """
  Example: "1"
  """
  tag_id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistTags_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerTextString_schemas_componentsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerTextString_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "Now Playing: Something something Purple Haze"
  """
  content: String!

  """
  Example: "default"
  """
  name: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerTextString_schemas_components {
  """Example: 1"""
  id: Bigint!

  """
  Example: "Now Playing: Something something Purple Haze"
  """
  content: String!

  """
  Example: "default"
  """
  name: String!

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerlistUsersOutput implements PluxboxRadiomanagerPluxboxRadiomanagerlistUsers {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/users"
  """
  next_page_url: String

  """
  Example: "/api/v2/users"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/users"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerUserResultOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerlistUsers {
  """Example: 1"""
  current_page: Bigint

  """Example: 1"""
  from: Bigint

  """Example: 1"""
  last_page: Bigint

  """
  Example: "/users"
  """
  next_page_url: String

  """
  Example: "/api/v2/users"
  """
  path: String

  """Example: 50"""
  per_page: Bigint

  """
  Example: "/users"
  """
  prev_page_url: String

  """Example: 1"""
  to: Bigint

  """Example: 1"""
  total: Bigint
  results: [PluxboxRadiomanagerPluxboxRadiomanagerUserResultOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult {
  """Example: 1"""
  id: Bigint!

  """
  Example: "info@example.com"
  """
  email: String!

  """
  Example: "Foo"
  """
  firstname: String!

  """
  Example: "Bar"
  """
  lastname: String!

  """
  Example: "036-12345678910"
  """
  phone: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """Example: true"""
  active: Boolean
  settings: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_settingsOutput

  """
  Example: "nl_NL"
  """
  language: Boolean

  """Example: 1"""
  active_external_station_id: Bigint
  roles: [PluxboxRadiomanagerPluxboxRadiomanagerUserResult_rolesOutput]
  groups: [PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groupsOutput]
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult {
  """Example: 1"""
  id: Bigint!

  """
  Example: "info@example.com"
  """
  email: String!

  """
  Example: "Foo"
  """
  firstname: String!

  """
  Example: "Bar"
  """
  lastname: String!

  """
  Example: "036-12345678910"
  """
  phone: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  created_at: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  updated_at: String

  """Example: true"""
  active: Boolean
  settings: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_settingsOutput

  """
  Example: "nl_NL"
  """
  language: Boolean

  """Example: 1"""
  active_external_station_id: Bigint
  roles: [PluxboxRadiomanagerPluxboxRadiomanagerUserResult_rolesOutput]
  groups: [PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groupsOutput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResult_settingsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult_settings {
  """Example: true"""
  showSideBar: Boolean

  """Example: true"""
  showSocialBar: Boolean

  """Example: true"""
  showCheckboxColumn: Boolean

  """Example: true"""
  showTimeColumn: Boolean

  """Example: true"""
  showSpeechTime: Boolean

  """Example: 50"""
  zoomFactor: Bigint
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult_settings {
  """Example: true"""
  showSideBar: Boolean

  """Example: true"""
  showSocialBar: Boolean

  """Example: true"""
  showCheckboxColumn: Boolean

  """Example: true"""
  showTimeColumn: Boolean

  """Example: true"""
  showSpeechTime: Boolean

  """Example: 50"""
  zoomFactor: Bigint
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResult_rolesOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles {
  """
  Example: "https://radiomanager.io/api/v2/roles?user_id=1"
  """
  href: String

  """
  Example: "Role"
  """
  model: String

  """
  Example: "listRoles"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles {
  """
  Example: "https://radiomanager.io/api/v2/roles?user_id=1"
  """
  href: String

  """
  Example: "Role"
  """
  model: String

  """
  Example: "listRoles"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles_params {
  """
  Example: "1"
  """
  user_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult_roles_params {
  """
  Example: "1"
  """
  user_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groupsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups {
  """
  Example: "https://radiomanager.io/api/v2/groups?user_id=1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "listGroups"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups_paramsOutput
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups {
  """
  Example: "https://radiomanager.io/api/v2/groups?user_id=1"
  """
  href: String

  """
  Example: "Group"
  """
  model: String

  """
  Example: "listGroups"
  """
  operation: String
  params: PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups_paramsOutput
}
type PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups_paramsOutput implements PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups_params {
  """
  Example: "1"
  """
  user_id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagerUserResult_groups_params {
  """
  Example: "1"
  """
  user_id: Int
}

enum PluxboxRadiomanagerPluxboxRadiomanagerlistUsers_order_direction {
  """value: asc"""
  asc

  """value: desc"""
  desc
}
type PluxboxRadiomanagerPluxboxRadiomanagerVisualResultOutput implements PluxboxRadiomanagerPluxboxRadiomanagerVisualResult {
  """
  Example: "BASE64STRING"
  """
  value: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerVisualResult {
  """
  Example: "BASE64STRING"
  """
  value: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateBroadcastOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateBroadcast {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateBroadcast {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerBroadcastDataInput {
  """Example: 1"""
  program_id: Bigint

  """Example: 2"""
  model_type_id: Bigint

  """Example: 1"""
  station_id: Bigint
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: 2611"""
  genre_id: Bigint

  """
  Example: "FooBar BarFoo"
  """
  description: String

  """
  Example: "foobar"
  """
  short_name: String

  """
  Example: "foobarshow"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: true"""
  published: Boolean

  """
  Example: "1234abcd"
  """
  repetition_uid: String

  """
  Example: "1 week"
  """
  repetition_type: PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type_2

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_end: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  repetition_start: String
  repetition_days: String

  """
  Example: "1"
  """
  pty_code_id: Bigint

  """Example: true"""
  planned_in_epg: Int

  """Example: 1"""
  group_id: Bigint
  tags: [Int]
  presenters: [Int]
}

enum PluxboxRadiomanagerPluxboxRadiomanagerBroadcast_repetition_type_2 {
  """value: 1 week"""
  _1_week

  """value: 2 week"""
  _2_week

  """value: 4 week"""
  _4_week

  """value: 1 month"""
  _1_month
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteBroadcastByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteBroadcastById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteBroadcastById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdateBroadcastByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateBroadcastById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateBroadcastById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateCampaignOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateCampaign {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateCampaign {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerCampaignDataInput {
  """Example: 1"""
  model_type_id: Bigint
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  start: String

  """
  Example: "2016-01-11T22:01:11+02:00"
  """
  stop: String

  """Example: true"""
  recommended: Boolean

  """
  Example: "<div class=\\'rm-content\\'></div>\\n"
  """
  description: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteCampaignByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteCampaignById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteCampaignById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdateCampaignByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateCampaignById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateCampaignById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateContactOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateContact {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateContact {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerContactDataInput {
  """Example: 1"""
  model_type_id: Bigint
  field_values: Record

  """
  Example: "info@example.com"
  """
  email: String

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """
  Example: "035-12345678910"
  """
  phone: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteContactByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteContactById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteContactById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdateContactByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateContactById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateContactById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateItemOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateItem {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateItem {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerItemDataInput {
  """Example: 14"""
  model_type_id: Bigint

  """Example: 1"""
  block_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """
  Example: "scheduled"
  """
  status: PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status_2

  """Example: 0"""
  import: Bigint

  """Example: 1"""
  campaign_id: Bigint

  """Example: false"""
  recommended: Boolean

  """Example: 0"""
  station_draft_id: Bigint

  """Example: 0"""
  program_draft_id: Bigint

  """Example: 0"""
  user_draft_id: Bigint

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String

  """Example: 1"""
  _previous_id: Bigint

  """Example: 1"""
  _before_id: Bigint
  contacts: [Int]
  tags: [Int]
}

enum PluxboxRadiomanagerPluxboxRadiomanagerItem_0__status_2 {
  """value: scheduled"""
  scheduled

  """value: playing"""
  playing

  """value: played"""
  played
}

scalar Unknown
type PluxboxRadiomanagerPluxboxRadiomanagerupdateItemByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateItemById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateItemById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}

input PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput {
  """Example: 14"""
  model_type_id: Bigint

  """
  Example: "0"
  """
  external_id: String
  field_values: Record

  """
  Example: "FooBar Show"
  """
  title: String

  """Example: 120"""
  duration: Bigint

  """
  Example: "2017-06-23T12:00:00+02:00"
  """
  start: String

  """Example: false"""
  recommended: Boolean

  """Example: false"""
  static_start: Boolean

  """
  Example: "<div class="rm-content">Details of item</div>\\n"
  """
  details: String
  contacts: [Int]
  tags: [Int]

  """Example: 1"""
  broadcast_id: Int
}
type PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTimingOutput implements PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTiming {
  """
  Example: "true"
  """
  success: Boolean
}
interface PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTiming {
  """
  Example: "true"
  """
  success: Boolean
}

input PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTiming_requestBodyInput {
  """
  Example: "2022-01-01 12:00"
  """
  start: String
  allow_playlist_past: Int
  broadcast_id: Bigint
  items: [PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructureOutput implements PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructure {
  """
  Example: "true"
  """
  success: Boolean
}
interface PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructure {
  """
  Example: "true"
  """
  success: Boolean
}

input PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructure_requestBodyInput {
  """
  Example: "2022-01-01 12:00"
  """
  start: String
  allow_playlist_past: Int
  broadcast_id: Bigint
  items: [PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMergeOutput implements PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMerge {
  """
  Example: "true"
  """
  success: Boolean
}
interface PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMerge {
  """
  Example: "true"
  """
  success: Boolean
}

input PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMerge_requestBodyInput {
  """
  Example: "2022-01-01 12:00"
  """
  start: String
  allow_playlist_past: Int
  broadcast_id: Bigint
  items: [PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput]
}
type PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItemOutput implements PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItem {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItem {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}

input PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItem_requestBodyInput {
  """ID of Item to be stopped **(Required)**"""
  id: Bigint
}
type PluxboxRadiomanagerPluxboxRadiomanagercreatePresenterOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreatePresenter {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreatePresenter {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerPresenterDataInput {
  """Example: 1"""
  model_type_id: Bigint
  field_values: Record

  """
  Example: "Foo"
  """
  firstname: String

  """
  Example: "Bar"
  """
  lastname: String

  """Example: true"""
  active: Boolean

  """
  Example: "FooBar"
  """
  name: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeletePresenterByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeletePresenterById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeletePresenterById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdatePresenterByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdatePresenterById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdatePresenterById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateProgramOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateProgram {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateProgram {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerProgramResultInput {
  """Example: 1"""
  model_type_id: Bigint
  field_values: Record

  """
  Example: "FooBar"
  """
  title: String

  """Example: false"""
  disabled: Boolean

  """Example: 1"""
  genre_id: Bigint

  """Example: 1"""
  group_id: Bigint

  """
  Example: ""
  """
  description: String

  """
  Example: "Foo"
  """
  short_name: String

  """
  Example: "FooBar"
  """
  medium_name: String

  """
  Example: "http://example.com/"
  """
  website: String

  """
  Example: "info@example.com"
  """
  email: String

  """Example: false"""
  recommended: Boolean

  """
  Example: "English"
  """
  language: String

  """Example: 1"""
  pty_code_id: Bigint
  tags: [Int]
  presenters: [Int]
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteProgramByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteProgramById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteProgramById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdateProgramByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateProgramById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateProgramById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagercreateTagOutput implements PluxboxRadiomanagerPluxboxRadiomanagercreateTag {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}
interface PluxboxRadiomanagerPluxboxRadiomanagercreateTag {
  """
  Describes whatever has succeeded
  
  Example: "Successfully posted an object!"
  """
  success: String

  """
  ID of the newly posted object
  
  Example: 1
  """
  id: Int
}

input PluxboxRadiomanagerPluxboxRadiomanagerTagDataInput_schemas_componentsInput {
  """
  Example: "FooBar"
  """
  name: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteTagByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteTagById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteTagById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerupdateTagByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerupdateTagById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerupdateTagById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerdeleteUserByIdOutput implements PluxboxRadiomanagerPluxboxRadiomanagerdeleteUserById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerdeleteUserById {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
type PluxboxRadiomanagerPluxboxRadiomanagerinviteUserByMailOutput implements PluxboxRadiomanagerPluxboxRadiomanagerinviteUserByMail {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}
interface PluxboxRadiomanagerPluxboxRadiomanagerinviteUserByMail {
  """
  Describes whatever has succeeded
  
  Example: "Successfully done the thing!"
  """
  success: String
}

input PluxboxRadiomanagerPluxboxRadiomanagerInviteUserData_schemas_componentsInput {
  """
  Example: "info@example.com"
  """
  email: String
  role_ids: [Int]
}

"""
This OpenAPI 3 Document describes the functionality of the API v2 of RadioManager. Note that no rights can be derived from this Document and the true functionality of the API might differ.
"""
type PluxboxRadiomanagerPluxboxRadiomanagerQuery {
  """
  Get a list of all blocks currently in your station. This feature supports pagination and will give a maximum of 50 blocks back.
  
  Equivalent to GET /blocks
  
  @Action
  """
  listBlocks(
    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Minimum start date *(Optional)*"""
    start_min: String

    """Maximum start date *(Optional)*"""
    start_max: String

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistBlocks_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistBlocksOutput

  """
  Get block by id
  
  Equivalent to GET /blocks/{id}
  
  @Action
  """
  getBlockById(
    """ID of Block **(Required)**"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput

  """
  Get currently playing Block
  
  Equivalent to GET /blocks/current
  
  @Action
  """
  getCurrentBlock: PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput

  """
  Get currently upcoming Block
  
  Equivalent to GET /blocks/next
  
  @Action
  """
  getNextBlock: PluxboxRadiomanagerPluxboxRadiomanagerBlockResultOutput

  """
  List all broadcasts.
  
  Equivalent to GET /broadcasts
  
  @Action
  """
  listBroadcasts(
    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Search on Block ID *(Optional)* \`(Relation)\`"""
    block_id: Bigint

    """Search on ModelType ID *(Optional)* \`(Relation)\`"""
    model_type_id: Bigint

    """Search on Tag ID *(Optional)* \`(Relation)\`"""
    tag_id: Bigint

    """Search on Presenter ID *(Optional)* \`(Relation)\`"""
    presenter_id: Bigint

    """Search on Genre ID *(Optional)* \`(Relation)\`"""
    genre_id: Bigint

    """Search on Group ID *(Optional)* \`(Relation)\`"""
    group_id: Bigint

    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Checks if item is in EPG *(Optional)*"""
    planned_in_epg: Bigint

    """Minimum start date *(Optional)*"""
    start_min: String

    """Maximum start date *(Optional)*"""
    start_max: String

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcasts_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistBroadcastsOutput

  """
  Get broadcast by id
  
  Equivalent to GET /broadcasts/{id}
  
  @Action
  """
  getBroadcastById(
    """ID of Broadcast **(Required)**"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput

  """
  Get currently playing Broadcast
  
  Equivalent to GET /broadcasts/current
  
  @Action
  """
  getCurrentBroadcast(
    """Show Unpublished *(Optional)*"""
    withunpublished: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput

  """
  Get currently upcoming Broadcast
  
  Equivalent to GET /broadcasts/next
  
  @Action
  """
  getNextBroadcast(
    """Show Unpublished *(Optional)*"""
    withunpublished: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerBroadcastResultOutput

  """
  Get a list of broadcasts as Programming guide, seperated per day
  
  Equivalent to GET /broadcasts/epg
  
  @Action
  """
  getEpgByDate(
    """Date *(Optional)*"""
    date: String

    """Show Unpublished *(Optional)*"""
    withunpublished: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_componentsOutput

  """
  Get a list of broadcasts as Programming guide for 1 day
  
  Equivalent to GET /broadcasts/epg/daily
  
  @Action
  """
  getDailyEpg(
    """Date *(Optional)*"""
    date: String

    """Show Unpublished *(Optional)*"""
    withunpublished: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_componentsOutput

  """
  Get a list of broadcasts as Programming guide for 7 days, seperated per day
  
  Equivalent to GET /broadcasts/epg/weekly
  
  @Action
  """
  getWeeklyEpg(
    """Date *(Optional)*"""
    date: String

    """Show Unpublished *(Optional)*"""
    withunpublished: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerEPGResults_schemas_componentsOutput

  """
  Download a rundown in printable format as HTML inside the JSON repsonse
  
  Equivalent to GET /broadcasts/print/{id}
  
  @Action
  """
  printBroadcastById(
    """ID of Broadcast **(Required)**"""
    id: Bigint!

    """The print template to be used *(Optional)*"""
    template_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerprintBroadcastByIdOutput

  """
  List all campaigns.
  
  Equivalent to GET /campaigns
  
  @Action
  """
  listCampaigns(
    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Search on ModelType ID *(Optional)* \`(Relation)\`"""
    model_type_id: Bigint

    """Minimum start date *(Optional)*"""
    start_min: String

    """Maximum start date *(Optional)*"""
    start_max: String

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistCampaigns_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistCampaignsOutput

  """
  Get campaign by id
  
  Equivalent to GET /campaigns/{id}
  
  @Action
  """
  getCampaignById(
    """ID of Campaign **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerCampaignResultOutput

  """
  List all contacts.
  
  Equivalent to GET /contacts
  
  @Action
  """
  listContacts(
    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Search on ModelType ID *(Optional)* \`(Relation)\`"""
    model_type_id: Bigint

    """Search on Tag ID *(Optional)* \`(Relation)\`"""
    tag_id: Bigint

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistContacts_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistContactsOutput

  """
  Get contact by id
  
  Equivalent to GET /contacts/{id}
  
  @Action
  """
  getContactById(
    """ID of Contact **(Required)**"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerContactResultOutput

  """
  List all genres.
  
  Equivalent to GET /genres
  
  @Action
  """
  listGenres(
    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistGenres_order_direction
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistGenresOutput

  """
  Get genre by id
  
  Equivalent to GET /genres/{id}
  
  @Action
  """
  getGenreById(id: Bigint!): PluxboxRadiomanagerPluxboxRadiomanagerGenreResultOutput

  """
  List all groups.
  
  Equivalent to GET /groups
  
  @Action
  """
  listGroups(
    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Search on User ID *(Optional)* \`(Relation)\`"""
    user_id: Bigint

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistGroups_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistGroupsOutput

  """
  Get group by id
  
  Equivalent to GET /groups/{id}
  
  @Action
  """
  getGroupById(
    """id of Group"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerGroupResultOutput

  """
  Get a list of all the items currently in your station. This feature supports pagination and will give a maximum results of 50 items back.
  
  Equivalent to GET /items
  
  @Action
  """
  listItems(
    """Search on Block ID *(Optional)* \`(Relation)\`"""
    block_id: Bigint

    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on ModelType ID *(Optional)* \`(Relation)\`"""
    model_type_id: Bigint

    """Search on Tag ID *(Optional)* \`(Relation)\`"""
    tag_id: Bigint

    """Search on Campaign ID *(Optional)* \`(Relation)\`"""
    campaign_id: Bigint

    """Search on Contact ID *(Optional)* \`(Relation)\`"""
    contact_id: Bigint

    """Search on Program Draft ID *(Optional)*"""
    program_draft_id: Bigint

    """Search on User Draft ID *(Optional)*"""
    user_draft_id: Bigint

    """Search on Station Draft ID *(Optional)*"""
    station_draft_id: Bigint

    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Search on External ID *(Optional)*"""
    external_id: String

    """Minimum duration (seconds) *(Optional)*"""
    duration_min: Int

    """Maximum duration (seconds) *(Optional)*"""
    duration_max: Int

    """Play Status of item *(Optional)*"""
    status: PluxboxRadiomanagerPluxboxRadiomanagerlistItems_status

    """Minimum start date *(Optional)*"""
    start_min: String

    """Maximum start date *(Optional)*"""
    start_max: String

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistItems_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistItemsOutput

  """
  Read item by id.
  
  Equivalent to GET /items/{id}
  
  @Action
  """
  getItemById(
    """ID of Item **(Required)**"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput

  """
  Get current Item
  
  Equivalent to GET /items/current
  
  @Action
  """
  getCurrentItem(
    """Show last played item if there is no current item*(Optional)*"""
    lastplayed: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput

  """
  List all modelTypes.
  
  Equivalent to GET /model_types
  
  @Action
  """
  listModelTypes(
    """Search on Program ID *(Optional)*"""
    program_id: Bigint

    """Search on Broadcast ID *(Optional)*"""
    broadcast_id: Bigint

    """Search on Item ID *(Optional)*"""
    item_id: Bigint

    """Search on Campaign ID *(Optional)*"""
    campaign_id: Bigint

    """Search on Presenter ID *(Optional)*"""
    presenter_id: Bigint

    """Search on Contact ID *(Optional)*"""
    contact_id: Bigint

    """Search Modeltypes for certain Model *(Optional)*"""
    model: PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes_model

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypes_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistModelTypesOutput

  """
  Get modelType by id
  
  Equivalent to GET /model_types/{id}
  
  @Action
  """
  getModelTypeById(
    """ID of ModelType **(Required)**"""
    id: Bigint!

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagergetModelTypeById_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerModelTypeResultOutput

  """
  List all presenters.
  
  Equivalent to GET /presenters
  
  @Action
  """
  listPresenters(
    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on ModelType ID (Optional)"""
    model_type_id: Bigint

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistPresenters_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistPresentersOutput

  """
  Get presenter by id
  
  Equivalent to GET /presenters/{id}
  
  @Action
  """
  getPresenterById(
    """id of Presenter"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerPresenterResultOutput

  """
  List all programs.
  
  Equivalent to GET /programs
  
  @Action
  """
  listPrograms(
    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on ModelType ID *(Optional)* \`(Relation)\`"""
    model_type_id: Bigint

    """Search on Tag ID *(Optional)* \`(Relation)\`"""
    tag_id: Bigint

    """Search on Presenter ID *(Optional)* \`(Relation)\`"""
    presenter_id: Bigint

    """Search on Genre ID *(Optional)*"""
    genre_id: Bigint

    """Search on Group ID *(Optional)*"""
    group_id: Bigint

    """Search on Block ID *(Optional)* \`(Relation)\`"""
    block_id: Bigint

    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Search on Disabled status *(Optional)*"""
    disabled: Int

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistPrograms_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistProgramsOutput

  """
  Get program by id
  
  Equivalent to GET /programs/{id}
  
  @Action
  """
  getProgramById(
    """ID of Program **(Required)**"""
    id: Bigint!

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerProgramResultOutput

  """
  Get own station only
  
  Equivalent to GET /station
  
  @Action
  """
  getStation: PluxboxRadiomanagerPluxboxRadiomanagerStationResultOutput

  """
  Get a list of all the tags currently in your station. This feature supports pagination and will give a maximum results of 50 tags back.
  
  Equivalent to GET /tags
  
  @Action
  """
  listTags(
    """Search on Program ID *(Optional)* \`(Relation)\`"""
    program_id: Bigint

    """Search on Item ID *(Optional)* \`(Relation)\`"""
    item_id: Bigint

    """Search on Broadcast ID *(Optional)* \`(Relation)\`"""
    broadcast_id: Bigint

    """Search on Contact ID *(Optional)* \`(Relation)\`"""
    contact_id: Bigint

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistTags_order_direction

    """Query on a different (content providing) station *(Optional)*"""
    _external_station_id: Bigint
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistTagsOutput

  """
  Get tags by id
  
  Equivalent to GET /tags/{id}
  
  @Action
  """
  getTagById(
    """ID of Tag **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerTagResultOutput

  """
  Get RadioText/DAB String for publication based on String Templates
  
  Equivalent to GET /strings/{name}
  
  @Action
  """
  getStringsByName(
    """Name of String Template **(Required)**"""
    name: String!

    """Full model or content only **(Optional)**"""
    full_model: Boolean
  ): PluxboxRadiomanagerPluxboxRadiomanagerTextString_schemas_componentsOutput

  """
  List all users.
  
  Equivalent to GET /users
  
  @Action
  """
  listUsers(
    """Search on Role ID *(Optional)*"""
    role_id: Bigint

    """Search on Group ID *(Optional)*"""
    group_id: Bigint

    """Current page *(Optional)*"""
    page: Bigint

    """Results per page *(Optional)*"""
    limit: Bigint

    """Field to order the results *(Optional)*"""
    order_by: String

    """Direction of ordering *(Optional)*"""
    order_direction: PluxboxRadiomanagerPluxboxRadiomanagerlistUsers_order_direction
  ): PluxboxRadiomanagerPluxboxRadiomanagerlistUsersOutput

  """
  Get user by id
  
  Equivalent to GET /users/{id}
  
  @Action
  """
  getUserById(
    """id of User"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerUserResultOutput

  """
  Get VisualRadio Image as PNG for publication Base64 encoded inside a JSON object
  
  Equivalent to GET /visual
  
  @Action
  """
  getVisualSlide: PluxboxRadiomanagerPluxboxRadiomanagerVisualResultOutput
}

"""
This OpenAPI 3 Document describes the functionality of the API v2 of RadioManager. Note that no rights can be derived from this Document and the true functionality of the API might differ.
"""
type PluxboxRadiomanagerPluxboxRadiomanagerMutation {
  """
  Create broadcast.
  
  Equivalent to POST /broadcasts
  
  @Action
  """
  createBroadcast(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateBroadcastOutput

  """
  Delete broadcast by id
  
  Equivalent to DELETE /broadcasts/{id}
  
  @Action
  """
  deleteBroadcastById(
    """ID of Broadcast **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteBroadcastByIdOutput

  """
  Update broadcast by id
  
  Equivalent to PATCH /broadcasts/{id}
  
  @Action
  """
  updateBroadcastById(
    """ID of Broadcast **(Required)**"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerBroadcastDataInput
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateBroadcastByIdOutput

  """
  Create campaign.
  
  Equivalent to POST /campaigns
  
  @Action
  """
  createCampaign(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerCampaignDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateCampaignOutput

  """
  Delete campaign by id
  
  Equivalent to DELETE /campaigns/{id}
  
  @Action
  """
  deleteCampaignById(
    """ID of Campaign **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteCampaignByIdOutput

  """
  Update campaign by id
  
  Equivalent to PATCH /campaigns/{id}
  
  @Action
  """
  updateCampaignById(
    """ID of Campaign **(Required)**"""
    id: Bigint!

    """Data **(Optional)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerCampaignDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateCampaignByIdOutput

  """
  Create contact.
  
  Equivalent to POST /contacts
  
  @Action
  """
  createContact(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerContactDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateContactOutput

  """
  Delete contact by id
  
  Equivalent to DELETE /contacts/{id}
  
  @Action
  """
  deleteContactById(
    """ID of Contact **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteContactByIdOutput

  """
  Update contact by id
  
  Equivalent to PATCH /contacts/{id}
  
  @Action
  """
  updateContactById(
    """ID of Contact **(Required)**"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerContactDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateContactByIdOutput

  """
  Create item.
  
  Equivalent to POST /items
  
  @Action
  """
  createItem(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerItemDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateItemOutput

  """
  Delete item by id.
  
  Equivalent to DELETE /items/{id}
  
  @Action
  """
  deleteItemById(
    """ID of Item **(Required)**"""
    id: Bigint!
  ): Unknown

  """
  Update item by id.
  
  Equivalent to PATCH /items/{id}
  
  @Action
  """
  updateItemById(
    """ID of Item **(Required)**"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerItemDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateItemByIdOutput

  """
  Post current playing Item. Can be existing Item referenced by external_id. When Items are moved, this function **will not keep** Items' ModelType structure in rundown.
  
  Equivalent to POST /items/current/timing
  
  @Action
  """
  currentItemPostTiming(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput

  """
  Post current playing Item. Can be existing Item referenced by external_id. When Items are moved, this function **will attempt to** keep Items' ModelType structure in rundown.
  
  Equivalent to POST /items/current/structure
  
  @Action
  """
  currentItemPostStructure(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerImportItemInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerItemResultOutput

  """
  Post a playlist for a block. Existing Items can referenced by external_id. When Items are moved, this function **will not** keep Items' ModelType structure in rundown.
  
  Equivalent to POST /items/playlist/timing
  
  @Action
  """
  playlistPostTiming(
    """Data *(Required)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTiming_requestBodyInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostTimingOutput

  """
  Post a playlist for a block. Existing Items can referenced by external_id. When Items are moved, this function **will attempt to** keep Items' ModelType structure in rundown.
  
  Equivalent to POST /items/playlist/structure
  
  @Action
  """
  playlistPostStructure(
    """Data *(Required)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructure_requestBodyInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostStructureOutput

  """
  Post a playlist with 'keep structure' method, but do not remove previously imported items
  
  Equivalent to POST /items/playlist/merge
  
  @Action
  """
  playlistPostMerge(
    """Data *(Required)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMerge_requestBodyInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerplaylistPostMergeOutput

  """
  Set a current playing or specific item on played
  
  Equivalent to POST /items/stopcurrent
  
  @Action
  """
  stopCurrentItem(
    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItem_requestBodyInput
  ): PluxboxRadiomanagerPluxboxRadiomanagerstopCurrentItemOutput

  """
  Create presenter.
  
  Equivalent to POST /presenters
  
  @Action
  """
  createPresenter(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerPresenterDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreatePresenterOutput

  """
  Delete presenter by id
  
  Equivalent to DELETE /presenters/{id}
  
  @Action
  """
  deletePresenterById(
    """id of presenter"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeletePresenterByIdOutput

  """
  Update presenter by id
  
  Equivalent to PATCH /presenters/{id}
  
  @Action
  """
  updatePresenterById(
    """id of Presenter"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerPresenterDataInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdatePresenterByIdOutput

  """
  Create program.
  
  Equivalent to POST /programs
  
  @Action
  """
  createProgram(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerProgramResultInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateProgramOutput

  """
  Delete program by id
  
  Equivalent to DELETE /programs/{id}
  
  @Action
  """
  deleteProgramById(
    """ID of program **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteProgramByIdOutput

  """
  Update program by id
  
  Equivalent to PATCH /programs/{id}
  
  @Action
  """
  updateProgramById(
    """ID of Program **(Required)**"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerProgramResultInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateProgramByIdOutput

  """
  Create tag.
  
  Equivalent to POST /tags
  
  @Action
  """
  createTag(
    """Data **(Required)**"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerTagDataInput_schemas_componentsInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagercreateTagOutput

  """
  Delete tag by id
  
  Equivalent to DELETE /tags/{id}
  
  @Action
  """
  deleteTagById(
    """ID of Tag **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteTagByIdOutput

  """
  Update tag by id
  
  Equivalent to PATCH /tags/{id}
  
  @Action
  """
  updateTagById(
    """ID of Tag **(Required)**"""
    id: Bigint!

    """Data *(Optional)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerTagDataInput_schemas_componentsInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerupdateTagByIdOutput

  """
  Remove User from station by Id, will not actually delete a User record
  
  Equivalent to DELETE /users/{id}
  
  @Action
  """
  deleteUserById(
    """ID of User **(Required)**"""
    id: Bigint!
  ): PluxboxRadiomanagerPluxboxRadiomanagerdeleteUserByIdOutput

  """
  Invite user by mail
  
  Equivalent to POST /users/invite
  
  @Action
  """
  inviteUserByMail(
    """Data *(Required)*"""
    requestBody: PluxboxRadiomanagerPluxboxRadiomanagerInviteUserData_schemas_componentsInput!
  ): PluxboxRadiomanagerPluxboxRadiomanagerinviteUserByMailOutput
}

type MqttIntegrationMqttIntegrationPortal_clocksResponse {
  raw: String!
  data: MqttIntegrationMqttIntegrationPortal_clocks
}

type MqttIntegrationMqttIntegrationPortal_clocks {
  clock_id: Int
  name: String
  radio: String
  start_time: DateTime
  end_time: DateTime
  last_modified: DateTime
  items: [MqttIntegrationMqttIntegrationPortal_clocks_items!]
}

type MqttIntegrationMqttIntegrationPortal_clocks_items {
  item_id: Int
  name: String
  item_type: String
  broadcaster: String
  our_start_time: DateTime
  our_duration: String
}

type BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationFileObject {
  Guid: String
  StorageZoneName: String
  Path: String
  ObjectName: String
  Length: Int
  LastChanged: String
  ServerId: Int
  ArrayNumber: Int
  IsDirectory: Boolean
  UserId: String
  ContentType: String
  DateCreated: String
  StorageZoneId: Int
  Checksum: String
  ReplicatedZones: String
}

type BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationQuery {
  listFiles(path: String): [BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationFileObject]
}

type BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationMutation {
  deleteFile(path: String, fileName: String!): String!
  uploadFile(path: String, file: Upload!): String!
}

type IntegrationQuery {
  pluxbox_aws_s_3_bucket: PluxboxAwsS3Buckets3BucketQuery
  arla_arla_integration: ArlaArlaIntegrationarlaQuery
  mmi_id_generator_mmi_id_generator: MmiIdGeneratorMmiIdGeneratorMMIIDGeneratorQuery
  thesaurus_thesaurus: ThesaurusThesaurusthesaurusQuery
  pluxbox_radiomanager_pluxbox_radiomanager: PluxboxRadiomanagerPluxboxRadiomanagerQuery
  bunny_edge_storage_integration_bunny_edge_storage_integration: BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationQuery
}

type IntegrationMutation {
  pluxbox_aws_s_3_bucket: PluxboxAwsS3Buckets3BucketMutation
  radiomanager_component_epg_repetitions: RadiomanagerComponentEpgRepetitionsMutation
  pluxbox_radiomanager_pluxbox_radiomanager: PluxboxRadiomanagerPluxboxRadiomanagerMutation
  bunny_edge_storage_integration_bunny_edge_storage_integration: BunnyEdgeStorageIntegrationBunnyEdgeStorageIntegrationMutation
}

type ProcessesExecutors {
  sychronized_group_create(title: String, description: String, identifier: String, logo: String, visualradioLogo: String): ProcessOkResponse_sychronized_group_create
  sychronized_group_update(title: String, description: String, identifier: String, logo: String, visualradioLogo: String, id: String): ProcessOkResponse_sychronized_group_update
  sychronized_group_delete(id: String): ProcessOkResponse_sychronized_group_delete
  clear_database_database(input: String): ProcessOkResponse_clear_database_database
  clear_repetition_collection(input: String): ProcessOkResponse_clear_repetition_collection
  createItemsForRundown(broadcastId: String, podcastEpisodeId: String): ProcessOkResponse_createItemsForRundown
  clearItemCollection(input: String): ProcessOkResponse_clearItemCollection
  clear_fragment_database(input: String): ProcessOkResponse_clear_fragment_database
}

type ProcessOkResponse_sychronized_group_create implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

interface ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

enum ProcessStatus {
  OK
}

type ProcessOkResponse_sychronized_group_update implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_sychronized_group_delete implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_clear_database_database implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_clear_repetition_collection implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_createItemsForRundown implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_clearItemCollection implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type ProcessOkResponse_clear_fragment_database implements ProcessOkResponse {
  status: ProcessStatus!
  processName: String!
}

type EnvironmentUser {
  _id: ID!
  email: String!
  firstName: String
  lastName: String
  avatar: EnvironmentUserAvatar
  roleIds: [ID!]!
  groupIds: [ID!]!
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime

  """
  
  
  @Action
  """
  workspaces(limit: Int, offset: Int, first: Int, after: String, last: Int, before: String): EnvironmentWorkspacePaginator!

  """
  
  
  @Action
  """
  roles: [EnvironmentRole!]!

  """
  
  
  @Action
  """
  groups: [EnvironmentGroup!]!

  """
  
  
  @Action
  """
  hasAccessToWorkspace(id: ID!): Boolean!
}

type EnvironmentUserAvatar {
  base64Avatar: String
  mime: String!
}

type EnvironmentWorkspacePaginator {
  totalCount: Int!
  edges: [EnvironmentWorkspacePaginatorEdge!]!
  pageInfo: EnvironmentPaginatorPageInfo!
}

type EnvironmentWorkspacePaginatorEdge {
  cursor: String
  node: EnvironmentWorkspace
}

type EnvironmentWorkspace {
  _id: ID!
  title: String!
  systemName: String
  roleIds: [ID!]!
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime
}

type EnvironmentPaginatorPageInfo {
  endCursor: String
  startCursor: String
  hasNextPage: Boolean!
  hasPrevPage: Boolean!
}

type EnvironmentRole {
  _id: ID!
  title: String!
  permissionIds: [ID!]!
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  users(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [EnvironmentSortConfig_users_UsersSortFieldsType!]
    filters: EnvironmentUsersFilter

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentUserPaginator!
}

type EnvironmentUserPaginator {
  totalCount: Int!
  edges: [EnvironmentUserPaginatorEdge!]!
  pageInfo: EnvironmentPaginatorPageInfo!
}

type EnvironmentUserPaginatorEdge {
  cursor: String
  node: EnvironmentUser
}

input EnvironmentSortConfig_users_UsersSortFieldsType {
  field: EnvironmentUsersSortFields!
  direction: EnvironmentPaginateSortDirection
}

enum EnvironmentUsersSortFields {
  _id
  email
  firstName
  lastName
}

enum EnvironmentPaginateSortDirection {
  DESC
  ASC
}

input EnvironmentUsersFilter {
  _id: EnvironmentMongoIdFilter
  _createdAt: EnvironmentDateTimeFilter
  _updatedAt: EnvironmentDateTimeFilter
  firstName: EnvironmentStringFilter
  lastName: EnvironmentStringFilter
  email: EnvironmentStringFilter
  roleIds: EnvironmentArrayFilter
  groupIds: EnvironmentArrayFilter
  _and: [EnvironmentUsersFilter!]
  _or: [EnvironmentUsersFilter!]
}

input EnvironmentMongoIdFilter {
  """Matches values that are equal to a specified value."""
  eq: ID

  """Matches all values that are not equal to a specified value."""
  ne: ID

  """Matches values that are greater than a specified value."""
  gt: ID

  """Matches values that are greater than or equal to a specified value."""
  gte: ID

  """Matches values that are less than a specified value."""
  lt: ID

  """Matches values that are less than or equal to a specified value."""
  lte: ID

  """Matches any of the values specified in an array."""
  in: [ID]

  """Matches none of the values specified in an array."""
  nin: [ID]
}

input EnvironmentDateTimeFilter {
  """Matches values that are equal to a specified value."""
  eq: DateTime

  """Matches all values that are not equal to a specified value."""
  ne: DateTime

  """Matches values that are greater than a specified value."""
  gt: DateTime

  """Matches values that are greater than or equal to a specified value."""
  gte: DateTime

  """Matches values that are less than a specified value."""
  lt: DateTime

  """Matches values that are less than or equal to a specified value."""
  lte: DateTime

  """Matches any of the values specified in an array."""
  in: [DateTime]

  """Matches none of the values specified in an array."""
  nin: [DateTime]
}

input EnvironmentStringFilter {
  """Matches values that are equal to a specified value."""
  eq: String

  """Matches all values that are not equal to a specified value."""
  ne: String

  """Matches values that are greater than a specified value."""
  gt: String

  """Matches values that are greater than or equal to a specified value."""
  gte: String

  """Matches values that are less than a specified value."""
  lt: String

  """Matches values that are less than or equal to a specified value."""
  lte: String

  """Matches any of the values specified in an array."""
  in: [String]

  """Matches none of the values specified in an array."""
  nin: [String]

  """Matches values compared to a regex"""
  regex: Regex
}

input EnvironmentArrayFilter {
  """Matches values that are equal to a specified value."""
  eq: [ID!]

  """Matches all values that are not equal to a specified value."""
  ne: [ID!]

  """Matches values that are greater than a specified value."""
  gt: [ID!]

  """Matches values that are greater than or equal to a specified value."""
  gte: [ID!]

  """Matches values that are less than a specified value."""
  lt: [ID!]

  """Matches values that are less than or equal to a specified value."""
  lte: [ID!]

  """Matches any of the values specified in an array."""
  in: [[ID!]]

  """Matches none of the values specified in an array."""
  nin: [[ID!]]
}

"""Control what the query should do with trashed objects."""
enum EnvironmentTrashedPolicy {
  """Return objects that are not in the trash."""
  WITHOUT_TRASHED

  """Return objects no matter if they are in the trash or not."""
  WITH_TRASHED

  """Return objects that are in the trash."""
  ONLY_TRASHED
}

type EnvironmentGroup {
  _id: ID!
  title: String!
  description: String
  _createdAt: DateTime!
  _updatedAt: DateTime!
  _deletedAt: DateTime

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  users(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [EnvironmentSortConfig_users_UsersSortFieldsType!]
    filters: EnvironmentUsersFilter

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentUserPaginator!
}

type EnvironmentGroupQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentGroup

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [EnvironmentSortConfig_groups_GroupsSortFieldsType!]
    filters: EnvironmentGroupsFilter

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentGroupPaginator!
}

type EnvironmentGroupPaginator {
  totalCount: Int!
  edges: [EnvironmentGroupPaginatorEdge!]!
  pageInfo: EnvironmentPaginatorPageInfo!
}

type EnvironmentGroupPaginatorEdge {
  cursor: String
  node: EnvironmentGroup
}

input EnvironmentSortConfig_groups_GroupsSortFieldsType {
  field: EnvironmentGroupsSortFields!
  direction: EnvironmentPaginateSortDirection
}

enum EnvironmentGroupsSortFields {
  _id
  title
  description
}

input EnvironmentGroupsFilter {
  _id: EnvironmentMongoIdFilter
  title: EnvironmentStringFilter
  description: EnvironmentStringFilter
  _createdAt: EnvironmentDateTimeFilter
  _updatedAt: EnvironmentDateTimeFilter
  _and: [EnvironmentGroupsFilter!]
  _or: [EnvironmentGroupsFilter!]
}

type EnvironmentRoleQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentRole

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [EnvironmentSortConfig_roles_RolesSortFieldsType!]
    filters: EnvironmentRolesFilter

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentRolePaginator!
}

type EnvironmentRolePaginator {
  totalCount: Int!
  edges: [EnvironmentRolePaginatorEdge!]!
  pageInfo: EnvironmentPaginatorPageInfo!
}

type EnvironmentRolePaginatorEdge {
  cursor: String
  node: EnvironmentRole
}

input EnvironmentSortConfig_roles_RolesSortFieldsType {
  field: EnvironmentRolesSortFields!
  direction: EnvironmentPaginateSortDirection
}

enum EnvironmentRolesSortFields {
  _id
  title
}

input EnvironmentRolesFilter {
  _id: EnvironmentMongoIdFilter
  title: EnvironmentStringFilter
  _createdAt: EnvironmentDateTimeFilter
  _and: [EnvironmentRolesFilter!]
  _or: [EnvironmentRolesFilter!]
}

type EnvironmentUserQuery {
  """
  
  
  @Action
  """
  find(
    id: ID!

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentUser

  """
  Fetch the list of entries in the DB. No arguments provided -> fetch first 50 results from DB
  
  @Action
  """
  list(
    limit: Int
    offset: Int
    first: Int
    after: String
    last: Int
    before: String
    sort: [EnvironmentSortConfig_users_UsersSortFieldsType!]
    filters: EnvironmentUsersFilter

    """Control what the query should do with trashed objects."""
    trashedPolicy: EnvironmentTrashedPolicy = WITHOUT_TRASHED
  ): EnvironmentUserPaginator!
}

type EnvironmentGroupMutation {
  """
  
  
  @Action
  """
  create(group: EnvironmentGroupCreate!): EnvironmentGroup

  """
  
  
  @Action
  """
  update(id: ID!, group: EnvironmentGroupUpdate!): EnvironmentGroup

  """
  
  
  @Action
  """
  delete(id: ID!): EnvironmentGroup
}

input EnvironmentGroupCreate {
  title: String!
  description: String
}

input EnvironmentGroupUpdate {
  title: String!
  description: String!
}

type EnvironmentRoleMutation {
  """
  
  
  @Action
  """
  create(role: EnvironmentRoleCreate!): EnvironmentRole

  """
  
  
  @Action
  """
  update(id: ID!, role: EnvironmentRoleUpdate!): EnvironmentRole

  """
  
  
  @Action
  """
  delete(id: ID!): EnvironmentRole
}

input EnvironmentRoleCreate {
  title: String!
  permissionIds: [ID!]!
}

input EnvironmentRoleUpdate {
  title: String!
  permissionIds: [ID!]
}

type EnvironmentUserMutation {
  """
  
  
  @Action
  """
  create(user: EnvironmentUserCreate!): EnvironmentUser

  """
  
  
  @Action
  """
  update(id: ID!, user: EnvironmentUserUpdate!, file: Upload): EnvironmentUser

  """
  
  
  @Action
  """
  delete(id: ID!): EnvironmentUser
}

input EnvironmentUserCreate {
  email: String!
  firstName: String
  lastName: String
  avatar: EnvironmentUserAvatarCreate
  roleIds: [ID!]
  groupIds: [ID!]
}

input EnvironmentUserAvatarCreate {
  base64Avatar: String
  mime: String
}

input EnvironmentUserUpdate {
  email: String
  firstName: String
  lastName: String
  avatar: EnvironmentUserAvatarUpdate
  roleIds: [ID!]
  groupIds: [ID!]
}

input EnvironmentUserAvatarUpdate {
  base64Avatar: String
  mime: String
}

enum EnvironmentMutateType {
  CREATE
  UPDATE
  DELETE
  RESTORE
}

type EnvironmentGroupDiff {
  id: ID!
  mutateType: EnvironmentMutateType
  oldDocument: EnvironmentGroup
  newDocument: EnvironmentGroup
}

type EnvironmentRoleDiff {
  id: ID!
  mutateType: EnvironmentMutateType
  oldDocument: EnvironmentRole
  newDocument: EnvironmentRole
}

type EnvironmentUserDiff {
  id: ID!
  mutateType: EnvironmentMutateType
  oldDocument: EnvironmentUser
  newDocument: EnvironmentUser
}

type EnvironmentQuery {
  """@Action"""
  me: EnvironmentUser
  groups: EnvironmentGroupQuery
  roles: EnvironmentRoleQuery
  users: EnvironmentUserQuery
}

type EnvironmentMutation {
  groups: EnvironmentGroupMutation
  roles: EnvironmentRoleMutation
  users: EnvironmentUserMutation
}

schema{
	query: Query,
	mutation: Mutation,
	subscription: Subscription
}
`;
