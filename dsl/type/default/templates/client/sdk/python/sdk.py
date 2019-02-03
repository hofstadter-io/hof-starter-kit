"""
hof-starter-kit Python SDK
"""

import json
import requests

def get_jwt_token(username, password):
  response = requests.post(
      'http://192.168.1.103:8081/graphql',
      headers={
        'content-type': 'application/json',
      },
      data='[{"operationName":"login","variables":{"input":{"usernameOrEmail":"' + username + '","password":"' + password + '"}},"query":"mutation login($input: LoginUserInput!) {  login(input: $input) {    tokens {      accessToken      refreshToken      __typename    }    user {      ...UserInfo      __typename    }    errors {      field      message      __typename    }    __typename  }}fragment UserInfo on User {  id  username  role  isActive  email  profile {    ...UserProfileInfo    __typename  }  auth {    apikey {      apikey      __typename    }    certificate {      serial      __typename    }    facebook {      fbId      displayName      __typename    }    google {      googleId      displayName      __typename    }    github {      ghId      displayName      __typename    }    linkedin {      lnId      displayName      __typename    }    __typename  }  __typename}fragment UserProfileInfo on UserProfile {  firstName  middleName  lastName  title  suffix  fullName  __typename}"}]'
      )
  data = json.loads(response.text)
  access_token = data[0]['data']['login']['tokens']['accessToken']
  return access_token

def get_users(jwt):
  response = requests.post(
      'http://192.168.1.103:8081/graphql',
      headers={
        'content-type': 'application/json',
        'authorization': f'Bearer {jwt}',
      },
      data='[{"operationName":"users","variables":{"orderBy":{"column":"","order":""},"filter":{"searchText":"","role":"","isActive":true}},"query":"query users($orderBy: OrderByUserInput, $filter: FilterUserInput) {  users(orderBy: $orderBy, filter: $filter) {    ...UserInfo    __typename  }}fragment UserInfo on User {  id  username  role  isActive  email  profile {    ...UserProfileInfo    __typename  }  auth {    apikey {      apikey      __typename    }    certificate {      serial      __typename    }    facebook {      fbId      displayName      __typename    }    google {      googleId      displayName      __typename    }    github {      ghId      displayName      __typename    }    linkedin {      lnId      displayName      __typename    }    __typename  }  __typename}fragment UserProfileInfo on UserProfile {  firstName  middleName  lastName  title  suffix  fullName  __typename}"}]'
      )
  return json.loads(response.text)
