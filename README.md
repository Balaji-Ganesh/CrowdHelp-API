# CrowdHelp-API

A backend service for the UI-platform

# Setting up the base..

```
    npm init -y
    npm install express cors
    npm install -D nodemon
```

## Packages installed

- `npm install firebase-admin` to work with firebase.

## Routes guide..

### Format:

`https://heroku-deploy/api/<route>`
where route is..

| METHOD | Route                      | Response | Body | Description                                          |
| ------ | -------------------------- | -------- | ---- | ---------------------------------------------------- |
| `GET`  | `/recent-campaigns/:count` | JSON     | -    | Return `count` **recent** active campaigns.          |
| `GET`  | `/active-campaigns/:count` | JSON     | -    | Return `count` list of **all** active campaigns      |
| `GET`  | ~`/all-campaigns`~         | JSON     | -    | ~Return list of **all** active & inactive campaigns~ |
| `GET`  | `/campaign/:address`       | JSON     | -    |                                                      |
| `POST` | `/create-campaign`         | JSON     | JSON |                                                      |
| `POST` | `/fund-campaign/:address`  | JSON     | JSON |                                                      |
| `POST` | `/end-campaign/:address`   | JSON     | JSON |                                                      |

- [GET ] `/` active_campaigns with limit of 4
- [GET ] active-campaigns -> Give array of JSON objects.
- [POST] create-campaign -> contains details in body
- [GET ] campaign (viewing) -> called with campaign's address , return the details of that specific campaign
- [POST] end-campaign -> timestamp & reason of ending

Authentication only for POST routes
GET routes for public

and each with acknowledgement as
status code - 200, 300, -- error error code
format:

```
    {
        msg: 'message'
    }
```
