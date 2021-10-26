
// import axios from 'axios'
// import { connect } from './getstream';

const getstream = require('../../../../getstream');

url = 'https://europe-central2-alpine-listener-115410.cloudfunctions.net/CreateStreamUserToken'
id_token = ''

// this.$axios.post(url, id_token)


var userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoieGFZU0ZmWnh3M1R3VWpydXM1MktyazJ5WHVmMiJ9.UOcqAJEe-HwfJMLmhfKgoWMRUgLGJCwLqhxH3P0jHfE';

const client = getstream.connect('z39emh95z6zj', userToken, '1141909');

console.log('test');

