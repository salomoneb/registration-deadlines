var Xray = require("x-ray")
var xray = Xray({
	filters: {
    trim: function (value) {
      return typeof value === "string" ? value.trim() : value
    }, 
    lower_case: function (value) {
    	return typeof value === "string" ? value.toLowerCase() : value
    },
    space_dash: function(value) {
    	return typeof value === "string" ? value.replace(/\s+/g, "-") : value
    }, 
    slash_dash: function(value) {
    	return typeof value === "string" ? value.replace(/\//g, "-") : value
    }
  }
})

xray("https://www.headcount.org/deadlines-dates/?section=fed", "#fed table.states-chart.responsive-chart tr:not(.state-row-NONE)", 
	[{
		state_abbreviation: "@data-state-abbr | lower_case",
		slug: "td:nth-child(1) | trim | space_dash | lower_case",
		title: "td:nth-child(1) | trim", 
		date: "td:nth-child(2) | slash_dash",
		election_day_registration: "td:nth-child(3)" 
	}])
.write("voting-deadlines.json")