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

| METHOD | Route                     | Response | Body | Description                             |
| ------ | ------------------------- | -------- | ---- | --------------------------------------- |
| `GET`  | `/`                       | JSON     | -    | Return 4 **recent** active campaigns.   |
| `GET`  | `/active-campaigns`       | JSON     | -    | Return list of **all** active campaigns |
| `POST` | `/create-campaign`        | JSON     | JSON |                                         |
| `GET`  | `/campaign/<HexAddresss>` | JSON     | -    |                                         |
| `POST` | `/end-campaign`           | JSON     | JSON |                                         |



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
