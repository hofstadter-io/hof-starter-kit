"""
hof-starter-kit Python SDK
"""

import json
import os
import requests

API_KEY = "changeme"

user_query_file = "/home/philip/go/src/github.com/hofstadter-io/studios-app/output/packages/client/src/modules/user/graphql/UsersQuery.graphql"

def read_query_file(query_file):
  lines = None
  with open(query_file, 'r') as file:
    lines = file.readlines()
  for line in lines:
    if line.startswith('#import'):
      to_import = line.split()[1]
      lines = read_query_file(os.path.dirname(query_file) + '/' + to_import.strip('"')) + lines

  return lines

def run_graphql(query_file):
  lines = ''.join(read_query_file(query_file))

  response = requests.post(
      'http://192.168.1.103:8081/graphql',
      headers={
        'content-type': 'application/json',
        'authorization': f'Bearer {API_KEY}',
      },
      json={'query': lines}
      # data='[{"operationName":"users","variables":{"orderBy":{"column":"","order":""},"filter":{"searchText":"","role":"","isActive":true}},"query":"query users($orderBy: OrderByUserInput, $filter: FilterUserInput) {  users(orderBy: $orderBy, filter: $filter) {    ...UserInfo    __typename  }}fragment UserInfo on User {  id  username  role  isActive  email  profile {    ...UserProfileInfo    __typename  }  auth {    apikey {      apikey      __typename    }    certificate {      serial      __typename    }    facebook {      fbId      displayName      __typename    }    google {      googleId      displayName      __typename    }    github {      ghId      displayName      __typename    }    linkedin {      lnId      displayName      __typename    }    __typename  }  __typename}fragment UserProfileInfo on UserProfile {  firstName  middleName  lastName  title  suffix  fullName  __typename}"}]'
      )
  return json.loads(response.text)
