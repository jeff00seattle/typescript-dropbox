const request = require('request');

export function getUserFollowers(username: string, callback): void {
  const options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/followers`,
    headers: { 'User-Agent': 'Awesome-Octocat-App', 'cache-control': 'no-cache' }
  };

  request(options, (err, res, body) => {
    if (!err) {
      const followers = JSON.parse(body).map(follower => {
        return follower.login;
      });
      callback(null, followers);
    } else {
      callback('Error Occurred!', null);
    }
  });
}

export function getUser(username: string, callback): void {
  const options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}`,
    headers: { 'User-Agent': 'Awesome-Octocat-App', 'cache-control': 'no-cache' }
  };

  request(options, (err, res, body) => {
    if (!err) {
      const user = JSON.parse(body);

      callback(null, user);
    } else {
      callback('Error Occurred!', null);
    }
  });
}
