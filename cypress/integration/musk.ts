export const muskSchema = `
# GraphQL from graph at:
# graphqleditor.com

type Query{
	capsules(
		find : CapsulesFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Capsule]
	capsulesPast(
		find : CapsulesFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Capsule]
	capsulesUpcoming(
		find : CapsulesFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Capsule]
	capsule(
		id : ID!
	) : Capsule
	company : Info
	cores(
		find : CoresFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Core]
	coresPast(
		find : CoresFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Core]
	coresUpcoming(
		find : CoresFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Core]
	core(
		id : ID!
	) : Core
	dragons(
		limit : Int
		offset : Int
	) : [Dragon]
	dragon(
		id : ID!
	) : Dragon
	histories(
		find : HistoryFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [History]
	historiesResult(
		find : HistoryFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : HistoriesResult
	history(
		id : ID!
	) : History
	landpads(
		limit : Int
		offset : Int
	) : [Landpad]
	landpad(
		id : ID!
	) : Landpad
	launches(
		find : LaunchFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Launch]
	launchesPast(
		find : LaunchFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Launch]
	launchesPastResult(
		find : LaunchFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : LaunchesPastResult
	launchesUpcoming(
		find : LaunchFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Launch]
	launch(
		id : ID!
	) : Launch
	launchLatest(
		offset : Int
	) : Launch
	launchNext(
		offset : Int
	) : Launch
	launchpads(
		limit : Int
		offset : Int
	) : [Launchpad]
	launchpad(
		id : ID!
	) : Launchpad
	missions(
		find : MissionsFind
		limit : Int
		offset : Int
	) : [Mission]
	missionsResult(
		find : MissionsFind
		limit : Int
		offset : Int
	) : MissionResult
	mission(
		id : ID!
	) : Mission
	payloads(
		find : PayloadsFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Payload]
	payload(
		id : ID!
	) : Payload
	roadster : Roadster
	rockets(
		limit : Int
		offset : Int
	) : [Rocket]
	rocketsResult(
		limit : Int
		offset : Int
	) : RocketsResult
	rocket(
		id : ID!
	) : Rocket
	ships(
		find : ShipsFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : [Ship]
	shipsResult(
		find : ShipsFind
		limit : Int
		offset : Int
		order : String
		sort : String
	) : ShipsResult
	ship(
		id : ID!
	) : Ship
}

input CapsulesFind{
	id : ID
	landings : Int
	mission : String
	original_launch : Date
	reuse_count : Int
	status : String
	type : String
}

scalar Date

type Capsule{
	id : ID
	landings : Int
	missions : [CapsuleMission]
	original_launch : Date
	reuse_count : Int
	status : String
	type : String
	dragon : Dragon
}

type CapsuleMission{
	flight : Int
	name : String
}

type Dragon{
	active : Boolean
	crew_capacity : Int
	description : String
	diameter : Distance
	dry_mass_kg : Int
	dry_mass_lb : Int
	first_flight : String
	heat_shield : DragonHeatShield
	height_w_trunk : Distance
	id : ID
	launch_payload_mass : Mass
	launch_payload_vol : Volume
	name : String
	orbit_duration_yr : Int
	pressurized_capsule : DragonPressurizedCapsule
	return_payload_mass : Mass
	return_payload_vol : Volume
	sidewall_angle_deg : Float
	thrusters : [DragonThrust]
	trunk : DragonTrunk
	type : String
	wikipedia : String
}

type Distance{
	feet : Float
	meters : Float
}

type DragonHeatShield{
	dev_partner : String
	material : String
	size_meters : Float
	temp_degrees : Int
}

type Mass{
	kg : Int
	lb : Int
}

type Volume{
	cubic_feet : Int
	cubic_meters : Int
}

type DragonPressurizedCapsule{
	payload_volume : Volume
}

type DragonThrust{
	amount : Int
	fuel_1 : String
	fuel_2 : String
	pods : Int
	thrust : Force
	type : String
}

type Force{
	kN : Float
	lbf : Float
}

type DragonTrunk{
	cargo : DragonTrunkCargo
	trunk_volume : Volume
}

type DragonTrunkCargo{
	solar_array : Int
	unpressurized_cargo : Boolean
}

type Info{
	ceo : String
	coo : String
	cto_propulsion : String
	cto : String
	employees : Int
	founded : Int
	founder : String
	headquarters : Address
	launch_sites : Int
	links : InfoLinks
	name : String
	summary : String
	test_sites : Int
	valuation : Float
	vehicles : Int
}

type Address{
	address : String
	city : String
	state : String
}

type InfoLinks{
	elon_twitter : String
	flickr : String
	twitter : String
	website : String
}

input CoresFind{
	asds_attempts : Int
	asds_landings : Int
	block : Int
	id : String
	missions : String
	original_launch : Date
	reuse_count : Int
	rtls_attempts : Int
	rtls_landings : Int
	status : String
	water_landing : Boolean
}

type Core{
	asds_attempts : Int
	asds_landings : Int
	block : Int
	id : ID
	missions : [CapsuleMission]
	original_launch : Date
	reuse_count : Int
	rtls_attempts : Int
	rtls_landings : Int
	status : String
	water_landing : Boolean
}

input HistoryFind{
	end : Date
	flight_number : Int
	id : ID
	start : Date
}

type History{
	details : String
	event_date_unix : Date
	event_date_utc : Date
	id : ID
	links : Link
	title : String
	flight : Launch
}

type Link{
	article : String
	reddit : String
	wikipedia : String
}

type Launch{
	details : String
	id : ID
	is_tentative : Boolean
	launch_date_local : Date
	launch_date_unix : Date
	launch_date_utc : Date
	launch_site : LaunchSite
	launch_success : Boolean
	launch_year : String
	links : LaunchLinks
	mission_id : [String]
	mission_name : String
	rocket : LaunchRocket
	static_fire_date_unix : Date
	static_fire_date_utc : Date
	telemetry : LaunchTelemetry
	tentative_max_precision : String
	upcoming : Boolean
	ships : [Ship]
}

type LaunchSite{
	site_id : String
	site_name_long : String
	site_name : String
}

type LaunchLinks{
	article_link : String
	flickr_images : [String]
	mission_patch_small : String
	mission_patch : String
	presskit : String
	reddit_campaign : String
	reddit_launch : String
	reddit_media : String
	reddit_recovery : String
	video_link : String
	wikipedia : String
}

type LaunchRocket{
	fairings : LaunchRocketFairings
	first_stage : LaunchRocketFirstStage
	rocket_name : String
	rocket_type : String
	rocket : Rocket
	second_stage : LaunchRocketSecondStage
}

type LaunchRocketFairings{
	recovered : Boolean
	recovery_attempt : Boolean
	reused : Boolean
	ship : String
}

type LaunchRocketFirstStage{
	cores : [LaunchRocketFirstStageCore]
}

type LaunchRocketFirstStageCore{
	block : Int
	core : Core
	flight : Int
	gridfins : Boolean
	land_success : Boolean
	landing_intent : Boolean
	landing_type : String
	landing_vehicle : String
	legs : Boolean
	reused : Boolean
}

type Rocket{
	active : Boolean
	boosters : Int
	company : String
	cost_per_launch : Int
	country : String
	description : String
	diameter : Distance
	engines : RocketEngines
	first_flight : Date
	first_stage : RocketFirstStage
	height : Distance
	id : ID
	landing_legs : RocketLandingLegs
	mass : Mass
	name : String
	payload_weights : [RocketPayloadWeight]
	second_stage : RocketSecondStage
	stages : Int
	success_rate_pct : Int
	type : String
	wikipedia : String
}

type RocketEngines{
	number : Int
	type : String
	version : String
	layout : String
	engine_loss_max : String
	propellant_1 : String
	propellant_2 : String
	thrust_sea_level : Force
	thrust_vacuum : Force
	thrust_to_weight : Float
}

type RocketFirstStage{
	burn_time_sec : Int
	engines : Int
	fuel_amount_tons : Float
	reusable : Boolean
	thrust_sea_level : Force
	thrust_vacuum : Force
}

type RocketLandingLegs{
	number : Int
	material : String
}

type RocketPayloadWeight{
	id : String
	kg : Int
	lb : Int
	name : String
}

type RocketSecondStage{
	burn_time_sec : Int
	engines : Int
	fuel_amount_tons : Float
	payloads : RocketSecondStagePayloads
	thrust : Force
}

type RocketSecondStagePayloads{
	option_1 : String
	composite_fairing : RocketSecondStagePayloadCompositeFairing
}

type RocketSecondStagePayloadCompositeFairing{
	height : Distance
	diameter : Distance
}

type LaunchRocketSecondStage{
	block : Int
	payloads : [Payload]
}

type Payload{
	customers : [String]
	id : ID
	manufacturer : String
	nationality : String
	norad_id : [Int]
	orbit_params : PayloadOrbitParams
	orbit : String
	payload_mass_kg : Float
	payload_mass_lbs : Float
	payload_type : String
	reused : Boolean
}

type PayloadOrbitParams{
	apoapsis_km : Float
	arg_of_pericenter : Float
	eccentricity : Float
	epoch : Date
	inclination_deg : Float
	lifespan_years : Float
	longitude : Float
	mean_anomaly : Float
	mean_motion : Float
	periapsis_km : Float
	period_min : Float
	raan : Float
	reference_system : String
	regime : String
	semi_major_axis_km : Float
}

type LaunchTelemetry{
	flight_club : String
}

type Ship{
	abs : Int
	active : Boolean
	attempted_landings : Int
	class : Int
	course_deg : Int
	home_port : String
	id : ID
	image : String
	imo : Int
	missions : [ShipMission]
	mmsi : Int
	model : String
	name : String
	position : ShipLocation
	roles : [String]
	speed_kn : Float
	status : String
	successful_landings : Int
	type : String
	url : String
	weight_kg : Int
	weight_lbs : Int
	year_built : Int
}

type ShipMission{
	flight : String
	name : String
}

type ShipLocation{
	latitude : Float
	longitude : Float
}

type HistoriesResult{
	result : Result
	data : [History]
}

type Result{
	totalCount : Int
}

type Landpad{
	attempted_landings : String
	details : String
	full_name : String
	id : ID
	landing_type : String
	location : Location
	status : String
	successful_landings : String
	wikipedia : String
}

type Location{
	latitude : Float
	longitude : Float
	name : String
	region : String
}

input LaunchFind{
	apoapsis_km : Float
	block : Int
	cap_serial : String
	capsule_reuse : String
	core_flight : Int
	core_reuse : String
	core_serial : String
	customer : String
	eccentricity : Float
	end : Date
	epoch : Date
	fairings_recovered : String
	fairings_recovery_attempt : String
	fairings_reuse : String
	fairings_reused : String
	fairings_ship : String
	gridfins : String
	id : ID
	inclination_deg : Float
	land_success : String
	landing_intent : String
	landing_type : String
	landing_vehicle : String
	launch_date_local : Date
	launch_date_utc : Date
	launch_success : String
	launch_year : String
	legs : String
	lifespan_years : Float
	longitude : Float
	manufacturer : String
	mean_motion : Float
	mission_id : String
	mission_name : String
	nationality : String
	norad_id : Int
	orbit : String
	payload_id : String
	payload_type : String
	periapsis_km : Float
	period_min : Float
	raan : Float
	reference_system : String
	regime : String
	reused : String
	rocket_id : String
	rocket_name : String
	rocket_type : String
	second_stage_block : String
	semi_major_axis_km : Float
	ship : String
	side_core1_reuse : String
	side_core2_reuse : String
	site_id : String
	site_name_long : String
	site_name : String
	start : Date
	tbd : String
	tentative_max_precision : String
	tentative : String
}

type LaunchesPastResult{
	result : Result
	data : [Launch]
}

type Launchpad{
	attempted_launches : Int
	details : String
	id : ID
	location : Location
	name : String
	status : String
	successful_launches : Int
	vehicles_launched : [Rocket]
	wikipedia : String
}

input MissionsFind{
	id : ID
	manufacturer : String
	name : String
	payload_id : String
}

type Mission{
	description : String
	id : ID
	manufacturers : [String]
	name : String
	twitter : String
	website : String
	wikipedia : String
	payloads : [Payload]
}

type MissionResult{
	result : Result
	data : [Mission]
}

input PayloadsFind{
	apoapsis_km : Float
	customer : String
	eccentricity : Float
	epoch : Date
	inclination_deg : Float
	lifespan_years : Float
	longitude : Float
	manufacturer : String
	mean_motion : Float
	nationality : String
	norad_id : Int
	orbit : String
	payload_id : ID
	payload_type : String
	periapsis_km : Float
	period_min : Float
	raan : Float
	reference_system : String
	regime : String
	reused : Boolean
	semi_major_axis_km : Float
}

type Roadster{
	apoapsis_au : Float
	details : String
	earth_distance_km : Float
	earth_distance_mi : Float
	eccentricity : Float
	epoch_jd : Float
	inclination : Float
	launch_date_unix : Date
	launch_date_utc : Date
	launch_mass_kg : Int
	launch_mass_lbs : Int
	longitude : Float
	mars_distance_km : Float
	mars_distance_mi : Float
	name : String
	norad_id : Int
	orbit_type : Float
	periapsis_arg : Float
	periapsis_au : Float
	period_days : Float
	semi_major_axis_au : Float
	speed_kph : Float
	speed_mph : Float
	wikipedia : String
}

type RocketsResult{
	result : Result
	data : [Rocket]
}

input ShipsFind{
	id : ID
	name : String
	model : String
	type : String
	role : String
	active : Boolean
	imo : Int
	mmsi : Int
	abs : Int
	class : Int
	weight_lbs : Int
	weight_kg : Int
	year_built : Int
	home_port : String
	status : String
	speed_kn : Int
	course_deg : Int
	latitude : Float
	longitude : Float
	successful_landings : Int
	attempted_landings : Int
	mission : String
}

type ShipsResult{
	result : Result
	data : [Ship]
}

type CoreMission{
	name : String
	flight : Int
}

scalar ObjectID

directive @rateLimit(
	max : Int
	window : String
	message : String
	identityArgs : [String]
) on FIELD_DEFINITION
schema{
	query: Query
}
`;
export const testSchema1 = `

# GraphQL from graph at:
# graphqleditor.com

type Person{
	name : String!
}

type Car{
	passenger : Person
}

extend type Person{
	age : Int
}

scalar ObjectID

directive @rateLimit on FIELD_DEFINITION

directive @ddd(
	ddd : Address
) on SCALAR

extend scalar ObjectID @ddd(
	ddd : {street : "Naftowa",city : "Bia"}
) @sss

directive @sss on SCALAR

input Address{
	street : String!
}

extend input Address{
	city : String
}

input PersonInput{
	address : Address
}


`;
