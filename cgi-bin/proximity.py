#!/usr/bin/python

import cgi
import json
import httplib

print 'Content-type: application/json'
print '\n'

#should be exactly two arguments for latitude & longitude
args = cgi.FieldStorage()
try:
    lat = args['lat'].value;
    lon = args['lon'].value;
except:
    print 'need lat and lon arguments'

targetLocations = {};
targetFile = open('../proximity/proximityCandidates.txt')

apiKey = open('GoogleApiKey.txt').read().strip();

for targetLine in targetFile:
    [group, name, destinationQuery] = targetLine.split(',')
    destinationQuery = destinationQuery.strip()
    if group not in targetLocations.keys():
        targetLocations[group] = {} 
    targetLocations[group][name] = {'destinationQuery': destinationQuery, 'distance': {}, 'duration': {}}

destinationQueryString = ''
for group in targetLocations.keys():
    for place in targetLocations[group].keys():
        destinationQueryString += targetLocations[group][place]['destinationQuery'] + '|'

conn = httplib.HTTPConnection('maps.googleapis.com')
conn.request('GET', '/maps/api/distancematrix/json?mode=walking&units=imperial&origins=' + lat + ',' + lon + '&destinations=' + destinationQueryString)

distanceMatrixResponse = conn.getresponse()
distanceMatrix = json.loads(distanceMatrixResponse.read())

requestedDestinationIndex = 0

for group in targetLocations.keys():
    for place in targetLocations[group].keys():
        distanceInformation = distanceMatrix['rows'][0]['elements'][requestedDestinationIndex]
        targetLocations[group][place]['distance']['text'] = distanceInformation['distance']['text']
        targetLocations[group][place]['duration']['text'] = distanceInformation['duration']['text']
        targetLocations[group][place]['distance']['value'] = distanceInformation['distance']['value']
        targetLocations[group][place]['duration']['value'] = distanceInformation['distance']['value']
        requestedDestinationIndex += 1

#print json.dumps(targetLocations)

for group in targetLocations.keys():
    nearestKey = targetLocations[group].keys()[0]
    nearest = targetLocations[group][nearestKey]
    for place in targetLocations[group].keys():
        location = targetLocations[group][place]
        if location['duration']['value'] < nearest['duration']['value']:
            nearestKey = place
            nearest = location
    
    print 'Nearest', group, 'is', nearestKey, 'with distance of', nearest['distance']['text'], 'and walking time of ', nearest['duration']['text']
