#!/usr/bin/python
import json
import os
import xml.etree.ElementTree as ET
import sys

print 'Content-type: application/json'
print '\n'

'''
unnecessary correction for absolute filepaths
if os.environ['SERVER_NAME'] == 'thundercatdesigns.com':
    print >> sys.stderr, 'Server name matched web, setting path to thundercatdesigns'
    #path = '/home/users/web/b354/moo.thundercatdesignscom/content/blog'
else:
    print >> sys.stderr, 'No server name match', os.environ['SERVER_NAME'], 'did not match server name. Setting to local path.\n'
    #path = ('/var/www/content/blog')
'''
path = '../content/blog'

content = []
for f in os.listdir(path):
    if f[-3:] == 'xml':
        tree = ET.parse(path + '/' + f)
        root = tree.getroot()
        title = root.findall('./title')[0].text.strip()
        date = root.findall('./date')[0].text.strip()
        body = root.findall('./body')[0].text.strip()
        content.append({'title': title, 'date': date, 'body': body})

#content = [{'title': 'Creating the Blog', 'date': '8/30/2014', 'body': 'This is all about how the blog got created'}]
print json.dumps(content)
