export const testSchema = `type Author{
	id: ID
	firstName: String!
	lastName: String!
}

type Book{
    
    """Identifies the book """
    id: ID
    
    """Name of the book."""
    name: String!
    
	author: Author!
}

input CreateAuthorInput{
	firstName: String!
	lastName: String!
}

input CreateBookInput{
	name: String!
	author: Author!
}

input UpdateAuthorInput{
	id: ID
	firstName: String!
	lastName: String!
}

input UpdateBookInput{
	id: ID
	name: String!
	author: Author!
}

# list of queries
type Query{

    """Identifies the description of the deployment."""
    listBooks:[Book!]!
    
    """Identifies the description of the deployment."""
    listAuthors:[Author!]!
    
    """Identifies the description of the deployment."""
	getBook(
		id: String
    ):Book!
    
	getAuthor(
		id: String
	):Author!
}

type Mutation{
	createAuthor(
		author: CreateAuthorInput
	):Author!
	createBook(
		book: CreateBookInput
	):Book!
	updateAuthor(
		author: UpdateAuthorInput
	):Author!
	updateBook(
		book: UpdateBookInput
	):Book!
	removeBook(
		id: String
	):String
	removeAuthor(
		id: String
	):String
}

schema{
	query: Query
	mutation: Mutation
}`;
export const testSchemaComplicated = `
# Meta information about the query.
type _QueryMeta {
  count: Int!
}

type Address implements Node {
  city: String!
  country: String!
  houseNumber: String!
  id: ID!
  latitude: Float!
  longitude: Float!
  streetName: String!
  venue(filter: VenueFilter): Venue!
  zipCode: String!
}

input AddressFilter {
  # Logical AND on all given filters.
  AND: [AddressFilter!]

  # Logical OR on all given filters.
  OR: [AddressFilter!]
  city: String

  # All values that are not equal to given value.
  city_not: String

  # All values that are contained in given list.
  city_in: [String!]

  # All values that are not contained in given list.
  city_not_in: [String!]

  # All values less than the given value.
  city_lt: String

  # All values less than or equal the given value.
  city_lte: String

  # All values greater than the given value.
  city_gt: String

  # All values greater than or equal the given value.
  city_gte: String

  # All values containing the given string.
  city_contains: String

  # All values not containing the given string.
  city_not_contains: String

  # All values starting with the given string.
  city_starts_with: String

  # All values not starting with the given string.
  city_not_starts_with: String

  # All values ending with the given string.
  city_ends_with: String

  # All values not ending with the given string.
  city_not_ends_with: String
  country: String

  # All values that are not equal to given value.
  country_not: String

  # All values that are contained in given list.
  country_in: [String!]

  # All values that are not contained in given list.
  country_not_in: [String!]

  # All values less than the given value.
  country_lt: String

  # All values less than or equal the given value.
  country_lte: String

  # All values greater than the given value.
  country_gt: String

  # All values greater than or equal the given value.
  country_gte: String

  # All values containing the given string.
  country_contains: String

  # All values not containing the given string.
  country_not_contains: String

  # All values starting with the given string.
  country_starts_with: String

  # All values not starting with the given string.
  country_not_starts_with: String

  # All values ending with the given string.
  country_ends_with: String

  # All values not ending with the given string.
  country_not_ends_with: String
  houseNumber: String

  # All values that are not equal to given value.
  houseNumber_not: String

  # All values that are contained in given list.
  houseNumber_in: [String!]

  # All values that are not contained in given list.
  houseNumber_not_in: [String!]

  # All values less than the given value.
  houseNumber_lt: String

  # All values less than or equal the given value.
  houseNumber_lte: String

  # All values greater than the given value.
  houseNumber_gt: String

  # All values greater than or equal the given value.
  houseNumber_gte: String

  # All values containing the given string.
  houseNumber_contains: String

  # All values not containing the given string.
  houseNumber_not_contains: String

  # All values starting with the given string.
  houseNumber_starts_with: String

  # All values not starting with the given string.
  houseNumber_not_starts_with: String

  # All values ending with the given string.
  houseNumber_ends_with: String

  # All values not ending with the given string.
  houseNumber_not_ends_with: String
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  latitude: Float

  # All values that are not equal to given value.
  latitude_not: Float

  # All values that are contained in given list.
  latitude_in: [Float!]

  # All values that are not contained in given list.
  latitude_not_in: [Float!]

  # All values less than the given value.
  latitude_lt: Float

  # All values less than or equal the given value.
  latitude_lte: Float

  # All values greater than the given value.
  latitude_gt: Float

  # All values greater than or equal the given value.
  latitude_gte: Float
  longitude: Float

  # All values that are not equal to given value.
  longitude_not: Float

  # All values that are contained in given list.
  longitude_in: [Float!]

  # All values that are not contained in given list.
  longitude_not_in: [Float!]

  # All values less than the given value.
  longitude_lt: Float

  # All values less than or equal the given value.
  longitude_lte: Float

  # All values greater than the given value.
  longitude_gt: Float

  # All values greater than or equal the given value.
  longitude_gte: Float
  streetName: String

  # All values that are not equal to given value.
  streetName_not: String

  # All values that are contained in given list.
  streetName_in: [String!]

  # All values that are not contained in given list.
  streetName_not_in: [String!]

  # All values less than the given value.
  streetName_lt: String

  # All values less than or equal the given value.
  streetName_lte: String

  # All values greater than the given value.
  streetName_gt: String

  # All values greater than or equal the given value.
  streetName_gte: String

  # All values containing the given string.
  streetName_contains: String

  # All values not containing the given string.
  streetName_not_contains: String

  # All values starting with the given string.
  streetName_starts_with: String

  # All values not starting with the given string.
  streetName_not_starts_with: String

  # All values ending with the given string.
  streetName_ends_with: String

  # All values not ending with the given string.
  streetName_not_ends_with: String
  zipCode: String

  # All values that are not equal to given value.
  zipCode_not: String

  # All values that are contained in given list.
  zipCode_in: [String!]

  # All values that are not contained in given list.
  zipCode_not_in: [String!]

  # All values less than the given value.
  zipCode_lt: String

  # All values less than or equal the given value.
  zipCode_lte: String

  # All values greater than the given value.
  zipCode_gt: String

  # All values greater than or equal the given value.
  zipCode_gte: String

  # All values containing the given string.
  zipCode_contains: String

  # All values not containing the given string.
  zipCode_not_contains: String

  # All values starting with the given string.
  zipCode_starts_with: String

  # All values not starting with the given string.
  zipCode_not_starts_with: String

  # All values ending with the given string.
  zipCode_ends_with: String

  # All values not ending with the given string.
  zipCode_not_ends_with: String
  venue: VenueFilter
}

input AddressvenueVenue {
  name: String!
  phone: String!
  url: String!
  conferenceId: ID
  conference: VenueconferenceConference
}

type AddToConferenceScheduleEntriesPayload {
  conferenceConference: Conference
  scheduleScheduleEntry: ScheduleEntry
}

type AddToConferenceSpeakersPayload {
  speakersSpeaker: Speaker
  conferenceConference: Conference
}

type AddToConferenceSponsorsPayload {
  conferenceConference: Conference
  sponsorsSponsor: Sponsor
}

type AddToConferenceTalksPayload {
  conferenceConference: Conference
  talksTalk: Talk
}

type AddToConferenceTeamMembersPayload {
  conferenceConference: Conference
  teamTeamMember: TeamMember
}

type AddToConferenceTicketsPayload {
  conferenceConference: Conference
  ticketsTicket: Ticket
}

type AddToTalkSpeakersPayload {
  speakersSpeaker: Speaker
  talkTalk: Talk
}

type Conference implements Node {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  id: ID!
  location: String!
  locationUrl: String!
  name: String!
  schedule(filter: ScheduleEntryFilter, orderBy: ScheduleEntryOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [ScheduleEntry!]
  scheduleUrl: String!
  shortDescription: String!
  speakers(filter: SpeakerFilter, orderBy: SpeakerOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [Speaker!]
  speakersUrl: String!
  sponsorEmail: String!
  sponsors(filter: SponsorFilter, orderBy: SponsorOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [Sponsor!]
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  talks(filter: TalkFilter, orderBy: TalkOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [Talk!]
  team(filter: TeamMemberFilter, orderBy: TeamMemberOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [TeamMember!]
  teamUrl: String!
  tickets(filter: TicketFilter, orderBy: TicketOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [Ticket!]
  ticketsUrl: String!
  url: String!
  venue(filter: VenueFilter): Venue
  videosUrl: String!
  year: Int!

  # Meta information about the query.
  _scheduleMeta(filter: ScheduleEntryFilter, orderBy: ScheduleEntryOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!

  # Meta information about the query.
  _speakersMeta(filter: SpeakerFilter, orderBy: SpeakerOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!

  # Meta information about the query.
  _sponsorsMeta(filter: SponsorFilter, orderBy: SponsorOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!

  # Meta information about the query.
  _talksMeta(filter: TalkFilter, orderBy: TalkOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!

  # Meta information about the query.
  _teamMeta(filter: TeamMemberFilter, orderBy: TeamMemberOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!

  # Meta information about the query.
  _ticketsMeta(filter: TicketFilter, orderBy: TicketOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!
}

input ConferenceFilter {
  # Logical AND on all given filters.
  AND: [ConferenceFilter!]

  # Logical OR on all given filters.
  OR: [ConferenceFilter!]
  dateEnd: DateTime

  # All values that are not equal to given value.
  dateEnd_not: DateTime

  # All values that are contained in given list.
  dateEnd_in: [DateTime!]

  # All values that are not contained in given list.
  dateEnd_not_in: [DateTime!]

  # All values less than the given value.
  dateEnd_lt: DateTime

  # All values less than or equal the given value.
  dateEnd_lte: DateTime

  # All values greater than the given value.
  dateEnd_gt: DateTime

  # All values greater than or equal the given value.
  dateEnd_gte: DateTime
  dateStart: DateTime

  # All values that are not equal to given value.
  dateStart_not: DateTime

  # All values that are contained in given list.
  dateStart_in: [DateTime!]

  # All values that are not contained in given list.
  dateStart_not_in: [DateTime!]

  # All values less than the given value.
  dateStart_lt: DateTime

  # All values less than or equal the given value.
  dateStart_lte: DateTime

  # All values greater than the given value.
  dateStart_gt: DateTime

  # All values greater than or equal the given value.
  dateStart_gte: DateTime
  description: String

  # All values that are not equal to given value.
  description_not: String

  # All values that are contained in given list.
  description_in: [String!]

  # All values that are not contained in given list.
  description_not_in: [String!]

  # All values less than the given value.
  description_lt: String

  # All values less than or equal the given value.
  description_lte: String

  # All values greater than the given value.
  description_gt: String

  # All values greater than or equal the given value.
  description_gte: String

  # All values containing the given string.
  description_contains: String

  # All values not containing the given string.
  description_not_contains: String

  # All values starting with the given string.
  description_starts_with: String

  # All values not starting with the given string.
  description_not_starts_with: String

  # All values ending with the given string.
  description_ends_with: String

  # All values not ending with the given string.
  description_not_ends_with: String
  edition: Edition

  # All values that are not equal to given value.
  edition_not: Edition

  # All values that are contained in given list.
  edition_in: [Edition!]

  # All values that are not contained in given list.
  edition_not_in: [Edition!]
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  location: String

  # All values that are not equal to given value.
  location_not: String

  # All values that are contained in given list.
  location_in: [String!]

  # All values that are not contained in given list.
  location_not_in: [String!]

  # All values less than the given value.
  location_lt: String

  # All values less than or equal the given value.
  location_lte: String

  # All values greater than the given value.
  location_gt: String

  # All values greater than or equal the given value.
  location_gte: String

  # All values containing the given string.
  location_contains: String

  # All values not containing the given string.
  location_not_contains: String

  # All values starting with the given string.
  location_starts_with: String

  # All values not starting with the given string.
  location_not_starts_with: String

  # All values ending with the given string.
  location_ends_with: String

  # All values not ending with the given string.
  location_not_ends_with: String
  locationUrl: String

  # All values that are not equal to given value.
  locationUrl_not: String

  # All values that are contained in given list.
  locationUrl_in: [String!]

  # All values that are not contained in given list.
  locationUrl_not_in: [String!]

  # All values less than the given value.
  locationUrl_lt: String

  # All values less than or equal the given value.
  locationUrl_lte: String

  # All values greater than the given value.
  locationUrl_gt: String

  # All values greater than or equal the given value.
  locationUrl_gte: String

  # All values containing the given string.
  locationUrl_contains: String

  # All values not containing the given string.
  locationUrl_not_contains: String

  # All values starting with the given string.
  locationUrl_starts_with: String

  # All values not starting with the given string.
  locationUrl_not_starts_with: String

  # All values ending with the given string.
  locationUrl_ends_with: String

  # All values not ending with the given string.
  locationUrl_not_ends_with: String
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  scheduleUrl: String

  # All values that are not equal to given value.
  scheduleUrl_not: String

  # All values that are contained in given list.
  scheduleUrl_in: [String!]

  # All values that are not contained in given list.
  scheduleUrl_not_in: [String!]

  # All values less than the given value.
  scheduleUrl_lt: String

  # All values less than or equal the given value.
  scheduleUrl_lte: String

  # All values greater than the given value.
  scheduleUrl_gt: String

  # All values greater than or equal the given value.
  scheduleUrl_gte: String

  # All values containing the given string.
  scheduleUrl_contains: String

  # All values not containing the given string.
  scheduleUrl_not_contains: String

  # All values starting with the given string.
  scheduleUrl_starts_with: String

  # All values not starting with the given string.
  scheduleUrl_not_starts_with: String

  # All values ending with the given string.
  scheduleUrl_ends_with: String

  # All values not ending with the given string.
  scheduleUrl_not_ends_with: String
  shortDescription: String

  # All values that are not equal to given value.
  shortDescription_not: String

  # All values that are contained in given list.
  shortDescription_in: [String!]

  # All values that are not contained in given list.
  shortDescription_not_in: [String!]

  # All values less than the given value.
  shortDescription_lt: String

  # All values less than or equal the given value.
  shortDescription_lte: String

  # All values greater than the given value.
  shortDescription_gt: String

  # All values greater than or equal the given value.
  shortDescription_gte: String

  # All values containing the given string.
  shortDescription_contains: String

  # All values not containing the given string.
  shortDescription_not_contains: String

  # All values starting with the given string.
  shortDescription_starts_with: String

  # All values not starting with the given string.
  shortDescription_not_starts_with: String

  # All values ending with the given string.
  shortDescription_ends_with: String

  # All values not ending with the given string.
  shortDescription_not_ends_with: String
  speakersUrl: String

  # All values that are not equal to given value.
  speakersUrl_not: String

  # All values that are contained in given list.
  speakersUrl_in: [String!]

  # All values that are not contained in given list.
  speakersUrl_not_in: [String!]

  # All values less than the given value.
  speakersUrl_lt: String

  # All values less than or equal the given value.
  speakersUrl_lte: String

  # All values greater than the given value.
  speakersUrl_gt: String

  # All values greater than or equal the given value.
  speakersUrl_gte: String

  # All values containing the given string.
  speakersUrl_contains: String

  # All values not containing the given string.
  speakersUrl_not_contains: String

  # All values starting with the given string.
  speakersUrl_starts_with: String

  # All values not starting with the given string.
  speakersUrl_not_starts_with: String

  # All values ending with the given string.
  speakersUrl_ends_with: String

  # All values not ending with the given string.
  speakersUrl_not_ends_with: String
  sponsorEmail: String

  # All values that are not equal to given value.
  sponsorEmail_not: String

  # All values that are contained in given list.
  sponsorEmail_in: [String!]

  # All values that are not contained in given list.
  sponsorEmail_not_in: [String!]

  # All values less than the given value.
  sponsorEmail_lt: String

  # All values less than or equal the given value.
  sponsorEmail_lte: String

  # All values greater than the given value.
  sponsorEmail_gt: String

  # All values greater than or equal the given value.
  sponsorEmail_gte: String

  # All values containing the given string.
  sponsorEmail_contains: String

  # All values not containing the given string.
  sponsorEmail_not_contains: String

  # All values starting with the given string.
  sponsorEmail_starts_with: String

  # All values not starting with the given string.
  sponsorEmail_not_starts_with: String

  # All values ending with the given string.
  sponsorEmail_ends_with: String

  # All values not ending with the given string.
  sponsorEmail_not_ends_with: String
  sponsorsUrl: String

  # All values that are not equal to given value.
  sponsorsUrl_not: String

  # All values that are contained in given list.
  sponsorsUrl_in: [String!]

  # All values that are not contained in given list.
  sponsorsUrl_not_in: [String!]

  # All values less than the given value.
  sponsorsUrl_lt: String

  # All values less than or equal the given value.
  sponsorsUrl_lte: String

  # All values greater than the given value.
  sponsorsUrl_gt: String

  # All values greater than or equal the given value.
  sponsorsUrl_gte: String

  # All values containing the given string.
  sponsorsUrl_contains: String

  # All values not containing the given string.
  sponsorsUrl_not_contains: String

  # All values starting with the given string.
  sponsorsUrl_starts_with: String

  # All values not starting with the given string.
  sponsorsUrl_not_starts_with: String

  # All values ending with the given string.
  sponsorsUrl_ends_with: String

  # All values not ending with the given string.
  sponsorsUrl_not_ends_with: String
  supportEmail: String

  # All values that are not equal to given value.
  supportEmail_not: String

  # All values that are contained in given list.
  supportEmail_in: [String!]

  # All values that are not contained in given list.
  supportEmail_not_in: [String!]

  # All values less than the given value.
  supportEmail_lt: String

  # All values less than or equal the given value.
  supportEmail_lte: String

  # All values greater than the given value.
  supportEmail_gt: String

  # All values greater than or equal the given value.
  supportEmail_gte: String

  # All values containing the given string.
  supportEmail_contains: String

  # All values not containing the given string.
  supportEmail_not_contains: String

  # All values starting with the given string.
  supportEmail_starts_with: String

  # All values not starting with the given string.
  supportEmail_not_starts_with: String

  # All values ending with the given string.
  supportEmail_ends_with: String

  # All values not ending with the given string.
  supportEmail_not_ends_with: String
  tagLine: String

  # All values that are not equal to given value.
  tagLine_not: String

  # All values that are contained in given list.
  tagLine_in: [String!]

  # All values that are not contained in given list.
  tagLine_not_in: [String!]

  # All values less than the given value.
  tagLine_lt: String

  # All values less than or equal the given value.
  tagLine_lte: String

  # All values greater than the given value.
  tagLine_gt: String

  # All values greater than or equal the given value.
  tagLine_gte: String

  # All values containing the given string.
  tagLine_contains: String

  # All values not containing the given string.
  tagLine_not_contains: String

  # All values starting with the given string.
  tagLine_starts_with: String

  # All values not starting with the given string.
  tagLine_not_starts_with: String

  # All values ending with the given string.
  tagLine_ends_with: String

  # All values not ending with the given string.
  tagLine_not_ends_with: String
  teamUrl: String

  # All values that are not equal to given value.
  teamUrl_not: String

  # All values that are contained in given list.
  teamUrl_in: [String!]

  # All values that are not contained in given list.
  teamUrl_not_in: [String!]

  # All values less than the given value.
  teamUrl_lt: String

  # All values less than or equal the given value.
  teamUrl_lte: String

  # All values greater than the given value.
  teamUrl_gt: String

  # All values greater than or equal the given value.
  teamUrl_gte: String

  # All values containing the given string.
  teamUrl_contains: String

  # All values not containing the given string.
  teamUrl_not_contains: String

  # All values starting with the given string.
  teamUrl_starts_with: String

  # All values not starting with the given string.
  teamUrl_not_starts_with: String

  # All values ending with the given string.
  teamUrl_ends_with: String

  # All values not ending with the given string.
  teamUrl_not_ends_with: String
  ticketsUrl: String

  # All values that are not equal to given value.
  ticketsUrl_not: String

  # All values that are contained in given list.
  ticketsUrl_in: [String!]

  # All values that are not contained in given list.
  ticketsUrl_not_in: [String!]

  # All values less than the given value.
  ticketsUrl_lt: String

  # All values less than or equal the given value.
  ticketsUrl_lte: String

  # All values greater than the given value.
  ticketsUrl_gt: String

  # All values greater than or equal the given value.
  ticketsUrl_gte: String

  # All values containing the given string.
  ticketsUrl_contains: String

  # All values not containing the given string.
  ticketsUrl_not_contains: String

  # All values starting with the given string.
  ticketsUrl_starts_with: String

  # All values not starting with the given string.
  ticketsUrl_not_starts_with: String

  # All values ending with the given string.
  ticketsUrl_ends_with: String

  # All values not ending with the given string.
  ticketsUrl_not_ends_with: String
  url: String

  # All values that are not equal to given value.
  url_not: String

  # All values that are contained in given list.
  url_in: [String!]

  # All values that are not contained in given list.
  url_not_in: [String!]

  # All values less than the given value.
  url_lt: String

  # All values less than or equal the given value.
  url_lte: String

  # All values greater than the given value.
  url_gt: String

  # All values greater than or equal the given value.
  url_gte: String

  # All values containing the given string.
  url_contains: String

  # All values not containing the given string.
  url_not_contains: String

  # All values starting with the given string.
  url_starts_with: String

  # All values not starting with the given string.
  url_not_starts_with: String

  # All values ending with the given string.
  url_ends_with: String

  # All values not ending with the given string.
  url_not_ends_with: String
  videosUrl: String

  # All values that are not equal to given value.
  videosUrl_not: String

  # All values that are contained in given list.
  videosUrl_in: [String!]

  # All values that are not contained in given list.
  videosUrl_not_in: [String!]

  # All values less than the given value.
  videosUrl_lt: String

  # All values less than or equal the given value.
  videosUrl_lte: String

  # All values greater than the given value.
  videosUrl_gt: String

  # All values greater than or equal the given value.
  videosUrl_gte: String

  # All values containing the given string.
  videosUrl_contains: String

  # All values not containing the given string.
  videosUrl_not_contains: String

  # All values starting with the given string.
  videosUrl_starts_with: String

  # All values not starting with the given string.
  videosUrl_not_starts_with: String

  # All values ending with the given string.
  videosUrl_ends_with: String

  # All values not ending with the given string.
  videosUrl_not_ends_with: String
  year: Int

  # All values that are not equal to given value.
  year_not: Int

  # All values that are contained in given list.
  year_in: [Int!]

  # All values that are not contained in given list.
  year_not_in: [Int!]

  # All values less than the given value.
  year_lt: Int

  # All values less than or equal the given value.
  year_lte: Int

  # All values greater than the given value.
  year_gt: Int

  # All values greater than or equal the given value.
  year_gte: Int
  schedule_every: ScheduleEntryFilter
  schedule_some: ScheduleEntryFilter
  schedule_none: ScheduleEntryFilter
  speakers_every: SpeakerFilter
  speakers_some: SpeakerFilter
  speakers_none: SpeakerFilter
  sponsors_every: SponsorFilter
  sponsors_some: SponsorFilter
  sponsors_none: SponsorFilter
  talks_every: TalkFilter
  talks_some: TalkFilter
  talks_none: TalkFilter
  team_every: TeamMemberFilter
  team_some: TeamMemberFilter
  team_none: TeamMemberFilter
  tickets_every: TicketFilter
  tickets_some: TicketFilter
  tickets_none: TicketFilter
  venue: VenueFilter
}

input ConferencespeakersSpeaker {
  name: String!
  talkId: ID
  talk: SpeakertalkTalk
}

input ConferencesponsorsSponsor {
  description: String
  github: String
  logoUrl: String!
  name: String!
  sponsorType: SponsorType!
  twitter: String
  url: String!
}

input ConferencetalksTalk {
  cardUrl: String!
  description: String!
  duration: Int!
  endTime: DateTime!
  entryType: ScheduleEntryType!
  format: TalkFormat!
  slidesUrl: String
  startTime: DateTime!
  title: String!
  url: String!
  videoUrl: String
  speakersIds: [ID!]
  speakers: [TalkspeakersSpeaker!]
}

input ConferenceteamTeamMember {
  description: String
  github: String
  name: String!
  photoUrl: String
  teamSection: TeamSection!
  twitter: String
}

input ConferenceticketsTicket {
  available: Boolean!
  availableUntil: DateTime!
  name: String!
  price: String!
  soldOut: Boolean!
  url: String!
}

input ConferencevenueVenue {
  name: String!
  phone: String!
  url: String!
  addressId: ID
  address: VenueaddressAddress
}

input CreateAddress {
  city: String!
  country: String!
  houseNumber: String!
  latitude: Float!
  longitude: Float!
  streetName: String!
  zipCode: String!
  venueId: ID
  venue: AddressvenueVenue
}

input CreateConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input CreateFile {
  name: String!
}

input CreateNotification {
  body: String!
  fromName: String!
  mailchimpExport: Boolean!
  sent: Boolean
  sibscriberId: String
  title: String!
  to: NOTIFICATION_TO!
}

input CreateScheduleEntry {
  conferenceId: ID
  conference: ScheduleEntryconferenceConference
}

input CreateSpeaker {
  name: String!
  conferenceId: ID
  conference: SpeakerconferenceConference
  talkId: ID
  talk: SpeakertalkTalk
}

input CreateSponsor {
  description: String
  github: String
  logoUrl: String!
  name: String!
  sponsorType: SponsorType!
  twitter: String
  url: String!
  conferenceId: ID
  conference: SponsorconferenceConference
}

input CreateSubscriber {
  email: String!
  mailchimpExported: Boolean
  mailchimpId: String
  name: String!
  notified: Boolean
  unsubscribed: Boolean
}

input CreateTalk {
  cardUrl: String!
  description: String!
  duration: Int!
  endTime: DateTime!
  entryType: ScheduleEntryType!
  format: TalkFormat!
  slidesUrl: String
  startTime: DateTime!
  title: String!
  url: String!
  videoUrl: String
  conferenceId: ID
  conference: TalkconferenceConference
  speakersIds: [ID!]
  speakers: [TalkspeakersSpeaker!]
}

input CreateTeamMember {
  description: String
  github: String
  name: String!
  photoUrl: String
  teamSection: TeamSection!
  twitter: String
  conferenceId: ID
  conference: TeamMemberconferenceConference
}

input CreateTicket {
  available: Boolean!
  availableUntil: DateTime!
  name: String!
  price: String!
  soldOut: Boolean!
  url: String!
  conferenceId: ID
  conference: TicketconferenceConference
}

input CreateUser {
  email: String
  password: String
}

input CreateVenue {
  name: String!
  phone: String!
  url: String!
  addressId: ID
  address: VenueaddressAddress
  conferenceId: ID
  conference: VenueconferenceConference
}

scalar DateTime

enum Edition {
  Berlin2018
  Berlin2017
}

type File implements Node {
  contentType: String!
  createdAt: DateTime
  id: ID!
  name: String!
  secret: String!
  size: Int!
  updatedAt: DateTime
  url: String!
}

input InvokeFunctionInput {
  name: String!
  input: String!
  clientMutationId: String
}

type InvokeFunctionPayload {
  result: String!
  clientMutationId: String
}

type Mutation {
  createAddress(city: String!, country: String!, houseNumber: String!, latitude: Float!, longitude: Float!, streetName: String!, zipCode: String!, venueId: ID, venue: AddressvenueVenue): Address
  createConference(dateEnd: DateTime, dateStart: DateTime, description: String!, edition: Edition!, location: String!, locationUrl: String!, name: String!, scheduleUrl: String!, shortDescription: String!, speakersUrl: String!, sponsorEmail: String!, sponsorsUrl: String!, supportEmail: String!, tagLine: String!, teamUrl: String!, ticketsUrl: String!, url: String!, videosUrl: String!, year: Int!, venueId: ID, venue: ConferencevenueVenue, scheduleIds: [ID!], speakersIds: [ID!], speakers: [ConferencespeakersSpeaker!], sponsorsIds: [ID!], sponsors: [ConferencesponsorsSponsor!], talksIds: [ID!], talks: [ConferencetalksTalk!], teamIds: [ID!], team: [ConferenceteamTeamMember!], ticketsIds: [ID!], tickets: [ConferenceticketsTicket!]): Conference
  createFile(name: String!): File
  createNotification(body: String!, fromName: String!, mailchimpExport: Boolean!, sent: Boolean, sibscriberId: String, title: String!, to: NOTIFICATION_TO!): Notification
  createScheduleEntry(conferenceId: ID, conference: ScheduleEntryconferenceConference): ScheduleEntry
  createSpeaker(name: String!, conferenceId: ID, conference: SpeakerconferenceConference, talkId: ID, talk: SpeakertalkTalk): Speaker
  createSponsor(description: String, github: String, logoUrl: String!, name: String!, sponsorType: SponsorType!, twitter: String, url: String!, conferenceId: ID, conference: SponsorconferenceConference): Sponsor
  createSubscriber(email: String!, mailchimpExported: Boolean, mailchimpId: String, name: String!, notified: Boolean, unsubscribed: Boolean): Subscriber
  createTalk(cardUrl: String!, description: String!, duration: Int!, endTime: DateTime!, entryType: ScheduleEntryType!, format: TalkFormat!, slidesUrl: String, startTime: DateTime!, title: String!, url: String!, videoUrl: String, conferenceId: ID, conference: TalkconferenceConference, speakersIds: [ID!], speakers: [TalkspeakersSpeaker!]): Talk
  createTeamMember(description: String, github: String, name: String!, photoUrl: String, teamSection: TeamSection!, twitter: String, conferenceId: ID, conference: TeamMemberconferenceConference): TeamMember
  createTicket(available: Boolean!, availableUntil: DateTime!, name: String!, price: String!, soldOut: Boolean!, url: String!, conferenceId: ID, conference: TicketconferenceConference): Ticket
  createVenue(name: String!, phone: String!, url: String!, addressId: ID, address: VenueaddressAddress, conferenceId: ID, conference: VenueconferenceConference): Venue
  updateAddress(city: String, country: String, houseNumber: String, id: ID!, latitude: Float, longitude: Float, streetName: String, zipCode: String, venueId: ID, venue: AddressvenueVenue): Address
  updateConference(dateEnd: DateTime, dateStart: DateTime, description: String, edition: Edition, id: ID!, location: String, locationUrl: String, name: String, scheduleUrl: String, shortDescription: String, speakersUrl: String, sponsorEmail: String, sponsorsUrl: String, supportEmail: String, tagLine: String, teamUrl: String, ticketsUrl: String, url: String, videosUrl: String, year: Int, venueId: ID, venue: ConferencevenueVenue, scheduleIds: [ID!], speakersIds: [ID!], speakers: [ConferencespeakersSpeaker!], sponsorsIds: [ID!], sponsors: [ConferencesponsorsSponsor!], talksIds: [ID!], talks: [ConferencetalksTalk!], teamIds: [ID!], team: [ConferenceteamTeamMember!], ticketsIds: [ID!], tickets: [ConferenceticketsTicket!]): Conference
  updateFile(id: ID!, name: String): File
  updateNotification(body: String, fromName: String, id: ID!, mailchimpExport: Boolean, sent: Boolean, sibscriberId: String, title: String, to: NOTIFICATION_TO): Notification
  updateScheduleEntry(id: ID!, conferenceId: ID, conference: ScheduleEntryconferenceConference): ScheduleEntry
  updateSpeaker(id: ID!, name: String, conferenceId: ID, conference: SpeakerconferenceConference, talkId: ID, talk: SpeakertalkTalk): Speaker
  updateSponsor(description: String, github: String, id: ID!, logoUrl: String, name: String, sponsorType: SponsorType, twitter: String, url: String, conferenceId: ID, conference: SponsorconferenceConference): Sponsor
  updateSubscriber(email: String, id: ID!, mailchimpExported: Boolean, mailchimpId: String, name: String, notified: Boolean, unsubscribed: Boolean): Subscriber
  updateTalk(cardUrl: String, description: String, duration: Int, endTime: DateTime, entryType: ScheduleEntryType, format: TalkFormat, id: ID!, slidesUrl: String, startTime: DateTime, title: String, url: String, videoUrl: String, conferenceId: ID, conference: TalkconferenceConference, speakersIds: [ID!], speakers: [TalkspeakersSpeaker!]): Talk
  updateTeamMember(description: String, github: String, id: ID!, name: String, photoUrl: String, teamSection: TeamSection, twitter: String, conferenceId: ID, conference: TeamMemberconferenceConference): TeamMember
  updateTicket(available: Boolean, availableUntil: DateTime, id: ID!, name: String, price: String, soldOut: Boolean, url: String, conferenceId: ID, conference: TicketconferenceConference): Ticket
  updateUser(email: String, id: ID!, password: String): User
  updateVenue(id: ID!, name: String, phone: String, url: String, addressId: ID, address: VenueaddressAddress, conferenceId: ID, conference: VenueconferenceConference): Venue
  updateOrCreateAddress(update: UpdateAddress!, create: CreateAddress!): Address
  updateOrCreateConference(update: UpdateConference!, create: CreateConference!): Conference
  updateOrCreateFile(update: UpdateFile!, create: CreateFile!): File
  updateOrCreateNotification(update: UpdateNotification!, create: CreateNotification!): Notification
  updateOrCreateScheduleEntry(update: UpdateScheduleEntry!, create: CreateScheduleEntry!): ScheduleEntry
  updateOrCreateSpeaker(update: UpdateSpeaker!, create: CreateSpeaker!): Speaker
  updateOrCreateSponsor(update: UpdateSponsor!, create: CreateSponsor!): Sponsor
  updateOrCreateSubscriber(update: UpdateSubscriber!, create: CreateSubscriber!): Subscriber
  updateOrCreateTalk(update: UpdateTalk!, create: CreateTalk!): Talk
  updateOrCreateTeamMember(update: UpdateTeamMember!, create: CreateTeamMember!): TeamMember
  updateOrCreateTicket(update: UpdateTicket!, create: CreateTicket!): Ticket
  updateOrCreateUser(update: UpdateUser!, create: CreateUser!): User
  updateOrCreateVenue(update: UpdateVenue!, create: CreateVenue!): Venue
  deleteAddress(id: ID!): Address
  deleteConference(id: ID!): Conference
  deleteFile(id: ID!): File
  deleteNotification(id: ID!): Notification
  deleteScheduleEntry(id: ID!): ScheduleEntry
  deleteSpeaker(id: ID!): Speaker
  deleteSponsor(id: ID!): Sponsor
  deleteSubscriber(id: ID!): Subscriber
  deleteTalk(id: ID!): Talk
  deleteTeamMember(id: ID!): TeamMember
  deleteTicket(id: ID!): Ticket
  deleteUser(id: ID!): User
  deleteVenue(id: ID!): Venue
  setConferenceVenue(venueVenueId: ID!, conferenceConferenceId: ID!): SetConferenceVenuePayload
  setVenueAddress(addressAddressId: ID!, venueVenueId: ID!): SetVenueAddressPayload
  addToConferenceScheduleEntries(scheduleScheduleEntryId: ID!, conferenceConferenceId: ID!): AddToConferenceScheduleEntriesPayload
  addToConferenceSpeakers(conferenceConferenceId: ID!, speakersSpeakerId: ID!): AddToConferenceSpeakersPayload
  addToConferenceSponsors(sponsorsSponsorId: ID!, conferenceConferenceId: ID!): AddToConferenceSponsorsPayload
  addToConferenceTalks(talksTalkId: ID!, conferenceConferenceId: ID!): AddToConferenceTalksPayload
  addToConferenceTeamMembers(teamTeamMemberId: ID!, conferenceConferenceId: ID!): AddToConferenceTeamMembersPayload
  addToConferenceTickets(ticketsTicketId: ID!, conferenceConferenceId: ID!): AddToConferenceTicketsPayload
  addToTalkSpeakers(talkTalkId: ID!, speakersSpeakerId: ID!): AddToTalkSpeakersPayload
  createUser(email: String, password: String): User
  invokeFunction(input: InvokeFunctionInput!): InvokeFunctionPayload
}

# An object with an ID
interface Node {
  # The id of the object.
  id: ID!
}

type Notification implements Node {
  body: String!
  createdAt: DateTime
  fromName: String!
  id: ID!
  mailchimpExport: Boolean!
  sent: Boolean!
  sibscriberId: String
  title: String!
  to: NOTIFICATION_TO!
  updatedAt: DateTime
}

enum NOTIFICATION_TO {
  AllSubscribers
  SingleSubscriber
}

type Query {
  conferences: [Conference!]!
  conference(edition: Edition = Berlin2018): Conference
}

type ScheduleEntry implements Node {
  conference(filter: ConferenceFilter): Conference!
  id: ID!
}

input ScheduleEntryconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input ScheduleEntryFilter {
  # Logical AND on all given filters.
  AND: [ScheduleEntryFilter!]

  # Logical OR on all given filters.
  OR: [ScheduleEntryFilter!]
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  conference: ConferenceFilter
}

enum ScheduleEntryOrderBy {
  id_ASC
  id_DESC
}

enum ScheduleEntryType {
  Lunch
  Break
  Talk
  Registration
}

type SetConferenceVenuePayload {
  conferenceConference: Conference
  venueVenue: Venue
}

type SetVenueAddressPayload {
  venueVenue: Venue
  addressAddress: Address
}

type Speaker implements Node {
  conference(filter: ConferenceFilter): Conference!
  id: ID!
  name: String!
  talk(filter: TalkFilter): Talk!
}

input SpeakerconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input SpeakerFilter {
  # Logical AND on all given filters.
  AND: [SpeakerFilter!]

  # Logical OR on all given filters.
  OR: [SpeakerFilter!]
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  conference: ConferenceFilter
  talk: TalkFilter
}

enum SpeakerOrderBy {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

input SpeakertalkTalk {
  cardUrl: String!
  description: String!
  duration: Int!
  endTime: DateTime!
  entryType: ScheduleEntryType!
  format: TalkFormat!
  slidesUrl: String
  startTime: DateTime!
  title: String!
  url: String!
  videoUrl: String
  conferenceId: ID
  conference: TalkconferenceConference
  speakersIds: [ID!]
  speakers: [TalkspeakersSpeaker!]
}

type Sponsor implements Node {
  conference(filter: ConferenceFilter): Conference!
  description: String
  github: String
  id: ID!
  logoUrl: String!
  name: String!
  sponsorType: SponsorType!
  twitter: String
  url: String!
}

input SponsorconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input SponsorFilter {
  # Logical AND on all given filters.
  AND: [SponsorFilter!]

  # Logical OR on all given filters.
  OR: [SponsorFilter!]
  description: String

  # All values that are not equal to given value.
  description_not: String

  # All values that are contained in given list.
  description_in: [String!]

  # All values that are not contained in given list.
  description_not_in: [String!]

  # All values less than the given value.
  description_lt: String

  # All values less than or equal the given value.
  description_lte: String

  # All values greater than the given value.
  description_gt: String

  # All values greater than or equal the given value.
  description_gte: String

  # All values containing the given string.
  description_contains: String

  # All values not containing the given string.
  description_not_contains: String

  # All values starting with the given string.
  description_starts_with: String

  # All values not starting with the given string.
  description_not_starts_with: String

  # All values ending with the given string.
  description_ends_with: String

  # All values not ending with the given string.
  description_not_ends_with: String
  github: String

  # All values that are not equal to given value.
  github_not: String

  # All values that are contained in given list.
  github_in: [String!]

  # All values that are not contained in given list.
  github_not_in: [String!]

  # All values less than the given value.
  github_lt: String

  # All values less than or equal the given value.
  github_lte: String

  # All values greater than the given value.
  github_gt: String

  # All values greater than or equal the given value.
  github_gte: String

  # All values containing the given string.
  github_contains: String

  # All values not containing the given string.
  github_not_contains: String

  # All values starting with the given string.
  github_starts_with: String

  # All values not starting with the given string.
  github_not_starts_with: String

  # All values ending with the given string.
  github_ends_with: String

  # All values not ending with the given string.
  github_not_ends_with: String
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  logoUrl: String

  # All values that are not equal to given value.
  logoUrl_not: String

  # All values that are contained in given list.
  logoUrl_in: [String!]

  # All values that are not contained in given list.
  logoUrl_not_in: [String!]

  # All values less than the given value.
  logoUrl_lt: String

  # All values less than or equal the given value.
  logoUrl_lte: String

  # All values greater than the given value.
  logoUrl_gt: String

  # All values greater than or equal the given value.
  logoUrl_gte: String

  # All values containing the given string.
  logoUrl_contains: String

  # All values not containing the given string.
  logoUrl_not_contains: String

  # All values starting with the given string.
  logoUrl_starts_with: String

  # All values not starting with the given string.
  logoUrl_not_starts_with: String

  # All values ending with the given string.
  logoUrl_ends_with: String

  # All values not ending with the given string.
  logoUrl_not_ends_with: String
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  sponsorType: SponsorType

  # All values that are not equal to given value.
  sponsorType_not: SponsorType

  # All values that are contained in given list.
  sponsorType_in: [SponsorType!]

  # All values that are not contained in given list.
  sponsorType_not_in: [SponsorType!]
  twitter: String

  # All values that are not equal to given value.
  twitter_not: String

  # All values that are contained in given list.
  twitter_in: [String!]

  # All values that are not contained in given list.
  twitter_not_in: [String!]

  # All values less than the given value.
  twitter_lt: String

  # All values less than or equal the given value.
  twitter_lte: String

  # All values greater than the given value.
  twitter_gt: String

  # All values greater than or equal the given value.
  twitter_gte: String

  # All values containing the given string.
  twitter_contains: String

  # All values not containing the given string.
  twitter_not_contains: String

  # All values starting with the given string.
  twitter_starts_with: String

  # All values not starting with the given string.
  twitter_not_starts_with: String

  # All values ending with the given string.
  twitter_ends_with: String

  # All values not ending with the given string.
  twitter_not_ends_with: String
  url: String

  # All values that are not equal to given value.
  url_not: String

  # All values that are contained in given list.
  url_in: [String!]

  # All values that are not contained in given list.
  url_not_in: [String!]

  # All values less than the given value.
  url_lt: String

  # All values less than or equal the given value.
  url_lte: String

  # All values greater than the given value.
  url_gt: String

  # All values greater than or equal the given value.
  url_gte: String

  # All values containing the given string.
  url_contains: String

  # All values not containing the given string.
  url_not_contains: String

  # All values starting with the given string.
  url_starts_with: String

  # All values not starting with the given string.
  url_not_starts_with: String

  # All values ending with the given string.
  url_ends_with: String

  # All values not ending with the given string.
  url_not_ends_with: String
  conference: ConferenceFilter
}

enum SponsorOrderBy {
  description_ASC
  description_DESC
  github_ASC
  github_DESC
  id_ASC
  id_DESC
  logoUrl_ASC
  logoUrl_DESC
  name_ASC
  name_DESC
  sponsorType_ASC
  sponsorType_DESC
  twitter_ASC
  twitter_DESC
  url_ASC
  url_DESC
}

enum SponsorType {
  Bronze
  Silver
  Gold
  Platinum
  Opportunity
  Partner
  Organiser
}

type Subscriber implements Node {
  createdAt: DateTime
  email: String!
  id: ID!
  mailchimpExported: Boolean!
  mailchimpId: String
  name: String!
  notified: Boolean!
  unsubscribed: Boolean!
  updatedAt: DateTime
}

type Talk implements Node {
  cardUrl: String!
  conference(filter: ConferenceFilter): Conference!
  description: String!
  duration: Int!
  endTime: DateTime!
  entryType: ScheduleEntryType!
  format: TalkFormat!
  id: ID!
  slidesUrl: String
  speakers(filter: SpeakerFilter, orderBy: SpeakerOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): [Speaker!]
  startTime: DateTime!
  title: String!
  url: String!
  videoUrl: String

  # Meta information about the query.
  _speakersMeta(filter: SpeakerFilter, orderBy: SpeakerOrderBy, skip: Int, after: String, before: String, first: Int, last: Int): _QueryMeta!
}

input TalkconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input TalkFilter {
  # Logical AND on all given filters.
  AND: [TalkFilter!]

  # Logical OR on all given filters.
  OR: [TalkFilter!]
  cardUrl: String

  # All values that are not equal to given value.
  cardUrl_not: String

  # All values that are contained in given list.
  cardUrl_in: [String!]

  # All values that are not contained in given list.
  cardUrl_not_in: [String!]

  # All values less than the given value.
  cardUrl_lt: String

  # All values less than or equal the given value.
  cardUrl_lte: String

  # All values greater than the given value.
  cardUrl_gt: String

  # All values greater than or equal the given value.
  cardUrl_gte: String

  # All values containing the given string.
  cardUrl_contains: String

  # All values not containing the given string.
  cardUrl_not_contains: String

  # All values starting with the given string.
  cardUrl_starts_with: String

  # All values not starting with the given string.
  cardUrl_not_starts_with: String

  # All values ending with the given string.
  cardUrl_ends_with: String

  # All values not ending with the given string.
  cardUrl_not_ends_with: String
  description: String

  # All values that are not equal to given value.
  description_not: String

  # All values that are contained in given list.
  description_in: [String!]

  # All values that are not contained in given list.
  description_not_in: [String!]

  # All values less than the given value.
  description_lt: String

  # All values less than or equal the given value.
  description_lte: String

  # All values greater than the given value.
  description_gt: String

  # All values greater than or equal the given value.
  description_gte: String

  # All values containing the given string.
  description_contains: String

  # All values not containing the given string.
  description_not_contains: String

  # All values starting with the given string.
  description_starts_with: String

  # All values not starting with the given string.
  description_not_starts_with: String

  # All values ending with the given string.
  description_ends_with: String

  # All values not ending with the given string.
  description_not_ends_with: String
  duration: Int

  # All values that are not equal to given value.
  duration_not: Int

  # All values that are contained in given list.
  duration_in: [Int!]

  # All values that are not contained in given list.
  duration_not_in: [Int!]

  # All values less than the given value.
  duration_lt: Int

  # All values less than or equal the given value.
  duration_lte: Int

  # All values greater than the given value.
  duration_gt: Int

  # All values greater than or equal the given value.
  duration_gte: Int
  endTime: DateTime

  # All values that are not equal to given value.
  endTime_not: DateTime

  # All values that are contained in given list.
  endTime_in: [DateTime!]

  # All values that are not contained in given list.
  endTime_not_in: [DateTime!]

  # All values less than the given value.
  endTime_lt: DateTime

  # All values less than or equal the given value.
  endTime_lte: DateTime

  # All values greater than the given value.
  endTime_gt: DateTime

  # All values greater than or equal the given value.
  endTime_gte: DateTime
  entryType: ScheduleEntryType

  # All values that are not equal to given value.
  entryType_not: ScheduleEntryType

  # All values that are contained in given list.
  entryType_in: [ScheduleEntryType!]

  # All values that are not contained in given list.
  entryType_not_in: [ScheduleEntryType!]
  format: TalkFormat

  # All values that are not equal to given value.
  format_not: TalkFormat

  # All values that are contained in given list.
  format_in: [TalkFormat!]

  # All values that are not contained in given list.
  format_not_in: [TalkFormat!]
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  slidesUrl: String

  # All values that are not equal to given value.
  slidesUrl_not: String

  # All values that are contained in given list.
  slidesUrl_in: [String!]

  # All values that are not contained in given list.
  slidesUrl_not_in: [String!]

  # All values less than the given value.
  slidesUrl_lt: String

  # All values less than or equal the given value.
  slidesUrl_lte: String

  # All values greater than the given value.
  slidesUrl_gt: String

  # All values greater than or equal the given value.
  slidesUrl_gte: String

  # All values containing the given string.
  slidesUrl_contains: String

  # All values not containing the given string.
  slidesUrl_not_contains: String

  # All values starting with the given string.
  slidesUrl_starts_with: String

  # All values not starting with the given string.
  slidesUrl_not_starts_with: String

  # All values ending with the given string.
  slidesUrl_ends_with: String

  # All values not ending with the given string.
  slidesUrl_not_ends_with: String
  startTime: DateTime

  # All values that are not equal to given value.
  startTime_not: DateTime

  # All values that are contained in given list.
  startTime_in: [DateTime!]

  # All values that are not contained in given list.
  startTime_not_in: [DateTime!]

  # All values less than the given value.
  startTime_lt: DateTime

  # All values less than or equal the given value.
  startTime_lte: DateTime

  # All values greater than the given value.
  startTime_gt: DateTime

  # All values greater than or equal the given value.
  startTime_gte: DateTime
  title: String

  # All values that are not equal to given value.
  title_not: String

  # All values that are contained in given list.
  title_in: [String!]

  # All values that are not contained in given list.
  title_not_in: [String!]

  # All values less than the given value.
  title_lt: String

  # All values less than or equal the given value.
  title_lte: String

  # All values greater than the given value.
  title_gt: String

  # All values greater than or equal the given value.
  title_gte: String

  # All values containing the given string.
  title_contains: String

  # All values not containing the given string.
  title_not_contains: String

  # All values starting with the given string.
  title_starts_with: String

  # All values not starting with the given string.
  title_not_starts_with: String

  # All values ending with the given string.
  title_ends_with: String

  # All values not ending with the given string.
  title_not_ends_with: String
  url: String

  # All values that are not equal to given value.
  url_not: String

  # All values that are contained in given list.
  url_in: [String!]

  # All values that are not contained in given list.
  url_not_in: [String!]

  # All values less than the given value.
  url_lt: String

  # All values less than or equal the given value.
  url_lte: String

  # All values greater than the given value.
  url_gt: String

  # All values greater than or equal the given value.
  url_gte: String

  # All values containing the given string.
  url_contains: String

  # All values not containing the given string.
  url_not_contains: String

  # All values starting with the given string.
  url_starts_with: String

  # All values not starting with the given string.
  url_not_starts_with: String

  # All values ending with the given string.
  url_ends_with: String

  # All values not ending with the given string.
  url_not_ends_with: String
  videoUrl: String

  # All values that are not equal to given value.
  videoUrl_not: String

  # All values that are contained in given list.
  videoUrl_in: [String!]

  # All values that are not contained in given list.
  videoUrl_not_in: [String!]

  # All values less than the given value.
  videoUrl_lt: String

  # All values less than or equal the given value.
  videoUrl_lte: String

  # All values greater than the given value.
  videoUrl_gt: String

  # All values greater than or equal the given value.
  videoUrl_gte: String

  # All values containing the given string.
  videoUrl_contains: String

  # All values not containing the given string.
  videoUrl_not_contains: String

  # All values starting with the given string.
  videoUrl_starts_with: String

  # All values not starting with the given string.
  videoUrl_not_starts_with: String

  # All values ending with the given string.
  videoUrl_ends_with: String

  # All values not ending with the given string.
  videoUrl_not_ends_with: String
  conference: ConferenceFilter
  speakers_every: SpeakerFilter
  speakers_some: SpeakerFilter
  speakers_none: SpeakerFilter
}

enum TalkFormat {
  Lightning
  Standard
  PanelDiscussion
  Special
}

enum TalkOrderBy {
  cardUrl_ASC
  cardUrl_DESC
  description_ASC
  description_DESC
  duration_ASC
  duration_DESC
  endTime_ASC
  endTime_DESC
  entryType_ASC
  entryType_DESC
  format_ASC
  format_DESC
  id_ASC
  id_DESC
  slidesUrl_ASC
  slidesUrl_DESC
  startTime_ASC
  startTime_DESC
  title_ASC
  title_DESC
  url_ASC
  url_DESC
  videoUrl_ASC
  videoUrl_DESC
}

input TalkspeakersSpeaker {
  name: String!
  conferenceId: ID
  conference: SpeakerconferenceConference
}

type TeamMember implements Node {
  conference(filter: ConferenceFilter): Conference!
  description: String
  github: String
  id: ID!
  name: String!
  photoUrl: String
  teamSection: TeamSection!
  twitter: String
}

input TeamMemberconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input TeamMemberFilter {
  # Logical AND on all given filters.
  AND: [TeamMemberFilter!]

  # Logical OR on all given filters.
  OR: [TeamMemberFilter!]
  description: String

  # All values that are not equal to given value.
  description_not: String

  # All values that are contained in given list.
  description_in: [String!]

  # All values that are not contained in given list.
  description_not_in: [String!]

  # All values less than the given value.
  description_lt: String

  # All values less than or equal the given value.
  description_lte: String

  # All values greater than the given value.
  description_gt: String

  # All values greater than or equal the given value.
  description_gte: String

  # All values containing the given string.
  description_contains: String

  # All values not containing the given string.
  description_not_contains: String

  # All values starting with the given string.
  description_starts_with: String

  # All values not starting with the given string.
  description_not_starts_with: String

  # All values ending with the given string.
  description_ends_with: String

  # All values not ending with the given string.
  description_not_ends_with: String
  github: String

  # All values that are not equal to given value.
  github_not: String

  # All values that are contained in given list.
  github_in: [String!]

  # All values that are not contained in given list.
  github_not_in: [String!]

  # All values less than the given value.
  github_lt: String

  # All values less than or equal the given value.
  github_lte: String

  # All values greater than the given value.
  github_gt: String

  # All values greater than or equal the given value.
  github_gte: String

  # All values containing the given string.
  github_contains: String

  # All values not containing the given string.
  github_not_contains: String

  # All values starting with the given string.
  github_starts_with: String

  # All values not starting with the given string.
  github_not_starts_with: String

  # All values ending with the given string.
  github_ends_with: String

  # All values not ending with the given string.
  github_not_ends_with: String
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  photoUrl: String

  # All values that are not equal to given value.
  photoUrl_not: String

  # All values that are contained in given list.
  photoUrl_in: [String!]

  # All values that are not contained in given list.
  photoUrl_not_in: [String!]

  # All values less than the given value.
  photoUrl_lt: String

  # All values less than or equal the given value.
  photoUrl_lte: String

  # All values greater than the given value.
  photoUrl_gt: String

  # All values greater than or equal the given value.
  photoUrl_gte: String

  # All values containing the given string.
  photoUrl_contains: String

  # All values not containing the given string.
  photoUrl_not_contains: String

  # All values starting with the given string.
  photoUrl_starts_with: String

  # All values not starting with the given string.
  photoUrl_not_starts_with: String

  # All values ending with the given string.
  photoUrl_ends_with: String

  # All values not ending with the given string.
  photoUrl_not_ends_with: String
  teamSection: TeamSection

  # All values that are not equal to given value.
  teamSection_not: TeamSection

  # All values that are contained in given list.
  teamSection_in: [TeamSection!]

  # All values that are not contained in given list.
  teamSection_not_in: [TeamSection!]
  twitter: String

  # All values that are not equal to given value.
  twitter_not: String

  # All values that are contained in given list.
  twitter_in: [String!]

  # All values that are not contained in given list.
  twitter_not_in: [String!]

  # All values less than the given value.
  twitter_lt: String

  # All values less than or equal the given value.
  twitter_lte: String

  # All values greater than the given value.
  twitter_gt: String

  # All values greater than or equal the given value.
  twitter_gte: String

  # All values containing the given string.
  twitter_contains: String

  # All values not containing the given string.
  twitter_not_contains: String

  # All values starting with the given string.
  twitter_starts_with: String

  # All values not starting with the given string.
  twitter_not_starts_with: String

  # All values ending with the given string.
  twitter_ends_with: String

  # All values not ending with the given string.
  twitter_not_ends_with: String
  conference: ConferenceFilter
}

enum TeamMemberOrderBy {
  description_ASC
  description_DESC
  github_ASC
  github_DESC
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  photoUrl_ASC
  photoUrl_DESC
  teamSection_ASC
  teamSection_DESC
  twitter_ASC
  twitter_DESC
}

enum TeamSection {
  SpecialThanks
  Core
}

type Ticket implements Node {
  available: Boolean!
  availableUntil: DateTime!
  conference(filter: ConferenceFilter): Conference!
  id: ID!
  name: String!
  price: String!
  soldOut: Boolean!
  url: String!
}

input TicketconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input TicketFilter {
  # Logical AND on all given filters.
  AND: [TicketFilter!]

  # Logical OR on all given filters.
  OR: [TicketFilter!]
  available: Boolean

  # All values that are not equal to given value.
  available_not: Boolean
  availableUntil: DateTime

  # All values that are not equal to given value.
  availableUntil_not: DateTime

  # All values that are contained in given list.
  availableUntil_in: [DateTime!]

  # All values that are not contained in given list.
  availableUntil_not_in: [DateTime!]

  # All values less than the given value.
  availableUntil_lt: DateTime

  # All values less than or equal the given value.
  availableUntil_lte: DateTime

  # All values greater than the given value.
  availableUntil_gt: DateTime

  # All values greater than or equal the given value.
  availableUntil_gte: DateTime
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  price: String

  # All values that are not equal to given value.
  price_not: String

  # All values that are contained in given list.
  price_in: [String!]

  # All values that are not contained in given list.
  price_not_in: [String!]

  # All values less than the given value.
  price_lt: String

  # All values less than or equal the given value.
  price_lte: String

  # All values greater than the given value.
  price_gt: String

  # All values greater than or equal the given value.
  price_gte: String

  # All values containing the given string.
  price_contains: String

  # All values not containing the given string.
  price_not_contains: String

  # All values starting with the given string.
  price_starts_with: String

  # All values not starting with the given string.
  price_not_starts_with: String

  # All values ending with the given string.
  price_ends_with: String

  # All values not ending with the given string.
  price_not_ends_with: String
  soldOut: Boolean

  # All values that are not equal to given value.
  soldOut_not: Boolean
  url: String

  # All values that are not equal to given value.
  url_not: String

  # All values that are contained in given list.
  url_in: [String!]

  # All values that are not contained in given list.
  url_not_in: [String!]

  # All values less than the given value.
  url_lt: String

  # All values less than or equal the given value.
  url_lte: String

  # All values greater than the given value.
  url_gt: String

  # All values greater than or equal the given value.
  url_gte: String

  # All values containing the given string.
  url_contains: String

  # All values not containing the given string.
  url_not_contains: String

  # All values starting with the given string.
  url_starts_with: String

  # All values not starting with the given string.
  url_not_starts_with: String

  # All values ending with the given string.
  url_ends_with: String

  # All values not ending with the given string.
  url_not_ends_with: String
  conference: ConferenceFilter
}

enum TicketOrderBy {
  available_ASC
  available_DESC
  availableUntil_ASC
  availableUntil_DESC
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  price_ASC
  price_DESC
  soldOut_ASC
  soldOut_DESC
  url_ASC
  url_DESC
}

input UpdateAddress {
  city: String
  country: String
  houseNumber: String
  id: ID!
  latitude: Float
  longitude: Float
  streetName: String
  zipCode: String
  venueId: ID
  venue: AddressvenueVenue
}

input UpdateConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String
  edition: Edition
  id: ID!
  location: String
  locationUrl: String
  name: String
  scheduleUrl: String
  shortDescription: String
  speakersUrl: String
  sponsorEmail: String
  sponsorsUrl: String
  supportEmail: String
  tagLine: String
  teamUrl: String
  ticketsUrl: String
  url: String
  videosUrl: String
  year: Int
  venueId: ID
  venue: ConferencevenueVenue
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input UpdateFile {
  id: ID!
  name: String
}

input UpdateNotification {
  body: String
  fromName: String
  id: ID!
  mailchimpExport: Boolean
  sent: Boolean
  sibscriberId: String
  title: String
  to: NOTIFICATION_TO
}

input UpdateScheduleEntry {
  id: ID!
  conferenceId: ID
  conference: ScheduleEntryconferenceConference
}

input UpdateSpeaker {
  id: ID!
  name: String
  conferenceId: ID
  conference: SpeakerconferenceConference
  talkId: ID
  talk: SpeakertalkTalk
}

input UpdateSponsor {
  description: String
  github: String
  id: ID!
  logoUrl: String
  name: String
  sponsorType: SponsorType
  twitter: String
  url: String
  conferenceId: ID
  conference: SponsorconferenceConference
}

input UpdateSubscriber {
  email: String
  id: ID!
  mailchimpExported: Boolean
  mailchimpId: String
  name: String
  notified: Boolean
  unsubscribed: Boolean
}

input UpdateTalk {
  cardUrl: String
  description: String
  duration: Int
  endTime: DateTime
  entryType: ScheduleEntryType
  format: TalkFormat
  id: ID!
  slidesUrl: String
  startTime: DateTime
  title: String
  url: String
  videoUrl: String
  conferenceId: ID
  conference: TalkconferenceConference
  speakersIds: [ID!]
  speakers: [TalkspeakersSpeaker!]
}

input UpdateTeamMember {
  description: String
  github: String
  id: ID!
  name: String
  photoUrl: String
  teamSection: TeamSection
  twitter: String
  conferenceId: ID
  conference: TeamMemberconferenceConference
}

input UpdateTicket {
  available: Boolean
  availableUntil: DateTime
  id: ID!
  name: String
  price: String
  soldOut: Boolean
  url: String
  conferenceId: ID
  conference: TicketconferenceConference
}

input UpdateUser {
  email: String
  id: ID!
  password: String
}

input UpdateVenue {
  id: ID!
  name: String
  phone: String
  url: String
  addressId: ID
  address: VenueaddressAddress
  conferenceId: ID
  conference: VenueconferenceConference
}

type User implements Node {
  createdAt: DateTime
  email: String
  id: ID!
  password: String
  updatedAt: DateTime
}

type Venue implements Node {
  address(filter: AddressFilter): Address!
  conference(filter: ConferenceFilter): Conference!
  id: ID!
  name: String!
  phone: String!
  url: String!
}

input VenueaddressAddress {
  city: String!
  country: String!
  houseNumber: String!
  latitude: Float!
  longitude: Float!
  streetName: String!
  zipCode: String!
}

input VenueconferenceConference {
  dateEnd: DateTime
  dateStart: DateTime
  description: String!
  edition: Edition!
  location: String!
  locationUrl: String!
  name: String!
  scheduleUrl: String!
  shortDescription: String!
  speakersUrl: String!
  sponsorEmail: String!
  sponsorsUrl: String!
  supportEmail: String!
  tagLine: String!
  teamUrl: String!
  ticketsUrl: String!
  url: String!
  videosUrl: String!
  year: Int!
  scheduleIds: [ID!]
  speakersIds: [ID!]
  speakers: [ConferencespeakersSpeaker!]
  sponsorsIds: [ID!]
  sponsors: [ConferencesponsorsSponsor!]
  talksIds: [ID!]
  talks: [ConferencetalksTalk!]
  teamIds: [ID!]
  team: [ConferenceteamTeamMember!]
  ticketsIds: [ID!]
  tickets: [ConferenceticketsTicket!]
}

input VenueFilter {
  # Logical AND on all given filters.
  AND: [VenueFilter!]

  # Logical OR on all given filters.
  OR: [VenueFilter!]
  id: ID

  # All values that are not equal to given value.
  id_not: ID

  # All values that are contained in given list.
  id_in: [ID!]

  # All values that are not contained in given list.
  id_not_in: [ID!]

  # All values less than the given value.
  id_lt: ID

  # All values less than or equal the given value.
  id_lte: ID

  # All values greater than the given value.
  id_gt: ID

  # All values greater than or equal the given value.
  id_gte: ID

  # All values containing the given string.
  id_contains: ID

  # All values not containing the given string.
  id_not_contains: ID

  # All values starting with the given string.
  id_starts_with: ID

  # All values not starting with the given string.
  id_not_starts_with: ID

  # All values ending with the given string.
  id_ends_with: ID

  # All values not ending with the given string.
  id_not_ends_with: ID
  name: String

  # All values that are not equal to given value.
  name_not: String

  # All values that are contained in given list.
  name_in: [String!]

  # All values that are not contained in given list.
  name_not_in: [String!]

  # All values less than the given value.
  name_lt: String

  # All values less than or equal the given value.
  name_lte: String

  # All values greater than the given value.
  name_gt: String

  # All values greater than or equal the given value.
  name_gte: String

  # All values containing the given string.
  name_contains: String

  # All values not containing the given string.
  name_not_contains: String

  # All values starting with the given string.
  name_starts_with: String

  # All values not starting with the given string.
  name_not_starts_with: String

  # All values ending with the given string.
  name_ends_with: String

  # All values not ending with the given string.
  name_not_ends_with: String
  phone: String

  # All values that are not equal to given value.
  phone_not: String

  # All values that are contained in given list.
  phone_in: [String!]

  # All values that are not contained in given list.
  phone_not_in: [String!]

  # All values less than the given value.
  phone_lt: String

  # All values less than or equal the given value.
  phone_lte: String

  # All values greater than the given value.
  phone_gt: String

  # All values greater than or equal the given value.
  phone_gte: String

  # All values containing the given string.
  phone_contains: String

  # All values not containing the given string.
  phone_not_contains: String

  # All values starting with the given string.
  phone_starts_with: String

  # All values not starting with the given string.
  phone_not_starts_with: String

  # All values ending with the given string.
  phone_ends_with: String

  # All values not ending with the given string.
  phone_not_ends_with: String
  url: String

  # All values that are not equal to given value.
  url_not: String

  # All values that are contained in given list.
  url_in: [String!]

  # All values that are not contained in given list.
  url_not_in: [String!]

  # All values less than the given value.
  url_lt: String

  # All values less than or equal the given value.
  url_lte: String

  # All values greater than the given value.
  url_gt: String

  # All values greater than or equal the given value.
  url_gte: String

  # All values containing the given string.
  url_contains: String

  # All values not containing the given string.
  url_not_contains: String

  # All values starting with the given string.
  url_starts_with: String

  # All values not starting with the given string.
  url_not_starts_with: String

  # All values ending with the given string.
  url_ends_with: String

  # All values not ending with the given string.
  url_not_ends_with: String
  address: AddressFilter
  conference: ConferenceFilter
}


`;
