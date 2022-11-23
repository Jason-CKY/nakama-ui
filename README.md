# Nakama-UI

This is the frontend UI for the code deployment service Nakama.


## Getting started

1. Create an application on Gitlab
2. Add in the Application ID into the `REACT_APP_CLIENT_ID` field in `config/app.env`
3. Run `make start`


## Troubleshooting

### Ignore changes to a file already committed

`git update-index --assume-unchanged <file>`

### Undo ignore changes to the file

`git update-index --no-assume-unchanged <file>`
