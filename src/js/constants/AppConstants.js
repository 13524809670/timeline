const TABS = {
  ALL: 'ALL',
  FEATURED: 'FEATURED'
};

const TIMELINE_ACTIONS = {
  ADD_TIMELINE: 'ADD_TIMELINE',
  DELETE_TIMELINE: 'DELETE_TIMELINE',
  UPDATE_TIMELINE: 'UPDATE_TIMELINE'
};

const SESSION_ACTIONS = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE: 'LOGIN_RESPONSE'
};

const APIRoot = 'https://api.LEANCLOUD.cn/1.1';

const API_ENDPOINTS = {
  LOGIN: `${APIRoot}/login`,
  TIMELINES: `${APIRoot}/classes/Timeline`
};

const API_HEADERS = {
  APP_ID: 'X-AVOSCloud-Application-Id',
  APP_KEY: 'X-AVOSCloud-Application-Key',
  SESSION_TOKEN: 'X-AVOSCloud-Session-Token'
};

const CHANGE = 'CHANGE';

let LEANCLOUD;

if(__DEV__) {
  LEANCLOUD = {
    APP_ID: '7yc0iyc5weusb69w93xjao0ljfibarygf20lmf0sl9ko0zgn',
    APP_KEY: '29k8l8a2k2ybpp89vupdurljrt91grc1fy0xq3t2d8h17jco'
  };
} else {
  LEANCLOUD = {
    APP_ID: '7jb2qe0qp3q33s0kv5jytvmn092f8gvjyl8mgziq9do0il1q',
    APP_KEY: '4s191cwd3rdkqtg7c9hhfasmqhyck0bdsoerpms3fd1wosi6'
  };
}

export {
  TABS,
  TIMELINE_ACTIONS,
  SESSION_ACTIONS,
  CHANGE,
  API_ENDPOINTS,
  API_HEADERS,
  LEANCLOUD
};
