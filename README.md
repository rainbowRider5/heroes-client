# Heroes-client

## Set-up
Just run <code>yarn && yarn start</code>

## Checklist
- User should, at all times, know that something is being loaded (e.g. spinner/fake content) [`DONE`]
- The application should be responsive and work both on desktop and mobile devices [`DONE`]
- Use this API: https://github.com/netguru/heroes-api It exposes both REST and GraphQL services. It's up to you which one you chose. [`DONE`](rest API)
- Your app should look more or less like on the designs: https://netguru.invisionapp.com/share/8YU95KFGH9C.  It doesn't have to be pixel-perfect :) (designs contain views for both desktop and mobile screens) [`DONE`]
- Your project should contain README.md with details on how to set-up your application [ `:)` ]
- We should be able to run your app using only two commands: npm i && npm start (or yarn install && yarn start) [`DONE`]

- User should be able to see a list of heroes along with their avatar, name, type, and description [`DONE`]
- User should be able to load more heroes. It's up to you whether you chose infinite scroll or 'load more' button. [`DONE`]
- If there are no more heroes to load, user should see that’s the end of the list and no more requests should be triggered. [`DONE`]

- User should be able to open the modal by clicking "Add hero" button in the main dashboard. [`DONE`]
- User should be able to input hero details:avatar (url to avatar image), full name, description, type (by selecting type from the available options in the dropdown) [`DONE`]
- User should see an error when fields are not filled [`DONE`]
- Heroes types available in dropdown select should be fetched from Heros API endpoint. [`DONE`]
- User should be able to save the details by clicking the "Save" button. After the hero is saved modal should be closed and the hero should be added to the heroes list.  [`DONE`]

- The details view should be a modal accessible by clicking on any item on the Heroes list. [`DONE`]
- The modal should contain the following information: full name, type & description [`DONE`]
- Additionally, the user should be able to delete the hero by clicking "Delete hero" button. After the hero is removed modal should be closed and heroes list should be updated. [`DONE`]

Nice to have:
- Hero Details modal should be accessible by manually entering the page using its URL address (e.g. /details/:id) [`DONE`]

Tests:
- You don't have to aim for 100% code coverage, but we'd love to see your skill in this field. So please test at least one feature. You can use Jest + enzyme/react-resting-library for this. [`I failed setting-up tests for redux-connected components, If you'd be so kind to send me some resources, so I can learn to test my redux apps correctly, I'd be very grateful`]

### Notes

I didn't use TS cuz I'm still learining using it, It'd take much more time to get this task done and I've been overloaded with work recently.